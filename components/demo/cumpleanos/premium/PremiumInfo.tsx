"use client"

import { MapPin, Clock, Users, Shirt, AlertCircle, Zap, Shield } from 'lucide-react'
import { premiumDemoData } from './data/premium-demo-data'

export function PremiumInfo() {
  const { event } = premiumDemoData

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-red-50 relative overflow-hidden">
      {/* Efectos de fondo heroicos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-red-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-yellow-400 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título heroico */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              🦸‍♀️ Información de la Misión
            </h2>
            <Zap className="w-8 h-8 text-red-600 animate-bounce" />
          </div>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto font-medium">
            Todo lo que necesitas saber para unirte a la Liga de Súper Héroes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Información de la ceremonia heroica */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
              🏢 Base de Operaciones Principal
              <div className="ml-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0 animate-pulse" />
                <div>
                  <p className="font-semibold text-gray-800">Fecha y Hora de Activación</p>
                  <p className="text-gray-600">{event.ceremony.date}</p>
                  <p className="text-blue-700 font-medium">{event.ceremony.time}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0 animate-bounce" />
                <div>
                  <p className="font-semibold text-gray-800">{event.ceremony.location}</p>
                  <p className="text-gray-600">{event.ceremony.address}</p>
                  <div className="mt-2 inline-flex items-center space-x-2 bg-blue-100 rounded-lg px-3 py-1">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-700 font-medium">Zona de Alto Poder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información de la celebración */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-l-4 border-red-500 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
              🎉 Celebración Heroica
              <div className="ml-2 w-3 h-3 bg-red-500 rounded-full animate-pulse delay-300"></div>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-red-600 mt-1 flex-shrink-0 animate-pulse" />
                <div>
                  <p className="font-semibold text-gray-800">Momento de la Victoria</p>
                  <p className="text-gray-600">{event.celebration.date}</p>
                  <p className="text-red-700 font-medium">{event.celebration.time}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0 animate-bounce" />
                <div>
                  <p className="font-semibold text-gray-800">{event.celebration.location}</p>
                  <p className="text-gray-600">{event.celebration.address}</p>
                  <div className="mt-2 inline-flex items-center space-x-2 bg-red-100 rounded-lg px-3 py-1">
                    <Shield className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-700 font-medium">Área Protegida</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información de la familia heroica */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-l-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
              👨‍👩‍👦 Liga de Protectores
              <div className="ml-2 w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-500"></div>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0 animate-pulse" />
                <div>
                  <p className="font-semibold text-gray-800">Guardianes Principales</p>
                  <div className="space-y-1">
                    <p className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      {event.parents.father}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                      {event.parents.mother}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0 animate-bounce" />
                <div>
                  <p className="font-semibold text-gray-800">Mentores Heroicos</p>
                  <div className="space-y-1">
                    <p className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      {event.padrinos.padrino}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      {event.padrinos.madrina}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Código de vestimenta y restricciones heroicas */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-l-4 border-yellow-500 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center">
              👕 Protocolo Heroico
              <div className="ml-2 w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-700"></div>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shirt className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0 animate-pulse" />
                <div>
                  <p className="font-semibold text-gray-800">Uniforme de Héroe</p>
                  <p className="text-gray-600">{event.dressCode}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">🦸‍♂️ Capas</span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-xs font-medium">🎭 Máscaras</span>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs font-medium">⚡ Poderes</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0 animate-bounce" />
                <div>
                  <p className="font-semibold text-gray-800">Reglas de Seguridad</p>
                  <p className="text-gray-600">{event.restrictions}</p>
                  <div className="mt-2 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                    <p className="text-sm text-yellow-700">
                      ⚠️ Zona libre de villanos y kriptonita para garantizar la diversión de todos los héroes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action heroico */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 rounded-3xl p-8 text-white max-w-4xl mx-auto relative overflow-hidden">
            {/* Efectos de fondo */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-4 left-4 text-yellow-400 text-2xl animate-ping">⚡</div>
              <div className="absolute top-6 right-8 text-blue-300 text-xl animate-bounce">🚀</div>
              <div className="absolute bottom-4 left-8 text-pink-300 text-2xl animate-pulse">💫</div>
              <div className="absolute bottom-6 right-4 text-green-300 text-xl animate-spin-slow">🌟</div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4 flex items-center justify-center">
                <span className="text-4xl mr-3">🦸‍♀️</span>
                ¡Únete a la Liga de Súper Héroes!
                <span className="text-4xl ml-3">🦸‍♂️</span>
              </h3>
              <p className="text-xl mb-6">
                Una aventura épica llena de poderes, valentía y diversión heroica te espera
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Poderes incluidos:
                  </h4>
                  <ul className="space-y-1 text-blue-100">
                    <li>• Súper fuerza para romper piñatas</li>
                    <li>• Velocidad para ganar todos los juegos</li>
                    <li>• Vuelo en la pista de baile</li>
                    <li>• Visión de rayos X para encontrar dulces</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Misiones especiales:
                  </h4>
                  <ul className="space-y-1 text-red-100">
                    <li>• Rescate del pastel perdido</li>
                    <li>• Batalla contra el villano Aburrimiento</li>
                    <li>• Entrenamiento en la pista secreta</li>
                    <li>• Ceremonia de graduación heroica</li>
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
