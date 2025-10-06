import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import { Page, PageAppBarWithBack, PageContent } from '@/components/layout/page'
import { SaveSubtitleButton } from '@/components/save-subtitle-button'
import { VideoController } from '@/components/video-controller'
import { VideoSubtitles } from '@/components/video-subtitles'
import { YouTubePlayer, type YouTubePlayerRef } from '@/components/youtube-player'
import { paths } from '@/config/paths'
import { defaultSubtitles, dialogue } from '@/data/dialogue'
import { useIsSentenceUpdated } from '@/stores/is-sentence-updated-store'
import { useGlobalModal } from '@/stores/modal-store'
import { useSavedSubtitlesStore } from '@/stores/saved-subtitles-store'
import { useSubtitleStore } from '@/stores/subtitle-store'
import type { YouTubeStateChangeDetail, YouTubeTimeUpdateDetail } from '@/types/youtube-events'
import { timeStringToSeconds } from '@/utils/time'

const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>()
  const navigate = useNavigate()
  // const [searchParams] = useSearchParams()
  const playerRef = useRef<YouTubePlayerRef>(null)
  const [playerState, setPlayerState] = useState(-1)
  const [currentTime, setCurrentTime] = useState(0)

  const modal = useGlobalModal()
  // const [play] = useSound(alarmSound)

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
  const { setIsSentenceUpdated } = useIsSentenceUpdated()

  const currentSubtitle = subtitles[currentIndex]

  const hasCommentary = !!currentSubtitle?.commentary

  const savedSubtitle = currentSubtitle
    ? getSavedSubtitle(videoId!, subtitles[currentIndex].id)
    : undefined
  const isSaved = !!savedSubtitle

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
      setIsSentenceUpdated(false)
    } else {
      addSubtitle(videoId!, currentSubtitle)
      setIsSentenceUpdated(true)
      toast('Đã lưu câu vào thư viện', {
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

      modal.open({
        title: 'Xem xong video rồi!',
        description: 'Bạn có muốn xem thư viện không?',
        okButtonProps: {
          children: '네',
        },
        cancelButtonProps: {
          children: '아니오',
        },
        onOk: () => {
          navigate(paths.my.sentences.getHref())
        },
        onCancel: () => {},
      })

      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime, currentIndex, subtitles, playerRef])

  useEffect(() => {
    if (subtitles.length === 0) return
    const endTime = timeStringToSeconds(subtitles[currentIndex].endTime)

    if (hasCommentary && currentTime >= endTime) {
      // play()

      playerRef.current?.pause()
    }
  }, [hasCommentary, currentIndex, subtitles, currentTime, playerRef])

  useEffect(() => {
    const handleTimeUpdate = (event: CustomEvent<YouTubeTimeUpdateDetail>) => {
      const { currentTime } = event.detail

      setCurrentTime(currentTime)
      syncWithTime(currentTime)
    }

    // 상태 변화 이벤트 리스너
    const handleStateChange = (event: CustomEvent<YouTubeStateChangeDetail>) => {
      const { state } = event.detail

      setPlayerState(state)
    }

    // 이벤트 리스너 등록
    window.addEventListener('onYoutubeTimeUpdate', handleTimeUpdate)
    window.addEventListener('onYoutubeStateChange', handleStateChange)

    // 클린업
    return () => {
      window.removeEventListener('onYoutubeTimeUpdate', handleTimeUpdate)
      window.removeEventListener('onYoutubeStateChange', handleStateChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!videoId) {
    return <div className="p-4">비디오를 찾을 수 없습니다.</div>
  }

  return (
    <Page>
      <PageAppBarWithBack title="Chọn câu thoại để lưu" />
      <PageContent noSidePadding>
        <YouTubePlayer
          // autoPlay
          ref={playerRef}
          videoId={videoId}
          initialTime={timeStringToSeconds(subtitles[0]?.startTime || '00:00:00')}
          // onStateChange={setPlayerState}
          // onTimeUpdate={handleTimeUpdate}
        />

        {/* 자막 담기 버튼 */}
        <SaveSubtitleButton
          onClick={handleSaveSubtitle}
          isSaved={isSaved}
          // hasCommentary={hasCommentary}
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
      </PageContent>
    </Page>
  )
}

export default WatchPage
