import { useEffect } from 'react'

import type { YouTubePlayerRef } from '@/components/youtube/youtube-player'
import { useSubtitleStore } from '@/stores/subtitle-store'
import { useVideoCurrentTimeStore } from '@/stores/video-current-time-store'

type UseSubtitleRepeatOptions = {
  playerRef: React.RefObject<YouTubePlayerRef | null>
  enabled?: boolean
}

export const useSubtitleRepeat = ({ playerRef, enabled = true }: UseSubtitleRepeatOptions) => {
  const { currentTime } = useVideoCurrentTimeStore()
  const { checkAndRepeat, isRepeatMode } = useSubtitleStore()

  useEffect(() => {
    if (!enabled || !isRepeatMode || !playerRef.current) return

    checkAndRepeat(currentTime, playerRef.current)
  }, [currentTime, isRepeatMode, enabled, playerRef, checkAndRepeat])
}