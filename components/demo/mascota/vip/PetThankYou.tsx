"use client"

import { motion } from 'framer-motion'
import { vipMascotaData } from './data/vip-mascota-data'
import Image from 'next/image'
import { Heart, Camera, Share2, Download, Calendar } from 'lucide-react'

export const PetThankYou = () => {
  const { pets, event } = vipMascotaData
  
  const handleCalendarDownload = () => {
    // En una implementación real, esto generaría y descargaría un archivo .ics
    alert('Evento añadido a tu calendario')
  }

  const handleShare = () => {
    // En una implementación real, esto abriría un diálogo de compartir nativo
    if (navigator.share) {
      navigator.share({
        title: `Celebración de ${pets.map(p => p.name).join(' y ')}`,
        text: `Te invito a la celebración de ${pets.map(p => p.name).join(' y ')}`,
        url: window.location.href,
      }).then(() => {
        console.log('Compartido con éxito')
      }).catch((error) => {
        console.log('Error al compartir:', error)
      })
    } else {
      alert('¡Gracias por compartir nuestra celebración!')
    }
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
      {/* Decoraciones de fondo */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-purple-100 opacity-50"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-fuchsia-100 opacity-50"></div>
      <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-purple-200 opacity-60"></div>
      <div className="absolute bottom-1/3 right-1/3 w-12 h-12 rounded-full bg-fuchsia-200 opacity-60"></div>
      <div className="absolute top-1/2 right-1/4 w-6 h-6 rounded-full bg-purple-300 opacity-60"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 py-8 px-6 text-center">
            <div className="mb-4">
              <Heart size={40} className="text-white inline-block" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">¡Gracias por tu confirmación!</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Tu presencia hará de esta celebración un momento realmente especial para
              {pets.map((pet, i) => (
                <span key={pet.id} className="font-medium">
                  {i === 0 ? ' ' : i === pets.length - 1 ? ' y ' : ', '}
                  {pet.name}
                </span>
              ))}
            </p>
          </div>
          
          <div className="p-6 md:p-10">
            {/* Mensaje principal */}
            <div className="text-center mb-10">
              <p className="text-xl text-purple-700 mb-6">
                Estamos muy emocionados de compartir este día contigo y tu mascota
              </p>
              
              {/* Fotos de mascotas */}
              <div className="flex justify-center gap-6 mb-8">
                {pets.map((pet, index) => (
                  <motion.div 
                    key={pet.id}
                    initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -5 : 5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? -5 : 5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="w-32 h-32 md:w-48 md:h-48 relative">
                      <div className="absolute inset-0 bg-white p-2 shadow-md rounded-lg transform">
                        <div className="w-full h-full overflow-hidden rounded-md">
                          <Image 
                            src={pet.photo} 
                            alt={pet.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-purple-50 rounded-xl p-6 max-w-3xl mx-auto mb-8"
              >
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Recuerda la fecha</h3>
                <p className="text-purple-700 text-lg mb-2">
                  {new Date(event.date).toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
                <p className="text-purple-700 text-lg mb-4">
                  Hora: {event.time} • Lugar: {event.location.name}
                </p>
                <button 
                  onClick={handleCalendarDownload}
                  className="flex items-center gap-2 bg-white border border-purple-200 hover:bg-purple-50 text-purple-700 px-4 py-2 rounded-lg font-medium mx-auto transition-colors"
                >
                  <Calendar size={18} />
                  Añadir a mi calendario
                </button>
              </motion.div>
            </div>
            
            {/* Separador decorativo */}
            <div className="flex items-center justify-center mb-10">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-300"></div>
              <div className="mx-4 text-purple-400">♦</div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-300"></div>
            </div>
            
            {/* Acciones adicionales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Compartir invitación */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-fuchsia-100 flex items-center justify-center mx-auto mb-3">
                  <Share2 size={20} className="text-fuchsia-600" />
                </div>
                <h4 className="text-lg font-semibold text-purple-800 mb-2">Compartir</h4>
                <p className="text-sm text-purple-600 mb-4">
                  Comparte esta invitación con otros amigos que quieras invitar
                </p>
                <button 
                  onClick={handleShare}
                  className="text-fuchsia-600 hover:text-fuchsia-700 font-medium text-sm flex items-center gap-1 justify-center mx-auto"
                >
                  Compartir invitación
                  <Share2 size={16} />
                </button>
              </motion.div>
              
              {/* Galería */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <Camera size={20} className="text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-purple-800 mb-2">Galería</h4>
                <p className="text-sm text-purple-600 mb-4">
                  Explora nuestra galería para ver fotos de los festejados
                </p>
                <a 
                  href="#gallery" 
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1 justify-center mx-auto"
                >
                  Ver galería
                  <Camera size={16} />
                </a>
              </motion.div>
              
              {/* Itinerario */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-fuchsia-100 flex items-center justify-center mx-auto mb-3">
                  <Download size={20} className="text-fuchsia-600" />
                </div>
                <h4 className="text-lg font-semibold text-purple-800 mb-2">Itinerario</h4>
                <p className="text-sm text-purple-600 mb-4">
                  Descarga el itinerario completo del evento
                </p>
                <button 
                  onClick={() => alert('Itinerario descargado')}
                  className="text-fuchsia-600 hover:text-fuchsia-700 font-medium text-sm flex items-center gap-1 justify-center mx-auto"
                >
                  Descargar itinerario
                  <Download size={16} />
                </button>
              </motion.div>
            </div>
            
            {/* Mensaje final */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-10 text-center"
            >
              <div className="inline-block bg-gradient-to-r from-purple-100 to-fuchsia-100 rounded-xl p-6">
                <p className="text-lg text-purple-700 font-medium">
                  ¡Nos vemos pronto en esta increíble celebración!
                </p>
                <div className="mt-2">
                  <span className="text-fuchsia-600 font-semibold">
                    Con cariño,{' '}
                    {pets.map(pet => pet.name).join(' & ')}
                  </span>
                </div>
                <div className="flex justify-center mt-4">
                  {pets.map((pet) => (
                    <span key={pet.id} className="text-2xl mx-1">
                      {pet.type === 'dog' ? '🐾' : '🐱'}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
