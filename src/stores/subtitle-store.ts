import { create } from 'zustand'

import type { YouTubePlayerRef } from '@/components/youtube/youtube-player'
import type { Subtitle } from '@/types/subtitle'

type SubtitleStore = {
  // 상태
  subtitles: Subtitle[]
  currentIndex: number
  currentTime: number
  playerRef: YouTubePlayerRef | null

  // 액션
  setSubtitles: (subtitles: Subtitle[]) => void
  setCurrentIndex: (index: number) => void
  setCurrentTime: (time: number) => void
  setPlayerRef: (ref: YouTubePlayerRef | null) => void
  syncWithTime: (time: number) => void
  nextSubtitle: () => void
  prevSubtitle: () => void
}

export const useSubtitleStore = create<SubtitleStore>((set, get) => ({
  // 초기 상태
  subtitles: [],
  currentIndex: 0,
  currentTime: 0,
  playerRef: null,

  // 액션 구현
  setSubtitles: subtitles => set({ subtitles }),

  setCurrentIndex: index => {
    const { subtitles, playerRef } = get()
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

  setPlayerRef: ref => set({ playerRef: ref }),

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

  nextSubtitle: () => {
    const { currentIndex, subtitles, playerRef } = get()
    const nextIndex = currentIndex + 1

    if (nextIndex < subtitles.length && playerRef) {
      playerRef.seekTo(subtitles[nextIndex].startTime)
      set({ currentIndex: nextIndex })
    }
  },

  prevSubtitle: () => {
    const { currentIndex, subtitles, playerRef } = get()
    const prevIndex = currentIndex - 1

    if (prevIndex >= 0 && playerRef) {
      playerRef.seekTo(subtitles[prevIndex].startTime)
      set({ currentIndex: prevIndex })
    }
  },
}))
