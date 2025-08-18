"use client"

import { Clock, Zap, Shield } from 'lucide-react'
import { premiumDemoData } from './data/premium-demo-data'

export function PremiumTimeline() {
  const { timeline } = premiumDemoData

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Efectos de fondo heroicos */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-red-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Partículas heroicas */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-700"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título heroico */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-blue-400 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-black text-white">
              🕐 Cronograma de Misiones Heroicas
            </h2>
            <Zap className="w-8 h-8 text-yellow-400 animate-bounce" />
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            El itinerario completo para convertirnos en los mejores súper héroes
          </p>
        </div>

        {/* Timeline heroico */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Línea central con efectos */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-400 to-red-400 rounded-full shadow-lg"></div>

            {/* Eventos del timeline */}
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Círculo central heroico */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-blue-400 to-red-400 rounded-full flex items-center justify-center border-4 border-white shadow-2xl z-10 group hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl group-hover:animate-bounce">{event.icon}</span>
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                  </div>

                  {/* Contenido del evento */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 group hover:scale-105">
                      {/* Hora heroica */}
                      <div className={`flex items-center mb-4 text-blue-300 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex items-center space-x-2 bg-blue-500/20 rounded-lg px-3 py-1">
                          <Clock className="w-4 h-4 animate-pulse" />
                          <span className="font-bold text-lg">{event.time}</span>
                        </div>
                      </div>

                      {/* Actividad */}
                      <h3 className="text-2xl font-black text-white mb-3 group-hover:text-blue-200 transition-colors">
                        {event.activity}
                      </h3>

                      {/* Descripción */}
                      <p className="text-blue-100 leading-relaxed mb-4">
                        {event.description}
                      </p>

                      {/* Elementos adicionales según el tipo de actividad */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {event.activity.includes('Entrenamiento') && (
                          <span className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                            <Shield className="w-3 h-3 mr-1" />
                            Misión de Fuerza
                          </span>
                        )}
                        {event.activity.includes('Misión') && (
                          <span className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                            <Zap className="w-3 h-3 mr-1" />
                            Aventura Épica
                          </span>
                        )}
                        {event.activity.includes('Ceremonia') && (
                          <span className="bg-yellow-500/20 text-yellow-200 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                            <span className="w-3 h-3 mr-1">🏆</span>
                            Momento Heroico
                          </span>
                        )}
                      </div>

                      {/* Decoración temática */}
                      <div className="mt-4 flex justify-center">
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 rounded-full"></div>
                      </div>
                    </div>

                    {/* Flecha indicadora heroica */}
                    <div className={`absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}>
                      <div className="relative">
                        <div className="w-0 h-0 border-t-8 border-b-8 border-t-transparent border-b-transparent"
                             style={{
                               borderLeftColor: index % 2 === 0 ? 'transparent' : '#3B82F6',
                               borderRightColor: index % 2 === 0 ? '#3B82F6' : 'transparent',
                               borderLeftWidth: index % 2 === 0 ? '0px' : '16px',
                               borderRightWidth: index % 2 === 0 ? '16px' : '0px'
                             }}>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Información adicional heroica */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 rounded-3xl p-10 text-white max-w-4xl mx-auto relative overflow-hidden">
            {/* Efectos de fondo */}
            <div className="absolute inset-0">
              <div className="absolute top-4 left-8 text-yellow-400 text-3xl animate-ping">⚡</div>
              <div className="absolute top-8 right-12 text-blue-300 text-2xl animate-bounce">🚀</div>
              <div className="absolute bottom-6 left-12 text-pink-300 text-3xl animate-pulse">💫</div>
              <div className="absolute bottom-4 right-8 text-green-300 text-2xl animate-spin-slow">🌟</div>
              <div className="absolute top-1/2 left-6 text-purple-300 text-xl animate-pulse delay-500">💎</div>
              <div className="absolute top-1/2 right-6 text-orange-300 text-xl animate-bounce delay-700">🔥</div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-6 flex items-center justify-center">
                <span className="text-4xl mr-4">🦸‍♀️</span>
                ¡Manual del Súper Héroe!
                <span className="text-4xl ml-4">🦸‍♂️</span>
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="font-bold text-xl mb-4 flex items-center text-blue-200">
                    <Shield className="w-5 h-5 mr-2" />
                    Kit de Súper Héroe:
                  </h4>
                  <ul className="space-y-2 text-blue-100">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Capa (obligatoria para volar)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                      Máscara de héroe
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      Traje de combate
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      Cinturón de utilidades
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="font-bold text-xl mb-4 flex items-center text-red-200">
                    <Zap className="w-5 h-5 mr-2" />
                    Poderes Especiales:
                  </h4>
                  <ul className="space-y-2 text-red-100">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Súper fuerza anti-villanos
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                      Velocidad de rayo
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      Visión de rayos X
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      Vuelo supersónico
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="font-bold text-xl mb-4 flex items-center text-yellow-200">
                    <span className="text-lg mr-2">🏆</span>
                    Misiones Épicas:
                  </h4>
                  <ul className="space-y-2 text-yellow-100">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Rescate del tesoro perdido
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                      Batalla vs. el Aburrimiento
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      Entrenamiento de élite
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      Graduación heroica
                    </li>
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
