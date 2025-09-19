import { ChevronLeft, ChevronRight, Languages, Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useSubtitleStore } from '@/stores/subtitle-store'

import type { YouTubePlayerRef } from './youtube-player'

type VideoControlsProps = {
  playerRef: React.RefObject<YouTubePlayerRef | null>
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const VideoControls = ({ playerRef }: VideoControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const { currentIndex, subtitles, nextSubtitle, prevSubtitle, isTranslationActive, toggleTranslation } =
    useSubtitleStore()

  const hasPrevSubtitle = currentIndex > 0
  const hasNextSubtitle = currentIndex < subtitles.length - 1

  // Duration은 비디오 로드 시 한 번만 설정
  useEffect(() => {
    if (playerRef.current) {
      const checkDuration = () => {
        const dur = playerRef.current?.getDuration()
        if (dur && dur > 0) {
          setDuration(dur)
        } else {
          // Duration이 아직 준비되지 않았으면 재시도
          setTimeout(checkDuration, 500)
        }
      }
      checkDuration()
    }
  }, [playerRef])

  // requestAnimationFrame으로 부드러운 시간 업데이트 (항상 실행)
  useEffect(() => {
    let animationId: number

    const updateTime = () => {
      if (playerRef.current) {
        const time = playerRef.current.getCurrentTime()
        const state = playerRef.current.getPlayerState()

        setCurrentTime(time)
        setIsPlaying(state === 1)
      }

      // 항상 다음 프레임 요청
      animationId = requestAnimationFrame(updateTime)
    }

    // 시작
    updateTime()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [playerRef])

  const handlePlayPause = () => {
    if (!playerRef.current) return

    if (isPlaying) {
      playerRef.current.pause()
      setIsPlaying(false)

      return
    }
    playerRef.current.play()
    setIsPlaying(true)
  }

  const handlePrevious = () => {
    if (hasPrevSubtitle) {
      prevSubtitle(playerRef.current)
    }
  }

  const handleNext = () => {
    if (hasNextSubtitle) {
      nextSubtitle(playerRef.current)
    }
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="max-w-[640px] mx-auto">
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-red-600 transition-all duration-100"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            {/* 이전 자막 버튼 */}
            <button
              onClick={handlePrevious}
              disabled={!hasPrevSubtitle}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 재생/일시정지 버튼 */}
            <button
              onClick={handlePlayPause}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>

            {/* 다음 자막 버튼 */}
            <button
              onClick={handleNext}
              disabled={!hasNextSubtitle}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* 번역 토글 버튼 */}
            <button
              onClick={toggleTranslation}
              className={`p-2 rounded-full transition-colors ${
                isTranslationActive
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
              title={isTranslationActive ? '번역 끄기' : '번역 켜기'}
            >
              <Languages className="w-5 h-5" />
            </button>

            {/* 시간 표시 */}
            <div className="text-sm text-gray-600">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
