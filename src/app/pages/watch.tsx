import { useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'

import { SaveSubtitleButton } from '@/components/save-subtitle-button'
import { VideoControls } from '@/components/youtube/video-controls'
import { YouTubePlayer, type YouTubePlayerRef } from '@/components/youtube/youtube-player'
import { defaultSubtitles, mockSubtitles } from '@/data/mock-subtitles'
import { useSubtitleStore } from '@/stores/subtitle-store'
import { timeStringToSeconds } from '@/utils/time'

const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>()
  const [searchParams] = useSearchParams()
  const playerRef = useRef<YouTubePlayerRef>(null)
  const [playerState, setPlayerState] = useState(-1)

  const { setSubtitles, setCurrentTime, subtitles, currentIndex, isTranslationActive } =
    useSubtitleStore()

  // 비디오 ID에 맞는 자막 로드
  useEffect(() => {
    if (videoId) {
      const videoSubtitles = mockSubtitles[videoId] || defaultSubtitles
      setSubtitles(videoSubtitles)
    }
  }, [videoId, setSubtitles])

  // 재생 시간 동기화
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && playerState === 1) {
        // 재생 중일 때만
        const currentTime = playerRef.current.getCurrentTime()
        setCurrentTime(currentTime)
      }
    }, 100) // 100ms마다 체크

    return () => clearInterval(interval)
  }, [playerState, setCurrentTime])

  if (!videoId) {
    return <div className="p-4">비디오를 찾을 수 없습니다.</div>
  }

  const currentSubtitle = subtitles[currentIndex]

  return (
    <div className="min-h-screen bg-white pb-20">
      <YouTubePlayer
        ref={playerRef}
        videoId={videoId}
        startTime={timeStringToSeconds('00:17:27')}
        onStateChange={setPlayerState}
      />

      {/* 자막 담기 버튼 */}
      <SaveSubtitleButton />

      {/* 현재 자막 표시 */}
      <div className="p-4">
        {currentSubtitle && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-lg font-medium mb-2">{currentSubtitle.text}</p>
            {isTranslationActive && (
              <p className="text-sm text-gray-600">{currentSubtitle.translation}</p>
            )}
          </div>
        )}
        <p className="text-xs text-gray-500">
          {currentIndex + 1} / {subtitles.length} 자막
        </p>
      </div>

      <VideoControls playerRef={playerRef} />
    </div>
  )
}

export default WatchPage
