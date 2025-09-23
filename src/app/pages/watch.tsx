import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

import { SaveSubtitleButton } from '@/components/save-subtitle-button'
import { VideoControls } from '@/components/youtube/video-controls'
import { YouTubePlayer, type YouTubePlayerRef } from '@/components/youtube/youtube-player'
import { defaultSubtitles, mockSubtitles } from '@/data/mock-subtitles'
import { useSyncVideoTime } from '@/hooks/use-sync-video-time'
import { useSubtitleStore } from '@/stores/subtitle-store'
import { timeStringToSeconds } from '@/utils/time'

const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>()
  // const [searchParams] = useSearchParams()
  const playerRef = useRef<YouTubePlayerRef>(null)
  const [playerState, setPlayerState] = useState(-1)

  const { setSubtitles, subtitles, currentIndex, syncWithTime, currentSubtitle } =
    useSubtitleStore()

  const { currentTime } = useSyncVideoTime({ playerRef, playerState })

  useEffect(() => {
    syncWithTime(currentTime)
  }, [currentTime, syncWithTime])

  useEffect(() => {
    if (videoId) {
      const videoSubtitles = mockSubtitles[videoId] || defaultSubtitles
      setSubtitles(videoSubtitles)
    }
  }, [videoId, setSubtitles])

  if (!videoId) {
    return <div className="p-4">비디오를 찾을 수 없습니다.</div>
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <YouTubePlayer
        autoPlay
        ref={playerRef}
        videoId={videoId}
        initialTime={timeStringToSeconds(subtitles[0]?.startTime || '00:00:00')}
        onStateChange={setPlayerState}
      />

      {/* 자막 담기 버튼 */}
      <SaveSubtitleButton />

      {/* 현재 자막 표시 */}
      <div className="p-4">
        {currentSubtitle && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-lg font-medium mb-2">{currentSubtitle.text}</p>
            {/* {isTranslationActive && (
              <p className="text-sm text-gray-600">{currentSubtitle.translation}</p>
            )} */}
          </div>
        )}
        <p className="text-xs text-gray-500">
          {currentIndex + 1} / {subtitles.length} 자막
        </p>
      </div>

      <VideoControls playerRef={playerRef} playerState={playerState} />
    </div>
  )
}

export default WatchPage
