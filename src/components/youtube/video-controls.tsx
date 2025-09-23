import { Pause, Play, SkipBack, SkipForward } from 'lucide-react'

import { useSyncVideoTime } from '@/hooks/use-sync-video-time'
import { useSubtitleStore } from '@/stores/subtitle-store'

import type { YouTubePlayerRef } from './youtube-player'

type VideoControlsProps = {
  playerRef: React.RefObject<YouTubePlayerRef | null>
  playerState: number
}

export const VideoControls = ({ playerRef, playerState }: VideoControlsProps) => {
  const isPlaying = playerState === 1 // YouTube Player State: 1 = PLAYING

  const { currentIndex, subtitles, nextSubtitle, prevSubtitle } = useSubtitleStore()
  const { currentTime } = useSyncVideoTime({ playerRef, playerState })

  const hasPrevSubtitle = currentIndex > 0
  const hasNextSubtitle = currentIndex < subtitles.length - 1

  const handlePlayPause = () => {
    if (!playerRef.current) return

    if (isPlaying) {
      playerRef.current.pause()

      return
    }
    playerRef.current.play()
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

  const duration = playerRef.current?.getDuration() || 0
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="max-w-[640px] mx-auto">
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-gray-900 transition-all duration-100"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-center p-4">
          <div className="flex items-center gap-2">
            {/* 이전 자막 버튼 */}
            <button
              onClick={handlePrevious}
              disabled={!hasPrevSubtitle}
              className="p-2 disabled:opacity-50"
            >
              <SkipBack className="w-6 h-6" />
            </button>

            {/* 재생/일시정지 버튼 */}
            <button onClick={handlePlayPause} className="p-2">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            {/* 다음 자막 버튼 */}
            <button
              onClick={handleNext}
              disabled={!hasNextSubtitle}
              className="p-2 disabled:opacity-50"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
