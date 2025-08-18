"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { catBirthdayPremiumData } from './data/premium-demo-data'
import { Clock, ChevronRight, ChevronLeft, Star, Calendar } from 'lucide-react'

export function CatMemories() {
  const { cat, memories } = catBirthdayPremiumData
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  
  // Formatear fecha para mostrar
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Navegar a un momento específico
  const goToMemory = (index: number) => {
    if (index === activeIndex || isAnimating) return
    
    setIsAnimating(true)
    setActiveIndex(index)
    
    // Desactivar animación después de un tiempo
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  // Navegar al momento anterior
  const prevMemory = () => {
    if (activeIndex > 0) {
      goToMemory(activeIndex - 1)
    }
  }

  // Navegar al siguiente momento
  const nextMemory = () => {
    if (activeIndex < memories.length - 1) {
      goToMemory(activeIndex + 1)
    }
  }

  // Hacer scroll en la línea del tiempo para mantener visible el elemento activo
  useEffect(() => {
    if (!timelineRef.current) return
    
    const timelineElement = timelineRef.current
    const activeElement = timelineElement.querySelector(`.memory-dot-${activeIndex}`)
    
    if (activeElement) {
      const timelineRect = timelineElement.getBoundingClientRect()
      const activeRect = activeElement.getBoundingClientRect()
      
      const isVisible = 
        activeRect.left >= timelineRect.left - 20 &&
        activeRect.right <= timelineRect.right + 20
      
      if (!isVisible) {
        const scrollLeft = 
          activeRect.left - timelineRect.left - timelineRect.width / 2 + activeRect.width / 2
        
        timelineElement.scrollTo({
          left: timelineElement.scrollLeft + scrollLeft,
          behavior: 'smooth'
        })
      }
    }
  }, [activeIndex])

  return (
    <section className="py-16 bg-gradient-to-br from-purple-100 via-white to-pink-100">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título de sección */}
          <div className="text-center mb-12">
            <div className="inline-block p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Recuerdos de {cat.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un recorrido por los momentos más especiales en la vida de nuestra festejada
            </p>
          </div>

          {/* Línea de tiempo */}
          <div 
            className="relative mb-8 overflow-x-auto pb-4 mx-auto max-w-4xl scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent"
            ref={timelineRef}
          >
            <div className="flex items-center h-24 relative px-8">
              {/* Línea horizontal */}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-purple-300 to-pink-300 top-1/2 transform -translate-y-1/2"></div>
              
              {/* Puntos de la línea del tiempo */}
              <div className="flex items-center justify-between min-w-max space-x-16 md:space-x-24 lg:space-x-32 px-4">
                {memories.map((memory, index) => (
                  <button
                    key={index}
                    onClick={() => goToMemory(index)}
                    className={`relative flex flex-col items-center memory-dot-${index}`}
                  >
                    {/* Indicador de fecha */}
                    <div className={`absolute -top-9 whitespace-nowrap text-xs font-medium transition-all duration-300 ${
                      activeIndex === index 
                        ? 'text-purple-700 scale-110' 
                        : 'text-gray-500'
                    }`}>
                      {formatDate(memory.date)}
                    </div>
                    
                    {/* Punto en la línea */}
                    <div className={`w-5 h-5 rounded-full transition-all duration-300 z-10 ${
                      activeIndex === index
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125 shadow-lg'
                        : memory.highlight 
                          ? 'bg-purple-300' 
                          : 'bg-gray-300 hover:bg-purple-200'
                    }`}></div>
                    
                    {/* Título corto abajo */}
                    <div className={`absolute -bottom-9 whitespace-nowrap text-xs font-medium transition-all duration-300 ${
                      activeIndex === index 
                        ? 'text-purple-700 scale-110' 
                        : 'text-gray-500'
                    }`}>
                      {memory.title.length > 20 ? `${memory.title.substring(0, 18)}...` : memory.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controles de navegación */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={prevMemory}
              disabled={activeIndex === 0 || isAnimating}
              className={`p-2 rounded-full ${
                activeIndex === 0 || isAnimating
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={nextMemory}
              disabled={activeIndex === memories.length - 1 || isAnimating}
              className={`p-2 rounded-full ${
                activeIndex === memories.length - 1 || isAnimating
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Visualización del recuerdo seleccionado */}
          <div 
            className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform ${
              isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Imagen del recuerdo */}
              <div className="relative h-64 md:h-auto md:aspect-square overflow-hidden">
                <Image
                  src={memories[activeIndex].photo}
                  alt={memories[activeIndex].title}
                  fill
                  className="object-cover"
                />
                
                {/* Etiqueta destacada */}
                {memories[activeIndex].highlight && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Momento destacado
                  </div>
                )}
                
                {/* Fecha */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center">
                  <Calendar className="w-3 h-3 mr-1.5" />
                  {formatDate(memories[activeIndex].date)}
                </div>
              </div>
              
              {/* Contenido del recuerdo */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {memories[activeIndex].title}
                  </h3>
                  
                  <p className="text-gray-700 mb-6">
                    {memories[activeIndex].description}
                  </p>
                </div>
                
                {/* Indicadores de posición */}
                <div className="flex justify-center gap-1.5 pt-4 border-t border-gray-100">
                  {memories.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => goToMemory(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeIndex === index 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-6' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Ver recuerdo ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Nota del demo */}
          <div className="mt-10 p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
            <p className="text-sm text-purple-800">
              <strong>💡 Demo Premium:</strong> La línea del tiempo interactiva permite mostrar 
              los momentos más importantes en la vida de tu mascota. En tu invitación personalizada,
              podrás añadir tantos recuerdos como desees con fechas, fotos y descripciones.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
