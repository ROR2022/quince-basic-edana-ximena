"use client"

import { motion } from 'framer-motion'
import { Phone, Sparkles, Heart, Shield } from 'lucide-react'
import { vipMascotaData } from './data/vip-mascota-data'
import Image from 'next/image'

export const VipPetCareTakers = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-fuchsia-50">
      <div className="max-w-6xl mx-auto">
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
            Cuidadores Especiales
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-purple-700 max-w-3xl mx-auto"
          >
            Nuestro equipo de profesionales estará presente durante todo el evento para asegurar el bienestar de todas las mascotas invitadas.
          </motion.p>
        </div>
        
        {/* Tarjetas de cuidadores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vipMascotaData.caretakers.map((caretaker, index) => (
            <motion.div
              key={caretaker.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100"
            >
              {/* Imagen del cuidador con efecto degradado */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={caretaker.photo}
                  alt={caretaker.name}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-800/30 to-transparent"></div>
                
                {/* Etiqueta de rol */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {caretaker.role}
                  </div>
                </div>
                
                {/* Nombre e información */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{caretaker.name}</h3>
                  <p className="text-white/90 text-sm">{caretaker.description}</p>
                </div>
              </div>
              
              {/* Especialidades */}
              <div className="p-4">
                <h4 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-fuchsia-500" />
                  Especialidades
                </h4>
                <ul className="space-y-2 mb-4">
                  {caretaker.specialties.map((specialty, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mt-1 mr-2 text-fuchsia-500">•</div>
                      <span className="text-sm text-purple-700">{specialty}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Contacto */}
                {caretaker.contact && (
                  <div className="mt-4 pt-4 border-t border-purple-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-700 flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {caretaker.contact}
                      </span>
                      <button className="bg-fuchsia-100 hover:bg-fuchsia-200 text-fuchsia-700 px-3 py-1 rounded-full text-sm transition-colors">
                        Contactar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Sección de información adicional */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Servicio de emergencia */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-fuchsia-100 to-pink-50 p-6 rounded-2xl border border-fuchsia-200"
          >
            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full mr-4">
                <Shield className="h-6 w-6 text-fuchsia-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-fuchsia-800 mb-2">Servicio de Emergencia</h4>
                <p className="text-fuchsia-700 mb-3">
                  Durante todo el evento contaremos con un servicio veterinario de emergencia disponible para cualquier imprevisto.
                </p>
                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 inline-block">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-fuchsia-700 mr-2" />
                    <span className="text-fuchsia-800 font-medium">Emergencias: +52 55 1234 5678</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Guía de cuidados */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-purple-100 to-blue-50 p-6 rounded-2xl border border-purple-200"
          >
            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full mr-4">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-800 mb-2">Guía de Cuidados</h4>
                <p className="text-purple-700 mb-3">
                  Hemos preparado una guía detallada con recomendaciones para que tu mascota disfrute al máximo del evento.
                </p>
                <button className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <span>Descargar guía</span>
                  <span className="text-lg">📥</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Mensaje final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-white/70 backdrop-blur-sm p-6 rounded-xl text-center max-w-3xl mx-auto border border-purple-100"
        >
          <p className="text-purple-800 italic">
            &ldquo;Nuestros cuidadores profesionales están certificados en primeros auxilios para mascotas y manejo del estrés en eventos sociales, garantizando una experiencia segura y agradable para todos los peludos invitados.&rdquo;
          </p>
          <div className="mt-4 text-fuchsia-600 font-medium">Equipo VIP de Cuidadores</div>
        </motion.div>
      </div>
    </section>
  )
}
