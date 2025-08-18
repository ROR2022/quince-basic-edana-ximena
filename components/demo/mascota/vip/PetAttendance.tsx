"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { vipMascotaData } from './data/vip-mascota-data'
import { Check, AlertCircle, ChevronDown, Send } from 'lucide-react'

export const PetAttendance = () => {
  const { event } = vipMascotaData
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: 'yes',
    guestCount: '1',
    petName: '',
    petType: 'dog',
    petBreed: '',
    dietaryRestrictions: '',
    message: ''
  })
  
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulación de envío del formulario
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          attending: 'yes',
          guestCount: '1',
          petName: '',
          petType: 'dog',
          petBreed: '',
          dietaryRestrictions: '',
          message: ''
        })
      }, 5000)
    }, 1500)
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">Confirma tu Asistencia</h2>
          <p className="text-lg text-purple-600 max-w-2xl mx-auto">
            Por favor, confirma tu asistencia y la de tu mascota antes del {new Date(event.rsvpDeadline).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
          </p>
        </motion.div>
        
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-100 rounded-full p-1 mr-3">
                <Check size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800">¡Confirmación Recibida!</h3>
            </div>
            <p className="text-green-700 mb-4">
              Gracias por confirmar tu asistencia. Hemos registrado tus datos y te esperamos en nuestro evento.
            </p>
            <p className="text-green-600 font-medium">
              En breve recibirás un correo con todos los detalles.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 py-6 px-8">
              <h3 className="text-2xl font-bold text-white">Formulario de Confirmación</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Datos del asistente */}
                <div>
                  <h4 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2 text-sm">
                      1
                    </span>
                    Tus Datos
                  </h4>
                  
                  <div className="space-y-4">
                    <FormField
                      label="Nombre completo"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    
                    <FormField
                      label="Correo electrónico"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    
                    <FormField
                      label="Teléfono"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-purple-700 mb-1">
                        ¿Asistirás al evento?
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="attending"
                            value="yes"
                            checked={formData.attending === 'yes'}
                            onChange={handleChange}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="ml-2 text-purple-600">Sí, asistiré</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="attending"
                            value="no"
                            checked={formData.attending === 'no'}
                            onChange={handleChange}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="ml-2 text-purple-600">No podré asistir</span>
                        </label>
                      </div>
                    </div>
                    
                    {formData.attending === 'yes' && (
                      <div className="mb-4">
                        <label htmlFor="guestCount" className="block text-sm font-medium text-purple-700 mb-1">
                          Número de personas
                        </label>
                        <div className="relative">
                          <select
                            id="guestCount"
                            name="guestCount"
                            value={formData.guestCount}
                            onChange={handleChange}
                            className="block w-full rounded-md border border-purple-300 py-2 pl-3 pr-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 text-purple-600 bg-white"
                          >
                            <option value="1">1 persona</option>
                            <option value="2">2 personas</option>
                            <option value="3">3 personas</option>
                            <option value="4">4 personas</option>
                            <option value="5">5 personas</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <ChevronDown size={16} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Datos de la mascota */}
                <div>
                  <h4 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-fuchsia-100 flex items-center justify-center mr-2 text-sm">
                      2
                    </span>
                    Datos de tu Mascota
                  </h4>
                  
                  <div className="space-y-4">
                    <FormField
                      label="Nombre de tu mascota"
                      type="text"
                      name="petName"
                      value={formData.petName}
                      onChange={handleChange}
                      required={formData.attending === 'yes'}
                    />
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-purple-700 mb-1">
                        Tipo de mascota
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="petType"
                            value="dog"
                            checked={formData.petType === 'dog'}
                            onChange={handleChange}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="ml-2 text-purple-600">🐶 Perro</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="petType"
                            value="cat"
                            checked={formData.petType === 'cat'}
                            onChange={handleChange}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="ml-2 text-purple-600">🐱 Gato</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="petType"
                            value="other"
                            checked={formData.petType === 'other'}
                            onChange={handleChange}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="ml-2 text-purple-600">Otra</span>
                        </label>
                      </div>
                    </div>
                    
                    <FormField
                      label="Raza"
                      type="text"
                      name="petBreed"
                      value={formData.petBreed}
                      onChange={handleChange}
                      required={false}
                    />
                    
                    <div className="mb-4">
                      <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-purple-700 mb-1">
                        Restricciones alimentarias o alergias
                      </label>
                      <textarea
                        id="dietaryRestrictions"
                        name="dietaryRestrictions"
                        value={formData.dietaryRestrictions}
                        onChange={handleChange}
                        rows={3}
                        className="block w-full rounded-md border border-purple-300 py-2 px-3 focus:border-purple-500 focus:outline-none focus:ring-purple-500 text-purple-600 bg-white"
                        placeholder="Indica si tu mascota tiene alguna alergia o restricción alimentaria"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mensaje adicional */}
              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-purple-700 mb-1">
                  Mensaje adicional (opcional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full rounded-md border border-purple-300 py-2 px-3 focus:border-purple-500 focus:outline-none focus:ring-purple-500 text-purple-600 bg-white"
                  placeholder="¿Algo más que quieras contarnos?"
                />
              </div>
              
              {/* Nota sobre política de privacidad */}
              <div className="mt-6 p-4 bg-purple-50 rounded-lg flex items-start">
                <AlertCircle size={18} className="text-purple-600 mt-0.5 mr-2 shrink-0" />
                <p className="text-sm text-purple-600">
                  Al enviar este formulario, aceptas que utilicemos tus datos únicamente para gestionar tu asistencia al evento. No compartiremos tu información con terceros.
                </p>
              </div>
              
              {/* Botón de envío */}
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium rounded-full text-lg transition-all duration-300 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Confirmar asistencia</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
        
        {/* Información de contacto */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-purple-600">
            Si tienes alguna pregunta, contáctanos en{' '}
            <a href={`mailto:${event.contactEmail}`} className="font-medium underline hover:text-fuchsia-600 transition-colors">
              {event.contactEmail}
            </a>
            {' '}o por teléfono al{' '}
            <a href={`tel:${event.contactPhone}`} className="font-medium underline hover:text-fuchsia-600 transition-colors">
              {event.contactPhone}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Componente para campos de formulario
const FormField = ({ 
  label, 
  type, 
  name, 
  value, 
  onChange, 
  required = true 
}: { 
  label: string; 
  type: string; 
  name: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  required?: boolean;
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-purple-700 mb-1">
        {label}
        {required && <span className="text-fuchsia-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="block w-full rounded-md border border-purple-300 py-2 px-3 focus:border-purple-500 focus:outline-none focus:ring-purple-500 text-purple-600 bg-white"
      />
    </div>
  )
}
