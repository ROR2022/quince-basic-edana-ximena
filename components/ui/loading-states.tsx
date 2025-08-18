"use client"

import React from 'react'
import { 
  Users, 
  Search, 
  FileText, 
  BarChart3, 
  Image,
  Inbox,
  Bell,
  XCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

// Skeleton para cards individuales
export function CardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
    </Card>
  )
}

// Skeleton para tabla
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="grid grid-cols-5 gap-4 p-4 border-b">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-20" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-4 p-4">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 w-full" />
          ))}
        </div>
      ))}
    </div>
  )
}

// Skeleton para gráficos
export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="w-full" style={{ height: `${height}px` }} />
    </div>
  )
}

// Skeleton para métricas
export function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Skeleton para lista de elementos
export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  )
}

// Estados vacíos
interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  illustration?: React.ReactNode
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  illustration 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {illustration || (
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <Icon className="h-10 w-10 text-gray-400" />
        </div>
      )}
      
      <div className="mt-6 max-w-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      {action && (
        <div className="mt-6">
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  )
}

// Estados vacíos específicos
export function NoGuestsEmpty({ onAddGuest }: { onAddGuest: () => void }) {
  return (
    <EmptyState
      icon={Users}
      title="No hay invitados aún"
      description="Comienza agregando tu primer invitado para gestionar tu evento."
      action={{
        label: "Agregar primer invitado",
        onClick: onAddGuest
      }}
    />
  )
}

export function NoSearchResults({ searchTerm }: { searchTerm: string }) {
  return (
    <EmptyState
      icon={Search}
      title="Sin resultados"
      description={`No se encontraron invitados que coincidan con "${searchTerm}".`}
    />
  )
}

export function NoNotifications() {
  return (
    <EmptyState
      icon={Bell}
      title="No hay notificaciones"
      description="Todas las notificaciones aparecerán aquí cuando tengas actividad."
    />
  )
}

export function NoAnalyticsData() {
  return (
    <EmptyState
      icon={BarChart3}
      title="Sin datos de análisis"
      description="Los análisis aparecerán cuando tengas invitados y actividad en tu evento."
    />
  )
}

export function NoInvitationCodes({ onCreateCode }: { onCreateCode: () => void }) {
  return (
    <EmptyState
      icon={FileText}
      title="No hay códigos de invitación"
      description="Crea códigos únicos para controlar el acceso a tus invitaciones."
      action={{
        label: "Crear primer código",
        onClick: onCreateCode
      }}
    />
  )
}

export function NoPreviewAvailable() {
  return (
    <EmptyState
      icon={Image}
      title="Vista previa no disponible"
      description="Agrega algunos invitados para ver la vista previa de las invitaciones."
    />
  )
}

// Componente de Loading con diferentes tipos
export function LoadingSpinner({ 
  size = 'md',
  text 
}: { 
  size?: 'sm' | 'md' | 'lg'
  text?: string 
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`} />
      {text && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  )
}

// Loading Page completo
export function LoadingPage({ message = "Cargando..." }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {message}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Por favor espera un momento...
        </p>
      </div>
    </div>
  )
}

// Estados de error
export function ErrorState({ 
  title = "Algo salió mal",
  description = "Ha ocurrido un error inesperado. Por favor intenta de nuevo.",
  onRetry 
}: {
  title?: string
  description?: string
  onRetry?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
        <XCircle className="h-10 w-10 text-red-600" />
      </div>
      
      <div className="mt-6 max-w-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      {onRetry && (
        <div className="mt-6">
          <Button onClick={onRetry} variant="outline">
            Intentar de nuevo
          </Button>
        </div>
      )}
    </div>
  )
}

// Skeleton para dashboard completo
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>

      {/* Métricas */}
      <MetricsSkeleton />

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <ChartSkeleton height={250} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <ChartSkeleton height={250} />
          </CardContent>
        </Card>
      </div>

      {/* Tabla */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <TableSkeleton />
        </CardContent>
      </Card>
    </div>
  )
}

// Componente wrapper para manejar estados de carga
export function DataWrapper({ 
  loading, 
  error, 
  empty, 
  emptyState,
  children,
  loadingComponent,
  onRetry 
}: {
  loading: boolean
  error?: string | null
  empty?: boolean
  emptyState?: React.ReactNode
  children: React.ReactNode
  loadingComponent?: React.ReactNode
  onRetry?: () => void
}) {
  if (loading) {
    return <>{loadingComponent || <LoadingSpinner text="Cargando datos..." />}</>
  }

  if (error) {
    return <ErrorState description={error} onRetry={onRetry} />
  }

  if (empty) {
    return <>{emptyState || <EmptyState icon={Inbox} title="Sin datos" description="No hay información disponible." />}</>
  }

  return <>{children}</>
}

const LoadingStates = {
  CardSkeleton,
  TableSkeleton,
  ChartSkeleton,
  MetricsSkeleton,
  ListSkeleton,
  EmptyState,
  LoadingSpinner,
  LoadingPage,
  ErrorState,
  DashboardSkeleton,
  DataWrapper,
  // Estados específicos
  NoGuestsEmpty,
  NoSearchResults,
  NoNotifications,
  NoAnalyticsData
}

export default LoadingStates
