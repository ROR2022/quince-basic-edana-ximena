"use client"

import React, { useState, useMemo } from 'react'
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock, 
  Target,
  Download,
  Filter,
  RefreshCw,
  PieChart,
  BarChart3,
  LineChart,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  MessageSquare,
  Smartphone,
  Eye,
  MousePointer
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  Area,
  AreaChart,
  Legend
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { useGuestManagement } from '@/context/GuestManagementContext'
import { useToast } from './AnimationsAndFeedback'
import { Guest } from '@/types/guest'

// Colores para los gráficos
const COLORS = {
  confirmed: '#10B981', // green-600
  pending: '#F59E0B',   // yellow-600
  declined: '#EF4444',  // red-600
  primary: '#3B82F6',   // blue-600
  secondary: '#6B7280', // gray-500
  accent: '#8B5CF6'     // purple-600
}

const CHART_COLORS = [COLORS.primary, COLORS.confirmed, COLORS.pending, COLORS.declined, COLORS.accent, COLORS.secondary]

// Generar datos de muestra para los gráficos
const generateTimeSeriesData = (days: number = 30) => {
  const data = []
  const today = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    
    // Simular más actividad en días laborables
    const baseActivity = isWeekend ? 2 : 8
    const variance = Math.random() * 5
    
    data.push({
      date: date.toISOString().split('T')[0],
      dateFormatted: date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
      invitations: Math.floor(baseActivity + variance),
      confirmations: Math.floor((baseActivity + variance) * 0.7),
      views: Math.floor((baseActivity + variance) * 2.5),
      clicks: Math.floor((baseActivity + variance) * 1.8)
    })
  }
  
  return data
}

const generateChannelData = (guests: Guest[]) => {
  const channels = {
    whatsapp: guests.filter(g => g.invitationType === 'whatsapp').length,
    email: guests.filter(g => g.invitationType === 'email').length,
    manual: guests.filter(g => g.invitationType === 'manual').length
  }
  
  return [
    { name: 'WhatsApp', value: channels.whatsapp, color: COLORS.confirmed },
    { name: 'Email', value: channels.email, color: COLORS.primary },
    { name: 'Manual', value: channels.manual, color: COLORS.pending }
  ]
}

const generateResponseData = (stats: { confirmed: number; pending: number; declined: number }) => {
  return [
    { name: 'Confirmados', value: stats.confirmed, color: COLORS.confirmed },
    { name: 'Pendientes', value: stats.pending, color: COLORS.pending },
    { name: 'Declinados', value: stats.declined, color: COLORS.declined }
  ]
}

