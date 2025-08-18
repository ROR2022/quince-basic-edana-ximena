"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { 
  Clock, 
  Bell, 
  Calendar, 
  Send, 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  Settings,
  Users,
  CheckCircle,
  AlertCircle,
  Mail,
  MessageSquare,
  Smartphone,
  Timer,
  Repeat,
  Target
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { useGuestManagement } from '@/context/GuestManagementContext'
import { useToast } from '../admin/AnimationsAndFeedback'

// Tipos para el sistema de recordatorios
interface Reminder {
  id: string
  name: string
  description: string
  type: 'event_reminder' | 'rsvp_deadline' | 'custom'
  triggerType: 'days_before' | 'specific_date' | 'after_invitation'
  triggerValue: number | Date
  channels: ('whatsapp' | 'email' | 'sms')[]
  template: string
  isActive: boolean
  targetAudience: 'all' | 'pending' | 'confirmed' | 'declined' | 'custom'
  customFilters?: {
    invitationType?: string[]
    status?: string[]
    tags?: string[]
  }
  lastRun?: Date
  nextRun?: Date
  totalSent: number
  successCount: number
  failureCount: number
  createdAt: Date
  updatedAt: Date
}

interface ReminderExecution {
  id: string
  reminderId: string
  executedAt: Date
  targetCount: number
  sentCount: number
  failedCount: number
  channel: string
  status: 'completed' | 'failed' | 'partial'
  details: string
}

// Templates predefinidos
const REMINDER_TEMPLATES = {
  event_reminder: {
    whatsapp: `🎉 ¡Hola {nombre}! Te recordamos que nuestro evento "{evento}" será el {fecha} a las {hora}. ¡No faltes! 💫`,
    email: `Estimado/a {nombre},\n\nTe recordamos que nuestro evento "{evento}" se realizará el {fecha} a las {hora}.\n\nEsperamos contar con tu presencia.\n\n¡Saludos!`,
    sms: `Hola {nombre}! Recordatorio: {evento} el {fecha} a las {hora}. ¡Te esperamos!`
  },
  rsvp_deadline: {
    whatsapp: `⏰ ¡Hola {nombre}! Aún no hemos recibido tu confirmación para "{evento}". Por favor confirma antes del {deadline}. ¡Gracias! 💕`,
    email: `Estimado/a {nombre},\n\nAún no hemos recibido tu confirmación para el evento "{evento}".\n\nPor favor confirma tu asistencia antes del {deadline}.\n\nGracias.`,
    sms: `Hola {nombre}! Confirma tu asistencia a {evento} antes del {deadline}. Gracias!`
  },
  custom: {
    whatsapp: `¡Hola {nombre}! {mensaje_personalizado}`,
    email: `Estimado/a {nombre},\n\n{mensaje_personalizado}\n\nSaludos.`,
    sms: `Hola {nombre}! {mensaje_personalizado}`
  }
}

