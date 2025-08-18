"use client"

import Image from 'next/image'
import { premiumDemoData } from './data/premium-demo-data'

export function PremiumHero() {
  const { hero, event } = premiumDemoData

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo con efecto parallax */}
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage}
          alt="Tema superhéroes"
          fill
          className="object-cover scale-110 animate-pulse"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/40 to-red-900/60" />
        
        {/* Efectos de luces heroicas */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-red-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-yellow-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
        {/* Título heroico con efectos */}
        <div className="mb-8">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 bg-clip-text text-transparent text-2xl md:text-3xl font-bold animate-pulse">
              ⚡ ORIGEN DE UN HÉROE ⚡
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-4 text-shadow-2xl">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent animate-pulse">
              ¡FELIZ CUMPLEAÑOS!
            </span>
          </h1>
          
          <h2 className="text-5xl md:text-7xl font-black mb-4 transform hover:scale-105 transition-transform duration-500">
            <span className="bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
              {hero.name}
            </span>
          </h2>
          
          <p className="text-xl md:text-3xl text-blue-200 font-bold animate-bounce">
            {hero.subtitle}
          </p>
        </div>

        {/* Panel de información heroica */}
        <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 border-2 border-blue-400/50 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-blue-300 mb-4 flex items-center">
                🦸‍♀️ Perfil del Héroe
              </h3>
              <div className="space-y-3 text-lg">
                <div className="flex items-center space-x-3">
                  <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></span>
                  <span><span className="text-blue-200 font-bold">Nombre:</span> {event.celebrant.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-300"></span>
                  <span><span className="text-blue-200 font-bold">Edad:</span> {event.celebrant.age}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-500"></span>
                  <span><span className="text-blue-200 font-bold">Origen:</span> {event.celebrant.birthDate}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-red-300 mb-4 flex items-center">
                🏢 Base de Operaciones
              </h3>
              <div className="space-y-3 text-lg">
                <div className="flex items-center space-x-3">
                  <span className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></span>
                  <span><span className="text-red-200 font-bold">Fecha:</span> {event.ceremony.date}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-300"></span>
                  <span><span className="text-red-200 font-bold">Hora:</span> {event.ceremony.time}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-500"></span>
                  <span><span className="text-red-200 font-bold">Lugar:</span> {event.ceremony.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos heroicos flotantes */}
        <div className="absolute top-10 left-10 text-6xl animate-bounce">
          🦸‍♀️
        </div>
        <div className="absolute top-20 right-10 text-5xl animate-spin-slow">
          ⚡
        </div>
        <div className="absolute bottom-20 left-20 text-6xl animate-pulse">
          💪
        </div>
        <div className="absolute bottom-10 right-20 text-5xl animate-bounce delay-1000">
          🌟
        </div>
        <div className="absolute top-1/2 left-10 text-4xl animate-pulse delay-700">
          🚀
        </div>
        <div className="absolute top-1/2 right-10 text-4xl animate-bounce delay-300">
          🛡️
        </div>
      </div>

      {/* Indicador de scroll heroico */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-8 h-12 border-2 border-blue-400 rounded-full flex justify-center bg-gradient-to-b from-blue-400/20 to-transparent">
          <div className="w-2 h-4 bg-gradient-to-b from-blue-400 to-red-400 rounded-full mt-2 animate-pulse"></div>
        </div>
        <p className="text-sm mt-2 text-blue-200 font-bold">Continúa la aventura</p>
      </div>

      {/* Efectos de partículas heroicas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-700"></div>
      </div>
    </section>
  )
}
