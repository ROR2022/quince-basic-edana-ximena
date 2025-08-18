"use client"

import React, { useState, useCallback } from 'react'
import { 
  UserPlus, 
  Users, 
  Mail, 
  Phone, 
  MessageSquare, 
  Send, 
  Upload, 
  Download, 
  Eye, 
  X,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { useGuestManagement } from '@/context/GuestManagementContext'
import { useToast } from './AnimationsAndFeedback'
import { CreateGuestData, InvitationType, BulkInviteOptions } from '@/types/guest'

interface InvitationSenderProps {
  onSuccess?: () => void
  onCancel?: () => void
  defaultOpen?: boolean
}

// Componente para agregar un solo invitado
function SingleGuestForm({ onAddGuest }: { 
  onAddGuest: (guest: CreateGuestData) => void 
}) {
  const [formData, setFormData] = useState<CreateGuestData>({
    name: '',
    phone: '',
    email: '',
    invitationType: 'whatsapp',
    notes: ''
  })

  const [errors, setErrors] = useState<Partial<CreateGuestData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateGuestData> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    } else if (!/^\d{3}-?\d{3}-?\d{4}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Formato de teléfono inválido (777-123-4567)'
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onAddGuest(formData)
      setFormData({
        name: '',
        phone: '',
        email: '',
        invitationType: 'whatsapp',
        notes: ''
      })
      setErrors({})
    }
  }

  const formatPhone = (phone: string) => {
    const numbers = phone.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Ej: María González López"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              phone: formatPhone(e.target.value) 
            }))}
            placeholder="777-123-4567"
            maxLength={12}
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email (opcional)</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="maria@ejemplo.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="invitationType">Tipo de invitación</Label>
          <Select 
            value={formData.invitationType} 
            onValueChange={(value: InvitationType) => 
              setFormData(prev => ({ ...prev, invitationType: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="whatsapp">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                  <span>WhatsApp</span>
                </div>
              </SelectItem>
              <SelectItem value="email">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span>Email</span>
                </div>
              </SelectItem>
              <SelectItem value="manual">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span>Manual/Personal</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notas (opcional)</Label>
        <Textarea
          id="notes"
          value={formData.notes || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Notas sobre el invitado..."
          rows={2}
        />
      </div>

      <Button type="submit" className="w-full">
        <UserPlus className="h-4 w-4 mr-2" />
        Agregar Invitado
      </Button>
    </form>
  )
}

// Componente para carga masiva
function BulkGuestForm({ onBulkAdd }: { 
  onBulkAdd: (guests: CreateGuestData[]) => void 
}) {
  const [guestList, setGuestList] = useState<CreateGuestData[]>([])
  const [textInput, setTextInput] = useState('')
  const [defaultType, setDefaultType] = useState<InvitationType>('whatsapp')

  const parseGuestList = () => {
    const lines = textInput.trim().split('\n').filter(line => line.trim())
    const guests: CreateGuestData[] = []

    lines.forEach(line => {
      // Formato esperado: "Nombre, Teléfono, Email (opcional)"
      const parts = line.split(',').map(part => part.trim())
      if (parts.length >= 2) {
        guests.push({
          name: parts[0],
          phone: parts[1],
          email: parts[2] || undefined,
          invitationType: defaultType,
          notes: 'Agregado mediante carga masiva'
        })
      }
    })

    setGuestList(guests)
  }

  const removeGuest = (index: number) => {
    setGuestList(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (guestList.length > 0) {
      onBulkAdd(guestList)
      setGuestList([])
      setTextInput('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="defaultType">Tipo de invitación por defecto</Label>
          <Select value={defaultType} onValueChange={(value: InvitationType) => setDefaultType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="textInput">Lista de invitados</Label>
          <Textarea
            id="textInput"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={`Formato: Nombre, Teléfono, Email (opcional)
Ejemplo:
María González, 777-123-4567, maria@email.com
Carlos López, 777-234-5678
Ana Rodríguez, 777-345-6789, ana@email.com`}
            rows={8}
            className="font-mono text-sm"
          />
        </div>

        <Button onClick={parseGuestList} variant="outline" className="w-full">
          <Eye className="h-4 w-4 mr-2" />
          Previsualizar Lista ({textInput.trim().split('\n').filter(line => line.trim()).length} líneas)
        </Button>
      </div>

      {guestList.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              Invitados a agregar ({guestList.length})
            </h3>
            <Button onClick={handleSubmit} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Todos
            </Button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {guestList.map((guest, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{guest.name}</div>
                  <div className="text-sm text-gray-600">
                    {guest.phone} {guest.email && `• ${guest.email}`}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{guest.invitationType}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeGuest(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Componente principal
export function InvitationSender({ 
  onSuccess, 
  onCancel, 
  defaultOpen = false 
}: InvitationSenderProps) {
  const { addGuest, bulkInvite, stats } = useGuestManagement()
  const { success, error, loading, removeToast } = useToast()
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('single')
  const [result, setResult] = useState<{
    success: number
    failed: number
    message: string
  } | null>(null)

  const handleSingleAdd = useCallback(async (guestData: CreateGuestData) => {
    const loadingToast = loading('Agregando invitado...', 'Por favor espera')
    setIsLoading(true)
    
    try {
      await addGuest(guestData)
      setResult({
        success: 1,
        failed: 0,
        message: `Invitado "${guestData.name}" agregado exitosamente`
      })
      success(
        '¡Invitado agregado!', 
        `${guestData.name} ha sido agregado exitosamente`
      )
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al agregar invitado'
      setResult({
        success: 0,
        failed: 1,
        message: errorMessage
      })
      error('Error al agregar invitado', errorMessage)
    } finally {
      setIsLoading(false)
      // Remove loading toast
      if (loadingToast) {
        removeToast(loadingToast)
      }
    }
  }, [addGuest, success, error, loading, removeToast])

  const handleBulkAdd = useCallback(async (guests: CreateGuestData[]) => {
    const loadingToast = loading(`Agregando ${guests.length} invitados...`, 'Procesando carga masiva')
    setIsLoading(true)
    
    try {
      const options: BulkInviteOptions = {
        guests,
        defaultInvitationType: 'whatsapp',
        sendImmediately: false
      }
      
      const result = await bulkInvite(options)
      setResult({
        success: result.successCount,
        failed: result.failedCount,
        message: `${result.successCount} invitados agregados, ${result.failedCount} fallaron`
      })
      
      if (result.failedCount === 0) {
        success(
          '¡Carga masiva exitosa!', 
          `Se agregaron ${result.successCount} invitados correctamente`
        )
      } else {
        error(
          'Carga masiva parcial',
          `${result.successCount} exitosos, ${result.failedCount} fallaron`
        )
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error en carga masiva'
      setResult({
        success: 0,
        failed: guests.length,
        message: errorMessage
      })
      error('Error en carga masiva', errorMessage)
    } finally {
      setIsLoading(false)
      // Remove loading toast
      if (loadingToast) {
        removeToast(loadingToast)
      }
    }
  }, [bulkInvite, success, error, loading, removeToast])

  const handleClose = () => {
    setIsOpen(false)
    setResult(null)
    onCancel?.()
  }

  const handleComplete = () => {
    setIsOpen(false)
    setResult(null)
    onSuccess?.()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Agregar Invitados
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Gestión de Invitados</span>
          </DialogTitle>
          <DialogDescription>
            Agrega invitados individualmente o en lote. Los invitados se añadirán a tu lista 
            y podrás enviar las invitaciones posteriormente.
          </DialogDescription>
        </DialogHeader>

        {/* Estadísticas actuales */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Invitados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            <div className="text-sm text-gray-600">Confirmados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Sin Invitar</div>
          </div>
        </div>

        {/* Resultado de la operación */}
        {result && (
          <div className={`p-4 rounded-lg border ${
            result.success > 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center space-x-2">
              {result.success > 0 ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <span className={`font-medium ${
                result.success > 0 ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.message}
              </span>
            </div>
            {result.success > 0 && (
              <div className="mt-2 flex space-x-2">
                <Button size="sm" onClick={handleComplete}>
                  Continuar
                </Button>
                <Button size="sm" variant="outline" onClick={() => setResult(null)}>
                  Agregar Más
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Formularios */}
        {!result && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">Individual</TabsTrigger>
              <TabsTrigger value="bulk">Carga Masiva</TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-4 mt-6">
              <SingleGuestForm onAddGuest={handleSingleAdd} />
            </TabsContent>

            <TabsContent value="bulk" className="space-y-4 mt-6">
              <BulkGuestForm onBulkAdd={handleBulkAdd} />
            </TabsContent>
          </Tabs>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Procesando invitados...</span>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
        </div>

        {/* Nota demo */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <UserPlus className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">
                💡 Demo de Gestión de Invitados
              </h3>
              <p className="text-sm text-blue-800">
                Puedes agregar invitados individualmente o mediante carga masiva. Los datos 
                se validan automáticamente y se integran con el sistema de gestión. 
                Las invitaciones se pueden enviar posteriormente desde la tabla principal.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InvitationSender
