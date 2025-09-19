import { Play, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { paths } from '@/config/paths'
import type { SavedSubtitle } from '@/stores/saved-subtitles-store'
import { useSavedSubtitlesStore } from '@/stores/saved-subtitles-store'

type SavedSubtitleCardProps = {
  savedSubtitle: SavedSubtitle
}

export const SavedSubtitleCard = ({ savedSubtitle }: SavedSubtitleCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const { removeSubtitle } = useSavedSubtitlesStore()
  const navigate = useNavigate()

  const { subtitle, videoId, videoTitle } = savedSubtitle

  const handleGoToVideo = () => {
    navigate(paths.watch.getHref(videoId))
    // 비디오 페이지로 이동 후 해당 시간으로 seek하기 위해 쿼리 파라미터 추가
    const url = `${paths.watch.getHref(videoId)}?t=${subtitle.startTime}`
    navigate(url)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    removeSubtitle(savedSubtitle.id)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative">
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        style={{ perspective: '1000px' }}
      >
        <div
          className={`relative transition-transform duration-500 preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* 앞면 - 원문 */}
          <div
            className="p-4 backface-hidden"
            style={{
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-gray-500">{formatTime(subtitle.startTime)}</span>
              <button
                onClick={handleDelete}
                className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                title="삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-base font-medium text-gray-900 mb-3 min-h-[48px]">
              {subtitle.text}
            </p>
            {videoTitle && (
              <p className="text-xs text-gray-500 truncate mb-2">{videoTitle}</p>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleGoToVideo()
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              <Play className="w-3 h-3" />
              영상으로 이동
            </button>
          </div>

          {/* 뒷면 - 번역 */}
          <div
            className="absolute inset-0 p-4 backface-hidden rotate-y-180"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-gray-500">번역</span>
            </div>
            <p className="text-base text-gray-700 min-h-[48px]">
              {subtitle.translation}
            </p>
            {videoTitle && (
              <p className="text-xs text-gray-500 truncate mb-2">{videoTitle}</p>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleGoToVideo()
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              <Play className="w-3 h-3" />
              영상으로 이동
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}