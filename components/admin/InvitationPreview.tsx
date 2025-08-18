"use client"

import React, { useState, useEffect } from 'react'
import { 
  Eye, 
  Smartphone, 
  Monitor, 
  Tablet,
  MessageSquare,
  Mail,
  Phone,
  Download,
  Share2,
  QrCode,
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  Star,
  Camera,
  Music,
  Gift,
  X,
  ExternalLink,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGuestManagement } from '@/context/GuestManagementContext'
import { Guest, InvitationType } from '@/types/guest'

// Tipos para la vista previa
interface InvitationPreview {
  id: string
  name: string
  type: 'wedding' | 'birthday' | 'quinceañera' | 'baptism' | 'anniversary' | 'graduation'
  theme: 'elegant' | 'modern' | 'rustic' | 'minimalist' | 'colorful' | 'vintage'
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  layout: 'standard' | 'timeline' | 'card' | 'magazine' | 'minimal'
  components: string[]
}

interface EventDetails {
  eventName: string
  hostNames: string[]
  date: string
  time: string
  location: {
    name: string
    address: string
    mapUrl?: string
  }
  dressCode?: string
  rsvpDate?: string
  specialInstructions?: string
  contact: {
    phone: string
    email?: string
  }
}

// Templates de invitación predefinidos
const invitationTemplates: InvitationPreview[] = [
  {
    id: 'wedding-elegant',
    name: 'Boda Elegante',
    type: 'wedding',
    theme: 'elegant',
    colors: {
      primary: '#8B4513',
      secondary: '#F5F5DC',
      accent: '#DAA520',
      background: '#FFFFFF',
      text: '#2C2C2C'
    },
    layout: 'standard',
    components: ['header', 'names', 'date', 'location', 'rsvp', 'gallery', 'wishes']
  },
  {
    id: 'birthday-colorful',
    name: 'Cumpleaños Colorido',
    type: 'birthday',
    theme: 'colorful',
    colors: {
      primary: '#FF6B9D',
      secondary: '#4ECDC4',
      accent: '#FFE66D',
      background: '#F8F9FA',
      text: '#2C3E50'
    },
    layout: 'card',
    components: ['header', 'age', 'date', 'location', 'activities', 'rsvp', 'gifts']
  },
  {
    id: 'quince-modern',
    name: 'XV Años Moderno',
    type: 'quinceañera',
    theme: 'modern',
    colors: {
      primary: '#E91E63',
      secondary: '#9C27B0',
      accent: '#FF9800',
      background: '#FAFAFA',
      text: '#212121'
    },
    layout: 'timeline',
    components: ['header', 'princess', 'date', 'ceremony', 'party', 'gallery', 'rsvp']
  },
  {
    id: 'baptism-minimal',
    name: 'Bautizo Minimal',
    type: 'baptism',
    theme: 'minimalist',
    colors: {
      primary: '#3498DB',
      secondary: '#ECF0F1',
      accent: '#F39C12',
      background: '#FFFFFF',
      text: '#34495E'
    },
    layout: 'minimal',
    components: ['header', 'blessing', 'date', 'church', 'celebration', 'rsvp']
  }
]

// Datos de ejemplo para la vista previa
const sampleEventDetails: EventDetails = {
  eventName: "Nuestra Boda",
  hostNames: ["María González", "Carlos López"],
  date: "15 de Diciembre, 2024",
  time: "18:00 hrs",
  location: {
    name: "Jardín Las Rosas",
    address: "Av. Principal 123, Centro, Cuernavaca, Morelos",
    mapUrl: "https://maps.google.com/?q=Jardín+Las+Rosas+Cuernavaca"
  },
  dressCode: "Formal / Cocktail",
  rsvpDate: "30 de Noviembre, 2024",
  specialInstructions: "Por favor confirma tu asistencia. No se permiten niños menores de 12 años.",
  contact: {
    phone: "777-123-4567",
    email: "mariacarlos2024@email.com"
  }
}

// Componente de vista previa de dispositivo
function DevicePreview({ 
  device, 
  children, 
  isFullscreen = false 
}: { 
  device: 'mobile' | 'tablet' | 'desktop'
  children: React.ReactNode
  isFullscreen?: boolean
}) {
  const getDeviceClasses = () => {
    if (isFullscreen) return "w-full h-full"
    
    switch (device) {
      case 'mobile':
        return "w-80 h-[600px] border-8 border-gray-800 rounded-[2rem] bg-gray-800"
      case 'tablet':
        return "w-96 h-[500px] border-4 border-gray-600 rounded-lg bg-gray-600"
      case 'desktop':
        return "w-full max-w-4xl h-[500px] border-2 border-gray-400 rounded-lg bg-gray-100"
      default:
        return "w-80 h-[600px] border-8 border-gray-800 rounded-[2rem] bg-gray-800"
    }
  }

  const getScreenClasses = () => {
    if (isFullscreen) return "w-full h-full overflow-auto"
    
    switch (device) {
      case 'mobile':
        return "w-full h-full bg-white rounded-[1.5rem] overflow-auto"
      case 'tablet':
        return "w-full h-full bg-white rounded-md overflow-auto"
      case 'desktop':
        return "w-full h-full bg-white rounded-md overflow-auto"
      default:
        return "w-full h-full bg-white rounded-[1.5rem] overflow-auto"
    }
  }

  return (
    <div className={`mx-auto ${getDeviceClasses()}`}>
      <div className={getScreenClasses()}>
        {children}
      </div>
    </div>
  )
}

