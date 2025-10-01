import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
  IconRepeat,
  IconRepeatOff,
} from '@tabler/icons-react'

type VideoControllerProps = {
  isPlaying: boolean
  isRepeatMode: boolean
  hasPrevSubtitle: boolean
  hasNextSubtitle: boolean
  onPrevious: () => void
  onNext: () => void
  togglePlay: () => void
  toggleRepeat: () => void
}

export const VideoController = ({
  togglePlay,
  isPlaying,
  isRepeatMode,
  onPrevious,
  onNext,
  toggleRepeat,
  hasPrevSubtitle,
  hasNextSubtitle,
}: VideoControllerProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-50">
      <div className="max-w-[640px] mx-auto">
        {/* <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-gray-900 transition-all duration-100"
            style={{ width: `${progressPercentage}%` }}
          />
        </div> */}

        <div className="relative flex items-center justify-between py-2 px-8">
          <div />
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            {/* 이전 자막 버튼 */}
            <button
              onClick={onPrevious}
              disabled={!hasPrevSubtitle}
              className="p-2 disabled:opacity-50"
            >
              <IconPlayerSkipBackFilled />
            </button>

            {/* 재생/일시정지 버튼 */}
            <button onClick={togglePlay} className="p-2">
              {isPlaying ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
            </button>

            {/* 다음 자막 버튼 */}
            <button
              onClick={onNext}
              disabled={!hasNextSubtitle}
              className="p-2 disabled:opacity-50"
            >
              <IconPlayerSkipForwardFilled />
            </button>

            {/* 구간 반복 버튼 */}
          </div>
          <button onClick={toggleRepeat} className={'p-2 rounded-full transition-color'}>
            {isRepeatMode ? <IconRepeat /> : <IconRepeatOff />}
          </button>
        </div>
      </div>
    </div>
  )
}