// Hook para manejar recordatorios
const useReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [executions, setExecutions] = useState<ReminderExecution[]>([])
  const { guests } = useGuestManagement()
  const { success, error } = useToast()

  // Cargar datos del localStorage
  useEffect(() => {
    const savedReminders = localStorage.getItem('reminders')
    const savedExecutions = localStorage.getItem('reminder-executions')
    
    if (savedReminders) {
      try {
        const parsedReminders = JSON.parse(savedReminders).map((r: Record<string, unknown>) => ({
          ...r,
          createdAt: new Date(r.createdAt as string),
          updatedAt: new Date(r.updatedAt as string),
          lastRun: r.lastRun ? new Date(r.lastRun as string) : undefined,
          nextRun: r.nextRun ? new Date(r.nextRun as string) : undefined,
          triggerValue: r.triggerType === 'specific_date' ? new Date(r.triggerValue as string) : r.triggerValue
        }))
        setReminders(parsedReminders)
      } catch (err) {
        console.error('Error loading reminders:', err)
      }
    }

    if (savedExecutions) {
      try {
        const parsedExecutions = JSON.parse(savedExecutions).map((e: Record<string, unknown>) => ({
          ...e,
          executedAt: new Date(e.executedAt as string)
        }))
        setExecutions(parsedExecutions)
      } catch (err) {
        console.error('Error loading executions:', err)
      }
    }
  }, [])

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders))
  }, [reminders])

  useEffect(() => {
    localStorage.setItem('reminder-executions', JSON.stringify(executions))
  }, [executions])

  const createReminder = useCallback((reminderData: Omit<Reminder, 'id' | 'createdAt' | 'updatedAt' | 'totalSent' | 'successCount' | 'failureCount'>) => {
    const newReminder: Reminder = {
      ...reminderData,
      id: `reminder-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      totalSent: 0,
      successCount: 0,
      failureCount: 0
    }

    setReminders(prev => [...prev, newReminder])
    success('Recordatorio creado', `"${newReminder.name}" ha sido configurado`)
    return newReminder.id
  }, [success])

  const updateReminder = useCallback((id: string, updates: Partial<Reminder>) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, ...updates, updatedAt: new Date() }
        : reminder
    ))
    success('Recordatorio actualizado', 'Los cambios han sido guardados')
  }, [success])

  const deleteReminder = useCallback((id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id))
    success('Recordatorio eliminado', 'El recordatorio ha sido removido')
  }, [success])

  const executeReminder = useCallback(async (reminderId: string) => {
    const reminder = reminders.find(r => r.id === reminderId)
    if (!reminder || !reminder.isActive) {
      error('Error', 'Recordatorio no encontrado o inactivo')
      return
    }

    // Filtrar destinatarios según la audiencia objetivo
    let targetGuests = guests
    
    switch (reminder.targetAudience) {
      case 'pending':
        targetGuests = guests.filter(g => g.status === 'pending')
        break
      case 'confirmed':
        targetGuests = guests.filter(g => g.status === 'confirmed')
        break
      case 'declined':
        targetGuests = guests.filter(g => g.status === 'declined')
        break
      case 'custom':
        if (reminder.customFilters) {
          targetGuests = guests.filter(g => {
            const filters = reminder.customFilters!
            if (filters.status && !filters.status.includes(g.status)) return false
            if (filters.invitationType && !filters.invitationType.includes(g.invitationType)) return false
            return true
          })
        }
        break
    }

    // Simular envío por cada canal
    for (const channel of reminder.channels) {
      const execution: ReminderExecution = {
        id: `exec-${Date.now()}-${channel}`,
        reminderId,
        executedAt: new Date(),
        targetCount: targetGuests.length,
        sentCount: Math.floor(targetGuests.length * 0.95), // 95% éxito simulado
        failedCount: Math.ceil(targetGuests.length * 0.05),
        channel,
        status: 'completed',
        details: `Enviado a ${targetGuests.length} invitados vía ${channel}`
      }

      setExecutions(prev => [...prev, execution])

      // Actualizar estadísticas del recordatorio
      setReminders(prev => prev.map(r => 
        r.id === reminderId 
          ? {
              ...r,
              lastRun: new Date(),
              totalSent: r.totalSent + execution.sentCount,
              successCount: r.successCount + execution.sentCount,
              failureCount: r.failureCount + execution.failedCount
            }
          : r
      ))
    }

    success(
      'Recordatorio enviado', 
      `Enviado a ${targetGuests.length} invitados por ${reminder.channels.length} canal(es)`
    )
  }, [reminders, guests, success, error])

  const getUpcomingReminders = useCallback(() => {
    return reminders.filter(r => r.isActive && r.nextRun && r.nextRun > new Date())
      .sort((a, b) => (a.nextRun!.getTime() - b.nextRun!.getTime()))
  }, [reminders])

  return {
    reminders,
    executions,
    createReminder,
    updateReminder,
    deleteReminder,
    executeReminder,
    getUpcomingReminders,
    stats: {
      total: reminders.length,
      active: reminders.filter(r => r.isActive).length,
      totalSent: reminders.reduce((sum, r) => sum + r.totalSent, 0),
      successRate: reminders.reduce((sum, r) => sum + r.totalSent, 0) > 0 
        ? (reminders.reduce((sum, r) => sum + r.successCount, 0) / reminders.reduce((sum, r) => sum + r.totalSent, 0)) * 100
        : 0
    }
  }
}

// Componente para crear/editar recordatorio
function ReminderForm({ 
  reminder, 
  onSave, 
  onCancel 
}: { 
  reminder?: Reminder
  onSave: (data: Partial<Reminder>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: reminder?.name || '',
    description: reminder?.description || '',
    type: reminder?.type || 'event_reminder',
    triggerType: reminder?.triggerType || 'days_before',
    triggerValue: reminder?.triggerValue || 7,
    channels: reminder?.channels || ['whatsapp'],
    template: reminder?.template || '',
    isActive: reminder?.isActive ?? true,
    targetAudience: reminder?.targetAudience || 'pending'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre del Recordatorio</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Ej: Recordatorio 24h antes"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select value={formData.type} onValueChange={(value: 'event_reminder' | 'rsvp_deadline' | 'custom') => setFormData(prev => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="event_reminder">Recordatorio del Evento</SelectItem>
              <SelectItem value="rsvp_deadline">Deadline RSVP</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe cuándo y por qué se enviará este recordatorio"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Trigger</Label>
          <Select value={formData.triggerType} onValueChange={(value: 'days_before' | 'specific_date' | 'after_invitation') => setFormData(prev => ({ ...prev, triggerType: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="days_before">Días antes del evento</SelectItem>
              <SelectItem value="specific_date">Fecha específica</SelectItem>
              <SelectItem value="after_invitation">Días después de invitar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Valor</Label>
          {formData.triggerType === 'specific_date' ? (
            <Input
              type="datetime-local"
              value={formData.triggerValue instanceof Date ? formData.triggerValue.toISOString().slice(0, 16) : ''}
              onChange={(e) => setFormData(prev => ({ ...prev, triggerValue: new Date(e.target.value) }))}
            />
          ) : (
            <Input
              type="number"
              min="1"
              value={formData.triggerValue as number}
              onChange={(e) => setFormData(prev => ({ ...prev, triggerValue: parseInt(e.target.value) }))}
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Canales de Envío</Label>
        <div className="flex gap-4">
          {['whatsapp', 'email', 'sms'].map(channel => (
            <label key={channel} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.channels.includes(channel as 'whatsapp' | 'email' | 'sms')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData(prev => ({ ...prev, channels: [...prev.channels, channel as 'whatsapp' | 'email' | 'sms'] }))
                  } else {
                    setFormData(prev => ({ ...prev, channels: prev.channels.filter(c => c !== channel) }))
                  }
                }}
              />
              <span className="capitalize">{channel}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Audiencia Objetivo</Label>
        <Select value={formData.targetAudience} onValueChange={(value: 'all' | 'pending' | 'confirmed' | 'declined' | 'custom') => setFormData(prev => ({ ...prev, targetAudience: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los invitados</SelectItem>
            <SelectItem value="pending">Solo pendientes</SelectItem>
            <SelectItem value="confirmed">Solo confirmados</SelectItem>
            <SelectItem value="declined">Solo declinados</SelectItem>
            <SelectItem value="custom">Filtro personalizado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="template">Template del Mensaje</Label>
        <Textarea
          id="template"
          value={formData.template}
          onChange={(e) => setFormData(prev => ({ ...prev, template: e.target.value }))}
          placeholder="Usa variables como {nombre}, {evento}, {fecha}, {hora}"
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          Variables disponibles: {'{nombre}, {evento}, {fecha}, {hora}, {deadline}'}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
        />
        <Label>Recordatorio activo</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {reminder ? 'Actualizar' : 'Crear'} Recordatorio
        </Button>
      </div>
    </form>
  )
}

// Componente principal
export function AutomatedReminders() {
  const { 
    reminders, 
    executions, 
    createReminder, 
    updateReminder, 
    deleteReminder, 
    executeReminder, 
    getUpcomingReminders,
    stats 
  } = useReminders()
  
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState('reminders')

  const upcomingReminders = getUpcomingReminders()

  const handleSaveReminder = (data: Record<string, unknown>) => {
    if (selectedReminder) {
      updateReminder(selectedReminder.id, data)
    } else {
      createReminder(data as Omit<Reminder, "id" | "createdAt" | "updatedAt" | "totalSent" | "successCount" | "failureCount">)
    }
    setShowForm(false)
    setSelectedReminder(null)
  }

  const handleEditReminder = (reminder: Reminder) => {
    setSelectedReminder(reminder)
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recordatorios Automáticos</h2>
          <p className="text-muted-foreground">
            Configura recordatorios inteligentes para tus invitados
          </p>
        </div>
        
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Recordatorio
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Recordatorios</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Activos</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <Play className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mensajes Enviados</p>
                <p className="text-2xl font-bold">{stats.totalSent}</p>
              </div>
              <Send className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tasa de Éxito</p>
                <p className="text-2xl font-bold">{stats.successRate.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="reminders">Recordatorios</TabsTrigger>
          <TabsTrigger value="upcoming">Próximos</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="reminders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recordatorios Configurados</CardTitle>
            </CardHeader>
            <CardContent>
              {reminders.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold">No hay recordatorios</h3>
                  <p className="text-muted-foreground">Crea tu primer recordatorio automático</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Canales</TableHead>
                      <TableHead>Enviados</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reminders.map((reminder) => (
                      <TableRow key={reminder.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{reminder.name}</p>
                            <p className="text-sm text-muted-foreground">{reminder.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {reminder.type.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={reminder.isActive ? 'default' : 'secondary'}>
                            {reminder.isActive ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {reminder.channels.map(channel => (
                              <Badge key={channel} variant="outline" className="text-xs">
                                {channel}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{reminder.totalSent}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => executeReminder(reminder.id)}
                              disabled={!reminder.isActive}
                            >
                              <Send className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditReminder(reminder)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteReminder(reminder.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Recordatorios</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingReminders.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold">No hay recordatorios programados</h3>
                  <p className="text-muted-foreground">Los próximos recordatorios aparecerán aquí</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingReminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-blue-100">
                          <Timer className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{reminder.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {reminder.nextRun?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {reminder.targetAudience}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Ejecuciones</CardTitle>
            </CardHeader>
            <CardContent>
              {executions.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold">No hay ejecuciones</h3>
                  <p className="text-muted-foreground">El historial aparecerá cuando ejecutes recordatorios</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Recordatorio</TableHead>
                      <TableHead>Canal</TableHead>
                      <TableHead>Enviados</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {executions.slice(0, 20).map((execution) => {
                      const reminder = reminders.find(r => r.id === execution.reminderId)
                      return (
                        <TableRow key={execution.id}>
                          <TableCell>{execution.executedAt.toLocaleString()}</TableCell>
                          <TableCell>{reminder?.name || 'Recordatorio eliminado'}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{execution.channel}</Badge>
                          </TableCell>
                          <TableCell>{execution.sentCount}/{execution.targetCount}</TableCell>
                          <TableCell>
                            <Badge variant={execution.status === 'completed' ? 'default' : 'destructive'}>
                              {execution.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog para crear/editar recordatorio */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedReminder ? 'Editar' : 'Crear'} Recordatorio
            </DialogTitle>
            <DialogDescription>
              Configura un recordatorio automático para tus invitados
            </DialogDescription>
          </DialogHeader>
          
          <ReminderForm
            reminder={selectedReminder || undefined}
            onSave={handleSaveReminder}
            onCancel={() => {
              setShowForm(false)
              setSelectedReminder(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AutomatedReminders
