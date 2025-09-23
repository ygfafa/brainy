import { create } from 'zustand'

import type { YouTubePlayerRef } from '@/components/youtube/youtube-player'
import type { Subtitle } from '@/types/subtitle'
import { timeStringToSeconds } from '@/utils/time'

type SubtitleStore = {
  // 상태
  subtitles: Subtitle[]
  currentSubtitle: Subtitle | null
  currentIndex: number
  currentTime: number

  // 액션
  setSubtitles: (subtitles: Subtitle[]) => void
  syncWithTime: (time: number) => void
  nextSubtitle: (playerRef?: YouTubePlayerRef | null) => void
  prevSubtitle: (playerRef?: YouTubePlayerRef | null) => void
}

export const useSubtitleStore = create<SubtitleStore>((set, get) => ({
  // 초기 상태
  subtitles: [],
  currentSubtitle: null,
  currentIndex: 0,
  currentTime: 0,

  // 액션 구현
  setSubtitles: subtitles => set({ subtitles }),

  syncWithTime: time => {
    const { subtitles, currentIndex } = get()

    const newIndex = subtitles.findIndex(subtitle => {
      return (
        time >= timeStringToSeconds(subtitle.startTime) &&
        time < timeStringToSeconds(subtitle.endTime)
      )
    })

    if (newIndex !== -1 && newIndex !== currentIndex) {
      set({ currentIndex: newIndex, currentSubtitle: subtitles[newIndex] })
    }
  },

  nextSubtitle: playerRef => {
    const { currentIndex, subtitles } = get()
    const nextIndex = currentIndex + 1

    if (nextIndex < subtitles.length) {
      set({ currentIndex: nextIndex })
      if (playerRef) {
        playerRef.seekTo(timeStringToSeconds(subtitles[nextIndex].startTime))
      }
    }
  },

  prevSubtitle: playerRef => {
    const { currentIndex, subtitles } = get()
    const prevIndex = currentIndex - 1

    if (prevIndex >= 0) {
      set({ currentIndex: prevIndex })
      if (playerRef) {
        playerRef.seekTo(timeStringToSeconds(subtitles[prevIndex].startTime))
      }
    }
  },
}))
