"use client"

import { useState } from 'react'
import Image from 'next/image'
import { catBirthdayPremiumData } from './data/premium-demo-data'
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Heart, Filter } from 'lucide-react'

// Tipo para las categorías de fotos
type PhotoCategory = 'todas' | 'retrato' | 'juegos' | 'descanso' | 'aventuras' | 'celebraciones'

export function CatGallery() {
  const { cat } = catBirthdayPremiumData
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('todas')

  // Filtrar las fotos por categoría
  const filteredPhotos = activeCategory === 'todas' 
    ? cat.gallery 
    : cat.gallery.filter(photo => photo.category === activeCategory)

  // Abrir el modal de una foto
  const openModal = (index: number) => {
    setSelectedPhoto(index)
    // Desactivar scroll del body cuando el modal está abierto
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }

  // Cerrar el modal
  const closeModal = () => {
    setSelectedPhoto(null)
    // Reactivar scroll del body cuando el modal se cierra
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  // Navegar a la foto anterior
  const prevPhoto = () => {
    if (selectedPhoto === null || filteredPhotos.length === 0) return
    
    const newIndex = (selectedPhoto - 1 + filteredPhotos.length) % filteredPhotos.length
    setSelectedPhoto(newIndex)
  }

  // Navegar a la siguiente foto
  const nextPhoto = () => {
    if (selectedPhoto === null || filteredPhotos.length === 0) return
    
    const newIndex = (selectedPhoto + 1) % filteredPhotos.length
    setSelectedPhoto(newIndex)
  }

  // Categorías disponibles para filtrar
  const categories: { value: PhotoCategory, label: string }[] = [
    { value: 'todas', label: 'Todas' },
    { value: 'retrato', label: 'Retratos' },
    { value: 'juegos', label: 'Jugando' },
    { value: 'descanso', label: 'Siesta' },
    { value: 'aventuras', label: 'Aventuras' },
    { value: 'celebraciones', label: 'Celebraciones' }
  ]

  // Manejar teclas para navegación en el modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedPhoto === null) return
    
    if (e.key === 'ArrowLeft') {
      prevPhoto()
    } else if (e.key === 'ArrowRight') {
      nextPhoto()
    } else if (e.key === 'Escape') {
      closeModal()
    }
  }

  return (
    <section 
      className="py-16 bg-white"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título de sección */}
          <div className="text-center mb-12">
            <div className="inline-block p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Galería de {cat.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Disfruta de los momentos más especiales y divertidos en la vida de nuestra festejada
            </p>
          </div>

          {/* Filtros de categorías */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-2">
              <Filter className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm text-gray-700 font-medium">Filtrar por:</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.value 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Galería de fotos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, index) => (
              <div 
                key={index}
                className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
                onClick={() => openModal(index)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay con información */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-medium text-sm">{photo.caption}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-purple-500/80 text-white px-2 py-0.5 rounded-full">
                      {photo.category}
                    </span>
                  </div>
                </div>
                
                {/* Icono de zoom */}
                <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-4 h-4 text-purple-700" />
                </div>
              </div>
            ))}
          </div>

          {/* Modal de vista ampliada */}
          {selectedPhoto !== null && filteredPhotos.length > 0 && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
              <div 
                className="absolute inset-0 z-0"
                onClick={closeModal}
              ></div>
              
              <div className="relative z-10 w-full max-w-4xl">
                {/* Botón cerrar */}
                <button
                  onClick={closeModal}
                  className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                
                {/* Contenedor principal de imagen */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black">
                  <Image
                    src={filteredPhotos[selectedPhoto].src}
                    alt={filteredPhotos[selectedPhoto].alt}
                    fill
                    className="object-contain"
                  />
                  
                  {/* Botones de navegación */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      prevPhoto()
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-3 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      nextPhoto()
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-3 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
                
                {/* Información de la foto */}
                <div className="bg-white rounded-b-xl p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {filteredPhotos[selectedPhoto].caption}
                    </h3>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full">
                        {filteredPhotos[selectedPhoto].category}
                      </span>
                      
                      <button className="text-pink-500 hover:text-pink-600">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Indicador de posición */}
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    {filteredPhotos.map((_, index) => (
                      <button 
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedPhoto(index)
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          selectedPhoto === index 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-6' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Nota del demo */}
          <div className="mt-10 p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
            <p className="text-sm text-purple-800">
              <strong>💡 Demo Premium:</strong> La galería premium permite mostrar hasta 12 fotos 
              con categorías, vista ampliada y navegación mejorada.
              En tu invitación personalizada, podrás incluir todas las fotos que desees.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
