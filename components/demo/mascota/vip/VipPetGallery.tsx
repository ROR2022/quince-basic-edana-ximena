"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from 'lucide-react'
import Image from 'next/image'
import { vipMascotaData } from './data/vip-mascota-data'

// Tipos de categoría
type CategoryId = string
type ImageItem = (typeof vipMascotaData.gallery.images)[0]

export const VipPetGallery = () => {
  // Estados
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all')
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  
  // Filtrar imágenes por categoría
  const filteredImages = vipMascotaData.gallery.images.filter(img => 
    activeCategory === 'all' || img.categories.includes(activeCategory)
  )
  
  // Función para abrir el lightbox
  const openLightbox = (image: ImageItem) => {
    setSelectedImage(image)
    setIsLightboxOpen(true)
    setZoomLevel(1) // Resetear zoom
    document.body.style.overflow = 'hidden' // Prevenir scroll
  }
  
  // Función para cerrar el lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = 'auto' // Restaurar scroll
  }
  
  // Navegación de imágenes en lightbox
  const navigateImages = (direction: 'prev' | 'next') => {
    if (!selectedImage) return
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    let newIndex: number
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length
    } else {
      newIndex = currentIndex - 1 < 0 ? filteredImages.length - 1 : currentIndex - 1
    }
    
    setSelectedImage(filteredImages[newIndex])
    setZoomLevel(1) // Resetear zoom al cambiar de imagen
  }
  
  // Función para manejar el zoom
  const handleZoom = (action: 'in' | 'out') => {
    if (action === 'in' && zoomLevel < 2.5) {
      setZoomLevel(prev => prev + 0.25)
    } else if (action === 'out' && zoomLevel > 1) {
      setZoomLevel(prev => prev - 0.25)
    }
  }
  
  // Estilo de transformación para zoom
  const zoomStyle = {
    transform: `scale(${zoomLevel})`
  }
  
  // Manejar teclas para navegación
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      closeLightbox()
    } else if (e.key === 'ArrowLeft') {
      navigateImages('prev')
    } else if (e.key === 'ArrowRight') {
      navigateImages('next')
    } else if (e.key === '+') {
      handleZoom('in')
    } else if (e.key === '-') {
      handleZoom('out')
    }
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            GALERÍA DE MOMENTOS
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-purple-800 mb-4"
          >
            {vipMascotaData.gallery.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-purple-700 max-w-3xl mx-auto"
          >
            {vipMascotaData.gallery.description}
          </motion.p>
        </div>
        
        {/* Filtros de categorías */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all' 
                  ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md'
                  : 'bg-white text-purple-700 hover:bg-purple-50'
              }`}
            >
              Todas
            </button>
            
            {vipMascotaData.gallery.categories.map((category) => (
              <button 
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id 
                    ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md'
                    : 'bg-white text-purple-700 hover:bg-purple-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
        
        {/* Masonry Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`overflow-hidden rounded-xl shadow-md border border-purple-100 ${
                index % 5 === 0 || index % 7 === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              style={{
                height: index % 5 === 0 || index % 7 === 0 
                  ? '400px' 
                  : index % 3 === 0 
                    ? '300px' 
                    : '250px'
              }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.1)' }}
            >
              <div 
                className="relative w-full h-full cursor-pointer group"
                onClick={() => openLightbox(image)}
              >
                <Image
                  src={image.url}
                  alt={image.caption || 'Imagen de galería'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay con información */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                  {image.caption && (
                    <p className="text-white font-medium text-sm md:text-base">{image.caption}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {image.categories.map((catId) => {
                      const category = vipMascotaData.gallery.categories.find(c => c.id === catId)
                      return category ? (
                        <span 
                          key={catId}
                          className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-white"
                        >
                          {category.name}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Mensaje sobre la personalización */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 bg-white/70 backdrop-blur-sm p-6 rounded-xl text-center max-w-3xl mx-auto border border-purple-100"
        >
          <p className="text-purple-700">
            Con el paquete VIP, tendrás acceso a una galería completa con todas las fotos de la celebración, clasificadas por categorías y descargables en alta resolución.
          </p>
        </motion.div>
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Botón de cerrar */}
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/20 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Botón de navegación izquierdo */}
            <button 
              onClick={(e) => {
                e.stopPropagation()
                navigateImages('prev')
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/20 transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            {/* Botón de navegación derecho */}
            <button 
              onClick={(e) => {
                e.stopPropagation()
                navigateImages('next')
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/20 transition-colors"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Controles de zoom */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center p-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleZoom('out')
                }}
                disabled={zoomLevel <= 1}
                className={`p-2 text-white ${zoomLevel <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'} rounded-full transition-colors`}
                aria-label="Reducir zoom"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              
              <div className="px-3 text-white text-sm">
                {Math.round(zoomLevel * 100)}%
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleZoom('in')
                }}
                disabled={zoomLevel >= 2.5}
                className={`p-2 text-white ${zoomLevel >= 2.5 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'} rounded-full transition-colors`}
                aria-label="Aumentar zoom"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  // Simular descarga (en un caso real, usaríamos un enlace de descarga)
                  alert('Descargando imagen: ' + selectedImage.caption)
                }}
                className="ml-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                aria-label="Descargar imagen"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
            
            {/* Contenedor de la imagen */}
            <motion.div
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="relative max-w-full max-h-full"
                style={{ cursor: zoomLevel > 1 ? 'move' : 'default' }}
              >
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.caption || 'Imagen ampliada'}
                  width={1200}
                  height={800}
                  className="object-contain transition-transform duration-200"
                  style={zoomStyle}
                />
              </div>
              
              {/* Pie de foto */}
              {selectedImage.caption && (
                <div className="absolute bottom-16 left-0 right-0 text-center">
                  <div className="inline-block bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                    {selectedImage.caption}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
