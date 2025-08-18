"use client"

import { useState, useEffect } from 'react'
import { useMusicContext } from '@/context/music-context'
import { catBirthdayPremiumData } from './data/premium-demo-data'
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Music } from 'lucide-react'

export function CatMusicPlayer() {
  const { cat } = catBirthdayPremiumData
  const { 
    isPlaying, 
    setIsPlaying, 
    currentTrack, 
    setCurrentTrack, 
    nextTrack, 
    prevTrack, 
    setTracksCount
  } = useMusicContext()
  
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [showFullPlayer, setShowFullPlayer] = useState(false)
  
  const tracks = catBirthdayPremiumData.music.tracks
  const currentTrackData = tracks[currentTrack]

  // Configurar el reproductor de audio
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    if (setTracksCount) {
      setTracksCount(tracks.length)
    }
    
    const audio = new Audio(currentTrackData.file)
    setAudioElement(audio)
    
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [currentTrack, currentTrackData.file, setTracksCount, tracks.length])

  // Controlar reproducción/pausa
  useEffect(() => {
    if (!audioElement) return

    if (isPlaying) {
      audioElement.play().catch(error => {
        console.error('Error al reproducir audio:', error)
        setIsPlaying(false)
      })
    } else {
      audioElement.pause()
    }
    
    // Actualizar el volumen según estado de mute
    audioElement.muted = isMuted
    
    // Manejar fin de la canción
    const handleEnded = () => nextTrack()
    audioElement.addEventListener('ended', handleEnded)
    
    return () => {
      audioElement.removeEventListener('ended', handleEnded)
    }
  }, [audioElement, isPlaying, isMuted, nextTrack, setIsPlaying])
  
  // Controlar silencio
  const toggleMute = () => {
    if (!audioElement) return
    setIsMuted(!isMuted)
  }

  // Cambiar entre reproductor flotante y completo
  const togglePlayerView = () => {
    setShowFullPlayer(!showFullPlayer)
  }

  return (
    <>
      {/* Reproductor flotante (siempre visible) */}
      <div className={`fixed ${showFullPlayer ? 'bottom-28' : 'bottom-4'} right-4 z-50 transition-all duration-300`}>
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-purple-200 hover:shadow-xl transition-all">
          <button
            onClick={togglePlayerView}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isPlaying
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
            title={showFullPlayer ? 'Minimizar reproductor' : 'Expandir reproductor'}
          >
            <Music className="w-5 h-5" />
          </button>
        </div>
        
        {/* Indicador de música activa */}
        {isPlaying && (
          <div className="absolute -top-2 -right-2">
            <div className="relative">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Reproductor completo (expandible) */}
      <div 
        className={`fixed bottom-4 right-4 z-40 transition-all duration-500 transform ${
          showFullPlayer ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-purple-200 w-64">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-purple-900">Música para {cat.name}</h4>
            <button 
              onClick={toggleMute}
              className="p-2 hover:bg-purple-100 rounded-full transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-purple-500" /> : <Volume2 className="w-4 h-4 text-purple-500" />}
            </button>
          </div>
          
          {/* Info de la canción actual */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 mb-3">
            <div className="text-sm font-medium text-purple-800 mb-1 truncate">
              {currentTrackData.title}
            </div>
            <div className="text-xs text-purple-600 truncate">
              {currentTrackData.artist} • {currentTrackData.duration}
            </div>
          </div>
          
          {/* Controles de reproducción */}
          <div className="flex items-center justify-between">
            <button 
              onClick={prevTrack}
              className="p-2 hover:bg-purple-100 rounded-full transition-colors"
              title="Canción anterior"
            >
              <SkipBack className="w-5 h-5 text-purple-700" />
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isPlaying
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
              }`}
              title={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            
            <button 
              onClick={nextTrack}
              className="p-2 hover:bg-purple-100 rounded-full transition-colors"
              title="Siguiente canción"
            >
              <SkipForward className="w-5 h-5 text-purple-700" />
            </button>
          </div>
          
          {/* Lista de canciones */}
          <div className="mt-3 pt-3 border-t border-purple-100">
            <div className="text-xs font-medium text-purple-800 mb-2">Lista de reproducción:</div>
            <div className="max-h-28 overflow-y-auto pr-1 space-y-1.5">
              {tracks.map((track, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTrack(index)
                    setIsPlaying(true)
                  }}
                  className={`w-full text-left p-2 rounded-md text-xs transition-colors ${
                    currentTrack === index
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'hover:bg-purple-100 text-purple-900'
                  }`}
                >
                  <div className="font-medium truncate">{track.title}</div>
                  <div className={`text-xs ${currentTrack === index ? 'text-white/90' : 'text-purple-600'}`}>
                    {track.duration}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Nota del demo */}
          <div className="mt-3 pt-2 border-t border-purple-100 text-center">
            <p className="text-xs text-purple-600">
              <span className="font-medium">Demo Premium</span> • $499
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
