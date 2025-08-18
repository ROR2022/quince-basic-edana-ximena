"use client"

import { useState, useEffect, useCallback } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, Crown, Sparkles, Heart } from 'lucide-react'
import { vipDemoData } from './data/vip-demo-data'

export function VipMusicPlayer() {
  const { music } = vipDemoData
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(75)
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
    <section className="py-16 bg-gradient-to-br from-pink-900 via-purple-900 to-rose-900 relative overflow-hidden">
      {/* Efectos mágicos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-rose-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-yellow-500/15 rounded-full blur-2xl animate-pulse delay-700"></div>
      </div>

      {/* Partículas brillantes flotantes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/6 left-1/5 w-3 h-3 bg-pink-300 rounded-full animate-ping opacity-70"></div>
        <div className="absolute top-1/4 right-1/5 w-2 h-2 bg-purple-300 rounded-full animate-ping delay-300 opacity-60"></div>
        <div className="absolute top-1/3 left-1/2 w-2.5 h-2.5 bg-rose-300 rounded-full animate-ping delay-600 opacity-65"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-900 opacity-70"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-1200 opacity-80"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título real */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-4 mb-6">
            <Crown className="w-10 h-10 text-yellow-400 animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-black text-white">
              {music.title}
            </h2>
            <Sparkles className="w-10 h-10 text-pink-400 animate-bounce" />
          </div>
          <p className="text-2xl text-pink-200 max-w-3xl mx-auto">
            La música celestial que acompaña a nuestra princesa en su reino mágico
          </p>
          <div className="mt-4 flex justify-center space-x-3 text-3xl">
            <span className="animate-pulse">✨</span>
            <span className="animate-bounce delay-300">🎵</span>
            <span className="animate-pulse delay-500">💎</span>
          </div>
        </div>

        {/* Reproductor principal real */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-10 border-2 border-pink-400/50 shadow-2xl relative overflow-hidden">
            {/* Efectos de brillo interno */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-rose-500/10 rounded-3xl"></div>
            
            {/* Información de la pista actual */}
            <div className="text-center mb-10 relative z-10">
              <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-pink-400 via-purple-400 to-rose-400 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl">
                <Music className="w-20 h-20 text-white" />
                {isPlaying && (
                  <>
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-300/30 via-purple-300/30 to-rose-300/30 animate-pulse delay-500"></div>
                  </>
                )}
                <div className="absolute top-3 right-3 text-yellow-300 text-2xl animate-spin">
                  ✨
                </div>
                <div className="absolute bottom-3 left-3 text-pink-200 text-xl animate-bounce">
                  💎
                </div>
                <div className="absolute top-3 left-3 text-purple-200 text-lg animate-pulse">
                  👑
                </div>
                <div className="absolute bottom-3 right-3 text-rose-200 text-lg animate-bounce delay-700">
                  🌟
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-3">
                {currentTrackData.name}
              </h3>
              <p className="text-pink-300 text-xl">
                {currentTrackData.artist}
              </p>
              <div className="mt-3 flex justify-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-pink-200 text-sm">Melodía Real</span>
                <Heart className="w-5 h-5 text-rose-400" />
              </div>
            </div>

            {/* Barra de progreso mágica */}
            <div className="mb-10 relative z-10">
              <div className="flex items-center justify-between text-lg text-pink-200 mb-3">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-2 animate-pulse"></span>
                  {formatTime(currentTime)}
                </span>
                <span className="flex items-center">
                  {currentTrackData.duration}
                  <span className="w-2 h-2 bg-purple-400 rounded-full ml-2 animate-pulse delay-300"></span>
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max={trackDuration}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="w-full h-3 bg-pink-900/50 rounded-lg appearance-none cursor-pointer slider-progress"
                  style={{
                    background: `linear-gradient(to right, #EC4899 0%, #EC4899 ${(currentTime / trackDuration) * 100}%, #831843 ${(currentTime / trackDuration) * 100}%, #831843 100%)`
                  }}
                />
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 rounded-full opacity-30 pointer-events-none"></div>
              </div>
            </div>

            {/* Controles principales reales */}
            <div className="flex items-center justify-center space-x-8 mb-10 relative z-10">
              <button
                onClick={prevTrack}
                className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 shadow-xl"
              >
                <SkipBack className="w-8 h-8" />
              </button>

              <button
                onClick={togglePlay}
                className="w-20 h-20 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-400 hover:via-pink-400 hover:to-purple-400 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 shadow-2xl relative"
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10" />
                ) : (
                  <Play className="w-10 h-10 ml-1" />
                )}
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
              </button>

              <button
                onClick={nextTrack}
                className="w-16 h-16 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 shadow-xl"
              >
                <SkipForward className="w-8 h-8" />
              </button>
            </div>

            {/* Control de volumen real */}
            <div className="flex items-center justify-center space-x-6 relative z-10">
              <button
                onClick={toggleMute}
                className="text-pink-300 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>
              
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-40 h-2 bg-pink-900/50 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #EC4899 0%, #EC4899 ${isMuted ? 0 : volume}%, #831843 ${isMuted ? 0 : volume}%, #831843 100%)`
                  }}
                />
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-30 pointer-events-none"></div>
              </div>
              
              <span className="text-pink-300 text-lg min-w-[4rem] flex items-center">
                {isMuted ? 0 : volume}%
                <span className="ml-2 text-sm">🔊</span>
              </span>
            </div>

            {/* Decoraciones internas */}
            <div className="absolute top-6 left-8 text-yellow-300 text-2xl animate-ping">✨</div>
            <div className="absolute top-8 right-10 text-pink-300 text-xl animate-pulse">💎</div>
            <div className="absolute bottom-6 left-10 text-purple-300 text-2xl animate-bounce">🌟</div>
            <div className="absolute bottom-8 right-8 text-rose-300 text-xl animate-spin-slow">💫</div>
          </div>

          {/* Lista de pistas real */}
          <div className="mt-10 bg-black/20 backdrop-blur-xl rounded-3xl p-8 border border-pink-400/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-rose-500/5 rounded-3xl"></div>
            
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center relative z-10">
              <Crown className="w-6 h-6 mr-3 text-yellow-400" />
              Lista de Reproducción Real
              <Sparkles className="w-5 h-5 ml-3 text-pink-400" />
            </h4>
            
            <div className="space-y-3 relative z-10">
              {music.tracks.map((track, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentTrack(index)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between relative overflow-hidden ${
                    currentTrack === index
                      ? 'bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-rose-500/30 border-2 border-pink-400/50 shadow-xl'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-pink-400/20'
                  }`}
                >
                  <div className="flex items-center space-x-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center relative ${
                      currentTrack === index
                        ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                        : 'bg-pink-600 text-white'
                    }`}>
                      {currentTrack === index && isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 ml-0.5" />
                      )}
                      {currentTrack === index && (
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-white font-bold text-lg">{track.name}</p>
                      <p className="text-pink-300 text-base">{track.artist}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-pink-300 text-base">
                      {track.duration}
                    </div>
                    {currentTrack === index && (
                      <div className="flex space-x-1">
                        <span className="text-yellow-400 text-lg animate-pulse">✨</span>
                        <span className="text-pink-400 text-sm animate-bounce">♪</span>
                      </div>
                    )}
                  </div>

                  {/* Efectos especiales para la pista actual */}
                  {currentTrack === index && (
                    <>
                      <div className="absolute top-2 right-2 text-yellow-300 text-sm animate-pulse">👑</div>
                      <div className="absolute bottom-2 left-2 text-pink-300 text-xs animate-bounce">💎</div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Decoraciones de la lista */}
            <div className="absolute top-4 right-6 text-yellow-300 text-xl animate-ping">✨</div>
            <div className="absolute bottom-4 left-6 text-purple-300 text-lg animate-pulse">🌟</div>
          </div>
        </div>
      </div>
    </section>
  )
}
