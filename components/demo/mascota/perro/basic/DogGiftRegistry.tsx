"use client"

import { Gift, Bone, ShoppingBag, Heart } from 'lucide-react'
import { dogBirthdayDemoData } from './data/basic-demo-data'
import Image from 'next/image'

export function DogGiftRegistry() {
  const { dog, gifts } = dogBirthdayDemoData
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'toys':
        return <Bone className="w-6 h-6" />
      case 'treats':
        return <ShoppingBag className="w-6 h-6" />
      case 'donation':
        return <Heart className="w-6 h-6" />
      default:
        return <Gift className="w-6 h-6" />
    }
  }

  // Categorías de regalos predefinidas
  const giftCategories = [
    {
      type: 'toys',
      title: 'Juguetes',
      description: 'Pelotas, mordedores y juguetes interactivos para diversión sin fin',
      icon: 'toys',
      details: `Sugerencias:\n• Pelotas de tenis\n• Juguetes con sonido\n• Cuerdas para jalar\n• Juguetes para masticar`
    },
    {
      type: 'treats',
      title: 'Golosinas y Accesorios',
      description: 'Premios deliciosos y accesorios de moda para un perrito feliz',
      icon: 'treats',
      details: `Sugerencias:\n• Galletas para perro\n• Premios dentales\n• Collares decorativos\n• Bandanas y disfraces divertidos`
    },
    {
      type: 'donation',
      title: 'Donación a Refugio',
      description: 'Si prefieres, puedes hacer una donación a nombre de ' + dog.name + ' para ayudar a otros perritos',
      icon: 'donation',
      details: `Refugio "Patitas Felices"\nCuenta: 1234-5678-9012\nMenciona el nombre de ${dog.name} al hacer tu donación`
    }
  ]

  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4 relative">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2">
              <Image 
                src="/images/pets/icons/bone-icon.svg" 
                alt="Hueso" 
                width={24} 
                height={24}
              />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Regalos para el Cumpleañero
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Si deseas traer un detalle para {dog.name}, aquí hay algunas ideas que le encantarán.
          </p>
        </div>

        {/* Opciones de regalo */}
        <div className="grid md:grid-cols-3 gap-6">
          {giftCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Icono */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white">
                  {getIcon(category.icon)}
                </div>
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {category.title}
              </h3>

              {/* Descripción */}
              <p className="text-gray-600 text-center mb-4">
                {category.description}
              </p>

              {/* Detalles */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {category.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-blue-100 to-cyan-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
            Información Importante
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Preferencias de {dog.name}:
              </h4>
              <ul className="text-sm text-gray-600 space-y-2 pl-5">
                <li>• Tamaño de juguetes: Medianos</li>
                <li>• Color favorito: Azul</li>
                <li>• Le encanta: Pelotas y juguetes que hacen ruido</li>
                <li>• No le gustan: Juguetes muy duros</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Consideraciones:
              </h4>
              <ul className="text-sm text-gray-600 space-y-2 pl-5">
                <li>• No tiene alergias conocidas</li>
                <li>• Evitar golosinas con chocolate (tóxico para perros)</li>
                <li>• Todos los juguetes deben ser para perros</li>
                <li>• Si traes un regalo, envuélvelo en papel seguro</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lista de regalos específicos */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4 text-center flex items-center justify-center">
            <Image 
              src="/images/pets/icons/paw-icon.svg" 
              alt="Huella" 
              width={24} 
              height={24}
              className="mr-2" 
            />
            Lista de deseos de {dog.name}
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {gifts.map((gift, index) => (
              <div 
                key={index} 
                className="bg-blue-50 rounded-lg p-3 text-center text-gray-700 text-sm border border-blue-100"
              >
                {gift}
              </div>
            ))}
          </div>
        </div>

        {/* Nota del demo */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 text-center">
            <strong>🐾 Demo:</strong> Esta información es de ejemplo. 
            En tu invitación real, podrás personalizar completamente las opciones de regalo para tu mascota.
          </p>
        </div>
      </div>
    </section>
  )
}
