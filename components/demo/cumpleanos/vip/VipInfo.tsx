"use client"

import { MapPin, Clock, Users, Shirt, AlertCircle, Crown, Sparkles, Heart, Star } from 'lucide-react'
import { vipDemoData } from './data/vip-demo-data'

export function VipInfo() {
  const { event } = vipDemoData

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 relative overflow-hidden">
      {/* Efectos mágicos de fondo */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-purple-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-pink-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-rose-300 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-yellow-300 rounded-full blur-2xl animate-pulse delay-700"></div>
      </div>

      {/* Partículas brillantes flotantes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/6 left-1/5 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-1/4 right-1/5 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-300 opacity-70"></div>
        <div className="absolute top-1/3 left-1/2 w-2.5 h-2.5 bg-rose-400 rounded-full animate-ping delay-600 opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-900 opacity-80"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping delay-1200 opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título real */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-4 mb-6">
            <Crown className="w-12 h-12 text-purple-600 animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              👸 Información del Reino Encantado
            </h2>
            <Sparkles className="w-12 h-12 text-pink-600 animate-bounce" />
          </div>
          <p className="text-2xl text-purple-700 max-w-3xl mx-auto font-medium">
            Todo lo que necesitas saber para unirte a la coronación real de la Princesa Sofia
          </p>
          <div className="mt-6 flex justify-center space-x-3">
            <span className="text-4xl animate-pulse">✨</span>
            <span className="text-3xl animate-bounce delay-300">👑</span>
            <span className="text-4xl animate-pulse delay-500">✨</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Información de la ceremonia real */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border-2 border-purple-300 transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400"></div>
            
            <h3 className="text-3xl font-black text-purple-800 mb-8 flex items-center">
              🏰 Palacio Real Principal
              <div className="ml-3 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-800">Fecha y Hora de Coronación</p>
                  <p className="text-gray-600 text-lg">{event.ceremony.date}</p>
                  <p className="text-purple-700 font-bold text-lg">{event.ceremony.time}</p>
                  <div className="mt-2 inline-flex items-center space-x-2 bg-purple-100 rounded-lg px-3 py-1">
                    <Crown className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-purple-700 font-medium">Ceremonia Oficial</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white animate-bounce" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-800">{event.ceremony.location}</p>
                  <p className="text-gray-600 text-lg">{event.ceremony.address}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Zona Mágica
                    </span>
                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Protegida por Hadas
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-8 text-yellow-400 text-2xl animate-ping">✨</div>
            <div className="absolute bottom-6 left-8 text-pink-400 text-xl animate-bounce">💎</div>
          </div>

          {/* Información de la celebración */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border-2 border-pink-300 transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400"></div>
            
            <h3 className="text-3xl font-black text-pink-800 mb-8 flex items-center">
              🎉 Gran Celebración Real
              <div className="ml-3 w-4 h-4 bg-pink-500 rounded-full animate-pulse delay-300"></div>
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-800">Momento de la Gran Fiesta</p>
                  <p className="text-gray-600 text-lg">{event.celebration.date}</p>
                  <p className="text-pink-700 font-bold text-lg">{event.celebration.time}</p>
                  <div className="mt-2 inline-flex items-center space-x-2 bg-pink-100 rounded-lg px-3 py-1">
                    <Heart className="w-4 h-4 text-pink-600" />
                    <span className="text-sm text-pink-700 font-medium">Celebración Mágica</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white animate-bounce" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-800">{event.celebration.location}</p>
                  <p className="text-gray-600 text-lg">{event.celebration.address}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                      <Crown className="w-3 h-3 mr-1" />
                      Salón Real
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Área VIP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-8 text-purple-400 text-2xl animate-pulse">👑</div>
            <div className="absolute bottom-6 left-8 text-rose-400 text-xl animate-spin-slow">🌟</div>
          </div>

          {/* Información de la familia real */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border-2 border-rose-300 transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-purple-400 to-pink-400"></div>
            
            <h3 className="text-3xl font-black text-rose-800 mb-8 flex items-center">
              👨‍👩‍👦 Familia Real
              <div className="ml-3 w-4 h-4 bg-rose-500 rounded-full animate-pulse delay-500"></div>
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-800">Reyes del Reino</p>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></span>
                      <p className="text-gray-600 text-lg">{event.parents.father}</p>
                      <span className="text-xl">🤴</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-300"></span>
                      <p className="text-gray-600 text-lg">{event.parents.mother}</p>
                      <span className="text-xl">👸</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Crown className="w-6 h-6 text-white animate-bounce" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-800">Consejeros Reales</p>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                      <p className="text-gray-600 text-lg">{event.padrinos.padrino}</p>
                      <span className="text-lg">🏰</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-300"></span>
                      <p className="text-gray-600 text-lg">{event.padrinos.madrina}</p>
                      <span className="text-lg">👑</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-8 text-yellow-400 text-2xl animate-bounce">🏰</div>
            <div className="absolute bottom-6 left-8 text-purple-400 text-xl animate-pulse">💫</div>
          </div>

          {/* Protocolo real y restricciones */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border-2 border-yellow-300 transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"></div>
            
            <h3 className="text-3xl font-black text-yellow-800 mb-8 flex items-center">
              👕 Protocolo Real de Vestimenta
              <div className="ml-3 w-4 h-4 bg-yellow-500 rounded-full animate-pulse delay-700"></div>
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shirt className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-800">Vestimenta Real Requerida</p>
                  <p className="text-gray-600 text-lg mb-3">{event.dressCode}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                      <span className="mr-1">👗</span>
                      Vestidos Elegantes
                    </span>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                      <span className="mr-1">👑</span>
                      Coronas
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                      <span className="mr-1">✨</span>
                      Zapatos Brillantes
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-white animate-bounce" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-800">Reglas del Reino</p>
                  <p className="text-gray-600 text-lg">{event.restrictions}</p>
                  <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                    <p className="text-sm text-yellow-700 flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      ⚠️ Reino libre de villanos y dragones malvados para garantizar la seguridad de todos los invitados reales
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-8 text-pink-400 text-2xl animate-spin-slow">👗</div>
            <div className="absolute bottom-6 left-8 text-yellow-400 text-xl animate-bounce">✨</div>
          </div>
        </div>

        {/* Call to action real */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-12 text-white max-w-5xl mx-auto relative overflow-hidden">
            {/* Efectos de fondo mágicos */}
            <div className="absolute inset-0">
              <div className="absolute top-8 left-12 text-yellow-300 text-4xl animate-ping">✨</div>
              <div className="absolute top-12 right-16 text-pink-200 text-3xl animate-bounce">👑</div>
              <div className="absolute bottom-8 left-16 text-purple-200 text-4xl animate-pulse">💎</div>
              <div className="absolute bottom-12 right-12 text-rose-200 text-3xl animate-spin-slow">🌟</div>
              <div className="absolute top-1/2 left-12 text-yellow-200 text-2xl animate-pulse delay-500">💫</div>
              <div className="absolute top-1/2 right-12 text-pink-200 text-2xl animate-bounce delay-700">🧚‍♀️</div>
              <div className="absolute top-1/4 left-1/3 text-purple-200 text-xl animate-pulse delay-300">🦄</div>
              <div className="absolute bottom-1/4 right-1/3 text-rose-200 text-xl animate-bounce delay-900">🏰</div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-black mb-8 flex items-center justify-center">
                <span className="text-5xl mr-4">👸</span>
                ¡Únete al Reino Encantado!
                <span className="text-5xl ml-4">🏰</span>
              </h3>
              <p className="text-2xl mb-8">
                Una experiencia mágica llena de coronaciones, hadas madrinas y aventuras reales te espera
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h4 className="font-bold text-2xl mb-4 flex items-center text-purple-200">
                    <Crown className="w-7 h-7 mr-3" />
                    Experiencias Reales:
                  </h4>
                  <ul className="space-y-3 text-purple-100 text-lg">
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-yellow-300 rounded-full mr-3"></span>
                      Coronación oficial con cetro mágico
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-pink-300 rounded-full mr-3"></span>
                      Baile real en el salón del trono
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-purple-300 rounded-full mr-3"></span>
                      Paseo en carruaje dorado
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-rose-300 rounded-full mr-3"></span>
                      Búsqueda del tesoro encantado
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h4 className="font-bold text-2xl mb-4 flex items-center text-pink-200">
                    <Sparkles className="w-7 h-7 mr-3" />
                    Invitados Especiales:
                  </h4>
                  <ul className="space-y-3 text-pink-100 text-lg">
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-blue-300 rounded-full mr-3"></span>
                      Hadas madrinas con poderes reales
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-green-300 rounded-full mr-3"></span>
                      Unicornios mágicos del bosque
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-yellow-300 rounded-full mr-3"></span>
                      Príncipes de reinos vecinos
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-pink-300 rounded-full mr-3"></span>
                      Dragones amigables guardianes
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h4 className="font-bold text-2xl mb-4 flex items-center text-rose-200">
                    <Heart className="w-7 h-7 mr-3" />
                    Momentos Mágicos:
                  </h4>
                  <ul className="space-y-3 text-rose-100 text-lg">
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-blue-300 rounded-full mr-3"></span>
                      Espectáculo de hadas con polvo estelar
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-green-300 rounded-full mr-3"></span>
                      Banquete real con pastel encantado
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-yellow-300 rounded-full mr-3"></span>
                      Lluvia de estrellas como despedida
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-pink-300 rounded-full mr-3"></span>
                      Recuerdos mágicos para toda la vida
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 flex justify-center space-x-4 text-4xl">
                ✨ 👑 💎 🏰 🧚‍♀️ 🦄 🌟 💫 🎭 💖
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
