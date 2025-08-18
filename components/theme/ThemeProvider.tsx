"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  systemTheme: 'light' | 'dark'
  resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | null>(null)

// Hook para detectar el tema del sistema
function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return systemTheme
}

// Provider del tema
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)
  const systemTheme = useSystemTheme()

  // Cargar tema del localStorage al montar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setThemeState(savedTheme)
    }
    setMounted(true)
  }, [])

  // Aplicar tema al documento
  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    const resolvedTheme = theme === 'system' ? systemTheme : theme
    root.classList.add(resolvedTheme)

    // Force CSS custom properties to be available
    if (resolvedTheme === 'light') {
      root.style.setProperty('--primary', '219 100% 45%')
      root.style.setProperty('--primary-foreground', '210 40% 98%')
    } else {
      root.style.setProperty('--primary', '219 100% 45%')
      root.style.setProperty('--primary-foreground', '210 40% 98%')
    }
  }, [theme, systemTheme, mounted])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const resolvedTheme = theme === 'system' ? systemTheme : theme

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    systemTheme,
    resolvedTheme
  }

  // Evitar hidration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook para usar el tema
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider')
  }
  return context
}

// Componente de toggle del tema
export function ThemeToggle() {
  const { theme: _theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Claro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Oscuro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>Sistema</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Componente de indicador del tema actual
export function ThemeIndicator() {
  const { theme, resolvedTheme } = useTheme()
  
  const getThemeInfo = () => {
    switch (theme) {
      case 'light':
        return { icon: Sun, label: 'Tema Claro', color: 'text-yellow-600' }
      case 'dark':
        return { icon: Moon, label: 'Tema Oscuro', color: 'text-blue-600' }
      case 'system':
        return { 
          icon: Monitor, 
          label: `Sistema (${resolvedTheme === 'dark' ? 'Oscuro' : 'Claro'})`, 
          color: 'text-gray-600' 
        }
      default:
        return { icon: Monitor, label: 'Sistema', color: 'text-gray-600' }
    }
  }

  const { icon: Icon, label, color } = getThemeInfo()

  return (
    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Icon className={`h-4 w-4 ${color}`} />
      <span>{label}</span>
    </div>
  )
}

// Hook para obtener clases CSS según el tema
export function useThemeClasses() {
  const { resolvedTheme } = useTheme()
  
  const getClasses = (lightClasses: string, darkClasses: string) => {
    return resolvedTheme === 'dark' ? darkClasses : lightClasses
  }

  const cardClasses = getClasses(
    'bg-white border-gray-200',
    'bg-gray-900 border-gray-700'
  )

  const textClasses = getClasses(
    'text-gray-900',
    'text-gray-100'
  )

  const mutedTextClasses = getClasses(
    'text-gray-600',
    'text-gray-400'
  )

  const backgroundClasses = getClasses(
    'bg-gray-50',
    'bg-gray-950'
  )

  return {
    getClasses,
    cardClasses,
    textClasses,
    mutedTextClasses,
    backgroundClasses
  }
}

// Componente para transiciones suaves del tema
export function ThemeTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="transition-colors duration-300 ease-in-out">
      {children}
    </div>
  )
}

// Variables CSS personalizadas para el tema
export function ThemeVariables() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const root = document.documentElement

    if (resolvedTheme === 'dark') {
      root.style.setProperty('--color-bg-primary', '9 9 11') // zinc-900
      root.style.setProperty('--color-bg-secondary', '24 24 27') // zinc-800
      root.style.setProperty('--color-text-primary', '250 250 250') // zinc-50
      root.style.setProperty('--color-text-secondary', '161 161 170') // zinc-400
      root.style.setProperty('--color-border', '39 39 42') // zinc-700
    } else {
      root.style.setProperty('--color-bg-primary', '255 255 255') // white
      root.style.setProperty('--color-bg-secondary', '249 250 251') // gray-50
      root.style.setProperty('--color-text-primary', '17 24 39') // slate-900
      root.style.setProperty('--color-text-secondary', '107 114 128') // gray-500
      root.style.setProperty('--color-border', '229 231 235') // gray-200
    }
  }, [resolvedTheme])

  return null
}

export default ThemeProvider