// Componente de invitación renderizada
function RenderedInvitation({ 
  template, 
  eventDetails,
  selectedGuest 
}: { 
  template: InvitationPreview
  eventDetails: EventDetails
  selectedGuest?: Guest 
}) {
  const guestName = selectedGuest?.name || "Estimado Invitado"
  const confirmationCode = selectedGuest?.invitationCode || "DEMO123"
  
  return (
    <div 
      className="min-h-full p-4 md:p-6"
      style={{ 
        backgroundColor: template.colors.background,
        color: template.colors.text 
      }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div 
          className="text-sm uppercase tracking-wide mb-2"
          style={{ color: template.colors.secondary }}
        >
          Te invitamos a
        </div>
        <h1 
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: template.colors.primary }}
        >
          {eventDetails.eventName}
        </h1>
        <div className="text-xl mb-4">
          {eventDetails.hostNames.join(" & ")}
        </div>
        <div 
          className="w-24 h-1 mx-auto rounded"
          style={{ backgroundColor: template.colors.accent }}
        />
      </div>

      {/* Nombre del invitado */}
      <div className="text-center mb-8">
        <div className="text-lg mb-2">Querido(a)</div>
        <div 
          className="text-2xl font-bold"
          style={{ color: template.colors.primary }}
        >
          {guestName}
        </div>
      </div>

      {/* Detalles del evento */}
      <div className="space-y-6 mb-8">
        {/* Fecha y hora */}
        <div className="flex items-center space-x-4 p-4 rounded-lg bg-opacity-50" style={{ backgroundColor: template.colors.secondary }}>
          <Calendar className="h-6 w-6" style={{ color: template.colors.primary }} />
          <div>
            <div className="font-semibold">{eventDetails.date}</div>
            <div className="text-sm opacity-75">{eventDetails.time}</div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="flex items-start space-x-4 p-4 rounded-lg bg-opacity-50" style={{ backgroundColor: template.colors.secondary }}>
          <MapPin className="h-6 w-6 mt-1" style={{ color: template.colors.primary }} />
          <div>
            <div className="font-semibold">{eventDetails.location.name}</div>
            <div className="text-sm opacity-75">{eventDetails.location.address}</div>
            {eventDetails.location.mapUrl && (
              <a 
                href={eventDetails.location.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm inline-flex items-center mt-1 hover:underline"
                style={{ color: template.colors.accent }}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Ver en mapa
              </a>
            )}
          </div>
        </div>

        {/* Dress Code */}
        {eventDetails.dressCode && (
          <div className="flex items-center space-x-4 p-4 rounded-lg bg-opacity-50" style={{ backgroundColor: template.colors.secondary }}>
            <Star className="h-6 w-6" style={{ color: template.colors.primary }} />
            <div>
              <div className="font-semibold">Código de vestimenta</div>
              <div className="text-sm opacity-75">{eventDetails.dressCode}</div>
            </div>
          </div>
        )}
      </div>

      {/* RSVP */}
      <div className="text-center mb-8">
        <div className="p-6 rounded-lg border-2 border-dashed" style={{ borderColor: template.colors.accent }}>
          <h3 className="text-xl font-bold mb-2">Confirma tu Asistencia</h3>
          {eventDetails.rsvpDate && (
            <p className="text-sm mb-4">Antes del {eventDetails.rsvpDate}</p>
          )}
          <Button 
            className="w-full mb-3"
            style={{ 
              backgroundColor: template.colors.primary,
              color: template.colors.background 
            }}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Confirmar por WhatsApp
          </Button>
          <div className="text-xs opacity-75">
            Código de confirmación: {confirmationCode}
          </div>
        </div>
      </div>

      {/* Instrucciones especiales */}
      {eventDetails.specialInstructions && (
        <div className="text-center mb-8 p-4 rounded-lg bg-opacity-30" style={{ backgroundColor: template.colors.accent }}>
          <div className="text-sm">{eventDetails.specialInstructions}</div>
        </div>
      )}

      {/* Contacto */}
      <div className="text-center">
        <div className="text-sm opacity-75 mb-2">¿Tienes preguntas?</div>
        <div className="flex justify-center space-x-4">
          <a 
            href={`tel:${eventDetails.contact.phone}`}
            className="flex items-center text-sm hover:underline"
            style={{ color: template.colors.primary }}
          >
            <Phone className="h-3 w-3 mr-1" />
            {eventDetails.contact.phone}
          </a>
          {eventDetails.contact.email && (
            <a 
              href={`mailto:${eventDetails.contact.email}`}
              className="flex items-center text-sm hover:underline"
              style={{ color: template.colors.primary }}
            >
              <Mail className="h-3 w-3 mr-1" />
              Email
            </a>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-8 border-t opacity-50" style={{ borderColor: template.colors.secondary }}>
        <div className="text-xs">
          ¡Esperamos verte allí! ❤️
        </div>
      </div>
    </div>
  )
}

// Componente principal
export function InvitationPreview() {
  const { guests } = useGuestManagement()
  const [selectedTemplate, setSelectedTemplate] = useState<InvitationPreview>(invitationTemplates[0])
  const [selectedDevice, setSelectedDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')
  const [selectedGuest, setSelectedGuest] = useState<Guest | undefined>()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [eventDetails, setEventDetails] = useState<EventDetails>(sampleEventDetails)

  useEffect(() => {
    if (guests.length > 0 && !selectedGuest) {
      setSelectedGuest(guests[0])
    }
  }, [guests, selectedGuest])

  const handleTemplateChange = (templateId: string) => {
    const template = invitationTemplates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(template)
    }
  }

  const handleGuestChange = (guestId: string) => {
    if (guestId === "generic") {
      setSelectedGuest(undefined)
    } else {
      const guest = guests.find(g => g.id === guestId)
      setSelectedGuest(guest)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="h-5 w-5" />
          <span>Vista Previa de Invitación</span>
        </CardTitle>
        <CardDescription>
          Previsualiza cómo se verá tu invitación en diferentes dispositivos y para diferentes invitados
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Controles */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            {/* Selección de template */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Template</label>
              <Select value={selectedTemplate.id} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {invitationTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Selección de dispositivo */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Dispositivo</label>
              <div className="flex space-x-1">
                {[
                  { id: 'mobile', icon: Smartphone, label: 'Móvil' },
                  { id: 'tablet', icon: Tablet, label: 'Tablet' },
                  { id: 'desktop', icon: Monitor, label: 'Desktop' }
                ].map(device => (
                  <Button
                    key={device.id}
                    variant={selectedDevice === device.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDevice(device.id as typeof selectedDevice)}
                    className="flex-1"
                  >
                    <device.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Selección de invitado */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Invitado</label>
              <Select 
                value={selectedGuest?.id || "generic"} 
                onValueChange={handleGuestChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona invitado" />
                </SelectTrigger>
                <SelectContent>
                  {guests.map(guest => (
                    <SelectItem key={guest.id} value={guest.id}>
                      {guest.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="generic">Vista genérica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Controles adicionales */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Acciones</label>
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="flex-1"
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Información del template */}
          <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex-shrink-0">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: selectedTemplate.colors.primary }}
              >
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="font-medium">{selectedTemplate.name}</div>
              <div className="text-sm text-gray-600">
                Tema: {selectedTemplate.theme} • Tipo: {selectedTemplate.type}
              </div>
            </div>
            <div className="flex space-x-1">
              {Object.entries(selectedTemplate.colors).slice(0, 3).map(([key, color]) => (
                <div
                  key={key}
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                  title={key}
                />
              ))}
            </div>
          </div>

          {/* Vista previa */}
          <div className="border rounded-lg p-4 bg-gray-50">
            {isFullscreen ? (
              <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
                <DialogContent className="max-w-none w-[90vw] h-[90vh] p-0">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Vista Previa de Invitación - {selectedTemplate.name}</DialogTitle>
                    <DialogDescription>
                      Vista previa en pantalla completa de la invitación seleccionada
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5" />
                      <span className="font-medium">Vista Previa - {selectedTemplate.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFullscreen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <DevicePreview device={selectedDevice} isFullscreen={true}>
                    <RenderedInvitation 
                      template={selectedTemplate}
                      eventDetails={eventDetails}
                      selectedGuest={selectedGuest}
                    />
                  </DevicePreview>
                </DialogContent>
              </Dialog>
            ) : (
              <DevicePreview device={selectedDevice}>
                <RenderedInvitation 
                  template={selectedTemplate}
                  eventDetails={eventDetails}
                  selectedGuest={selectedGuest}
                />
              </DevicePreview>
            )}
          </div>

          {/* Estadísticas del template */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {guests.filter(g => g.invitationType === 'whatsapp').length}
              </div>
              <div className="text-sm text-green-800">WhatsApp</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {guests.filter(g => g.invitationType === 'email').length}
              </div>
              <div className="text-sm text-blue-800">Email</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {guests.filter(g => g.status === 'confirmed').length}
              </div>
              <div className="text-sm text-purple-800">Confirmados</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{guests.length}</div>
              <div className="text-sm text-gray-800">Total</div>
            </div>
          </div>
        </div>

        {/* Nota demo */}
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Camera className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-purple-900 mb-1">
                🎨 Vista Previa Interactiva
              </h3>
              <p className="text-sm text-purple-800">
                Esta vista previa muestra cómo se verá tu invitación personalizada para cada invitado. 
                Puedes cambiar entre diferentes templates, dispositivos y ver cómo se adapta el contenido. 
                Los enlaces de confirmación funcionarán en la invitación real.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InvitationPreview
