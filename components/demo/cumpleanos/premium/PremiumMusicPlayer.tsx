"use client"

import { useState, useEffect, useCallback } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, Zap } from 'lucide-react'
import { premiumDemoData } from './data/premium-demo-data'

export function PremiumMusicPlayer() {
  const { music } = premiumDemoData
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const parseTimeToSeconds = (timeString: string) => {
    const [minutes, seconds] = timeString.split(':').map(Number)
    return minutes * 60 + seconds
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const nextTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % music.tracks.length)
    setCurrentTime(0)
  }, [music.tracks.length])

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + music.tracks.length) % music.tracks.length)
    setCurrentTime(0)
  }

  // Simular progreso de audio (ya que los archivos de audio son demo)
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const trackDuration = parseTimeToSeconds(music.tracks[currentTrack].duration)
          if (prev >= trackDuration) {
            nextTrack()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTrack, music.tracks, nextTrack])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
    setIsMuted(false)
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value)
    setCurrentTime(newTime)
  }

  const currentTrackData = music.tracks[currentTrack]
  const trackDuration = parseTimeToSeconds(currentTrackData.duration)

  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
      <div className="container mx-auto px-4">
        {/* Título heroico */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <Music className="w-8 h-8 text-yellow-400 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-black text-white">
              {music.title}
            </h2>
            <Zap className="w-8 h-8 text-blue-400 animate-bounce" />
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            La música épica que acompaña a nuestros héroes
          </p>
        </div>

        {/* Reproductor principal heroico */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 border-2 border-blue-400/50 shadow-2xl">
            {/* Información de la pista actual */}
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-red-400 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <Music className="w-16 h-16 text-white" />
                {isPlaying && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                )}
                <div className="absolute top-2 right-2 text-yellow-400 animate-spin">
                  ⚡
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentTrackData.name}
              </h3>
              <p className="text-blue-300 text-lg">
                {currentTrackData.artist}
              </p>
            </div>

            {/* Barra de progreso */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-blue-200 mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{currentTrackData.duration}</span>
              </div>
              <input
                type="range"
                min="0"
                max={trackDuration}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-2 bg-blue-900/50 rounded-lg appearance-none cursor-pointer slider-progress"
                style={{
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(currentTime / trackDuration) * 100}%, #1E3A8A ${(currentTime / trackDuration) * 100}%, #1E3A8A 100%)`
                }}
              />
            </div>

            {/* Controles principales */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <button
                onClick={prevTrack}
                className="w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110"
              >
                <SkipBack className="w-6 h-6" />
              </button>

              <button
                onClick={togglePlay}
                className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-400 hover:to-blue-400 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </button>

              <button
                onClick={nextTrack}
                className="w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            {/* Control de volumen */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={toggleMute}
                className="text-blue-300 hover:text-white transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-32 h-2 bg-blue-900/50 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${isMuted ? 0 : volume}%, #1E3A8A ${isMuted ? 0 : volume}%, #1E3A8A 100%)`
                }}
              />
              
              <span className="text-blue-300 text-sm min-w-[3rem]">
                {isMuted ? 0 : volume}%
              </span>
            </div>
          </div>

          {/* Lista de pistas */}
          <div className="mt-8 bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
              <Music className="w-5 h-5 mr-2 text-blue-400" />
              Lista de Reproducción Heroica
            </h4>
            
            <div className="space-y-2">
              {music.tracks.map((track, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentTrack(index)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    currentTrack === index
                      ? 'bg-gradient-to-r from-blue-500/30 to-red-500/30 border border-blue-400/50'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentTrack === index
                        ? 'bg-gradient-to-r from-blue-400 to-red-400 text-white'
                        : 'bg-blue-600 text-white'
                    }`}>
                      {currentTrack === index && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </div>
                    
                    <div>
                      <p className="text-white font-medium">{track.name}</p>
                      <p className="text-blue-300 text-sm">{track.artist}</p>
                    </div>
                  </div>
                  
                  <div className="text-blue-300 text-sm">
                    {track.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Efectos visuales heroicos */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping delay-500"></div>
        </div>
      </div>
    </section>
  )
}
