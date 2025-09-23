import { useEffect } from 'react'

import type { YouTubePlayerRef } from '@/components/youtube/youtube-player'
import { useVideoCurrentTimeStore } from '@/stores/video-current-time-store'

type useSyncVideoTimeOptions = {
  playerRef: React.RefObject<YouTubePlayerRef | null>
  playerState: number
}

export const useSyncVideoTime = ({ playerRef, playerState }: useSyncVideoTimeOptions) => {
  const { setCurrentTime, currentTime } = useVideoCurrentTimeStore()

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && playerState === 1) {
        // 재생 중일 때만
        const currentTime = playerRef.current.getCurrentTime()
        setCurrentTime(currentTime)
      }
    }, 100) // 100ms마다 체크

    return () => clearInterval(interval)
  }, [playerRef, setCurrentTime, playerState])

  return { currentTime }
}
