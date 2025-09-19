import { useRef, useState } from 'react'
import { useParams } from 'react-router'

import { VideoControls } from '@/components/youtube/video-controls'
import { YouTubePlayer, type YouTubePlayerRef } from '@/components/youtube/youtube-player'

const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>()
  const playerRef = useRef<YouTubePlayerRef>(null)
  const [playerState, setPlayerState] = useState(-1)

  if (!videoId) {
    return <div className="p-4">비디오를 찾을 수 없습니다.</div>
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <YouTubePlayer
        ref={playerRef}
        videoId={videoId}
        onStateChange={setPlayerState}
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">
          {playerState === 1 ? '재생 중' : playerState === 2 ? '일시정지' : '비디오 로딩 중...'}
        </h1>
      </div>
      <VideoControls playerRef={playerRef} />
    </div>
  )
}

export default WatchPage