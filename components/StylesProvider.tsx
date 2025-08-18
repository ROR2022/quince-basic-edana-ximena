"use client"

import { useEffect } from 'react'

export function StylesProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force CSS custom properties to be applied on mount
    const root = document.documentElement
    
    // Ensure primary color is correctly set
    const primaryValue = getComputedStyle(root).getPropertyValue('--primary')
    if (!primaryValue || primaryValue.trim() === '') {
      root.style.setProperty('--primary', '219 100% 45%')
    }
    
    // Force a repaint to ensure styles are applied
    root.style.display = 'none'
    root.offsetHeight // trigger reflow
    root.style.display = ''
    
    // Add a class to ensure hydration
    document.body.classList.add('styles-loaded')
  }, [])

  return <>{children}</>
}
