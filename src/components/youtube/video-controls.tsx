import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useSubtitleStore } from '@/stores/subtitle-store'

import type { YouTubePlayerRef } from './youtube-player'

type VideoControlsProps = {
  playerRef: React.RefObject<YouTubePlayerRef | null>
}

export const VideoControls = ({ playerRef }: VideoControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const { currentIndex, subtitles, seekToSubtitle } = useSubtitleStore()

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime())
        setDuration(playerRef.current.getDuration())

        const state = playerRef.current.getPlayerState()
        setIsPlaying(state === 1) // 1 = PLAYING
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [playerRef])

  const handlePlayPause = () => {
    if (!playerRef.current) return

    if (isPlaying) {
      playerRef.current.pause()
      setIsPlaying(false)
    } else {
      playerRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      seekToSubtitle(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < subtitles.length - 1) {
      seekToSubtitle(currentIndex + 1)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="max-w-[640px] mx-auto">
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-red-600 transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            {/* 이전 자막 버튼 */}
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 재생/일시정지 버튼 */}
            <button
              onClick={handlePlayPause}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
            </button>

            {/* 다음 자막 버튼 */}
            <button
              onClick={handleNext}
              disabled={currentIndex === subtitles.length - 1}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="text-sm text-gray-600">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  )
}