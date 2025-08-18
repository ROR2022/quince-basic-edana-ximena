"use client"

import { Clock, Crown, Sparkles, Heart, Star } from 'lucide-react'
import { vipDemoData } from './data/vip-demo-data'

export function VipTimeline() {
  const { timeline } = vipDemoData

  return (
    <section className="py-16 bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 relative overflow-hidden">
      {/* Efectos mágicos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-pink-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-44 h-44 bg-rose-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-yellow-500/15 rounded-full blur-2xl animate-pulse delay-700"></div>
      </div>

      {/* Lluvia de estrellas mágica */}
      <div className="absolute inset-0">
        <div className="absolute top-1/6 left-1/5 w-4 h-4 bg-pink-300 rounded-full animate-ping opacity-70"></div>
        <div className="absolute top-1/4 right-1/5 w-3 h-3 bg-purple-300 rounded-full animate-ping delay-300 opacity-60"></div>
        <div className="absolute top-1/3 left-1/2 w-3.5 h-3.5 bg-rose-300 rounded-full animate-ping delay-600 opacity-65"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 bg-yellow-300 rounded-full animate-ping delay-900 opacity-70"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-1200 opacity-80"></div>
        <div className="absolute top-2/3 right-1/5 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-400 opacity-60"></div>
        <div className="absolute top-1/2 left-1/6 w-2.5 h-2.5 bg-rose-400 rounded-full animate-ping delay-800 opacity-75"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título real mágico */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-4 mb-6">
            <Crown className="w-12 h-12 text-yellow-400 animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-black text-white">
              🕐 Cronograma Real del Reino Encantado
            </h2>
            <Sparkles className="w-12 h-12 text-pink-400 animate-bounce" />
          </div>
          <p className="text-2xl text-pink-200 max-w-3xl mx-auto">
            El itinerario completo para la coronación más mágica del reino
          </p>
          <div className="mt-6 flex justify-center space-x-3 text-4xl">
            <span className="animate-pulse">✨</span>
            <span className="animate-bounce delay-300">👑</span>
            <span className="animate-pulse delay-500">💎</span>
            <span className="animate-bounce delay-700">🏰</span>
          </div>
        </div>

        {/* Timeline real */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Línea central mágica con gradiente */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-yellow-400 via-pink-400 via-purple-400 to-rose-400 rounded-full shadow-2xl"></div>

            {/* Eventos del timeline real */}
            <div className="space-y-16">
              {timeline.map((event, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Círculo central real */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full flex items-center justify-center border-4 border-white shadow-2xl z-10 group hover:scale-125 transition-transform duration-500">
                    <span className="text-4xl group-hover:animate-bounce">{event.icon}</span>
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-300/40 via-purple-300/40 to-rose-300/40 rounded-full animate-pulse delay-500"></div>
                  </div>

                  {/* Contenido del evento real */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                    <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-pink-400/50 hover:border-pink-400/80 transition-all duration-500 group hover:scale-105 relative overflow-hidden">
                      {/* Marco dorado superior */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"></div>
                      
                      {/* Hora real */}
                      <div className={`flex items-center mb-6 text-pink-300 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex items-center space-x-3 bg-pink-500/20 rounded-xl px-4 py-2 border border-pink-400/30">
                          <Clock className="w-5 h-5 animate-pulse" />
                          <span className="font-black text-xl">{event.time}</span>
                          <Crown className="w-4 h-4 text-yellow-400" />
                        </div>
                      </div>

                      {/* Actividad real */}
                      <h3 className="text-3xl font-black text-white mb-4 group-hover:text-pink-200 transition-colors">
                        {event.activity}
                      </h3>

                      {/* Descripción */}
                      <p className="text-pink-100 leading-relaxed mb-6 text-lg">
                        {event.description}
                      </p>

                      {/* Elementos adicionales según el tipo de actividad */}
                      <div className="flex flex-wrap gap-3 justify-center mb-4">
                        {event.activity.includes('Llegada') && (
                          <span className="bg-yellow-500/20 text-yellow-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center border border-yellow-400/30">
                            <Crown className="w-4 h-4 mr-2" />
                            Entrada Real
                          </span>
                        )}
                        {event.activity.includes('Coronación') && (
                          <span className="bg-purple-500/20 text-purple-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center border border-purple-400/30">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Ceremonia Oficial
                          </span>
                        )}
                        {event.activity.includes('Búsqueda') && (
                          <span className="bg-pink-500/20 text-pink-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center border border-pink-400/30">
                            <Star className="w-4 h-4 mr-2" />
                            Aventura Mágica
                          </span>
                        )}
                        {event.activity.includes('Espectáculo') && (
                          <span className="bg-rose-500/20 text-rose-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center border border-rose-400/30">
                            <Heart className="w-4 h-4 mr-2" />
                            Show Especial
                          </span>
                        )}
                        {event.activity.includes('Banquete') && (
                          <span className="bg-green-500/20 text-green-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center border border-green-400/30">
                            <span className="w-4 h-4 mr-2">🍰</span>
                            Festín Real
                          </span>
                        )}
                        {event.activity.includes('Baile') && (
                          <span className="bg-blue-500/20 text-blue-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center border border-blue-400/30">
                            <span className="w-4 h-4 mr-2">💃</span>
                            Vals Real
                          </span>
                        )}
                        {event.activity.includes('Lluvia') && (
                          <span className="bg-indigo-500/20 text-indigo-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center border border-indigo-400/30">
                            <span className="w-4 h-4 mr-2">✨</span>
                            Final Mágico
                          </span>
                        )}
                      </div>

                      {/* Decoración temática */}
                      <div className="flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 rounded-full"></div>
                      </div>

                      {/* Efectos mágicos internos */}
                      <div className="absolute top-4 right-6 text-yellow-300 text-lg animate-ping">✨</div>
                      <div className="absolute top-6 left-6 text-pink-300 text-sm animate-bounce">💎</div>
                      <div className="absolute bottom-4 right-4 text-purple-300 text-sm animate-pulse">🌟</div>
                      <div className="absolute bottom-6 left-4 text-rose-300 text-xs animate-spin-slow">👑</div>
                    </div>

                    {/* Flecha indicadora real */}
                    <div className={`absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}>
                      <div className="relative">
                        <div className="w-0 h-0 border-t-12 border-b-12 border-t-transparent border-b-transparent"
                             style={{
                               borderLeftColor: index % 2 === 0 ? 'transparent' : '#EC4899',
                               borderRightColor: index % 2 === 0 ? '#EC4899' : 'transparent',
                               borderLeftWidth: index % 2 === 0 ? '0px' : '20px',
                               borderRightWidth: index % 2 === 0 ? '20px' : '0px'
                             }}>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Información adicional real VIP */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl p-12 text-white max-w-6xl mx-auto relative overflow-hidden">
            {/* Efectos de fondo mágicos */}
            <div className="absolute inset-0">
              <div className="absolute top-8 left-16 text-yellow-300 text-4xl animate-ping">✨</div>
              <div className="absolute top-12 right-20 text-pink-200 text-3xl animate-bounce">👑</div>
              <div className="absolute bottom-8 left-20 text-purple-200 text-4xl animate-pulse">💎</div>
              <div className="absolute bottom-12 right-16 text-rose-200 text-3xl animate-spin-slow">🌟</div>
              <div className="absolute top-1/2 left-16 text-yellow-200 text-2xl animate-pulse delay-500">💫</div>
              <div className="absolute top-1/2 right-16 text-pink-200 text-2xl animate-bounce delay-700">🧚‍♀️</div>
              <div className="absolute top-1/4 left-1/3 text-purple-200 text-xl animate-pulse delay-300">🦄</div>
              <div className="absolute bottom-1/4 right-1/3 text-rose-200 text-xl animate-bounce delay-900">🏰</div>
              <div className="absolute top-1/6 right-1/6 text-yellow-200 text-lg animate-spin-slow delay-400">🔮</div>
              <div className="absolute bottom-1/6 left-1/6 text-pink-200 text-lg animate-pulse delay-600">💖</div>
            </div>

            <div className="relative z-10">
              <h3 className="text-4xl font-black mb-8 flex items-center justify-center">
                <span className="text-5xl mr-4">👸</span>
                ¡Guía Completa del Reino!
                <span className="text-5xl ml-4">🏰</span>
              </h3>
              
              <div className="grid md:grid-cols-4 gap-8 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <h4 className="font-black text-2xl mb-6 flex items-center text-purple-200">
                    <Crown className="w-7 h-7 mr-3" />
                    Protocolo Real:
                  </h4>
                  <ul className="space-y-3 text-purple-100 text-lg">
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-yellow-300 rounded-full mr-3"></span>
                      Reverencia al llegar al palacio
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-pink-300 rounded-full mr-3"></span>
                      Uso obligatorio de corona
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-purple-300 rounded-full mr-3"></span>
                      Participación en ceremonias
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-rose-300 rounded-full mr-3"></span>
                      Respeto a criaturas mágicas
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <h4 className="font-black text-2xl mb-6 flex items-center text-pink-200">
                    <Sparkles className="w-7 h-7 mr-3" />
                    Poderes Mágicos:
                  </h4>
                  <ul className="space-y-3 text-pink-100 text-lg">
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-blue-300 rounded-full mr-3"></span>
                      Comunicación con unicornios
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-green-300 rounded-full mr-3"></span>
                      Invocación de hadas madrinas
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-yellow-300 rounded-full mr-3"></span>
                      Creación de luces mágicas
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-pink-300 rounded-full mr-3"></span>
                      Transformación de vestidos
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <h4 className="font-black text-2xl mb-6 flex items-center text-rose-200">
                    <Heart className="w-7 h-7 mr-3" />
                    Tesoros Reales:
                  </h4>
                  <ul className="space-y-3 text-rose-100 text-lg">
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-blue-300 rounded-full mr-3"></span>
                      Cetro de cristal encantado
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-green-300 rounded-full mr-3"></span>
                      Corona de diamantes mágicos
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-yellow-300 rounded-full mr-3"></span>
                      Carruaje dorado volador
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-pink-300 rounded-full mr-3"></span>
                      Espejo mágico del reino
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <h4 className="font-black text-2xl mb-6 flex items-center text-yellow-200">
                    <Star className="w-7 h-7 mr-3" />
                    Lugares Secretos:
                  </h4>
                  <ul className="space-y-3 text-yellow-100 text-lg">
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-blue-300 rounded-full mr-3"></span>
                      Jardín de las hadas danzantes
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-green-300 rounded-full mr-3"></span>
                      Torre de los deseos cumplidos
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-yellow-300 rounded-full mr-3"></span>
                      Bosque de unicornios brillantes
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-pink-300 rounded-full mr-3"></span>
                      Lago de estrellas flotantes
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 flex justify-center space-x-4 text-5xl">
                ✨ 👑 💎 🏰 🧚‍♀️ 🦄 🌟 💫 🎭 💖 🔮 ⭐
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
