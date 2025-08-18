"use client"

import { useState } from 'react'
import { catBirthdayPremiumData } from './data/premium-demo-data'
import { Send, User, Mail, Phone, CalendarCheck, Users, MessageCircle, Check } from 'lucide-react'

export function CatRSVP() {
  const { cat, event } = catBirthdayPremiumData
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: 'yes',
    guests: '1',
    message: ''
  })
  
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  
  // Fecha límite para confirmar asistencia
  const rsvpDeadlineDate = new Date(event.rsvp_deadline)
  const formattedDeadline = rsvpDeadlineDate.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Limpiar errores al modificar campos
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  // Validar el formulario
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido'
    }
    
    if (formData.phone && !/^[\d\s()+.-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Teléfono no válido'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Enviar formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulamos envío con un timeout (en una app real, aquí enviaríamos a un API)
    setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
    }, 1500)
  }
  
  // Reiniciar el formulario
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      attendance: 'yes',
      guests: '1',
      message: ''
    })
    setSubmitted(false)
    setErrors({})
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-100 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Título de sección */}
          <div className="text-center mb-10">
            <div className="inline-block p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <CalendarCheck className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Confirma tu Asistencia
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Acompáñanos a celebrar el cumpleaños de {cat.name}
            </p>
            <p className="text-sm text-purple-600 mt-3">
              Por favor confirma antes del <span className="font-semibold">{formattedDeadline}</span>
            </p>
          </div>

          {/* Formulario RSVP */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                      Nombre completo <span className="text-pink-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.name 
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-purple-200 focus:ring-purple-100 focus:border-purple-400'
                        }`}
                        placeholder="Tu nombre"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                      Email <span className="text-pink-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.email 
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-purple-200 focus:ring-purple-100 focus:border-purple-400'
                        }`}
                        placeholder="tu@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  {/* Teléfono */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                      Teléfono (opcional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.phone 
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-purple-200 focus:ring-purple-100 focus:border-purple-400'
                        }`}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  {/* Asistencia */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      ¿Asistirás?
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="attendance"
                          value="yes"
                          checked={formData.attendance === 'yes'}
                          onChange={handleChange}
                          className="form-radio h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-gray-700">Sí, ahí estaré</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="attendance"
                          value="no"
                          checked={formData.attendance === 'no'}
                          onChange={handleChange}
                          className="form-radio h-4 w-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                        />
                        <span className="ml-2 text-gray-700">No podré asistir</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Número de invitados */}
                  {formData.attendance === 'yes' && (
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="guests">
                        Número de invitados
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <select
                          id="guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 appearance-none bg-white"
                        >
                          {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  
                  {/* Mensaje */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
                      Mensaje para {cat.name} (opcional)
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
                        placeholder="Escribe un mensaje especial..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                {/* Botón de envío */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-lg flex items-center justify-center transition-all ${
                      isSubmitting
                        ? 'bg-purple-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        <span>Confirmar Asistencia</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              // Mensaje de confirmación
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  ¡Gracias por tu respuesta!
                </h3>
                <p className="text-gray-600 mb-6">
                  {formData.attendance === 'yes' ? (
                    <>
                      Estamos muy emocionados de que vayas a acompañar a {cat.name} en este día tan especial.
                      {parseInt(formData.guests) > 1 && ` Hemos registrado ${formData.guests} asistentes.`}
                    </>
                  ) : (
                    <>Lamentamos que no puedas asistir, pero agradecemos tu respuesta.</>
                  )}
                </p>
                
                {/* Botón para nueva confirmación (demo) */}
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  Enviar otra respuesta
                </button>
              </div>
            )}
          </div>
          
          {/* Nota del demo */}
          <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
            <p className="text-sm text-purple-800">
              <strong>💡 Demo Premium:</strong> El sistema de RSVP permite a los invitados confirmar 
              su asistencia fácilmente. En tu invitación personalizada, recibirás notificaciones por 
              email y podrás exportar la lista de confirmados.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
