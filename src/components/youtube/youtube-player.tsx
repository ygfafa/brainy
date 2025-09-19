import { Play } from 'lucide-react'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

// YouTube iframe API 타입 정의
type YTPlayer = {
  playVideo(): void
  pauseVideo(): void
  stopVideo(): void
  seekTo(seconds: number, allowSeekAhead?: boolean): void
  getPlayerState(): number
  getCurrentTime(): number
  getDuration(): number
  getVideoLoadedFraction(): number
  mute(): void
  unMute(): void
  isMuted(): boolean
  setVolume(volume: number): void
  getVolume(): number
  destroy(): void
}

type YouTubePlayerProps = {
  videoId: string
  onStateChange?: (state: number) => void
}

export type YouTubePlayerRef = {
  play: () => void
  pause: () => void
  getCurrentTime: () => number
  getDuration: () => number
  getPlayerState: () => number
  seekTo: (seconds: number) => void
}

export const YouTubePlayer = forwardRef<YouTubePlayerRef, YouTubePlayerProps>(
  ({ videoId, onStateChange }, ref) => {
    const [showPlayer, setShowPlayer] = useState(false)
    const playerRef = useRef<YTPlayer | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowPlayer(true)
      }, 3000)

      return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
      if (!showPlayer) return

      const loadYouTubeAPI = () => {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
      }

      const initPlayer = () => {
        if (!containerRef.current) return

        playerRef.current = new window.YT.Player(containerRef.current.id, {
          videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            autohide: 1,
            playsinline: 1,
            disablekb: 1,
            fs: 0,
          },
          events: {
            onStateChange: event => {
              onStateChange?.(event.data)
            },
          },
        })
      }

      if (!window.YT) {
        loadYouTubeAPI()
        window.onYouTubeIframeAPIReady = initPlayer
      } else {
        initPlayer()
      }

      return () => {
        playerRef.current?.destroy()
      }
    }, [showPlayer, videoId, onStateChange])

    useImperativeHandle(ref, () => ({
      play: () => playerRef.current?.playVideo(),
      pause: () => playerRef.current?.pauseVideo(),
      getCurrentTime: () => playerRef.current?.getCurrentTime() || 0,
      getDuration: () => playerRef.current?.getDuration() || 0,
      getPlayerState: () => playerRef.current?.getPlayerState() || -1,
      seekTo: (seconds: number) => playerRef.current?.seekTo(seconds, true),
    }))

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
          <div id="youtube-player" ref={containerRef} className="w-full h-full" />
        )}
      </div>
    )
  },
)
