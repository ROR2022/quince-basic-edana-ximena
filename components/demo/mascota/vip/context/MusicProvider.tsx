"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react'

export type Track = {
  id: string
  title: string
  artist: string
  source: string
  cover?: string
}

interface MusicContextType {
  tracks: Track[]
  currentTrackIndex: number
  isPlaying: boolean
  volume: number
  play: () => void
  pause: () => void
  togglePlay: () => void
  setVolume: (volume: number) => void
  nextTrack: () => void
  previousTrack: () => void
  setCurrentTrackIndex: (index: number) => void
}

const defaultTracks: Track[] = [
  {
    id: 'track1',
    title: 'Melodía Emocional de Violín',
    artist: 'Música Instrumental',
    source: '/music/emotional-violin1.mp3',
    cover: '/images/demo/music/violin-cover.jpg'
  },
  {
    id: 'track2',
    title: 'Piano y Cuerdas Celestiales',
    artist: 'Música Instrumental',
    source: '/music/piano-strings1.mp3',
    cover: '/images/demo/music/piano-cover.jpg'
  },
  {
    id: 'track3',
    title: 'Piano Cinematográfico Esperanzador',
    artist: 'Música Instrumental',
    source: '/music/hopeful-cinematic-piano1.mp3',
    cover: '/images/demo/music/cinematic-cover.jpg'
  }
]

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export const useMusicContext = () => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider')
  }
  return context
}

interface MusicProviderProps {
  children: ReactNode
  initialTracks?: Track[]
}

export const MusicProvider = ({ 
  children,
  initialTracks = defaultTracks
}: MusicProviderProps) => {
  const [tracks] = useState<Track[]>(initialTracks)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)

  const play = () => setIsPlaying(true)
  const pause = () => setIsPlaying(false)
  const togglePlay = () => setIsPlaying(prev => !prev)

  const nextTrack = () => {
    setCurrentTrackIndex(prev => (prev + 1) % tracks.length)
  }

  const previousTrack = () => {
    setCurrentTrackIndex(prev => (prev - 1 + tracks.length) % tracks.length)
  }

  return (
    <MusicContext.Provider
      value={{
        tracks,
        currentTrackIndex,
        isPlaying,
        volume,
        play,
        pause,
        togglePlay,
        setVolume,
        nextTrack,
        previousTrack,
        setCurrentTrackIndex
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}
