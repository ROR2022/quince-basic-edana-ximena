"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useMusicContext } from '@/context/music-context'
import { catBirthdayPremiumData } from './data/premium-demo-data'

export function CatHero() {
  const { cat, event } = catBirthdayPremiumData
  const { isPlaying, setIsPlaying, setCurrentTrack, setTracksCount } = useMusicContext()
  const [scrollY, setScrollY] = useState(0)
  
  // Efecto de parallax al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Configurar el reproductor de música
  useEffect(() => {
    if (catBirthdayPremiumData.music.tracks.length > 0 && setTracksCount) {
      setTracksCount(catBirthdayPremiumData.music.tracks.length)
      setCurrentTrack(catBirthdayPremiumData.music.defaultTrack)
      if (catBirthdayPremiumData.music.autoplay) {
        setIsPlaying(true)
      }
    }
  }, [setTracksCount, setCurrentTrack, setIsPlaying])

  // Formato de la fecha
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('es-MX', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long',
    year: 'numeric' 
  })
  
  const formattedTime = eventDate.toLocaleTimeString('es-MX', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })

  // Calculamos la edad pero no la utilizamos en este componente
  // Si se necesita en el futuro, descomentar estas líneas
  // const _catYears = cat.age.human
  // const _humanYears = cat.age.cat

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Fondo con imagen y efectos parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      >
        <div className="relative w-full h-full">
          <Image 
            src={cat.photo} 
            alt={cat.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/40 to-purple-900/70"></div>
          
          {/* Decoración de patas de gato */}
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 opacity-60 w-20 h-20 md:w-32 md:h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full text-purple-200">
              <path d="M35,60 C30,50 25,45 15,45 C5,45 5,55 10,60 C15,65 25,65 35,60" fill="currentColor" />
              <path d="M40,45 C35,35 30,30 20,30 C10,30 10,40 15,45 C20,50 30,50 40,45" fill="currentColor" />
              <path d="M55,40 C50,30 45,25 35,25 C25,25 25,35 30,40 C35,45 45,45 55,40" fill="currentColor" />
              <path d="M65,50 C60,40 55,35 45,35 C35,35 35,45 40,50 C45,55 55,55 65,50" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute top-4 right-4 md:top-8 md:right-8 opacity-60 w-20 h-20 md:w-32 md:h-32 rotate-180">
            <svg viewBox="0 0 100 100" className="w-full h-full text-purple-200">
              <path d="M35,60 C30,50 25,45 15,45 C5,45 5,55 10,60 C15,65 25,65 35,60" fill="currentColor" />
              <path d="M40,45 C35,35 30,30 20,30 C10,30 10,40 15,45 C20,50 30,50 40,45" fill="currentColor" />
              <path d="M55,40 C50,30 45,25 35,25 C25,25 25,35 30,40 C35,45 45,45 55,40" fill="currentColor" />
              <path d="M65,50 C60,40 55,35 45,35 C35,35 35,45 40,50 C45,55 55,55 65,50" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Contenido principal con animaciones */}
      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        <div 
          className="animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <h1 className="text-white font-bold text-4xl md:text-6xl mb-4 drop-shadow-lg">
            {event.title}
          </h1>
          
          <div className="mb-6 text-purple-200 font-script text-xl md:text-3xl italic">
            {cat.age.human} años ({cat.age.cat} en años humanos)
          </div>
        </div>
        
        <div 
          className="animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <p className="text-white/90 text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Únete a la celebración del cumpleaños de
            <span className="font-bold bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text"> {cat.name}</span>
            <span className="text-sm ml-2 align-top bg-purple-200 text-purple-800 px-2 py-1 rounded-md">
              {cat.breed}
            </span>
          </p>
        </div>
        
        <div 
          className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="bg-white/20 backdrop-blur-sm py-3 px-5 rounded-xl shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-300">
            <p className="text-sm md:text-base text-white">
              <span className="font-semibold text-purple-200">Fecha:</span> {formattedDate}
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm py-3 px-5 rounded-xl shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-300">
            <p className="text-sm md:text-base text-white">
              <span className="font-semibold text-purple-200">Hora:</span> {formattedTime}
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm py-3 px-5 rounded-xl shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-300">
            <p className="text-sm md:text-base text-white">
              <span className="font-semibold text-purple-200">Lugar:</span> {event.location.name}
            </p>
          </div>
        </div>
        
        {/* CTA Primario */}
        <div 
          className="mt-10 animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
            Confirmar Asistencia
          </button>
        </div>

        {/* Indicador de música */}
        <div 
          className="mt-8 flex items-center justify-center gap-2 animate-fade-in-up"
          style={{ animationDelay: '1s' }}
        >
          <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-pink-400 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-white/80">
            {isPlaying ? 'Música reproduciéndose' : 'Música disponible'}
          </span>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/80">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Botón de música flotante */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-8 right-8 bg-purple-500/20 backdrop-blur-sm rounded-full p-3 hover:bg-purple-500/30 transition-all duration-300 border border-white/20"
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Nota de demostración */}
      <div className="absolute bottom-4 right-4 bg-purple-800/70 backdrop-blur-sm text-white/90 text-xs px-3 py-2 rounded-md">
        Demo Premium: $499
      </div>
    </section>
  )
}
