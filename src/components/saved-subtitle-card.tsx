import { AnimatePresence, motion } from 'framer-motion'
import { Play, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { paths } from '@/config/paths'
import type { SavedSubtitle } from '@/stores/saved-subtitles-store'
import { useSavedSubtitlesStore } from '@/stores/saved-subtitles-store'

import { UnderlinedText } from './ui/underlined-text'

type SavedSubtitleCardProps = {
  savedSubtitle: SavedSubtitle
}

export const SavedSubtitleCard = ({ savedSubtitle }: SavedSubtitleCardProps) => {
  const [isCommentaryOpen, setIsCommentaryOpen] = useState(false)
  const { removeSubtitle } = useSavedSubtitlesStore()
  const navigate = useNavigate()

  const { subtitle, videoId } = savedSubtitle

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

  const handleUnderlineClick = () => {
    // commentary 토글
    setIsCommentaryOpen(!isCommentaryOpen)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      {/* 원문 텍스트 - 중괄호 부분이 underline으로 표시되고 클릭 시 commentary 토글 */}
      <div className="mb-3">
        <UnderlinedText
          text={subtitle.text}
          className="text-lg font-medium text-gray-900 leading-relaxed"
          onUnderlineClick={handleUnderlineClick}
        />
      </div>

      {/* 번역 텍스트 */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 leading-relaxed">{subtitle.translation}</p>
      </div>

      {/* Commentary 아코디언 - UnderlinedText 클릭으로 토글됨 */}
      {subtitle.commentary && (
        <AnimatePresence>
          {isCommentaryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
              }}
              className="overflow-hidden mb-4"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                    Commentary
                  </span>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {subtitle.commentary}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* 액션 버튼들 */}
      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={e => {
            e.stopPropagation()
            handleGoToVideo()
          }}
          className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Play className="w-4 h-4" />
          영상 재생
        </button>
        <button
          onClick={e => {
            e.stopPropagation()
            handleDelete(e)
          }}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          삭제
        </button>
      </div>
    </div>
  )
}
