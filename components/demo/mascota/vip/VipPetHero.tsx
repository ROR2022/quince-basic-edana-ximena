"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { vipMascotaData } from './data/vip-mascota-data'
import Image from 'next/image'

export const VipPetHero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  // Referencias para audio
  const audioRef = useState<HTMLAudioElement | null>(null)
  
  // Crear referencia de audio al cargar el componente
  useEffect(() => {
    // Solo en cliente
    if (typeof window !== 'undefined') {
      const audio = new Audio('/music/fairy-tale1.mp3')
      audio.loop = true
      audio.volume = 0.5
      audioRef[1](audio)
      
      return () => {
        audio.pause()
        audio.src = ''
      }
    }
  }, [audioRef])
  
  // Efecto para manejar reproducción y volumen
  useEffect(() => {
    const audio = audioRef[0]
    if (!audio) return
    
    if (isPlaying) {
      audio.play().catch(err => console.error("Error al reproducir audio:", err))
    } else {
      audio.pause()
    }
    
    audio.muted = isMuted
  }, [isPlaying, isMuted, audioRef])
  
  // Calcular tiempo restante
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(vipMascotaData.event.date).getTime() - new Date().getTime()
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)
        
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }
    
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  // Efecto parallax al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-b from-purple-900 via-fuchsia-800 to-pink-700 text-white">
      {/* Fondo Parallax */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: 0.7
        }}
      >
        <div className="absolute inset-0 bg-[url('/images/pets/dogs-cats/cat_dog_1.jpeg')] bg-cover bg-center bg-no-repeat opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/50 to-fuchsia-900/70" />
      </div>
      
      {/* Elementos decorativos animados */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-pink-500 rounded-full filter blur-3xl"
        animate={{ 
          x: [0, 20, 0],
          y: [0, 15, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl"
        animate={{ 
          x: [0, -30, 0],
          y: [0, 20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut"
        }}
      />
      
      {/* Contenido Hero */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Mascotas Protagonistas */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 mb-8">
          {vipMascotaData.pets.map((pet, index) => (
            <motion.div 
              key={pet.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-32 h-32 md:w-48 md:h-48">
                <Image 
                  src={pet.photo}
                  alt={pet.name}
                  fill
                  className="object-cover rounded-full border-4 border-white/30 shadow-xl"
                />
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
                className="absolute -bottom-3 -right-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
              >
                {pet.type === 'cat' ? '🐱' : '🐶'} {pet.name}
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Título Animado */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
            {vipMascotaData.event.title}
          </span>
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-pink-100 text-center mb-10 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {vipMascotaData.event.subtitle}
        </motion.p>
        
        {/* Contador Animado */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <TimeDisplay value={timeLeft.days} label="Días" icon="🗓️" />
          <TimeDisplay value={timeLeft.hours} label="Horas" icon="⏰" />
          <TimeDisplay value={timeLeft.minutes} label="Minutos" icon="⏱️" />
          <TimeDisplay value={timeLeft.seconds} label="Segundos" icon="⏳" />
        </motion.div>
        
        {/* Fecha y Lugar */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-lg md:text-xl">
            <span className="font-bold">{new Date(vipMascotaData.event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span> a las <span className="font-bold">{vipMascotaData.event.time}</span>
          </p>
          <p className="text-lg md:text-xl mt-1">
            {vipMascotaData.event.location.name}, {vipMascotaData.event.location.address}
          </p>
        </motion.div>
        
        {/* Controles de audio */}
        <motion.div 
          className="absolute bottom-8 right-8 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-all"
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-all"
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5
          }}
        >
          <p className="text-sm text-white/70 mb-2 text-center">Descubre más</p>
          <div className="h-16 w-8 border-2 border-white/30 rounded-full mx-auto flex justify-center">
            <motion.div 
              className="w-2 h-2 bg-white rounded-full mt-2"
              animate={{ 
                y: [0, 8, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Componente de visualización de tiempo para el contador
const TimeDisplay = ({ value, label, icon }: { value: number, label: string, icon: string }) => {
  return (
    <motion.div 
      className="flex flex-col items-center bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20"
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-3xl md:text-4xl font-bold">{value}</span>
      <span className="text-sm md:text-base text-pink-100">{label}</span>
    </motion.div>
  )
}
