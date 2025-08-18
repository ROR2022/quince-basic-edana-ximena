"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { dogBirthdayDemoData } from './data/basic-demo-data'
import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'

// Componente para la cuenta regresiva
function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState("")
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(targetDate)
      const now = new Date()
      
      if (eventDate > now) {
        return formatDistance(eventDate, now, { 
          addSuffix: true,
          locale: es
        })
      } else {
        return "¡El evento ya pasó!"
      }
    }
    
    setTimeLeft(calculateTimeLeft())
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 60000) // Actualizar cada minuto
    
    return () => clearInterval(timer)
  }, [targetDate])
  
  return (
    <div className="text-center bg-white/80 backdrop-blur-sm py-3 px-6 rounded-xl shadow-md">
      <p className="text-sm font-medium text-blue-600 mb-1">Cuenta regresiva</p>
      <div className="text-xl md:text-2xl font-bold">{timeLeft}</div>
    </div>
  )
}

export function DogHero() {
  const { dog, event } = dogBirthdayDemoData

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Fondo con imagen y overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image 
            src={dog.photo} 
            alt={dog.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/40 to-blue-700/70"></div>
          
          {/* Decoración de huellas */}
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 opacity-60 w-20 h-20 md:w-32 md:h-32">
            {/* Aquí irán las huellas cuando creemos los SVGs */}
          </div>
          <div className="absolute top-4 right-4 md:top-8 md:right-8 opacity-60 w-20 h-20 md:w-32 md:h-32 rotate-45">
            {/* Aquí irán las huellas cuando creemos los SVGs */}
          </div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        <h1 className="text-white font-bold text-4xl md:text-6xl mb-4 drop-shadow-md">
          {event.title}
        </h1>
        
        <p className="text-white/90 text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Acompáñanos a celebrar el {dog.age.human}° cumpleaños de 
          <span className="font-bold"> {dog.name}</span>
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm py-2 px-4 rounded-lg shadow-md">
            <p className="text-sm md:text-base">
              <span className="font-semibold">Cuándo:</span> {new Date(event.date).toLocaleDateString('es-MX', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm py-2 px-4 rounded-lg shadow-md">
            <p className="text-sm md:text-base">
              <span className="font-semibold">Hora:</span> {new Date(event.date).toLocaleTimeString('es-MX', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true
              })}
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm py-2 px-4 rounded-lg shadow-md">
            <p className="text-sm md:text-base">
              <span className="font-semibold">Dónde:</span> {event.location.name}
            </p>
          </div>
        </div>
        
        {/* Cuenta regresiva */}
        <div 
        style={{display:'none'}}
        className="flex justify-center mt-8">
          <CountdownTimer targetDate={event.date} />
        </div>
      </div>
    </section>
  )
}
