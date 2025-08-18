"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { MapPin, Phone, Globe, Star, Coffee, ShieldCheck, Camera } from 'lucide-react'
import { vipMascotaData } from './data/vip-mascota-data'
import Image from 'next/image'

// Crear componentes personalizados para los íconos problemáticos
const PawIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="4" r="2"/>
      <circle cx="18" cy="8" r="2"/>
      <circle cx="20" cy="16" r="2"/>
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>
    </svg>
  );
}

const DogBowlIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 15.5V12"/>
      <path d="M14 15.5V12"/>
      <path d="M5.5 10.5h13a4 4 0 0 1 0 8h-13a4 4 0 0 1 0-8Z"/>
      <path d="M20.5 8a7 7 0 0 0-15.6-1.5"/>
    </svg>
  );
}

export const VipPetAccommodation = () => {
  const [selectedAccommodation, setSelectedAccommodation] = useState(vipMascotaData.accommodation[0].id)
  
  // La selección de alojamiento se maneja directamente a través de Tabs
  // No necesitamos una variable separada ya que utilizamos el sistema de pestañas UI
  
  // Función para renderizar los iconos correctos según la característica
  const getFeatureIcon = (feature: string) => {
    if (feature.includes('cama')) return <PawIcon className="h-4 w-4" />
    if (feature.includes('spa')) return <Coffee className="h-4 w-4" />
    if (feature.includes('menú')) return <DogBowlIcon className="h-4 w-4" />
    if (feature.includes('cámara')) return <Camera className="h-4 w-4" />
    if (feature.includes('seguridad') || feature.includes('cargo')) return <ShieldCheck className="h-4 w-4" />
    return <Star className="h-4 w-4" />
  }
  
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-fuchsia-50 to-purple-100">
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
            Hospedaje para Invitados Peludos
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-purple-700 max-w-3xl mx-auto"
          >
            Para que todos los invitados, tanto humanos como mascotas, disfruten al máximo de la celebración, hemos seleccionado las mejores opciones de hospedaje pet-friendly.
          </motion.p>
        </div>
        
        {/* Selector de opciones de hospedaje */}
        <Tabs defaultValue={selectedAccommodation} className="w-full" onValueChange={setSelectedAccommodation}>
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 bg-white/70 rounded-xl p-1 mb-8">
            {vipMascotaData.accommodation.map((acc) => (
              <TabsTrigger
                key={acc.id}
                value={acc.id}
                className="data-[state=active]:bg-gradient-to-r from-fuchsia-600 to-purple-600 data-[state=active]:text-white rounded-lg py-3"
              >
                {acc.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Contenido para cada opción */}
          {vipMascotaData.accommodation.map((acc) => (
            <TabsContent key={acc.id} value={acc.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Imagen */}
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={acc.image}
                      alt={acc.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/70 to-transparent p-4">
                      <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        {acc.type === 'resort' ? '✨ Resort Premium' : acc.type === 'hotel' ? '🏨 Hotel Pet-Friendly' : '🏠 Pet-Sitter Profesional'}
                      </div>
                      <div className="mt-2 text-white font-semibold">
                        Rango de precio: {acc.priceRange}
                      </div>
                    </div>
                  </div>
                  
                  {/* Información */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-purple-800 mb-3">{acc.name}</h3>
                    <p className="text-purple-700 mb-4">{acc.description}</p>
                    
                    {/* Dirección y contacto */}
                    <div className="mb-5 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{acc.address}</span>
                      </div>
                      
                      {acc.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{acc.phone}</span>
                        </div>
                      )}
                      
                      {acc.website && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Globe className="h-4 w-4" />
                          <a 
                            href={acc.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-fuchsia-600 hover:underline"
                          >
                            Visitar sitio web
                          </a>
                        </div>
                      )}
                    </div>
                    
                    {/* Características */}
                    <div>
                      <h4 className="text-lg font-semibold text-purple-800 mb-3">Características Pet-Friendly</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                        {acc.petFriendlyFeatures.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="text-fuchsia-600">
                              {getFeatureIcon(feature.toLowerCase())}
                            </div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Botón de contacto */}
                    <button className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all">
                      Reservar ahora
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.div>
                    </button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Mapa interactivo (simulado) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
        >
          <div className="relative w-full h-80 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[url('/images/pets/dogs-cats/cat_dog_4.jpeg')] bg-center bg-cover"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
            
            <div className="relative z-10 text-center px-4">
              <div className="inline-block bg-white/90 backdrop-blur-sm text-purple-800 px-6 py-3 rounded-xl shadow-lg">
                <MapPin className="inline-block h-5 w-5 mr-2 text-fuchsia-600" />
                <span className="font-medium">Mapa interactivo disponible en la invitación personalizada</span>
              </div>
              
              <div className="mt-3 text-white text-opacity-90 text-sm max-w-md mx-auto">
                Con el paquete VIP, tus invitados podrán ver la ubicación exacta de las opciones de hospedaje recomendadas para sus mascotas.
              </div>
            </div>
            
            {/* Marcadores de mapa simulados */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-6 h-6 bg-fuchsia-600 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                repeat: Infinity,
                duration: 2
              }}
            >
              <div className="absolute -top-1 -left-1 w-8 h-8 bg-fuchsia-500/50 rounded-full animate-ping"></div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-purple-600 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: 0.5
              }}
            >
              <div className="absolute -top-1 -left-1 w-8 h-8 bg-purple-500/50 rounded-full animate-ping"></div>
            </motion.div>
            
            <motion.div 
              className="absolute top-1/2 right-1/4 w-6 h-6 bg-pink-600 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: 1
              }}
            >
              <div className="absolute -top-1 -left-1 w-8 h-8 bg-pink-500/50 rounded-full animate-ping"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
