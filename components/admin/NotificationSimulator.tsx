"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { 
  Bell, 
  MessageSquare, 
  Mail, 
  Phone, 
  Send, 
  Check, 
  X, 
  Clock, 
  Users, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Smartphone,
  Loader2,
  RefreshCw,
  Volume2,
  Settings
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useGuestManagement } from '@/context/GuestManagementContext'
import { Guest, InvitationType } from '@/types/guest'

// Tipos para las notificaciones
interface NotificationAttempt {
  id: string
  guestId: string
  guestName: string
  type: InvitationType
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'
  timestamp: Date
  message: string
  error?: string
}

interface NotificationBatch {
  id: string
  name: string
  guests: Guest[]
  attempts: NotificationAttempt[]
  startTime: Date
  endTime?: Date
  status: 'preparing' | 'sending' | 'completed' | 'failed'
  progress: number
}

interface NotificationTemplate {
  id: string
  name: string
  type: InvitationType
  subject?: string
  message: string
  variables: string[]
}

// Templates predefinidos
const notificationTemplates: NotificationTemplate[] = [
  {
    id: 'whatsapp-invitation',
    name: 'Invitación WhatsApp',
    type: 'whatsapp',
    message: `¡Hola {{name}}! 🎉

Te invitamos cordialmente a nuestro evento especial:

📅 *Fecha:* {{date}}
🕐 *Hora:* {{time}}
📍 *Lugar:* {{location}}

Por favor confirma tu asistencia haciendo clic en el siguiente enlace:
{{confirmationLink}}

¡Esperamos verte allí!

*No respondas a este mensaje automático*`,
    variables: ['name', 'date', 'time', 'location', 'confirmationLink']
  },
  {
    id: 'email-invitation',
    name: 'Invitación Email',
    type: 'email',
    subject: 'Invitación Especial - {{eventName}}',
    message: `Estimado/a {{name}},

Es un placer invitarte a nuestro evento especial:

DETALLES DEL EVENTO:
• Fecha: {{date}}
• Hora: {{time}}
• Lugar: {{location}}
• Dress Code: {{dressCode}}

Para confirmar tu asistencia, por favor visita:
{{confirmationLink}}

Esperamos contar con tu presencia.

Saludos cordiales,
{{hostName}}`,
    variables: ['name', 'eventName', 'date', 'time', 'location', 'dressCode', 'confirmationLink', 'hostName']
  },
  {
    id: 'reminder-whatsapp',
    name: 'Recordatorio WhatsApp',
    type: 'whatsapp',
    message: `¡Hola {{name}}! 👋

Te recordamos que nuestro evento es mañana:

📅 *{{date}}* a las *{{time}}*
📍 *{{location}}*

{{#if confirmed}}
✅ Ya confirmaste tu asistencia
{{else}}
⏰ *Aún no has confirmado* - Hazlo aquí: {{confirmationLink}}
{{/if}}

¡Te esperamos! 🎊`,
    variables: ['name', 'date', 'time', 'location', 'confirmed', 'confirmationLink']
  }
]

