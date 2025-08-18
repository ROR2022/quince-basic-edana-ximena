"use client"

import Image from 'next/image'
import { dogBirthdayDemoData } from './data/basic-demo-data'
import { MapPin, Calendar, PawPrint, Gift } from 'lucide-react'

export function DogInfo() {
  const { dog, event, dressCode, petFriendly, otherPetsWelcome } = dogBirthdayDemoData
  
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título de sección */}
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">
            Información del Evento
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Información del perro */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                <PawPrint className="w-5 h-5 mr-2" />
                Sobre el Cumpleañero
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative w-32 h-32 flex-shrink-0 mx-auto sm:mx-0">
                  <Image 
                    src={dog.photo}
                    alt={dog.name}
                    fill
                    className="object-cover rounded-full border-4 border-blue-200"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-2">{dog.name}</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li><span className="font-medium">Raza:</span> {dog.breed}</li>
                    <li><span className="font-medium">Edad:</span> {dog.age.human} años (humanos) / {dog.age.dog} años (perrunos)</li>
                    <li><span className="font-medium">Personalidad:</span> Juguetón y amigable</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                {event.description}
              </p>
              
              <div className="mt-auto">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2">Información importante</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="font-medium">Código de vestimenta:</span>
                      <span className="ml-1">{dressCode}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="font-medium">Amigable para mascotas:</span>
                      <span className="ml-1">{petFriendly ? "Sí" : "No"}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="font-medium">Se permiten otras mascotas:</span>
                      <span className="ml-1">{otherPetsWelcome ? "Sí, con correa" : "No"}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Información del evento y mapa */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Detalles del Evento
              </h3>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-red-500" />
                  Ubicación
                </h4>
                <p className="mb-1">{event.location.name}</p>
                <p className="text-gray-600 text-sm mb-3">{event.location.address}</p>
                
                {/* Botón para ver en Google Maps */}
                <div className="w-full mt-2">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg w-full transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                    Ver ubicación en Google Maps
                  </a>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                  <h4 className="font-semibold text-amber-800 mb-2 flex items-center">
                    <Gift className="w-4 h-4 mr-2" />
                    Sugerencias de regalos
                  </h4>
                  <ul className="space-y-1 text-sm grid grid-cols-2 gap-x-2">
                    {dogBirthdayDemoData.gifts.map((gift, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                        {gift}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
