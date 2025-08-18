"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusicContext } from './context/MusicProvider'
import { Play, Pause, SkipBack, SkipForward, Volume, Volume1, Volume2, VolumeX, Music } from 'lucide-react'
import Image from 'next/image'

export const FloatingMusicPlayer = () => {
  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    volume,
    togglePlay,
    setVolume,
    nextTrack,
    previousTrack
  } = useMusicContext()

  const [isExpanded, setIsExpanded] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const currentTrack = tracks[currentTrackIndex]

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev)
    if (showVolumeSlider) setShowVolumeSlider(false)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={16} />
    if (volume < 0.3) return <Volume size={16} />
    if (volume < 0.7) return <Volume1 size={16} />
    return <Volume2 size={16} />
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, width: 0, height: 0 }}
            animate={{ opacity: 1, width: 'auto', height: 'auto' }}
            exit={{ opacity: 0, width: 0, height: 0 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 mb-2 border border-purple-200"
          >
            <div className="flex items-center gap-3">
              {currentTrack.cover ? (
                <div className="w-12 h-12 relative rounded-md overflow-hidden">
                  <Image
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-md flex items-center justify-center">
                  <Music size={20} className="text-white" />
                </div>
              )}
              
              <div className="max-w-[140px]">
                <h4 className="text-sm font-medium text-purple-800 truncate">{currentTrack.title}</h4>
                <p className="text-xs text-purple-600 truncate">{currentTrack.artist}</p>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                onClick={previousTrack}
                className="p-2 text-purple-700 hover:text-purple-900 transition-colors"
                aria-label="Canción anterior"
              >
                <SkipBack size={18} />
              </button>
              
              <button
                onClick={togglePlay}
                className="p-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full text-white hover:shadow-md transition-shadow"
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              
              <button
                onClick={nextTrack}
                className="p-2 text-purple-700 hover:text-purple-900 transition-colors"
                aria-label="Siguiente canción"
              >
                <SkipForward size={18} />
              </button>
              
              <div className="relative ml-1">
                <button
                  onClick={() => setShowVolumeSlider(prev => !prev)}
                  className="p-2 text-purple-700 hover:text-purple-900 transition-colors"
                  aria-label="Control de volumen"
                >
                  {getVolumeIcon()}
                </button>
                
                <AnimatePresence>
                  {showVolumeSlider && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-md p-3 w-32 border border-purple-100"
                    >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full accent-purple-600"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleExpanded}
        className={`rounded-full p-3 shadow-lg flex items-center justify-center ${
          isExpanded
            ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white'
            : 'bg-white text-purple-700'
        }`}
        aria-label={isExpanded ? "Cerrar reproductor" : "Abrir reproductor"}
      >
        <Music size={20} />
      </motion.button>
    </div>
  )
}
