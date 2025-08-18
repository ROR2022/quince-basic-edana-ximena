"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Camera, ChevronLeft, ChevronRight, X, Zap } from 'lucide-react'
import { premiumDemoData } from './data/premium-demo-data'

export function PremiumGallery() {
  const { gallery } = premiumDemoData
  const [selectedCategory, setSelectedCategory] = useState(gallery.categories[0])
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeModal = () => {
    setSelectedImageIndex(null)
  }

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % selectedCategory.images.length)
    }
  }

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? selectedCategory.images.length - 1 : selectedImageIndex - 1
      )
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-red-50">
      <div className="container mx-auto px-4">
        {/* Título heroico */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <Zap className="w-8 h-8 text-blue-600 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              {gallery.title}
            </h2>
            <Camera className="w-8 h-8 text-red-600 animate-bounce" />
          </div>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto font-medium">
            {gallery.description}
          </p>
        </div>

        {/* Selector de categorías heroico */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-xl border-2 border-blue-200">
            {gallery.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 mx-1 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory.name === category.name
                    ? 'bg-gradient-to-r from-blue-500 to-red-500 text-white shadow-lg'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                {category.name === 'Entrenamiento' ? '💪' : '🗺️'} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de imágenes heroico */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {selectedCategory.images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => openModal(index)}
            >
              <Image
                src={image}
                alt={`${selectedCategory.name} ${index + 1}`}
                width={300}
                height={200}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay heroico */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm">
                    {selectedCategory.name} #{index + 1}
                  </p>
                </div>
                
                {/* Icono de zoom */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Efectos de energía */}
              <div className="absolute top-2 right-2 text-yellow-400 animate-pulse">
                ⚡
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional heroica */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-red-500 rounded-2xl p-8 text-white max-w-3xl mx-auto">
            <h3 className="text-2xl font-black mb-4 flex items-center justify-center">
              <span className="text-3xl mr-3">📸</span>
              ¡Captura tus poderes heroicos!
            </h3>
            <p className="text-lg mb-4">
              Cada momento especial queda grabado para la posteridad en el Archivo de Héroes
            </p>
            <div className="flex justify-center space-x-4 text-2xl">
              ⚡ 🦸‍♀️ 💪 🌟 🚀
            </div>
          </div>
        </div>
      </div>

      {/* Modal de imagen */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navegación anterior */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Navegación siguiente */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Imagen principal */}
            <Image
              src={selectedCategory.images[selectedImageIndex]}
              alt={`${selectedCategory.name} ${selectedImageIndex + 1}`}
              width={800}
              height={600}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {/* Información de la imagen */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-sm rounded-lg p-4 text-white">
              <p className="font-bold text-lg">
                {selectedCategory.name} - Imagen {selectedImageIndex + 1} de {selectedCategory.images.length}
              </p>
              <p className="text-sm opacity-80">
                Momentos heroicos capturados en la {selectedCategory.name.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
