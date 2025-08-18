"use client"

import Image from 'next/image'
import { catBirthdayPremiumData } from './data/premium-demo-data'
import { Heart, Share2, ChevronUp, Instagram, Facebook, Twitter } from 'lucide-react'

export function CatThankYou() {
  const { cat, event } = catBirthdayPremiumData

  // Función para manejar el botón de volver arriba
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Contenido principal */}
          <div className="text-center">
            <div className="inline-block h-24 w-24 rounded-full border-4 border-purple-200 p-1 mb-6 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 animate-pulse opacity-30"></div>
              <Image
                src={cat.photo}
                alt={cat.name}
                width={90}
                height={90}
                className="rounded-full object-cover"
              />
            </div>
            
            <h2 className="text-3xl font-bold text-purple-800 mb-4">
              ¡Gracias por ser parte de mi celebración!
            </h2>
            
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              {cat.name} está muy emocionada de celebrar este día especial 
              contigo. Tu presencia hará de esta fiesta un momento inolvidable. 
              ¡Te esperamos con las patas abiertas!
            </p>
            
            {/* Firma */}
            <div className="mb-12">
              <p className="text-xl font-script text-purple-700">Con cariño,</p>
              <h3 className="text-2xl font-bold text-purple-800">{cat.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {`${new Date(event.date).getFullYear() - cat.age.human} - ${new Date(event.date).getFullYear()}`}
              </p>
            </div>
            
            {/* Compartir en redes sociales */}
            <div className="mb-12">
              <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-4">
                Comparte esta invitación
              </h4>
              
              <div className="flex justify-center space-x-4">
                <button className="p-3 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Botón de volver arriba */}
            <div className="flex justify-center">
              <button
                onClick={handleScrollToTop}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full flex items-center shadow-lg transition-all hover:shadow-xl"
              >
                <ChevronUp className="w-5 h-5 mr-2" />
                Volver arriba
              </button>
            </div>
          </div>
          
          {/* Footer del demo */}
          <div className="mt-16 pt-8 border-t border-purple-200">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Heart className="w-5 h-5 text-pink-500 fill-current mr-2" />
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Demo Premium</span> • Invitación de cumpleaños para mascotas
                </p>
              </div>
              
              <div className="text-sm text-purple-700 font-medium">
                Precio: $499 MXN
              </div>
            </div>
            
            {/* Nota del demo */}
            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
              <p className="text-sm text-purple-800">
                <strong>💡 Demo Premium:</strong> Personaliza completamente tu invitación con 
                todos estos componentes y más. Incluye música, galería interactiva, registro de 
                regalos y confirmación de asistencia en un solo lugar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
