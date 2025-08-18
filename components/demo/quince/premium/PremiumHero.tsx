"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Play, Pause } from "lucide-react"
import { motion } from "framer-motion"
import { useMusicContext } from "@/context/music-context"
import { premiumDemoData } from "./data/premium-demo-data"

export function PremiumHero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { isPlaying, togglePlay, isClient } = useMusicContext()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('${premiumDemoData.hero.backgroundImage}')`,
          filter: "brightness(0.7)",
        }}
      />

      {/* Music control button - INCLUIDO en paquete premium */}
      {isClient && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm flex items-center justify-center text-white hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 border border-white/20 shadow-lg"
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          {/* Indicador de música premium */}
          <div className="absolute -bottom-8 right-0 text-white/80 text-xs bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
            🎵 Premium
          </div>
        </div>
      )}

      {/* Badge premium flotante */}
      <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
        ⭐ PREMIUM
      </div>

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-center px-4"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-white text-xl mb-2"
          >
            {premiumDemoData.hero.subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-script text-6xl md:text-8xl text-white mb-4"
          >
            {premiumDemoData.hero.name}
          </motion.h1>
          
          {/* Mensaje adicional premium */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-white/90 text-lg md:text-xl font-light tracking-wide"
          >
            Una celebración única con música, galería y padrinos
          </motion.p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center text-white z-10"
      >
        <p className="mb-2 text-center">Desliza para ver mi invitación premium</p>
        <ChevronDown className="animate-bounce w-6 h-6" />
      </motion.div>
    </section>
  )
} 