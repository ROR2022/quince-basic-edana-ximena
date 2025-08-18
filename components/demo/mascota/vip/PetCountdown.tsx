"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { vipMascotaData } from './data/vip-mascota-data'
import Image from 'next/image'

// Animación para los números del contador - definida fuera de los componentes para ser accesible
const numberVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
}

export const PetCountdown = () => {

  const { event, pets } = vipMascotaData
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isActive: true
  })
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(event.date) - +new Date()
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isActive: true
        }
      } else {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isActive: false
        }
      }
    }
    
    setCountdown(calculateTimeLeft())
    
    const timer = setInterval(() => {
      setCountdown(calculateTimeLeft())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [event.date])
  
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-fuchsia-50 to-purple-50">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-purple-800 mb-6"
        >
          {countdown.isActive ? "¡Prepárate para la celebración!" : "¡El evento está en curso!"}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-lg text-purple-600 mb-10 max-w-3xl mx-auto"
        >
          {countdown.isActive 
            ? "Cuenta regresiva para la gran celebración de nuestros peludos favoritos. ¡No te lo pierdas!" 
            : "¡La fiesta ha comenzado! Esperamos que estés disfrutando de este momento especial."}
        </motion.p>
        
        {/* Marcos de fotos de mascotas */}
        <div className="flex justify-center gap-4 mb-12">
          {pets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-r from-purple-500 to-fuchsia-500">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={pet.photo}
                    alt={pet.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div 
                className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs
                  ${pet.type === 'dog' ? 'bg-blue-500' : 'bg-pink-500'}`}
              >
                {pet.type === 'dog' ? '🐶' : '🐱'}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Contador */}
        {countdown.isActive ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto"
          >
            <TimeUnit value={countdown.days} label="Días" />
            <TimeUnit value={countdown.hours} label="Horas" />
            <TimeUnit value={countdown.minutes} label="Minutos" />
            <TimeUnit value={countdown.seconds} label="Segundos" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-6 px-8 rounded-2xl shadow-lg inline-block"
          >
            <h3 className="text-2xl md:text-3xl font-bold">¡El evento está en curso!</h3>
            <p className="mt-2">Esperamos que estés disfrutando de la celebración</p>
          </motion.div>
        )}
        
        {/* Detalles del evento */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <div className="bg-white shadow-md rounded-xl p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <span className="text-purple-700">📅</span>
            </div>
            <div className="text-left">
              <p className="text-sm text-purple-500 font-medium">Fecha</p>
              <p className="text-purple-800">{new Date(event.date).toLocaleDateString('es-ES', { 
                day: 'numeric', month: 'long', year: 'numeric' 
              })}</p>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-xl p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-fuchsia-100 flex items-center justify-center mr-3">
              <span className="text-fuchsia-700">⏰</span>
            </div>
            <div className="text-left">
              <p className="text-sm text-fuchsia-500 font-medium">Hora</p>
              <p className="text-fuchsia-800">{event.time}</p>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-xl p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <span className="text-purple-700">📍</span>
            </div>
            <div className="text-left">
              <p className="text-sm text-purple-500 font-medium">Lugar</p>
              <p className="text-purple-800">{event.location.name}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Componente para cada unidad de tiempo
const TimeUnit = ({ value, label }: { value: number, label: string }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center border border-purple-100">
      <motion.div 
        key={value}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={numberVariants}
        transition={{ duration: 0.3 }}
        className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600 mb-2"
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <span className="text-sm md:text-base text-purple-500">{label}</span>
    </div>
  )
}
