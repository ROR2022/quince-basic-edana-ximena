"use client"

import React, { useState, useRef, useEffect, createContext, useContext, useCallback } from 'react'
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  X, 
  Bell,
  Loader2,
  Zap,
  Heart,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Tipos para notificaciones
interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  persistent?: boolean
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
  updateToast: (id: string, updates: Partial<Toast>) => void
  clearAll: () => void
}

// Contexto de Toast
const ToastContext = createContext<ToastContextType | null>(null)

// Componente de Toast individual
function ToastItem({ 
  toast, 
  onRemove 
}: { 
  toast: Toast
  onRemove: (id: string) => void 
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleRemove = useCallback(() => {
    setIsRemoving(true)
    setTimeout(() => {
      onRemove(toast.id)
    }, 300)
  }, [onRemove, toast.id])

  useEffect(() => {
    // Animación de entrada
    setTimeout(() => setIsVisible(true), 10)

    // Auto-remove si no es persistente
    if (!toast.persistent && toast.duration !== 0) {
      const duration = toast.duration || 5000
      timeoutRef.current = setTimeout(() => {
        handleRemove()
      }, duration)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [toast.duration, toast.persistent, handleRemove])

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />
      case 'loading':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      case 'loading':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-white border-gray-200'
    }
  }

  return (
    <div
      className={`transform transition-all duration-300 ease-out ${
        isVisible && !isRemoving
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
    >
      <Card className={`p-4 shadow-lg ${getBackgroundColor()}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900">
              {toast.title}
            </div>
            {toast.description && (
              <div className="text-sm text-gray-600 mt-1">
                {toast.description}
              </div>
            )}
            {toast.action && (
              <div className="mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={toast.action.onClick}
                  className="text-xs"
                >
                  {toast.action.label}
                </Button>
              </div>
            )}
          </div>
          
          {!toast.persistent && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="flex-shrink-0 h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

// Contenedor de Toasts
function ToastContainer({ toasts, onRemove }: { 
  toasts: Toast[]
  onRemove: (id: string) => void 
}) {
  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-w-full space-y-2">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}

// Provider de Toast
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toastData: Omit<Toast, 'id'>): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const toast: Toast = {
      id,
      ...toastData
    }

    setToasts(prev => [...prev, toast])
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const updateToast = useCallback((id: string, updates: Partial<Toast>) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, ...updates } : toast
    ))
  }, [])

  const clearAll = useCallback(() => {
    setToasts([])
  }, [])

  const contextValue: ToastContextType = {
    addToast,
    removeToast,
    updateToast,
    clearAll
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

// Hook para usar Toast
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast debe usarse dentro de ToastProvider')
  }

  // Helper functions para diferentes tipos
  const success = useCallback((title: string, description?: string, options?: Partial<Toast>) => {
    return context.addToast({
      type: 'success',
      title,
      description,
      ...options
    })
  }, [context])

  const error = useCallback((title: string, description?: string, options?: Partial<Toast>) => {
    return context.addToast({
      type: 'error',
      title,
      description,
      duration: 7000, // Errores duran más
      ...options
    })
  }, [context])

  const warning = useCallback((title: string, description?: string, options?: Partial<Toast>) => {
    return context.addToast({
      type: 'warning',
      title,
      description,
      ...options
    })
  }, [context])

  const info = useCallback((title: string, description?: string, options?: Partial<Toast>) => {
    return context.addToast({
      type: 'info',
      title,
      description,
      ...options
    })
  }, [context])

  const loading = useCallback((title: string, description?: string) => {
    return context.addToast({
      type: 'loading',
      title,
      description,
      persistent: true
    })
  }, [context])

  return {
    addToast: context.addToast,
    removeToast: context.removeToast,
    updateToast: context.updateToast,
    clearAll: context.clearAll,
    success,
    error,
    warning,
    info,
    loading
  }
}

// Componentes de animación y feedback
export function AnimatedCard({ 
  children, 
  delay = 0,
  className = "",
  ...props 
}: { 
  children: React.ReactNode
  delay?: number
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transform transition-all duration-500 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-4 opacity-0'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function PulseLoader({ 
  size = 'md',
  color = 'blue' 
}: { 
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'red' | 'yellow'
}) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600'
  }

  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  )
}

export function SuccessAnimation({ 
  show,
  onComplete 
}: { 
  show: boolean
  onComplete?: () => void
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
      <div className="transform transition-all duration-500 ease-out scale-100 opacity-100">
        <div className="bg-white rounded-full p-8 shadow-2xl">
          <div className="relative">
            <CheckCircle className="h-16 w-16 text-green-600 animate-bounce" />
            <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function FloatingActionButton({ 
  onClick,
  icon: Icon = Heart,
  label,
  position = 'bottom-right',
  color = 'blue'
}: {
  onClick: () => void
  icon?: React.ComponentType<{ className?: string }>
  label?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  color?: 'blue' | 'green' | 'red' | 'purple'
}) {
  const [isHovered, setIsHovered] = useState(false)

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }

  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-600 hover:bg-red-700',
    purple: 'bg-purple-600 hover:bg-purple-700'
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-40`}>
      <div className="relative">
        {label && isHovered && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
            {label}
          </div>
        )}
        <button
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            w-14 h-14 rounded-full text-white shadow-lg
            transform transition-all duration-200 ease-out
            hover:scale-110 active:scale-95
            ${colorClasses[color]}
            ${isHovered ? 'shadow-xl' : 'shadow-lg'}
          `}
        >
          <Icon className="h-6 w-6 mx-auto" />
        </button>
      </div>
    </div>
  )
}

export function ProgressIndicator({ 
  progress,
  label,
  color = 'blue',
  showPercentage = true,
  animated = true
}: {
  progress: number
  label?: string
  color?: 'blue' | 'green' | 'red' | 'yellow'
  showPercentage?: boolean
  animated?: boolean
}) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setDisplayProgress(progress), 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayProgress(progress)
    }
  }, [progress, animated])

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600'
  }

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm text-gray-500">{Math.round(displayProgress)}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-700 ease-out ${colorClasses[color]}`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
    </div>
  )
}

// Helper para confetti effect (simple)
export function triggerConfetti() {
  // Crear elementos de confetti temporales
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  const confettiCount = 50

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div')
    confetti.style.cssText = `
      position: fixed;
      top: -10px;
      left: ${Math.random() * 100}vw;
      width: ${Math.random() * 6 + 4}px;
      height: ${Math.random() * 6 + 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: confetti-fall ${Math.random() * 2 + 3}s ease-out forwards;
    `
    
    document.body.appendChild(confetti)
    
    setTimeout(() => {
      confetti.remove()
    }, 5000)
  }
}

// Agregar CSS para la animación de confetti
if (typeof window !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes confetti-fall {
      0% {
        transform: translateY(-100vh) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
}

export default ToastProvider
