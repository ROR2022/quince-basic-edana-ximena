"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Cat, Dog, Users, Info } from 'lucide-react'
import { vipMascotaData } from './data/vip-mascota-data'

export const VipPetItinerary = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pets' | 'humans'>('all')
  
  // Filtrar itinerario según la selección
  const filteredItinerary = vipMascotaData.itinerary.filter(item => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'pets') return item.forPets
    if (activeFilter === 'humans') return item.forHumans
    return true
  })
  
  // Obtener el icono correcto para cada actividad
  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'door-open':
        return <span className="text-2xl">🚪</span>
      case 'camera':
        return <span className="text-2xl">📸</span>
      case 'utensils':
        return <span className="text-2xl">🍽️</span>
      case 'glass-cheers':
        return <span className="text-2xl">🥂</span>
      case 'birthday-cake':
        return <span className="text-2xl">🎂</span>
      case 'gamepad':
        return <span className="text-2xl">🎮</span>
      case 'hamburger':
        return <span className="text-2xl">🍔</span>
      case 'gift':
        return <span className="text-2xl">🎁</span>
      case 'heart':
        return <span className="text-2xl">❤️</span>
      default:
        return <Info className="h-6 w-6" />
    }
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-100 to-fuchsia-100">
      <div className="max-w-5xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            CARACTERÍSTICA VIP EXCLUSIVA
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-purple-800 mb-4"
          >
            Itinerario Completo
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-purple-700 max-w-3xl mx-auto"
          >
            Planificamos cada momento para que tanto las mascotas como sus dueños disfruten al máximo de esta celebración especial.
          </motion.p>
        </div>
        
        {/* Filtros */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-3 mb-10"
        >
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md'
                : 'bg-white text-purple-800 hover:bg-purple-50'
            }`}
          >
            <Users size={18} />
            <span>Todos</span>
          </button>
          <button
            onClick={() => setActiveFilter('pets')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
              activeFilter === 'pets'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md'
                : 'bg-white text-purple-800 hover:bg-purple-50'
            }`}
          >
            <div className="flex">
              <Dog size={18} />
              <Cat size={18} className="-ml-1" />
            </div>
            <span>Mascotas</span>
          </button>
          <button
            onClick={() => setActiveFilter('humans')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
              activeFilter === 'humans'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md'
                : 'bg-white text-purple-800 hover:bg-purple-50'
            }`}
          >
            <Users size={18} />
            <span>Humanos</span>
          </button>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-fuchsia-400 to-purple-600 rounded-full"></div>
          
          {/* Eventos */}
          <div className="space-y-12">
            {filteredItinerary.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Contenido */}
                <div className="md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-purple-100">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-purple-800">{item.title}</h3>
                      <div className="flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.time}
                      </div>
                    </div>
                    
                    <p className="text-purple-700 mb-4">{item.description}</p>
                    
                    <div className="flex gap-2">
                      {item.forPets && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-fuchsia-100 text-fuchsia-700">
                          <div className="flex mr-1">
                            <Dog size={14} />
                            <Cat size={14} className="-ml-1" />
                          </div>
                          Para mascotas
                        </span>
                      )}
                      {item.forHumans && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                          <Users size={14} className="mr-1" />
                          Para humanos
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Punto y línea */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-6 flex items-center justify-center">
                  {/* Círculo con icono */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 shadow-md flex items-center justify-center">
                    {getActivityIcon(item.icon)}
                  </div>
                </div>
                
                {/* Hora para móviles */}
                <div className="absolute top-5 left-16 md:hidden">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                    <Clock className="h-4 w-4 mr-1" />
                    {item.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Nota informativa */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-purple-100 shadow-sm text-center"
        >
          <h4 className="text-lg font-semibold text-purple-800 mb-2">Información Importante</h4>
          <p className="text-purple-700">
            {vipMascotaData.event.notes}
          </p>
        </motion.div>
        
        {/* Descarga de itinerario (simulado) */}
        <div className="mt-10 text-center">
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all">
            <span>Descargar itinerario completo</span>
            <span className="text-lg">📅</span>
          </button>
        </div>
      </div>
    </section>
  )
}
