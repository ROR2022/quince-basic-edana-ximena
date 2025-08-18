"use client"

import { motion } from 'framer-motion'
import { vipMascotaData } from './data/vip-mascota-data'
import Image from 'next/image'

export const PetInvitation = () => {
  const { pets, event } = vipMascotaData
  
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-50 to-fuchsia-50">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl overflow-hidden shadow-xl border border-fuchsia-100"
        >
          <div className="relative h-32 sm:h-48 bg-gradient-to-r from-purple-600 to-fuchsia-500">
            {/* Decoraciones */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/10"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-white/10"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/10"></div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-400 rounded-full opacity-20"></div>
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-fuchsia-400 rounded-full opacity-20"></div>
            </div>
            
            {/* Título de la sección */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-4xl font-bold text-center drop-shadow-md px-4">
                Invitación Especial
              </h2>
            </div>
          </div>
          
          <div className="px-6 py-8 md:p-10">
            {/* Mensaje principal */}
            <div className="text-center mb-10">
              <p className="text-purple-700 text-lg md:text-xl italic mb-6">
                Los anfitriones de la celebración
              </p>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
                {pets.map((pet, index) => (
                  <motion.div 
                    key={pet.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative w-24 h-24 md:w-32 md:h-32 mb-3">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 p-1">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                          <Image 
                            src={pet.photo} 
                            alt={pet.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-purple-800 font-semibold">{pet.name}</p>
                    <p className="text-sm text-purple-600">{pet.type === 'dog' ? '🐶 Canino' : '🐱 Felino'}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xl md:text-2xl text-fuchsia-700 mb-4"
              >
                Te invitan cordialmente a celebrar
              </motion.p>
              
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-purple-800 mb-6"
              >
                {event.title}
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-purple-700"
              >
                {event.subtitle}
              </motion.p>
            </div>
            
            {/* Separador decorativo */}
            <div className="flex items-center justify-center mb-10">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-300"></div>
              <div className="mx-4 text-purple-400">♦</div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-300"></div>
            </div>
            
            {/* Detalles de la invitación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-purple-50 rounded-xl p-6"
              >
                <h4 className="text-lg font-semibold text-purple-800 mb-3">Detalles del Evento</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-fuchsia-500 mr-2">📅</span>
                    <span className="text-purple-700">{new Date(event.date).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-fuchsia-500 mr-2">⏰</span>
                    <span className="text-purple-700">{event.time}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-fuchsia-500 mr-2">📍</span>
                    <span className="text-purple-700">{event.location.name}, {event.location.address}</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-fuchsia-50 rounded-xl p-6"
              >
                <h4 className="text-lg font-semibold text-purple-800 mb-3">Información Importante</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-fuchsia-500 mr-2">👔</span>
                    <span className="text-purple-700">Código de vestimenta: {event.dressCode}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-fuchsia-500 mr-2">🐾</span>
                    <span className="text-purple-700">Mascotas invitadas bienvenidas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-fuchsia-500 mr-2">ℹ️</span>
                    <span className="text-purple-700">{event.notes}</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            {/* Mensaje final */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-10 p-4 bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-lg"
            >
              <p className="text-lg text-purple-700 italic">
                ¡Esperamos contar con tu presencia en este día tan especial para nosotros!
              </p>
              <div className="mt-2 text-fuchsia-600 font-semibold">
                {pets.map(pet => pet.name).join(' & ')}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
