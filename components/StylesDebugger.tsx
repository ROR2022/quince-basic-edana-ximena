"use client"

import { useEffect, useState } from 'react'

export function StylesDebugger() {
  const [debugInfo, setDebugInfo] = useState<string>('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkStyles = () => {
      const root = document.documentElement
      const primaryValue = getComputedStyle(root).getPropertyValue('--primary')
      const testElement = document.createElement('div')
      testElement.className = 'text-primary'
      document.body.appendChild(testElement)
      const computedColor = getComputedStyle(testElement).color
      document.body.removeChild(testElement)

      setDebugInfo(`
        CSS Custom Property --primary: "${primaryValue}"
        Computed text-primary color: "${computedColor}"
        Document ready state: ${document.readyState}
        Body classes: ${document.body.className}
        Root classes: ${root.className}
      `)
    }

    // Check immediately and after a delay
    checkStyles()
    const timeout = setTimeout(checkStyles, 1000)

    return () => clearTimeout(timeout)
  }, [])

  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: '10px', 
        right: '10px', 
        background: 'rgba(0,0,0,0.8)', 
        color: 'white', 
        padding: '10px', 
        fontSize: '12px',
        zIndex: 9999,
        maxWidth: '300px',
        whiteSpace: 'pre-wrap'
      }}
    >
      <strong>Styles Debug:</strong>
      {debugInfo}
    </div>
  )
}
