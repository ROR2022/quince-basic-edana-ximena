"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { dogBirthdayDemoData } from './data/basic-demo-data'
import { PawPrint } from 'lucide-react'

export function DogCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const { dog, event } = dogBirthdayDemoData

  useEffect(() => {
    const targetDate = new Date(event.date).getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [event.date])

  return (
    <section 
      className="py-16 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(rgba(25, 118, 210, 0.85), rgba(66, 165, 245, 0.85)), url('/images/pets/dogs/paw-pattern-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-8 left-8 transform -rotate-12">
          <Image 
            src="/images/pets/icons/paw-icon.svg" 
            alt="Huella" 
            width={80} 
            height={80}
          />
        </div>
        <div className="absolute bottom-8 right-8 transform rotate-12">
          <Image 
            src="/images/pets/icons/bone-icon.svg" 
            alt="Hueso" 
            width={100} 
            height={100}
          />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center text-white relative z-10">
        <div className="flex items-center justify-center mb-4">
          <PawPrint className="w-8 h-8 mr-2" />
          <h2 className="text-3xl md:text-4xl font-bold">
            Cuenta Regresiva
          </h2>
          <PawPrint className="w-8 h-8 ml-2" />
        </div>
        
        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30">
            <div className="text-3xl md:text-5xl font-bold mb-1">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base opacity-90">
              Días
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30">
            <div className="text-3xl md:text-5xl font-bold mb-1">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base opacity-90">
              Horas
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30">
            <div className="text-3xl md:text-5xl font-bold mb-1">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base opacity-90">
              Minutos
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30">
            <div className="text-3xl md:text-5xl font-bold mb-1">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base opacity-90">
              Segundos
            </div>
          </div>
        </div>
        
        <p className="text-lg md:text-xl opacity-90 max-w-lg mx-auto">
          Para la fiesta de cumpleaños de <span className="font-bold text-white">{dog.name}</span>. ¡Prepara tus juguetes y golosinas!
        </p>
      </div>
    </section>
  )
}
