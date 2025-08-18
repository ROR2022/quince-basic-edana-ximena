"use client"

import { Crown, Sparkles, CheckCircle, Clock, AlertCircle, Heart, Star } from 'lucide-react'
import { vipDemoData } from './data/vip-demo-data'

export function VipGuestList() {
  const { guestList } = vipDemoData

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />
      case 'declined':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado'
      case 'pending':
        return 'Pendiente'
      case 'declined':
        return 'Declinado'
      default:
        return 'Sin respuesta'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 border-green-400/50'
      case 'pending':
        return 'bg-yellow-500/20 border-yellow-400/50'
      case 'declined':
        return 'bg-red-500/20 border-red-400/50'
      default:
        return 'bg-gray-500/20 border-gray-400/50'
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 relative overflow-hidden">
      {/* Efectos mágicos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-pink-200/25 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-rose-200/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Partículas brillantes */}
        <div className="absolute top-1/6 left-1/5 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-1/4 right-1/5 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-700 opacity-70"></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-rose-400 rounded-full animate-ping delay-300 opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título real */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-4 mb-6">
            <Crown className="w-10 h-10 text-purple-600 animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              {guestList.title}
            </h2>
            <Sparkles className="w-10 h-10 text-pink-600 animate-bounce" />
          </div>
          <p className="text-2xl text-purple-700 max-w-3xl mx-auto font-medium">
            {guestList.description}
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <span className="text-3xl animate-pulse">✨</span>
            <span className="text-2xl animate-bounce delay-300">👑</span>
            <span className="text-3xl animate-pulse delay-500">✨</span>
          </div>
        </div>

        {/* Estadísticas de invitados */}
        <div className="grid md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border-2 border-purple-200 shadow-xl">
            <div className="text-3xl font-black text-purple-600">
              {guestList.guests.length}
            </div>
            <div className="text-purple-700 font-medium">Total Invitados</div>
            <div className="text-2xl mt-2">👥</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border-2 border-green-200 shadow-xl">
            <div className="text-3xl font-black text-green-600">
              {guestList.guests.filter(g => g.status === 'confirmed').length}
            </div>
            <div className="text-green-700 font-medium">Confirmados</div>
            <div className="text-2xl mt-2">✅</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border-2 border-yellow-200 shadow-xl">
            <div className="text-3xl font-black text-yellow-600">
              {guestList.guests.filter(g => g.status === 'pending').length}
            </div>
            <div className="text-yellow-700 font-medium">Pendientes</div>
            <div className="text-2xl mt-2">⏳</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border-2 border-pink-200 shadow-xl">
            <div className="text-3xl font-black text-pink-600">
              {Math.round((guestList.guests.filter(g => g.status === 'confirmed').length / guestList.guests.length) * 100)}%
            </div>
            <div className="text-pink-700 font-medium">Confirmación</div>
            <div className="text-2xl mt-2">📊</div>
          </div>
        </div>

        {/* Lista de invitados */}
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6">
            {guestList.guests.map((guest, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden"
              >
                {/* Efectos de brillo */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400"></div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    {/* Avatar mágico */}
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg relative">
                      {guest.name.charAt(0)}
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                      {guest.status === 'confirmed' && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-purple-800 mb-1 flex items-center">
                        {guest.name}
                        {guest.name.includes('Hada') && <span className="ml-2 text-xl">🧚‍♀️</span>}
                        {guest.name.includes('Príncipe') && <span className="ml-2 text-xl">🤴</span>}
                        {guest.name.includes('Unicornio') && <span className="ml-2 text-xl">🦄</span>}
                        {guest.name.includes('Dragón') && <span className="ml-2 text-xl">🐉</span>}
                        {guest.name.includes('Reina') && <span className="ml-2 text-xl">👸</span>}
                      </h3>
                      <p className="text-purple-600 text-lg font-medium mb-2">{guest.role}</p>
                      {guest.specialNote && (
                        <p className="text-purple-700 text-sm bg-purple-50 rounded-lg px-3 py-1 inline-block">
                          💡 {guest.specialNote}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 ${getStatusBg(guest.status)}`}>
                      {getStatusIcon(guest.status)}
                      <span className="font-bold text-sm">
                        {getStatusText(guest.status)}
                      </span>
                    </div>
                    
                    {/* Elementos especiales según el tipo de invitado */}
                    <div className="mt-3 flex justify-end space-x-2">
                      {guest.name.includes('Hada') && (
                        <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Mágico
                        </span>
                      )}
                      {guest.name.includes('Reina') && (
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                          <Crown className="w-3 h-3 mr-1" />
                          Realeza
                        </span>
                      )}
                      {guest.name.includes('Unicornio') && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Místico
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Decoraciones internas */}
                <div className="absolute top-4 right-6 text-yellow-400 text-lg animate-pulse">✨</div>
                <div className="absolute bottom-4 left-6 text-pink-400 text-sm animate-bounce">💎</div>
              </div>
            ))}
          </div>
        </div>

        {/* Información adicional real */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-10 text-white max-w-4xl mx-auto relative overflow-hidden">
            {/* Efectos de fondo */}
            <div className="absolute inset-0">
              <div className="absolute top-6 left-8 text-yellow-300 text-3xl animate-ping">✨</div>
              <div className="absolute top-8 right-12 text-pink-200 text-2xl animate-bounce">👑</div>
              <div className="absolute bottom-6 left-12 text-purple-200 text-3xl animate-pulse">💎</div>
              <div className="absolute bottom-8 right-8 text-rose-200 text-2xl animate-spin-slow">🌟</div>
              <div className="absolute top-1/2 left-8 text-yellow-200 text-xl animate-pulse delay-500">💫</div>
              <div className="absolute top-1/2 right-8 text-pink-200 text-xl animate-bounce delay-700">🧚‍♀️</div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-6 flex items-center justify-center">
                <span className="text-4xl mr-4">🏰</span>
                ¡Protocolo Real de Invitados!
                <span className="text-4xl ml-4">👸</span>
              </h3>
              <p className="text-xl mb-8">
                Cada invitado especial del reino trae su propia magia y poderes únicos a la celebración
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="font-bold text-xl mb-4 flex items-center text-purple-200">
                    <Crown className="w-6 h-6 mr-2" />
                    Personajes Reales:
                  </h4>
                  <ul className="space-y-2 text-purple-100">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></span>
                      Hadas madrinas con poderes especiales
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-pink-300 rounded-full mr-3"></span>
                      Príncipes encantados del reino
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-300 rounded-full mr-3"></span>
                      Reinas de otros reinos mágicos
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-rose-300 rounded-full mr-3"></span>
                      Guardianes del palacio real
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="font-bold text-xl mb-4 flex items-center text-pink-200">
                    <Sparkles className="w-6 h-6 mr-2" />
                    Criaturas Mágicas:
                  </h4>
                  <ul className="space-y-2 text-pink-100">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Unicornios con cuernos brillantes
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                      Dragones amigables guardianes
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></span>
                      Hadas con polvo de estrellas
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-pink-300 rounded-full mr-3"></span>
                      Mascotas reales encantadas
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="font-bold text-xl mb-4 flex items-center text-rose-200">
                    <Heart className="w-6 h-6 mr-2" />
                    Poderes Especiales:
                  </h4>
                  <ul className="space-y-2 text-rose-100">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                      Concesión de deseos mágicos
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                      Paseos encantados por el reino
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></span>
                      Protección con escudos mágicos
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-pink-300 rounded-full mr-3"></span>
                      Bendiciones de buena fortuna
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center space-x-4 text-3xl">
                👑 🧚‍♀️ 🦄 🏰 💎 🌟 ✨ 💫
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