// Componente de métrica individual
function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = 'blue',
  subtitle 
}: {
  title: string
  value: string | number
  change?: number
  icon: React.ComponentType<{ className?: string }>
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
  subtitle?: string
}) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    red: 'text-red-600 bg-red-100',
    purple: 'text-purple-600 bg-purple-100'
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold">{value}</p>
              {change !== undefined && (
                <span className={`text-sm font-medium ${
                  change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change >= 0 ? '+' : ''}{change}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente de gráfico personalizado
function CustomTooltip({ active, payload, label }: { 
  active?: boolean; 
  payload?: Array<{ value: number; name: string; color: string }>; 
  label?: string 
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Componente principal de Analytics
export function AdvancedAnalytics() {
  const { guests, stats } = useGuestManagement()
  const { success } = useToast()
  const [timeRange, setTimeRange] = useState('30')
  const [activeTab, setActiveTab] = useState('overview')
  
  const timeSeriesData = useMemo(() => generateTimeSeriesData(parseInt(timeRange)), [timeRange])
  const channelData = useMemo(() => generateChannelData(guests), [guests])
  const responseData = useMemo(() => generateResponseData(stats), [stats])

  const handleExportReport = () => {
    // Simular exportación de reporte
    const reportData = {
      date: new Date().toISOString(),
      stats,
      timeRange,
      guests: guests.length
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    success('Reporte exportado', 'El archivo se ha descargado correctamente')
  }

  const responseRate = stats.total > 0 ? ((stats.confirmed + stats.declined) / stats.total * 100) : 0
  const confirmationRate = stats.total > 0 ? (stats.confirmed / stats.total * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Avanzadas</h2>
          <p className="text-muted-foreground">
            Métricas detalladas y análisis de rendimiento de invitaciones
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 días</SelectItem>
              <SelectItem value="30">Últimos 30 días</SelectItem>
              <SelectItem value="90">Últimos 90 días</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Invitados"
          value={stats.total}
          change={12}
          icon={Users}
          color="blue"
          subtitle="vs período anterior"
        />
        <MetricCard
          title="Tasa de Respuesta"
          value={`${responseRate.toFixed(1)}%`}
          change={5.2}
          icon={Target}
          color="green"
          subtitle={`${stats.confirmed + stats.declined} de ${stats.total}`}
        />
        <MetricCard
          title="Confirmaciones"
          value={`${confirmationRate.toFixed(1)}%`}
          change={-2.1}
          icon={CheckCircle}
          color="purple"
          subtitle={`${stats.confirmed} confirmados`}
        />
        <MetricCard
          title="Pendientes"
          value={stats.pending}
          change={0}
          icon={Clock}
          color="yellow"
          subtitle="Sin respuesta"
        />
      </div>

      {/* Tabs para diferentes vistas */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
          <TabsTrigger value="channels">Canales</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        {/* Tab de Resumen */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de respuestas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Estado de Respuestas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="value"
                      data={responseData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, value }: { name: string, value: number }) => `${name}: ${value}`}
                    >
                      {responseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Progreso por canales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Distribución por Canal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {channelData.map((channel) => (
                  <div key={channel.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {channel.name === 'WhatsApp' && <MessageSquare className="h-4 w-4 text-green-600" />}
                        {channel.name === 'Email' && <Mail className="h-4 w-4 text-blue-600" />}
                        {channel.name === 'Manual' && <MousePointer className="h-4 w-4 text-yellow-600" />}
                        <span className="text-sm font-medium">{channel.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{channel.value}</span>
                    </div>
                    <Progress 
                      value={stats.total > 0 ? (channel.value / stats.total) * 100 : 0} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab de Tendencias */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Tendencias Temporales</span>
              </CardTitle>
              <CardDescription>
                Actividad de invitaciones y confirmaciones en el tiempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dateFormatted" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="invitations"
                    stackId="1"
                    stroke={COLORS.primary}
                    fill={COLORS.primary}
                    name="Invitaciones"
                  />
                  <Area
                    type="monotone"
                    dataKey="confirmations"
                    stackId="1"
                    stroke={COLORS.confirmed}
                    fill={COLORS.confirmed}
                    name="Confirmaciones"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Canales */}
        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Canal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={channelData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={COLORS.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas por Canal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {channelData.map((channel) => {
                  const totalChannelGuests = channel.value
                  const confirmedInChannel = guests.filter(g => 
                    g.invitationType === channel.name.toLowerCase() && g.status === 'confirmed'
                  ).length
                  const rate = totalChannelGuests > 0 ? (confirmedInChannel / totalChannelGuests * 100) : 0

                  return (
                    <div key={channel.name} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{channel.name}</h4>
                        <Badge variant="outline">{rate.toFixed(1)}% confirmación</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>Total: {totalChannelGuests}</div>
                        <div>Confirmados: {confirmedInChannel}</div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab de Engagement */}
        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Métricas de Engagement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dateFormatted" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    name="Visualizaciones"
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke={COLORS.confirmed}
                    strokeWidth={2}
                    name="Clics"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="CTR Promedio"
              value="12.4%"
              change={3.2}
              icon={MousePointer}
              color="blue"
              subtitle="Click-through rate"
            />
            <MetricCard
              title="Tiempo Promedio"
              value="2.3min"
              change={-5.1}
              icon={Clock}
              color="purple"
              subtitle="Tiempo en página"
            />
            <MetricCard
              title="Rebote"
              value="18.7%"
              change={-8.3}
              icon={Activity}
              color="green"
              subtitle="Tasa de rebote"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdvancedAnalytics
