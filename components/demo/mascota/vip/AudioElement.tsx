"use client"

import { useEffect, useRef } from 'react'
import { useMusicContext } from './context/MusicProvider'

export const AudioElement = () => {
  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    volume,
    nextTrack
  } = useMusicContext()
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  const currentTrack = tracks[currentTrackIndex]
  
  // Efecto para manejar la reproducción/pausa
  useEffect(() => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error("Error al reproducir audio:", err)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentTrackIndex])
  
  // Efecto para manejar el cambio de volumen
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
  }, [volume])
  
  // Efecto para manejar el cambio de pista
  useEffect(() => {
    if (!audioRef.current) return
    
    audioRef.current.load()
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error("Error al cambiar de pista:", err)
      })
    }
  }, [currentTrackIndex, isPlaying])
  
  // Manejar el evento de finalización de la pista
  const handleTrackEnd = () => {
    nextTrack()
  }
  
  return (
    <audio
      ref={audioRef}
      onEnded={handleTrackEnd}
      preload="auto"
      style={{ display: 'none' }}
    >
      <source src={currentTrack.source} type="audio/mpeg" />
      Tu navegador no soporta la etiqueta de audio.
    </audio>
  )
}
