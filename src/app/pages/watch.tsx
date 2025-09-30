import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'sonner'

import { SaveSubtitleButton } from '@/components/save-subtitle-button'
import { VideoController } from '@/components/video-controller'
import { VideoSubtitles } from '@/components/video-subtitles'
import { YouTubePlayer, type YouTubePlayerRef } from '@/components/youtube-player'
import { defaultSubtitles, dialogue } from '@/data/dialogue'
import { useSavedSubtitlesStore } from '@/stores/saved-subtitles-store'
import { useSubtitleStore } from '@/stores/subtitle-store'
import { timeStringToSeconds } from '@/utils/time'

const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>()
  // const [searchParams] = useSearchParams()
  const playerRef = useRef<YouTubePlayerRef>(null)
  const [playerState, setPlayerState] = useState(-1)
  const [currentTime, setCurrentTime] = useState(0)

  const {
    setSubtitles,
    subtitles,
    currentIndex,
    syncWithTime,
    isRepeatMode,
    toggleRepeatMode,
    prevSubtitle,
    nextSubtitle,
  } = useSubtitleStore()
  const { addSubtitle, removeSubtitle, getSavedSubtitle } = useSavedSubtitlesStore()

  const currentSubtitle = subtitles[currentIndex]

  const savedSubtitle = currentSubtitle
    ? getSavedSubtitle(videoId!, subtitles[currentIndex].id)
    : undefined
  const isSaved = !!savedSubtitle

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time)
    syncWithTime(time)
  }

  const handleTogglePlay = () => {
    if (playerState === 1) {
      playerRef.current?.pause()
    } else {
      playerRef.current?.play()
    }
  }

  const handleToggleRepeat = () => {
    toggleRepeatMode()
  }

  const handlePrevious = () => {
    prevSubtitle(playerRef.current)
  }

  const handleNext = () => {
    nextSubtitle(playerRef.current)
  }

  const handleSaveSubtitle = () => {
    if (isSaved && savedSubtitle) {
      removeSubtitle(savedSubtitle.id)
    } else {
      addSubtitle(videoId!, currentSubtitle)
      toast('자막이 장바구니에 담겼습니다', {
        // action: {
        //   label: '보러가기',
        //   onClick: () => navigate('/saved-subtitles'),
        // },
      })
    }
  }

  useEffect(() => {
    if (videoId) {
      const videoSubtitles = dialogue[videoId] || defaultSubtitles
      setSubtitles(videoSubtitles)
    }
  }, [videoId, setSubtitles])

  useEffect(() => {
    if (isRepeatMode) {
      const endTime = timeStringToSeconds(subtitles[currentIndex].endTime)
      if (currentTime >= endTime) {
        playerRef.current?.seekTo(timeStringToSeconds(subtitles[currentIndex].startTime))
      }
    }
  }, [currentTime, isRepeatMode, syncWithTime, currentIndex, subtitles, playerRef])

  useEffect(() => {
    if (subtitles.length === 0) return

    const endTime = timeStringToSeconds(subtitles[currentIndex].endTime)
    const isLastSubtitle = currentIndex === subtitles.length - 1
    if (isLastSubtitle && currentTime >= endTime) {
      playerRef.current?.pause()
      return
    }
  }, [currentTime, currentIndex, subtitles, playerRef])

  if (!videoId) {
    return <div className="p-4">비디오를 찾을 수 없습니다.</div>
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <YouTubePlayer
        // autoPlay
        ref={playerRef}
        videoId={videoId}
        initialTime={timeStringToSeconds(subtitles[0]?.startTime || '00:00:00')}
        onStateChange={setPlayerState}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* 자막 담기 버튼 */}
      <SaveSubtitleButton
        onClick={handleSaveSubtitle}
        isSaved={isSaved}
        hasCommentary={!!currentSubtitle?.commentary}
      />

      {/* 현재 자막 표시 */}
      <VideoSubtitles data={currentSubtitle} />
      <VideoController
        isPlaying={playerState === 1}
        isRepeatMode={isRepeatMode}
        hasPrevSubtitle={currentIndex > 0}
        hasNextSubtitle={currentIndex < subtitles.length - 1}
        togglePlay={handleTogglePlay}
        onPrevious={handlePrevious}
        onNext={handleNext}
        toggleRepeat={handleToggleRepeat}
      />
    </div>
  )
}

export default WatchPage
