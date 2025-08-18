"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { vipMascotaData } from './data/vip-mascota-data'
import Image from 'next/image'
import { MapPin, Calendar, Clock, Utensils, Palette, Car, AlertCircle } from 'lucide-react'

export const PetEventDetails = () => {
  const { event, pets } = vipMascotaData
  const [activeTab, setActiveTab] = useState('location')

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">Detalles del Evento</h2>
          <p className="text-lg text-purple-600 max-w-3xl mx-auto">
            Toda la información que necesitas para disfrutar al máximo de la celebración de 
            {pets.map((pet, i) => (
              <span key={pet.id} className="font-medium">
                {i === 0 ? ' ' : i === pets.length - 1 ? ' y ' : ', '}
                {pet.name}
              </span>
            ))}
          </p>
        </motion.div>

        {/* Tabs para navegar */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <TabButton 
            id="location" 
            label="Lugar" 
            icon={<MapPin size={18} />} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
          <TabButton 
            id="schedule" 
            label="Horarios" 
            icon={<Clock size={18} />} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
          <TabButton 
            id="food" 
            label="Comida" 
            icon={<Utensils size={18} />} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
          <TabButton 
            id="dresscode" 
            label="Código de vestimenta" 
            icon={<Palette size={18} />} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
          <TabButton 
            id="parking" 
            label="Estacionamiento" 
            icon={<Car size={18} />} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
          <TabButton 
            id="important" 
            label="Información importante" 
            icon={<AlertCircle size={18} />} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </div>

        {/* Contenido de cada tab */}
        <div className="bg-purple-50 rounded-2xl overflow-hidden shadow-lg">
          {/* Lugar */}
          {activeTab === 'location' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 gap-0"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                  <MapPin className="mr-2 text-fuchsia-600" /> Ubicación del Evento
                </h3>
                <p className="text-lg font-semibold text-purple-700 mb-2">{event.location.name}</p>
                <p className="text-purple-600 mb-6">{event.location.address}</p>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-purple-700 mb-2">Características del Lugar</h4>
                  <ul className="space-y-2">
                    {event.location.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-purple-600">
                        <span className="w-5 h-5 rounded-full bg-fuchsia-100 flex items-center justify-center mr-2">
                          <span className="text-fuchsia-600 text-xs">✓</span>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-purple-500 italic">
                  {event.location.petPolicy}
                </p>
              </div>
              <div className="relative h-[300px] md:h-auto">
                <Image
                  src={event.location.image}
                  alt={event.location.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <p className="font-medium">{event.location.name}</p>
                    <p className="text-sm opacity-90">{event.location.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Horarios */}
          {activeTab === 'schedule' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8"
            >
              <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <Clock className="mr-2 text-fuchsia-600" /> Programa del Evento
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-4">
                    <Calendar className="text-fuchsia-600 mr-2" size={20} />
                    <h4 className="text-lg font-semibold text-purple-700">Fecha y Hora</h4>
                  </div>
                  <p className="text-purple-600 mb-2">
                    <span className="font-medium">Fecha:</span> {new Date(event.date).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className="text-purple-600 mb-6">
                    <span className="font-medium">Hora:</span> {event.time}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-purple-700 mb-4">Programa Detallado</h4>
                  <ul className="space-y-4">
                    {event.schedule.map((item, index) => (
                      <li key={index} className="flex">
                        <div className="w-16 text-fuchsia-600 font-medium">{item.time}</div>
                        <div className="flex-1">
                          <p className="font-medium text-purple-700">{item.title}</p>
                          {item.description && (
                            <p className="text-sm text-purple-500 mt-1">{item.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-purple-100 rounded-lg text-purple-700">
                <p className="font-medium mb-1">Nota importante:</p>
                <p>El evento comenzará puntualmente. Por favor llega 15 minutos antes para registrar a tu mascota.</p>
              </div>
            </motion.div>
          )}

          {/* Comida */}
          {activeTab === 'food' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8"
            >
              <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <Utensils className="mr-2 text-fuchsia-600" /> Menú del Evento
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                    <h4 className="text-xl font-semibold text-purple-700 mb-3">Menú para Humanos</h4>
                    <div className="space-y-4">
                      {event.food.human.map((item, index) => (
                        <div key={index}>
                          <h5 className="font-medium text-fuchsia-600">{item.type}</h5>
                          <ul className="mt-2 space-y-1">
                            {item.options.map((option, i) => (
                              <li key={i} className="text-purple-600">{option}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  {event.food.drinks && (
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h4 className="text-xl font-semibold text-purple-700 mb-3">Bebidas</h4>
                      <ul className="space-y-1">
                        {event.food.drinks.map((drink, index) => (
                          <li key={index} className="text-purple-600">{drink}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-xl font-semibold text-purple-700 mb-3">Menú para Mascotas</h4>
                    {event.food.pets.map((item, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h5 className="font-medium text-fuchsia-600">{item.petType === 'dog' ? '🐶 Perros' : '🐱 Gatos'}</h5>
                        <ul className="mt-2 space-y-1">
                          {item.options.map((option, i) => (
                            <li key={i} className="text-purple-600">{option}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-purple-100 rounded-lg text-purple-700">
                    <p className="font-medium">Información sobre alergias:</p>
                    <p className="text-sm mt-1">Si tú o tu mascota tienen alguna restricción alimentaria o alergia, por favor háznoslo saber con anticipación.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Código de vestimenta */}
          {activeTab === 'dresscode' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8"
            >
              <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <Palette className="mr-2 text-fuchsia-600" /> Código de Vestimenta
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="text-xl font-semibold text-purple-700 mb-3">Para Humanos</h4>
                  <p className="text-lg text-purple-600 mb-4">{event.dressCode}</p>
                  <div className="space-y-3">
                    <p className="text-purple-600">
                      <span className="font-medium">Colores sugeridos:</span> {event.dressSuggestions.humanColors.join(', ')}
                    </p>
                    <p className="text-purple-600">
                      <span className="font-medium">Estilo:</span> {event.dressSuggestions.humanStyle}
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="text-xl font-semibold text-purple-700 mb-3">Para Mascotas</h4>
                  <p className="text-lg text-purple-600 mb-4">Elegante pero cómodo</p>
                  <div className="space-y-3">
                    <p className="text-purple-600">
                      <span className="font-medium">Accesorios sugeridos:</span> {event.dressSuggestions.petAccessories.join(', ')}
                    </p>
                    <p className="text-purple-600">
                      <span className="font-medium">Estilo:</span> {event.dressSuggestions.petStyle}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-fuchsia-50 rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-purple-700 mb-3">Sugerencias adicionales</h4>
                <ul className="space-y-2">
                  {event.dressSuggestions.additional.map((suggestion, index) => (
                    <li key={index} className="flex items-center text-purple-600">
                      <span className="w-5 h-5 rounded-full bg-fuchsia-100 flex items-center justify-center mr-2">
                        <span className="text-fuchsia-600 text-xs">✓</span>
                      </span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Estacionamiento */}
          {activeTab === 'parking' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8"
            >
              <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <Car className="mr-2 text-fuchsia-600" /> Estacionamiento
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="text-xl font-semibold text-purple-700 mb-3">Opciones de Estacionamiento</h4>
                  <ul className="space-y-4">
                    {event.location.parking.options.map((option, index) => (
                      <li key={index} className="flex">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
                          <span className="font-medium text-purple-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-purple-700">{option.name}</p>
                          <p className="text-sm text-purple-500 mt-1">{option.details}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-xl font-semibold text-purple-700 mb-3">Información Adicional</h4>
                    <p className="text-purple-600 mb-4">{event.location.parking.instructions}</p>
                    {event.location.parking.valet && (
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="font-medium text-purple-700">Servicio de Valet</p>
                        <p className="text-sm text-purple-600 mt-1">{event.location.parking.valet}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex items-start p-4 bg-fuchsia-50 rounded-lg">
                    <AlertCircle className="text-fuchsia-500 mr-2 shrink-0 mt-0.5" size={18} />
                    <p className="text-purple-600 text-sm">
                      Recuerda traer tu confirmación de asistencia para facilitar el acceso al estacionamiento.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Información importante */}
          {activeTab === 'important' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8"
            >
              <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <AlertCircle className="mr-2 text-fuchsia-600" /> Información Importante
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-xl font-semibold text-purple-700 mb-3">Para las Mascotas</h4>
                    <ul className="space-y-3">
                      {event.importantInfo.pets.map((item, index) => (
                        <li key={index} className="flex">
                          <div className="w-6 h-6 rounded-full bg-fuchsia-100 flex items-center justify-center mr-3 mt-0.5">
                            <span className="font-medium text-fuchsia-600">{index + 1}</span>
                          </div>
                          <div className="text-purple-600">{item}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-xl font-semibold text-purple-700 mb-3">Para los Humanos</h4>
                    <ul className="space-y-3">
                      {event.importantInfo.humans.map((item, index) => (
                        <li key={index} className="flex">
                          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
                            <span className="font-medium text-purple-600">{index + 1}</span>
                          </div>
                          <div className="text-purple-600">{item}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-semibold text-purple-700 mb-3">Contactos de Emergencia</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {event.emergencyContacts.map((contact, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="font-medium text-fuchsia-600">{contact.name}</p>
                      <p className="text-purple-700">{contact.role}</p>
                      <p className="text-purple-600">{contact.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

// Componente para cada botón de tab
const TabButton = ({ 
  id, 
  label, 
  icon, 
  activeTab, 
  setActiveTab 
}: { 
  id: string, 
  label: string, 
  icon: React.ReactNode, 
  activeTab: string, 
  setActiveTab: (id: string) => void 
}) => {
  const isActive = activeTab === id
  
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-1.5 py-2 px-4 rounded-full transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-md' 
          : 'bg-white text-purple-700 hover:bg-purple-50'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  )
}
