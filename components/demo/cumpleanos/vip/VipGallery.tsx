"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Camera, ChevronLeft, ChevronRight, X, Crown, Sparkles } from 'lucide-react'
import { vipDemoData } from './data/vip-demo-data'

export function VipGallery() {
  const { gallery } = vipDemoData
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
    <section className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 relative overflow-hidden">
      {/* Efectos mágicos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-200/25 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-rose-200/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Partículas brillantes */}
        <div className="absolute top-1/6 left-1/5 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-1/4 right-1/5 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-700 opacity-70"></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-rose-400 rounded-full animate-ping delay-300 opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título real */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-4 mb-6">
            <Crown className="w-10 h-10 text-pink-600 animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
              {gallery.title}
            </h2>
            <Sparkles className="w-10 h-10 text-purple-600 animate-bounce" />
          </div>
          <p className="text-2xl text-pink-700 max-w-3xl mx-auto font-medium">
            {gallery.description}
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <span className="text-3xl animate-pulse">✨</span>
            <span className="text-2xl animate-bounce delay-300">💎</span>
            <span className="text-3xl animate-pulse delay-500">✨</span>
          </div>
        </div>

        {/* Selector de categorías real */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-3 shadow-2xl border-2 border-pink-200">
            {gallery.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 mx-2 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory.name === category.name
                    ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white shadow-xl border-2 border-pink-300'
                    : 'text-pink-600 hover:bg-pink-50 border-2 border-transparent'
                }`}
              >
                <span className="flex items-center space-x-2">
                  {category.name === 'Ceremonia Real' ? (
                    <>
                      <Crown className="w-5 h-5" />
                      <span>👑 {category.name}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>✨ {category.name}</span>
                    </>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de imágenes mágicas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {selectedCategory.images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-3xl transform hover:scale-105 transition-all duration-500 shadow-xl"
              onClick={() => openModal(index)}
            >
              {/* Marco dorado */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-300 rounded-3xl p-1">
                <div className="w-full h-full bg-white rounded-3xl overflow-hidden">
                  <Image
                    src={image}
                    alt={`${selectedCategory.name} ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              
              {/* Overlay mágico */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl">
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-lg">
                    {selectedCategory.name} #{index + 1}
                  </p>
                  <p className="text-pink-200 text-sm">Momento mágico del reino</p>
                </div>
                
                {/* Icono de cámara real */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Efectos de brillo */}
              <div className="absolute top-3 right-3 text-yellow-400 text-2xl animate-pulse">
                ✨
              </div>
              <div className="absolute top-3 left-3 text-pink-400 text-xl animate-bounce">
                💎
              </div>
              <div className="absolute bottom-3 right-3 text-purple-400 text-lg animate-pulse delay-500">
                🌟
              </div>

              {/* Brillo ambiente */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/10 via-transparent to-purple-400/10 rounded-3xl group-hover:from-pink-400/20 group-hover:to-purple-400/20 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Información adicional mágica */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 rounded-3xl p-10 text-white max-w-4xl mx-auto relative overflow-hidden">
            {/* Efectos de fondo */}
            <div className="absolute inset-0">
              <div className="absolute top-6 left-8 text-yellow-300 text-3xl animate-ping">✨</div>
              <div className="absolute top-8 right-12 text-pink-200 text-2xl animate-bounce">👑</div>
              <div className="absolute bottom-6 left-12 text-purple-200 text-3xl animate-pulse">💎</div>
              <div className="absolute bottom-8 right-8 text-rose-200 text-2xl animate-spin-slow">🌟</div>
              <div className="absolute top-1/2 left-8 text-yellow-200 text-xl animate-pulse delay-500">💫</div>
              <div className="absolute top-1/2 right-8 text-pink-200 text-xl animate-bounce delay-700">🧚‍♀️</div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-6 flex items-center justify-center">
                <span className="text-4xl mr-4">📸</span>
                ¡Recuerdos del Reino Encantado!
                <span className="text-4xl ml-4">👸</span>
              </h3>
              <p className="text-xl mb-6">
                Cada momento especial queda guardado para siempre en el Álbum Real de la Princesa Sofia
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="font-bold text-xl mb-4 flex items-center text-pink-200">
                    <Crown className="w-6 h-6 mr-2" />
                    Ceremonias Reales:
                  </h4>
                  <ul className="space-y-2 text-pink-100">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></span>
                      Coronación oficial de la princesa
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-pink-300 rounded-full mr-3"></span>
                      Entrega del cetro mágico
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-300 rounded-full mr-3"></span>
                      Baile real con invitados
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-rose-300 rounded-full mr-3"></span>
                      Momento del pastel real
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="font-bold text-xl mb-4 flex items-center text-purple-200">
                    <Sparkles className="w-6 h-6 mr-2" />
                    Aventuras Mágicas:
                  </h4>
                  <ul className="space-y-2 text-purple-100">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Búsqueda del tesoro encantado
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                      Espectáculo de hadas madrinas
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></span>
                      Paseo en carruaje mágico
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-pink-300 rounded-full mr-3"></span>
                      Lluvia de estrellas final
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center space-x-4 text-3xl">
                ✨ 👑 💎 🏰 🧚‍♀️ 🦄 🌟 💫
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de imagen VIP */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-5xl max-h-full">
            {/* Botón cerrar real */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border-2 border-white/30"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navegación anterior */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border-2 border-white/30"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Navegación siguiente */}
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border-2 border-white/30"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Marco dorado para la imagen principal */}
            <div className="bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-300 rounded-2xl p-2">
              <Image
                src={selectedCategory.images[selectedImageIndex]}
                alt={`${selectedCategory.name} ${selectedImageIndex + 1}`}
                width={900}
                height={700}
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
              />
            </div>

            {/* Información de la imagen real */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-lg rounded-2xl p-6 text-white border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-xl flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-yellow-300" />
                    {selectedCategory.name} - Imagen Real {selectedImageIndex + 1} de {selectedCategory.images.length}
                  </p>
                  <p className="text-pink-200 mt-1">
                    Momento mágico capturado en el {selectedCategory.name.toLowerCase()}
                  </p>
                </div>
                <div className="flex space-x-2 text-2xl">
                  <span className="animate-pulse">✨</span>
                  <span className="animate-bounce">💎</span>
                  <span className="animate-pulse delay-300">🌟</span>
                </div>
              </div>
            </div>

            {/* Efectos mágicos del modal */}
            <div className="absolute top-4 left-4 text-yellow-300 text-2xl animate-ping">✨</div>
            <div className="absolute top-8 right-20 text-pink-300 text-xl animate-bounce">💎</div>
            <div className="absolute bottom-20 left-8 text-purple-300 text-2xl animate-pulse">🌟</div>
          </div>
        </div>
      )}
    </section>
  )
}
