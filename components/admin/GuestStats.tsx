"use client"

import React from 'react'
import { Users, UserCheck, UserX, Clock, UserPlus, TrendingUp, Calendar, Phone } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useGuestManagement } from '@/context/GuestManagementContext'

interface StatCardProps {
  title: string
  value: number | string
  description?: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'default' | 'success' | 'warning' | 'error' | 'info'
}

function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  color = 'default' 
}: StatCardProps) {
  const colorClasses = {
    default: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-purple-500 text-white'
  }

  const bgColorClasses = {
    default: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-purple-50 border-purple-200'
  }

  return (
    <Card className={`${bgColorClasses[color]} transition-all duration-300 hover:shadow-lg`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">
          {title}
        </CardTitle>
        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {value}
        </div>
        {description && (
          <p className="text-xs text-gray-600 mb-2">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center space-x-1">
            <TrendingUp 
              className={`h-3 w-3 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}
            />
            <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-xs text-gray-500">vs mes anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface ProgressBarProps {
  label: string
  current: number
  total: number
  color?: string
}

function ProgressBar({ label, current, total, color = 'bg-blue-500' }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-gray-600">
          {current}/{total} ({percentage.toFixed(1)}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}

interface QuickActionProps {
  icon: React.ReactNode
  label: string
  value: number
  onClick?: () => void
  color?: string
}

function QuickAction({ icon, label, value, onClick, color = 'text-gray-600' }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 w-full text-left"
    >
      <div className={`${color}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{value} invitados</p>
      </div>
    </button>
  )
}

export function GuestStats() {
  const { stats, guests, getStatsByStatus } = useGuestManagement()
  const statusStats = getStatsByStatus()

  // Calcular algunas métricas adicionales
  const guestsWithCompanions = guests.filter(g => g.companions.length > 0).length
  const averageCompanions = stats.confirmed > 0 
    ? guests
        .filter(g => g.status === 'confirmed')
        .reduce((sum, g) => sum + g.companions.length, 0) / stats.confirmed
    : 0

  const recentConfirmations = guests.filter(g => {
    if (!g.dateResponded || g.status !== 'confirmed') return false
    const daysSince = (Date.now() - g.dateResponded.getTime()) / (1000 * 60 * 60 * 24)
    return daysSince <= 7
  }).length

  const pendingFollowUp = guests.filter(g => {
    if (g.status !== 'invited') return false
    const daysSince = (Date.now() - g.dateInvited.getTime()) / (1000 * 60 * 60 * 24)
    return daysSince >= 3
  }).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Estadísticas de Invitados
          </h2>
          <p className="text-gray-600 mt-1">
            Resumen general de confirmaciones y respuestas
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Actualizado en tiempo real
        </Badge>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Invitados"
          value={stats.total}
          description="Personas en la lista"
          icon={<Users className="h-4 w-4" />}
          color="info"
        />
        
        <StatCard
          title="Confirmados"
          value={stats.confirmed}
          description={`${stats.totalConfirmedPeople} personas totales`}
          icon={<UserCheck className="h-4 w-4" />}
          color="success"
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatCard
          title="Declinaron"
          value={stats.declined}
          description={`${stats.confirmationRate.toFixed(1)}% de confirmación`}
          icon={<UserX className="h-4 w-4" />}
          color="error"
        />
        
        <StatCard
          title="Pendientes"
          value={stats.pending + stats.notInvited}
          description={`${stats.responseRate.toFixed(1)}% han respondido`}
          icon={<Clock className="h-4 w-4" />}
          color="warning"
        />
      </div>

      {/* Desglose detallado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progreso de confirmaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span>Progreso de Confirmaciones</span>
            </CardTitle>
            <CardDescription>
              Estado actual de las respuestas de invitados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProgressBar
              label="Confirmados"
              current={stats.confirmed}
              total={stats.total}
              color="bg-green-500"
            />
            <ProgressBar
              label="Respuestas totales"
              current={stats.confirmed + stats.declined}
              total={stats.total}
              color="bg-blue-500"
            />
            <ProgressBar
              label="Invitaciones enviadas"
              current={stats.total - stats.notInvited}
              total={stats.total}
              color="bg-purple-500"
            />
          </CardContent>
        </Card>

        {/* Métricas adicionales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <span>Métricas Detalladas</span>
            </CardTitle>
            <CardDescription>
              Información adicional sobre los invitados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {guestsWithCompanions}
                </div>
                <div className="text-xs text-blue-800">
                  Con acompañantes
                </div>
              </div>
              
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {averageCompanions.toFixed(1)}
                </div>
                <div className="text-xs text-green-800">
                  Acompañantes promedio
                </div>
              </div>
              
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {recentConfirmations}
                </div>
                <div className="text-xs text-yellow-800">
                  Confirmaciones esta semana
                </div>
              </div>
              
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {pendingFollowUp}
                </div>
                <div className="text-xs text-red-800">
                  Necesitan seguimiento
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-green-500" />
            <span>Acciones Rápidas</span>
          </CardTitle>
          <CardDescription>
            Accesos directos a tareas comunes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickAction
              icon={<Clock className="h-5 w-5" />}
              label="Pendientes de respuesta"
              value={statusStats.invited}
              color="text-yellow-600"
            />
            
            <QuickAction
              icon={<UserPlus className="h-5 w-5" />}
              label="Sin invitar"
              value={statusStats.pending}
              color="text-blue-600"
            />
            
            <QuickAction
              icon={<UserCheck className="h-5 w-5" />}
              label="Confirmados"
              value={statusStats.confirmed}
              color="text-green-600"
            />
            
            <QuickAction
              icon={<Calendar className="h-5 w-5" />}
              label="Necesitan seguimiento"
              value={pendingFollowUp}
              color="text-red-600"
            />
          </div>
        </CardContent>
      </Card>

      {/* Nota demo */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">
              💡 Demo de Estadísticas
            </h3>
            <p className="text-sm text-blue-800">
              Estas estadísticas se actualizan automáticamente cuando los invitados confirman 
              su asistencia. En la versión real, también incluirían métricas de engagement 
              y análisis de patrones de respuesta.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuestStats
