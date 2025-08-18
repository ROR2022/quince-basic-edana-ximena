"use client"

import Image from 'next/image'
import { vipDemoData } from './data/vip-demo-data'

export function VipHero() {
  const { hero, event } = vipDemoData

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo mágica */}
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage}
          alt="Tema princesas"
          fill
          className="object-cover scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/50 via-purple-900/40 to-rose-900/50" />
        
        {/* Efectos mágicos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-purple-400/25 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-rose-400/30 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-yellow-400/25 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>

        {/* Partículas mágicas flotantes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/6 left-1/5 w-3 h-3 bg-pink-300 rounded-full animate-ping opacity-70"></div>
          <div className="absolute top-1/4 right-1/5 w-2 h-2 bg-purple-300 rounded-full animate-ping delay-300 opacity-60"></div>
          <div className="absolute top-1/3 left-1/2 w-2.5 h-2.5 bg-rose-300 rounded-full animate-ping delay-600 opacity-65"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-900 opacity-70"></div>
          <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-1200 opacity-80"></div>
        </div>
      </div>

      {/* Contenido principal real */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
        {/* Corona real flotante */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 text-6xl animate-bounce">
          👑
        </div>

        {/* Título mágico */}
        <div className="mb-10">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-rose-300 bg-clip-text text-transparent text-2xl md:text-4xl font-bold animate-pulse flex items-center justify-center">
              ✨ CORONACIÓN REAL ✨
            </span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-6 text-shadow-2xl">
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-rose-300 bg-clip-text text-transparent animate-pulse">
              ¡FELIZ CUMPLEAÑOS!
            </span>
          </h1>
          
          <h2 className="text-6xl md:text-8xl font-black mb-6 transform hover:scale-105 transition-transform duration-500">
            <span className="bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
              {hero.name}
            </span>
          </h2>
          
          <p className="text-2xl md:text-4xl text-pink-200 font-bold animate-bounce flex items-center justify-center">
            <span className="mr-3">🏰</span>
            {hero.subtitle}
            <span className="ml-3">🏰</span>
          </p>
        </div>

        {/* Panel real de información */}
        <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-10 border-2 border-pink-400/50 shadow-2xl relative overflow-hidden">
          {/* Efectos de brillo interno */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-rose-500/10 rounded-3xl"></div>
          
          <div className="grid md:grid-cols-2 gap-10 text-left relative z-10">
            <div className="space-y-5">
              <h3 className="text-3xl font-black text-pink-300 mb-6 flex items-center">
                👸 Perfil de la Princesa
                <div className="ml-3 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
              </h3>
              <div className="space-y-4 text-xl">
                <div className="flex items-center space-x-4">
                  <span className="w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse"></span>
                  <span><span className="text-pink-200 font-bold">Nombre Real:</span> {event.celebrant.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse delay-300"></span>
                  <span><span className="text-pink-200 font-bold">Edad de Reino:</span> {event.celebrant.age}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="w-4 h-4 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full animate-pulse delay-500"></span>
                  <span><span className="text-pink-200 font-bold">Nacimiento:</span> {event.celebrant.birthDate}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-5">
              <h3 className="text-3xl font-black text-purple-300 mb-6 flex items-center">
                🏰 Reino Encantado
                <div className="ml-3 w-4 h-4 bg-purple-400 rounded-full animate-pulse delay-700"></div>
              </h3>
              <div className="space-y-4 text-xl">
                <div className="flex items-center space-x-4">
                  <span className="w-4 h-4 bg-gradient-to-r from-purple-400 to-rose-400 rounded-full animate-pulse"></span>
                  <span><span className="text-purple-200 font-bold">Fecha Real:</span> {event.ceremony.date}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="w-4 h-4 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-pulse delay-300"></span>
                  <span><span className="text-purple-200 font-bold">Hora de Ceremonia:</span> {event.ceremony.time}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse delay-500"></span>
                  <span><span className="text-purple-200 font-bold">Palacio:</span> {event.ceremony.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decoraciones internas */}
          <div className="absolute top-4 left-6 text-yellow-300 text-2xl animate-ping">✨</div>
          <div className="absolute top-6 right-8 text-pink-300 text-xl animate-pulse">💎</div>
          <div className="absolute bottom-4 left-8 text-purple-300 text-2xl animate-bounce">🌟</div>
          <div className="absolute bottom-6 right-6 text-rose-300 text-xl animate-spin-slow">💫</div>
        </div>

        {/* Elementos decorativos mágicos flotantes */}
        <div className="absolute top-10 left-10 text-7xl animate-bounce">
          👸
        </div>
        <div className="absolute top-20 right-10 text-6xl animate-spin-slow">
          ✨
        </div>
        <div className="absolute bottom-20 left-20 text-7xl animate-pulse">
          💎
        </div>
        <div className="absolute bottom-10 right-20 text-6xl animate-bounce delay-1000">
          🌟
        </div>
        <div className="absolute top-1/2 left-10 text-5xl animate-pulse delay-700">
          🧚‍♀️
        </div>
        <div className="absolute top-1/2 right-10 text-5xl animate-bounce delay-300">
          🦄
        </div>
        <div className="absolute top-1/3 left-1/4 text-4xl animate-pulse delay-1200">
          💫
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-4xl animate-bounce delay-900">
          🔮
        </div>
      </div>

      {/* Indicador de scroll mágico */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-10 h-14 border-2 border-pink-400 rounded-full flex justify-center bg-gradient-to-b from-pink-400/20 to-transparent backdrop-blur-sm">
          <div className="w-3 h-5 bg-gradient-to-b from-pink-400 via-purple-400 to-rose-400 rounded-full mt-3 animate-pulse"></div>
        </div>
        <p className="text-sm mt-3 text-pink-200 font-bold">Continúa la magia</p>
      </div>

      {/* Lluvia de estrellas mágicas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/6 left-1/6 w-2 h-2 bg-pink-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-1/4 right-1/6 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping delay-500 opacity-70"></div>
        <div className="absolute top-1/3 left-1/3 w-2.5 h-2.5 bg-rose-300 rounded-full animate-ping delay-1000 opacity-50"></div>
        <div className="absolute bottom-1/6 right-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-ping delay-700 opacity-80"></div>
        <div className="absolute bottom-1/4 left-1/5 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-300 opacity-60"></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-1200 opacity-70"></div>
      </div>

      {/* Efectos de brillo ambiental */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-pink-900/10 to-transparent animate-pulse"></div>
    </section>
  )
}
