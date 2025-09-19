import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

import { SubtitleCarousel } from '@/components/subtitle/subtitle-carousel'
import { VideoControls } from '@/components/youtube/video-controls'
import { YouTubePlayer, type YouTubePlayerRef } from '@/components/youtube/youtube-player'
import { defaultSubtitles, mockSubtitles } from '@/data/mock-subtitles'
import { useSubtitleStore } from '@/stores/subtitle-store'

const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>()
  const playerRef = useRef<YouTubePlayerRef>(null)
  const [playerState, setPlayerState] = useState(-1)

  const { setSubtitles, setPlayerRef, setCurrentTime, subtitles } = useSubtitleStore()

  // 비디오 ID에 맞는 자막 로드
  useEffect(() => {
    if (videoId) {
      const videoSubtitles = mockSubtitles[videoId] || defaultSubtitles
      setSubtitles(videoSubtitles)
    }
  }, [videoId, setSubtitles])

  // 플레이어 참조 설정
  useEffect(() => {
    if (playerRef.current) {
      setPlayerRef(playerRef.current)
    }
  }, [setPlayerRef])

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

  return (
    <div className="min-h-screen bg-white pb-20">
      <YouTubePlayer ref={playerRef} videoId={videoId} onStateChange={setPlayerState} />

      {/* 자막 캐러셀 */}
      <SubtitleCarousel subtitles={subtitles} />

      <div className="p-4">
        <h1 className="text-lg font-semibold">
          {playerState === 1 ? '재생 중' : playerState === 2 ? '일시정지' : '비디오 로딩 중...'}
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          스와이프하거나 카드를 클릭하여 원하는 구간으로 이동하세요.
        </p>
      </div>

      <VideoControls playerRef={playerRef} />
    </div>
  )
}

export default WatchPage