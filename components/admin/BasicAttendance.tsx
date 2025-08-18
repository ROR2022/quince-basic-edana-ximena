"use client"

import { useState, useEffect } from 'react'
import { Users, CheckCircle, XCircle, Search, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useGuestManagement } from '@/context/GuestManagementContext'
import { GuestStatus, Guest } from '@/types/guest'

// Datos demo para el formulario
const demoData = {
  attendance: {
    title: "Confirma tu Asistencia",
    message: "Tu presencia es muy importante para nosotros",
    subtitle: "Por favor completa el siguiente formulario",
    fields: {
      name: "Nombre completo",
      phone: "Teléfono",
      response: "¿Podrás asistir?",
      companions: "Acompañantes (nombres completos)",
      responseOptions: {
        yes: "Sí, asistiré",
        no: "No podré asistir"
      }
    }
  }
}

export function BasicAttendance() {
  const { guests: _guests, updateGuestStatus, findGuestByPhone } = useGuestManagement()
  const [formData, setFormData] = useState({
    name: '',
    response: '',
    companions: '',
    phone: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [foundGuest, setFoundGuest] = useState<Guest | null>(null)
  const [searchAttempted, setSearchAttempted] = useState(false)
  const [_isLoading, setIsLoading] = useState(false)

  // Función para formatear teléfono
  const formatPhone = (phone: string) => {
    const numbers = phone.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  // Buscar invitado cuando se ingrese el teléfono
  useEffect(() => {
    if (formData.phone.length >= 10) {
      const guest = findGuestByPhone(formData.phone)
      setFoundGuest(guest || null)
      if (guest) {
        setFormData(prev => ({
          ...prev,
          name: guest.name
        }))
      }
      setSearchAttempted(true)
    } else {
      setFoundGuest(null)
      setSearchAttempted(false)
    }
  }, [formData.phone, findGuestByPhone])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      let status: GuestStatus
      let companions = 0
      
      if (formData.response === 'yes') {
        status = 'confirmed'
        // Contar acompañantes (separados por comas)
        if (formData.companions.trim()) {
          companions = formData.companions.split(',').filter(c => c.trim()).length
        }
      } else {
        status = 'declined'
      }

      if (foundGuest) {
        // Actualizar invitado existente
        const companionsList = formData.companions.trim() 
          ? formData.companions.split(',').map(c => c.trim()).filter(c => c)
          : []
          
        await updateGuestStatus(foundGuest.id, status, {
          companions: companionsList,
          confirmedAt: new Date().toISOString(),
          notes: `${foundGuest.notes || ''}\nConfirmación web: ${formData.response === 'yes' ? 'Asistirá' : 'No asistirá'}${formData.companions ? ` con ${companions} acompañante(s): ${formData.companions}` : ''}`
        })
      } else {
        // En un caso real, aquí se podría crear un nuevo invitado
        console.log('Nuevo invitado sin registro previo:', formData)
      }
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error al procesar confirmación:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {demoData.attendance.title}
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            {demoData.attendance.message}
          </p>
          <p className="text-gray-600">
            {demoData.attendance.subtitle}
          </p>
        </div>

        {/* Formulario */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            {/* Teléfono - campo principal para buscar invitado */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {demoData.attendance.fields.phone}
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  placeholder="Ej: 777-123-4567"
                  maxLength={12}
                  required
                />
                {formData.phone.length >= 10 && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {foundGuest ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : searchAttempted ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <Search className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                )}
              </div>
              
              {/* Indicador de estado de búsqueda */}
              {formData.phone.length >= 10 && (
                <div className="mt-2">
                  {foundGuest ? (
                    <div className="flex items-center text-sm text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Invitado encontrado: {foundGuest.name}</span>
                      {foundGuest.status !== 'pending' && (
                        <Badge variant="outline" className="ml-2">
                          {foundGuest.status === 'confirmed' ? 'Ya confirmado' : foundGuest.status}
                        </Badge>
                      )}
                    </div>
                  ) : searchAttempted ? (
                    <div className="flex items-center text-sm text-yellow-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>Invitado no encontrado en la lista - Se registrará como nuevo</span>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Nombre */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {demoData.attendance.fields.name}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: María González"
                required
                readOnly={!!foundGuest}
              />
            </div>

            {/* Respuesta */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {demoData.attendance.fields.response}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('response', 'yes')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.response === 'yes'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>{demoData.attendance.fields.responseOptions.yes}</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleInputChange('response', 'no')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.response === 'no'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <XCircle className="w-5 h-5" />
                    <span>{demoData.attendance.fields.responseOptions.no}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Acompañantes */}
            {formData.response === 'yes' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {demoData.attendance.fields.companions}
                </label>
                <input
                  type="text"
                  value={formData.companions}
                  onChange={(e) => handleInputChange('companions', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Juan González, Ana López"
                />
              </div>
            )}

            {/* Teléfono de contacto adicional */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono de contacto adicional (opcional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: 777 123 4567"
                required
              />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
            >
              Confirmar Asistencia
            </button>
          </form>
        ) : (
          /* Mensaje de confirmación */
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Gracias por confirmar!
            </h3>
            <p className="text-gray-600 mb-6">
              Hemos recibido tu confirmación de asistencia. 
              Te esperamos en nuestro día especial.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ name: '', response: '', companions: '', phone: '' })
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Confirmar Otro Invitado
            </button>
          </div>
        )}

        {/* Nota del demo */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 text-center">
            <strong>💡 Demo:</strong> Este formulario funciona pero no envía datos reales. 
            En tu invitación real, las confirmaciones se enviarán directamente a tu WhatsApp.
          </p>
        </div>
      </div>
    </section>
  )
} 