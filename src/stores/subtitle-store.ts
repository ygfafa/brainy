import { create } from 'zustand'

import type { YouTubePlayerRef } from '@/components/youtube/youtube-player'
import type { Subtitle } from '@/types/subtitle'

type SubtitleStore = {
  // 상태
  subtitles: Subtitle[]
  currentIndex: number
  currentTime: number
  isTranslationActive: boolean

  // 액션
  setSubtitles: (subtitles: Subtitle[]) => void
  setCurrentIndex: (index: number, playerRef?: YouTubePlayerRef | null) => void
  setCurrentTime: (time: number) => void
  syncWithTime: (time: number) => void
  nextSubtitle: (playerRef?: YouTubePlayerRef | null) => void
  prevSubtitle: (playerRef?: YouTubePlayerRef | null) => void
  toggleTranslation: () => void
}

export const useSubtitleStore = create<SubtitleStore>((set, get) => ({
  // 초기 상태
  subtitles: [],
  currentIndex: 0,
  currentTime: 0,
  isTranslationActive: true,

  // 액션 구현
  setSubtitles: subtitles => set({ subtitles }),

  setCurrentIndex: (index, playerRef) => {
    const { subtitles } = get()
    if (index >= 0 && index < subtitles.length) {
      set({ currentIndex: index })
      // 캐러셀 변경 시 영상도 이동
      if (playerRef) {
        playerRef.seekTo(subtitles[index].startTime)
      }
    }
  },

  setCurrentTime: time => {
    set({ currentTime: time })
    get().syncWithTime(time)
  },

  syncWithTime: time => {
    const { subtitles, currentIndex } = get()

    // 현재 시간에 해당하는 자막 찾기
    const newIndex = subtitles.findIndex(
      subtitle => time >= subtitle.startTime && time < subtitle.endTime,
    )

    // 새로운 자막으로 이동해야 하는 경우
    if (newIndex !== -1 && newIndex !== currentIndex) {
      set({ currentIndex: newIndex })
    }
  },

  nextSubtitle: playerRef => {
    const { currentIndex, subtitles } = get()
    const nextIndex = currentIndex + 1

    if (nextIndex < subtitles.length) {
      set({ currentIndex: nextIndex })
      if (playerRef) {
        playerRef.seekTo(subtitles[nextIndex].startTime)
      }
    }
  },

  prevSubtitle: playerRef => {
    const { currentIndex, subtitles } = get()
    const prevIndex = currentIndex - 1

    if (prevIndex >= 0) {
      set({ currentIndex: prevIndex })
      if (playerRef) {
        playerRef.seekTo(subtitles[prevIndex].startTime)
      }
    }
  },

  toggleTranslation: () => {
    set(state => ({ isTranslationActive: !state.isTranslationActive }))
  },
}))