// Simulador de progreso
const useNotificationProgress = (batch: NotificationBatch | null) => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    if (!batch || batch.status !== 'sending') return
    
    const interval = setInterval(() => {
      const completed = batch.attempts.filter(a => a.status !== 'sending').length
      const total = batch.attempts.length
      const newProgress = total > 0 ? (completed / total) * 100 : 0
      
      setProgress(newProgress)
      
      // Simular finalización
      if (newProgress >= 100) {
        clearInterval(interval)
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [batch])
  
  return progress
}

// Componente principal
export function NotificationSimulator() {
  const { guests, sendInvitation } = useGuestManagement()
  const [selectedGuests, setSelectedGuests] = useState<Guest[]>([])
  const [currentBatch, setCurrentBatch] = useState<NotificationBatch | null>(null)
  const [notificationHistory, setNotificationHistory] = useState<NotificationBatch[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate>(notificationTemplates[0])
  const [isSimulating, setIsSimulating] = useState(false)
  
  const progress = useNotificationProgress(currentBatch)
  
  // Simular envío de notificaciones
  const simulateNotificationSending = useCallback(async (guestList: Guest[], template: NotificationTemplate) => {
    const batchId = `batch_${Date.now()}`
    const attempts: NotificationAttempt[] = guestList.map(guest => ({
      id: `attempt_${guest.id}_${Date.now()}`,
      guestId: guest.id,
      guestName: guest.name,
      type: template.type,
      status: 'sending' as const,
      timestamp: new Date(),
      message: template.message.replace('{{name}}', guest.name)
    }))
    
    const batch: NotificationBatch = {
      id: batchId,
      name: `${template.name} - ${new Date().toLocaleString()}`,
      guests: guestList,
      attempts,
      startTime: new Date(),
      status: 'sending',
      progress: 0
    }
    
    setCurrentBatch(batch)
    setIsSimulating(true)
    
    // Simular progreso del envío
    for (let i = 0; i < attempts.length; i++) {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500))
      
      // Simular resultado aleatorio
      const success = Math.random() > 0.1 // 90% de éxito
      const statuses: NotificationAttempt['status'][] = success 
        ? ['sent', 'delivered', 'read'] 
        : ['failed']
      
      const finalStatus = success 
        ? statuses[Math.floor(Math.random() * statuses.length)]
        : 'failed'
      
      attempts[i] = {
        ...attempts[i],
        status: finalStatus,
        error: !success ? 'Error de red simulado' : undefined
      }
      
      // Actualizar batch
      const updatedBatch: NotificationBatch = {
        ...batch,
        attempts: [...attempts],
        progress: ((i + 1) / attempts.length) * 100
      }
      
      setCurrentBatch(updatedBatch)
      
      // Llamar a la función real del contexto
      if (success) {
        try {
          await sendInvitation(attempts[i].guestId)
        } catch (error) {
          console.log('Error simulado en sendInvitation:', error)
        }
      }
    }
    
    // Finalizar batch
    const completedBatch: NotificationBatch = {
      ...batch,
      attempts,
      endTime: new Date(),
      status: 'completed',
      progress: 100
    }
    
    setCurrentBatch(completedBatch)
    setNotificationHistory(prev => [completedBatch, ...prev])
    setIsSimulating(false)
    
    // Limpiar después de 3 segundos
    setTimeout(() => {
      setCurrentBatch(null)
    }, 3000)
  }, [sendInvitation])
  
  const handleSendNotifications = async () => {
    if (selectedGuests.length === 0) return
    
    await simulateNotificationSending(selectedGuests, selectedTemplate)
    setSelectedGuests([])
  }
  
  const handleSelectAllPending = () => {
    const pendingGuests = guests.filter(g => g.status === 'pending')
    setSelectedGuests(pendingGuests)
  }
  
  const handleSelectAllInvited = () => {
    const invitedGuests = guests.filter(g => g.status === 'invited')
    setSelectedGuests(invitedGuests)
  }
  
  const toggleGuestSelection = (guest: Guest) => {
    setSelectedGuests(prev => {
      const isSelected = prev.some(g => g.id === guest.id)
      if (isSelected) {
        return prev.filter(g => g.id !== guest.id)
      } else {
        return [...prev, guest]
      }
    })
  }
  
  const getStatusIcon = (status: NotificationAttempt['status']) => {
    switch (status) {
      case 'sending':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case 'sent':
        return <Send className="h-4 w-4 text-blue-500" />
      case 'delivered':
        return <Check className="h-4 w-4 text-green-500" />
      case 'read':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }
  
  const getTypeIcon = (type: InvitationType) => {
    switch (type) {
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4 text-green-600" />
      case 'email':
        return <Mail className="h-4 w-4 text-blue-600" />
      case 'manual':
        return <Phone className="h-4 w-4 text-purple-600" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Simulador de Notificaciones</span>
        </CardTitle>
        <CardDescription>
          Simula el envío de invitaciones por WhatsApp, Email y otros medios
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="send" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="send">Enviar</TabsTrigger>
            <TabsTrigger value="progress">Progreso</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>
          
          {/* Tab: Enviar notificaciones */}
          <TabsContent value="send" className="space-y-6">
            {/* Selección de template */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">1. Selecciona el tipo de notificación</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {notificationTemplates.map(template => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all ${
                      selectedTemplate.id === template.id 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(template.type)}
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{template.type}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Selección de invitados */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">2. Selecciona los invitados</h3>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={handleSelectAllPending}>
                    Todos sin invitar ({guests.filter(g => g.status === 'pending').length})
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleSelectAllInvited}>
                    Todos invitados ({guests.filter(g => g.status === 'invited').length})
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg max-h-60 overflow-y-auto">
                {guests.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No hay invitados en la lista</p>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {guests.map(guest => {
                      const isSelected = selectedGuests.some(g => g.id === guest.id)
                      return (
                        <div
                          key={guest.id}
                          className={`flex items-center justify-between p-3 border-b cursor-pointer hover:bg-gray-50 ${
                            isSelected ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => toggleGuestSelection(guest)}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="rounded"
                            />
                            <div>
                              <div className="font-medium">{guest.name}</div>
                              <div className="text-sm text-gray-500">
                                {guest.phone} • {getTypeIcon(guest.invitationType)}
                              </div>
                            </div>
                          </div>
                          <Badge variant={
                            guest.status === 'confirmed' ? 'default' :
                            guest.status === 'declined' ? 'destructive' :
                            guest.status === 'invited' ? 'secondary' : 'outline'
                          }>
                            {guest.status}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              
              {selectedGuests.length > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-900">
                    {selectedGuests.length} invitado(s) seleccionado(s)
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    {selectedTemplate.name} • {selectedTemplate.type}
                  </div>
                </div>
              )}
            </div>
            
            <Separator />
            
            {/* Botón de envío */}
            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleSendNotifications}
                disabled={selectedGuests.length === 0 || isSimulating}
                className="min-w-32"
              >
                {isSimulating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Notificaciones
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          {/* Tab: Progreso actual */}
          <TabsContent value="progress" className="space-y-4">
            {currentBatch ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">{currentBatch.name}</h3>
                  <Badge variant={
                    currentBatch.status === 'completed' ? 'default' :
                    currentBatch.status === 'sending' ? 'secondary' : 'outline'
                  }>
                    {currentBatch.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {currentBatch.attempts.map(attempt => (
                    <div key={attempt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(attempt.status)}
                        <div>
                          <div className="font-medium">{attempt.guestName}</div>
                          <div className="text-sm text-gray-500">
                            {getTypeIcon(attempt.type)} {attempt.type}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium capitalize">{attempt.status}</div>
                        {attempt.error && (
                          <div className="text-xs text-red-600">{attempt.error}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No hay envíos en progreso</p>
              </div>
            )}
          </TabsContent>
          
          {/* Tab: Historial */}
          <TabsContent value="history" className="space-y-4">
            {notificationHistory.length > 0 ? (
              <div className="space-y-4">
                {notificationHistory.map(batch => {
                  const successCount = batch.attempts.filter(a => ['sent', 'delivered', 'read'].includes(a.status)).length
                  const failedCount = batch.attempts.filter(a => a.status === 'failed').length
                  
                  return (
                    <Card key={batch.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-medium">{batch.name}</div>
                            <div className="text-sm text-gray-500">
                              {batch.startTime.toLocaleString()}
                            </div>
                          </div>
                          <Badge variant={batch.status === 'completed' ? 'default' : 'secondary'}>
                            {batch.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-600">{batch.attempts.length}</div>
                            <div className="text-sm text-gray-500">Total</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600">{successCount}</div>
                            <div className="text-sm text-gray-500">Exitosos</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-red-600">{failedCount}</div>
                            <div className="text-sm text-gray-500">Fallidos</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <RefreshCw className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No hay historial de envíos</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Nota demo */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <Volume2 className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-yellow-900 mb-1">
                🚀 Simulador de Notificaciones
              </h3>
              <p className="text-sm text-yellow-800">
                Este es un simulador que demuestra cómo funcionaría el envío real de invitaciones. 
                Los &quot;envíos&quot; son simulados pero actualizan el estado de los invitados en tiempo real. 
                En producción, aquí se integrarían las APIs de WhatsApp Business, servicios de email 
                y otros canales de comunicación.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default NotificationSimulator
