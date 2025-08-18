"use client"

import Image from 'next/image'
import { 
  MapPin, 
  Calendar, 
  PawPrint, 
  MapIcon, 
  Clock, 
  Heart, 
  Info, 
  Star
} from 'lucide-react'
import { catBirthdayPremiumData } from './data/premium-demo-data'

export function CatInfo() {
  const { cat, event, petFriendly, otherPetsWelcome, restrictions } = catBirthdayPremiumData
  
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título de sección */}
          <div className="text-center mb-12">
            <div className="inline-block p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Info className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-purple-800">
              Todo Sobre la Celebración
            </h2>
            <p className="text-purple-600 mt-2">
              Detalles importantes para celebrar junto a {cat.name}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Información del gato */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 transform transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-bold mb-6 text-purple-700 flex items-center">
                <PawPrint className="w-5 h-5 mr-2" />
                Sobre el Festejado
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="relative w-40 h-40 flex-shrink-0 mx-auto sm:mx-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 animate-pulse opacity-50"></div>
                  <div className="absolute inset-1">
                    <Image 
                      src={cat.photo}
                      alt={cat.name}
                      fill
                      className="object-cover rounded-full border-4 border-white"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <h4 className="text-2xl font-bold text-purple-800">{cat.name}</h4>
                    <span className="ml-3 py-1 px-3 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {cat.breed}
                    </span>
                  </div>
                  
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      <span className="font-medium">Edad:</span>
                      <span className="ml-1">{cat.age.human} años (humanos) / {cat.age.cat} años (gatunos)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      <span className="font-medium">Personalidad:</span>
                      <span className="ml-1">{catBirthdayPremiumData.personality.temperament}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      <span className="font-medium">Actividad favorita:</span>
                      <span className="ml-1">{cat.favorites.activities[0]}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 italic border-l-4 border-purple-300 pl-4 py-1">
                &ldquo;{event.description}&rdquo;
              </p>
              
              <div className="mt-auto">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-3">Información importante</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mt-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium">Código de vestimenta:</span>
                        <span className="ml-1">{event.dress_code}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium">Amigable para mascotas:</span>
                        <span className="ml-1">{petFriendly ? "Sí, bienvenidas" : "No"}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium">Se permiten otras mascotas:</span>
                        <span className="ml-1">{otherPetsWelcome ? "Sí" : "No"}</span>
                      </div>
                    </li>
                  </ul>
                  
                  {/* Restricciones */}
                  {restrictions && restrictions.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-purple-200">
                      <h5 className="font-medium text-purple-800 mb-2">Consideraciones:</h5>
                      <ul className="space-y-2">
                        {restrictions.map((restriction, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <div className="mt-1 w-3 h-3 bg-pink-400 rounded-full mr-2 flex-shrink-0"></div>
                            {restriction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Información del evento y mapa */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 transform transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-bold mb-6 text-purple-700 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Detalles del Evento
              </h3>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2 flex items-center text-lg">
                  <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                  Ubicación
                </h4>
                <p className="text-lg mb-1 font-medium">{event.location.name}</p>
                <p className="text-gray-600 mb-4">{event.location.address}</p>
                
                {/* Mapa interactivo premium */}
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden border-2 border-purple-200 shadow-md">
                  <iframe
                    src={`https://maps.google.com/maps?q=${event.location.coordinates.lat},${event.location.coordinates.lng}&z=15&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  
                  {/* Overlay decorativo */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                </div>
                
                {/* Botones de acción para el mapa */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${event.location.coordinates.lat},${event.location.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg transition-all shadow-md flex-grow"
                  >
                    <MapIcon className="w-4 h-4" />
                    Abrir en Google Maps
                  </a>
                  
                  <button
                    className="flex items-center justify-center gap-2 bg-purple-100 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-200 transition-all shadow-sm flex-grow"
                  >
                    <Clock className="w-4 h-4" />
                    Ver tiempo estimado
                  </button>
                </div>
              </div>
              
              {/* Horarios importantes */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center text-lg">
                  <Clock className="w-4 h-4 mr-2 text-purple-500" />
                  Horarios Importantes
                </h4>
                
                <ul className="space-y-3">
                  {catBirthdayPremiumData.activities.slice(0, 4).map((activity, index) => (
                    <li key={index} className="flex items-center py-2 border-b border-purple-100">
                      <div className="w-12 text-center text-purple-700 font-bold">
                        {activity.time}
                      </div>
                      <div className="ml-4 flex-1">
                        {activity.activity}
                      </div>
                    </li>
                  ))}
                </ul>
                
                <button className="mt-3 text-purple-600 text-sm flex items-center hover:text-purple-800">
                  <span>Ver cronograma completo</span>
                  <Star className="w-3 h-3 ml-1" />
                </button>
              </div>
              
              <div className="mt-auto">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-5 border border-pink-200">
                  <h4 className="font-bold text-purple-800 mb-3 flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-pink-500 fill-current" />
                    RSVP
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Por favor confirma tu asistencia antes del <strong>{new Date(event.rsvp_deadline).toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })}</strong>.
                  </p>
                  <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg shadow-md transition-all">
                    Confirmar Asistencia
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Nota del demo */}
          <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
            <p className="text-sm text-purple-800">
              <strong>💡 Demo Premium:</strong> Esta sección incluye mapa interactivo, información detallada, y botones de acción. 
              En tu invitación real, podrás personalizar todos los elementos y añadir funcionalidades adicionales.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
