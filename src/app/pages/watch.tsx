import { useParams } from 'react-router'

import { YouTubePlayer } from '@/components/youtube/youtube-player'

const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>()

  if (!videoId) {
    return <div className="p-4">비디오를 찾을 수 없습니다.</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <YouTubePlayer videoId={videoId} />
      <div className="p-4">
        <h1 className="text-lg font-semibold">비디오 재생 중...</h1>
      </div>
    </div>
  )
}

export default WatchPage