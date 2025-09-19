import { Play } from 'lucide-react'
import { useEffect, useState } from 'react'

type YouTubePlayerProps = {
  videoId: string
}

export const YouTubePlayer = ({ videoId }: YouTubePlayerProps) => {
  const [showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlayer(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full aspect-video bg-black">
      {!showPlayer ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-4 p-4 bg-white/10 rounded-full">
            <Play className="w-12 h-12 text-white/80 fill-white/80" />
          </div>
          <p className="text-white/70 text-sm text-center px-4">
            유튜브 콘텐츠 제작자를 위한
            <br />
            광고가 나올 수 있습니다.
          </p>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&autohide=1&playsinline=1&disablekb=1&fs=0&autohid1`}
          className="absolute top-0 left-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        />
      )}
    </div>
  )
}

// controls=0: 기본 컨트롤 숨김
// modestbranding=1: YouTube 로고 최소화
// rel=0: 관련 영상 미표시
// showinfo=0: 영상 정보 숨김
// disablekb=1: 키보드 컨트롤 비활성화
