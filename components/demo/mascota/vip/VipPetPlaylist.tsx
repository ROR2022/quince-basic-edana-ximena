"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Repeat, Shuffle } from 'lucide-react'
import { vipMascotaData } from './data/vip-mascota-data'
import Image from 'next/image'

export const VipPetPlaylist = () => {
  // Estado para las playlists y reproducción
  const [activePlaylistId, setActivePlaylistId] = useState(vipMascotaData.playlists[0].id)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLooped, setIsLooped] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [expandedView, setExpandedView] = useState(false)

  // Referencias para audio
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Obtener la playlist actual
  const activePlaylist = vipMascotaData.playlists.find(p => p.id === activePlaylistId) || vipMascotaData.playlists[0]
  const currentTrack = activePlaylist.tracks[currentTrackIndex]

  // Formatear el tiempo
  const formatTime = (time: number | string) => {
    // Si ya está en formato string como "3:45", devolverlo tal cual
    if (typeof time === 'string') {
      return time
    }
    
    // Si es número, formatearlo
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // Cambiar de pista
  const changeTrack = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentTrackIndex(prev => 
        prev === activePlaylist.tracks.length - 1 ? 0 : prev + 1
      )
    } else {
      setCurrentTrackIndex(prev => 
        prev === 0 ? activePlaylist.tracks.length - 1 : prev - 1
      )
    }
  }

  // Cambiar de playlist
  const changePlaylist = (playlistId: string) => {
    setActivePlaylistId(playlistId)
    setCurrentTrackIndex(0)
    setCurrentTime(0)
  }

  // Reproducir pista aleatoria
  const playRandomTrack = () => {
    const randomIndex = Math.floor(Math.random() * activePlaylist.tracks.length)
    setCurrentTrackIndex(randomIndex)
  }

  // Actualizar tiempo actual durante reproducción
  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setCurrentTime(audioRef.current.currentTime)
    setDuration(audioRef.current.duration)
  }

  // Cambiar posición en la pista
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    const seekTime = Number(e.target.value)
    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  // Cambiar volumen
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  // Manejar fin de pista
  const handleTrackEnd = () => {
    if (isLooped) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
    } else if (isShuffled) {
      playRandomTrack()
    } else {
      changeTrack('next')
    }
  }

  // Efecto para cargar y reproducir audio cuando cambia la pista o playlist
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return

    // Configurar la nueva pista
    audioRef.current.src = currentTrack.file
    audioRef.current.load()
    
    // Intentar reproducir si estaba reproduciendo
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error("Error al cambiar de pista:", err)
        setIsPlaying(false)
      })
    }
    
    audioRef.current.volume = volume
    audioRef.current.muted = isMuted
  }, [currentTrack, currentTrackIndex, activePlaylistId, isPlaying, volume, isMuted])

  // Efecto para manejar reproducción y volumen
  useEffect(() => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error("Error al reproducir audio:", err)
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }
    
    audioRef.current.volume = volume
    audioRef.current.muted = isMuted
  }, [isPlaying, volume, isMuted])

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-fuchsia-50 to-purple-100">
      <div className="max-w-5xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            MÚSICA PERSONALIZADA
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-purple-800 mb-4"
          >
            Listas de Reproducción Temáticas
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-purple-700 max-w-3xl mx-auto"
          >
            Hemos seleccionado cuidadosamente música para diferentes momentos de la celebración.
          </motion.p>
        </div>
        
        {/* Reproductor de música */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
          {/* Audio elemento oculto */}
          <audio 
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleTrackEnd}
            onLoadedMetadata={handleTimeUpdate}
            className="hidden"
          />
          
          <div className={`grid ${expandedView ? 'grid-cols-1 lg:grid-cols-5' : 'grid-cols-1'} transition-all duration-300`}>
            {/* Vista compacta del reproductor */}
            <div className={`${expandedView ? 'col-span-1 lg:col-span-3' : 'col-span-1'} p-6`}>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Portada de la canción actual */}
                <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                  <Image 
                    src={'/images/pets/dogs-cats/cat_dog_5.jpeg'}
                    alt={currentTrack.title}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Efecto de disco girando */}
                  <div className={`absolute inset-0 bg-black/20 flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
                    <div className={`w-16 h-16 rounded-full border-4 border-white/60 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
                      <Music className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Información de la pista y controles */}
                <div className="flex-grow">
                  <div className="text-center md:text-left">
                    <div className="text-xs text-purple-500 font-medium mb-1">
                      REPRODUCIENDO DE {activePlaylist.name}
                    </div>
                    <h3 className="text-xl font-bold text-purple-800 truncate mb-1">
                      {currentTrack.title}
                    </h3>
                    <p className="text-sm text-purple-600 mb-4">
                      {currentTrack.artist}
                    </p>
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-purple-500 mb-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 rounded-full bg-purple-100 appearance-none cursor-pointer accent-fuchsia-600"
                    />
                  </div>
                  
                  {/* Controles de reproducción */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setIsShuffled(!isShuffled)}
                        className={`p-2 rounded-full ${isShuffled ? 'bg-fuchsia-100 text-fuchsia-600' : 'text-purple-400 hover:text-purple-600'}`}
                        aria-label="Aleatorio"
                      >
                        <Shuffle className="h-4 w-4" />
                      </button>
                      
                      <button 
                        onClick={() => changeTrack('prev')}
                        className="p-2 text-purple-700 hover:text-fuchsia-600"
                        aria-label="Anterior"
                      >
                        <SkipBack className="h-5 w-5" />
                      </button>
                      
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white flex items-center justify-center shadow-md hover:shadow-lg"
                        aria-label={isPlaying ? "Pausar" : "Reproducir"}
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </button>
                      
                      <button 
                        onClick={() => changeTrack('next')}
                        className="p-2 text-purple-700 hover:text-fuchsia-600"
                        aria-label="Siguiente"
                      >
                        <SkipForward className="h-5 w-5" />
                      </button>
                      
                      <button 
                        onClick={() => setIsLooped(!isLooped)}
                        className={`p-2 rounded-full ${isLooped ? 'bg-fuchsia-100 text-fuchsia-600' : 'text-purple-400 hover:text-purple-600'}`}
                        aria-label="Repetir"
                      >
                        <Repeat className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 text-purple-700 hover:text-fuchsia-600 mr-1"
                        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </button>
                      
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1.5 rounded-full bg-purple-100 appearance-none cursor-pointer accent-fuchsia-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Botón para expandir/contraer */}
              <div className="mt-6 text-center">
                <button 
                  onClick={() => setExpandedView(!expandedView)}
                  className="inline-flex items-center gap-2 text-sm text-purple-700 hover:text-fuchsia-600"
                >
                  <span>{expandedView ? "Ocultar listas" : "Ver todas las listas"}</span>
                  <motion.div
                    animate={{ rotate: expandedView ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ↓
                  </motion.div>
                </button>
              </div>
            </div>
            
            {/* Lista de playlists (vista expandida) */}
            <AnimatePresence>
              {expandedView && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-purple-100 bg-purple-50/50"
                >
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-purple-800 mb-4">Listas de Reproducción</h4>
                    
                    <div className="space-y-3">
                      {vipMascotaData.playlists.map((playlist) => (
                        <div 
                          key={playlist.id}
                          onClick={() => changePlaylist(playlist.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            activePlaylistId === playlist.id ? 'bg-gradient-to-r from-fuchsia-100 to-purple-100 border border-fuchsia-200' : 'hover:bg-purple-100/50'
                          }`}
                        >
                          <div className="relative w-12 h-12 rounded overflow-hidden">
                            <Image
                              src={'/images/pets/dogs-cats/cat_dog_1.jpeg'}
                              alt={playlist.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          
                          <div className="flex-grow">
                            <h5 className="font-medium text-purple-800">{playlist.name}</h5>
                            <p className="text-xs text-purple-600">{playlist.tracks.length} canciones</p>
                          </div>
                          
                          {activePlaylistId === playlist.id && (
                            <div className="text-fuchsia-600">
                              {isPlaying ? <Volume2 className="h-4 w-4" /> : <Music className="h-4 w-4" />}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Lista de canciones de la playlist actual */}
                    <div className="mt-6">
                      <h4 className="text-md font-medium text-purple-800 mb-3">Canciones en {activePlaylist.name}</h4>
                      
                      <div className="space-y-1 max-h-60 overflow-y-auto pr-2 styled-scrollbar">
                        {activePlaylist.tracks.map((track, index) => (
                          <div 
                            key={index}
                            onClick={() => {
                              setCurrentTrackIndex(index)
                              if (!isPlaying) setIsPlaying(true)
                            }}
                            className={`flex items-center gap-2 p-2 rounded text-sm cursor-pointer ${
                              currentTrackIndex === index ? 'bg-fuchsia-100 text-fuchsia-700' : 'hover:bg-purple-100/70 text-purple-700'
                            }`}
                          >
                            <div className="w-5 text-center font-medium">
                              {currentTrackIndex === index && isPlaying ? (
                                <div className="flex space-x-0.5 h-3">
                                  <motion.div 
                                    animate={{ height: [3, 10, 3] }} 
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="w-1 bg-fuchsia-600 rounded-full" 
                                  />
                                  <motion.div 
                                    animate={{ height: [8, 4, 8] }} 
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="w-1 bg-fuchsia-600 rounded-full" 
                                  />
                                  <motion.div 
                                    animate={{ height: [5, 12, 5] }} 
                                    transition={{ repeat: Infinity, duration: 1.2 }}
                                    className="w-1 bg-fuchsia-600 rounded-full" 
                                  />
                                </div>
                              ) : (
                                index + 1
                              )}
                            </div>
                            <div className="flex-grow truncate">{track.title}</div>
                            <div className="text-xs">{formatTime(track.duration || 0)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Sugerencias de playlists para cada momento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-semibold text-purple-800 mb-4">Música para Cada Momento</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-purple-100">
              <div className="text-2xl mb-2">🎵</div>
              <h4 className="font-medium text-purple-800">Para la Llegada</h4>
              <p className="text-sm text-purple-600">Música tranquila para recibir a los invitados peludos</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-purple-100">
              <div className="text-2xl mb-2">🎉</div>
              <h4 className="font-medium text-purple-800">Para la Celebración</h4>
              <p className="text-sm text-purple-600">Ritmos animados para el momento culminante</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-purple-100">
              <div className="text-2xl mb-2">✨</div>
              <h4 className="font-medium text-purple-800">Para Relajarse</h4>
              <p className="text-sm text-purple-600">Sonidos calmantes para momentos de descanso</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Estilos para el scrollbar */}
      <style jsx global>{`
        .styled-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .styled-scrollbar::-webkit-scrollbar-track {
          background: #f1e8ff;
          border-radius: 10px;
        }
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d8b4fe;
          border-radius: 10px;
        }
      `}</style>
    </section>
  )
}
