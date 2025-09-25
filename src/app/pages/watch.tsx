import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

import { HighlightedText } from '@/components/ui/highlighted-text'
import { VideoControls } from '@/components/video-controls'
import { VideoSubtitles } from '@/components/video-subtitles'
import { YouTubePlayer, type YouTubePlayerRef } from '@/components/youtube-player'
import { defaultSubtitles, mockSubtitles } from '@/data/mock-subtitles'
import { useSubtitleStore } from '@/stores/subtitle-store'
import { timeStringToSeconds } from '@/utils/time'

const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>()
  // const [searchParams] = useSearchParams()
  const playerRef = useRef<YouTubePlayerRef>(null)
  const [playerState, setPlayerState] = useState(-1)
  const [currentTime, setCurrentTime] = useState(0)

  const { setSubtitles, subtitles, currentIndex, syncWithTime } = useSubtitleStore()

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time)
    syncWithTime(time)
  }

  useEffect(() => {
    if (videoId) {
      const videoSubtitles = mockSubtitles[videoId] || defaultSubtitles
      setSubtitles(videoSubtitles)
    }
  }, [videoId, setSubtitles])

  if (!videoId) {
    return <div className="p-4">비디오를 찾을 수 없습니다.</div>
  }

  const currentSubtitle = subtitles[currentIndex]

  return (
    <div className="min-h-screen bg-white pb-20">
      <YouTubePlayer
        autoPlay
        ref={playerRef}
        videoId={videoId}
        initialTime={timeStringToSeconds(subtitles[0]?.startTime || '00:00:00')}
        onStateChange={setPlayerState}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* 자막 담기 버튼 */}
      {/* <SaveSubtitleButton /> */}

      {/* 현재 자막 표시 */}
      <VideoSubtitles data={currentSubtitle} />
      <VideoControls playerRef={playerRef} playerState={playerState} currentTime={currentTime} />
    </div>
  )
}

export default WatchPage
