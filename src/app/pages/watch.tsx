import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import { Page, PageAppBarWithBack, PageContent } from '@/components/layout/page'
import { SaveSubtitleButton } from '@/components/save-subtitle-button'
import { VideoController } from '@/components/video-controller'
import { VideoSubtitles } from '@/components/video-subtitles'
import { YouTubePlayer, type YouTubePlayerRef } from '@/components/youtube-player'
import { paths } from '@/config/paths'
import { dialogue } from '@/data/dialogue'
import { useIsSentenceUpdated } from '@/stores/is-sentence-updated-store'
import { useGlobalModal } from '@/stores/modal-store'
import { useSavedSubtitlesStore } from '@/stores/saved-subtitles-store'
import type { Dialogue } from '@/types/youtube'
import { timeStringToSeconds } from '@/utils/time'

const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>()

  const dialogues = getCurrentDialogue(videoId!)

  const [currentDialogue, setCurrentDialogue] = useState<Dialogue>(dialogues[0])
  const [isRepeatMode, setIsRepeatMode] = useState(false)

  const navigate = useNavigate()
  const playerRef = useRef<YouTubePlayerRef>(null)
  const [playerState, setPlayerState] = useState(-1)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // isRepeatMode의 최신 값을 참조하기 위한 ref
  const isRepeatModeRef = useRef(isRepeatMode)

  const modal = useGlobalModal()

  const { addSubtitle, removeSubtitle, getSavedSubtitle } = useSavedSubtitlesStore()
  const { setIsSentenceUpdated } = useIsSentenceUpdated()

  const savedSubtitle = currentDialogue ? getSavedSubtitle(videoId!, currentDialogue.id) : undefined

  const isSaved = !!savedSubtitle

  // isRepeatMode 상태가 변경될 때마다 ref 동기화
  useEffect(() => {
    isRepeatModeRef.current = isRepeatMode
  }, [isRepeatMode])

  const handleTogglePlay = () => {
    if (playerState === 1) {
      playerRef.current?.pause()
    } else {
      playerRef.current?.play()
    }
  }

  const handleToggleRepeat = () => {
    setIsRepeatMode(prev => {
      const newValue = !prev
      // ref도 함께 업데이트
      isRepeatModeRef.current = newValue
      return newValue
    })
  }

  const handlePrevious = () => {
    const currentIndex = dialogues.findIndex(d => d.id === currentDialogue?.id)
    const prevIndex = currentIndex - 1
    const prevDialogue = dialogues[prevIndex]

    // 이전 다이얼로그가 없음
    if (!prevDialogue) {
      return
    }

    if (playerRef) {
      setCurrentDialogue(prevDialogue)
      playerRef.current?.seekTo(timeStringToSeconds(prevDialogue.startTime))
    }
  }

  const handleNext = () => {
    const currentIndex = dialogues.findIndex(d => d.id === currentDialogue?.id)
    const nextIndex = currentIndex + 1
    const nextDialogue = dialogues[nextIndex]

    // 다음 다이얼로그가 없음
    if (!nextDialogue) {
      return
    }

    if (playerRef) {
      setCurrentDialogue(nextDialogue)
      playerRef.current?.seekTo(timeStringToSeconds(nextDialogue.startTime))
    }
  }

  const handleSaveSubtitle = () => {
    if (isSaved && savedSubtitle) {
      removeSubtitle(savedSubtitle.id)
      setIsSentenceUpdated(false)
    } else {
      addSubtitle(videoId!, currentDialogue!)
      setIsSentenceUpdated(true)
      toast('Đã lưu câu vào thư viện')
    }
  }

  // useEffect(() => {
  //   if (subtitles.length === 0) return
  //   const endTime = timeStringToSeconds(subtitles[currentIndex].endTime)

  //   if (hasCommentary && currentTime >= endTime) {
  //     // play()

  //     playerRef.current?.pause()
  //   }
  // }, [hasCommentary, currentIndex, subtitles, currentTime, playerRef])

  const handleDialogueEnded = () => {
    playerRef.current?.pause()

    modal.open({
      title: 'Xem xong video rồi!',
      description: 'Bạn có muốn xem thư viện không?',
      okButtonProps: {
        children: 'Có',
      },
      cancelButtonProps: {
        children: 'Không',
      },
      onOk: () => {
        navigate(paths.my.sentences.getHref())
      },
      onCancel: () => {},
    })
  }

  const handleRepeatMode = (time: number) => {
    const endTime = timeStringToSeconds(currentDialogue.endTime)

    if (time >= endTime) {
      playerRef.current?.seekTo(timeStringToSeconds(currentDialogue.startTime))
      setCurrentDialogue(currentDialogue)
    }
  }

  const startTimeTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // 100ms마다 현재 시간 업데이트 (더 부드러운 추적)
    intervalRef.current = setInterval(() => {
      if (playerRef.current) {
        const time = playerRef.current.getCurrentTime()

        console.log('isToggleRepeat', isRepeatModeRef.current)

        if (isDialogueEnded(time, dialogues)) {
          handleDialogueEnded()
          return
        }

        const isRepeatMode = isRepeatModeRef.current

        if (isRepeatMode) {
          handleRepeatMode(time)
          return
        }

        const 시간에따른다이얼로그 = dialogues.find(d => {
          return time >= timeStringToSeconds(d.startTime) && time < timeStringToSeconds(d.endTime)
        })

        if (!시간에따른다이얼로그) {
          return
        }

        setCurrentDialogue(시간에따른다이얼로그)

        // 반복 모드일 때 현재 다이얼로그 끝에서 다시 시작
      }
    }, 200)
  }

  const stopTimeTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handleStateChange = (state: number) => {
    const isPlaying = state === 1

    setPlayerState(state)

    if (isPlaying) {
      startTimeTracking()

      return
    }
    stopTimeTracking()
  }

  if (!videoId) {
    return <div className="p-4">Không tìm thấy video.</div>
  }

  return (
    <Page>
      <PageAppBarWithBack title="Chọn câu thoại để lưu" />
      <PageContent noSidePadding>
        <YouTubePlayer
          onStateChange={handleStateChange}
          ref={playerRef}
          videoId={videoId}
          initialTime={timeStringToSeconds(dialogues[0]?.startTime || '00:00:00')}
        />

        {/* 자막 담기 버튼 */}
        <SaveSubtitleButton onClick={handleSaveSubtitle} isSaved={isSaved} />

        {/* 현재 자막 표시 */}
        {currentDialogue && <VideoSubtitles data={currentDialogue} />}

        <VideoController
          isPlaying={playerState === 1}
          isRepeatMode={isRepeatMode}
          togglePlay={handleTogglePlay}
          onPrevious={handlePrevious}
          onNext={handleNext}
          toggleRepeat={handleToggleRepeat}
        />
      </PageContent>
    </Page>
  )
}

const isDialogueEnded = (time: number, dialogues: Dialogue[]) => {
  const lastDialogue = dialogues[dialogues.length - 1]
  return time >= timeStringToSeconds(lastDialogue.endTime)
}

const getCurrentDialogue = (videoId: string) => {
  return dialogue[videoId]
}

export default WatchPage
