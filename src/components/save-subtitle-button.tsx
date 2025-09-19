import { Bookmark } from 'lucide-react'
import { useParams } from 'react-router'

import { useSavedSubtitlesStore } from '@/stores/saved-subtitles-store'
import { useSubtitleStore } from '@/stores/subtitle-store'

export const SaveSubtitleButton = () => {
  const { videoId } = useParams<{ videoId: string }>()
  const { subtitles, currentIndex } = useSubtitleStore()
  const { addSubtitle, removeSubtitle, getSavedSubtitle } = useSavedSubtitlesStore()

  const currentSubtitle = subtitles[currentIndex]

  if (!currentSubtitle || !videoId) return null

  const savedSubtitle = getSavedSubtitle(videoId, currentSubtitle.id)
  const isSaved = !!savedSubtitle

  const handleClick = () => {
    if (isSaved && savedSubtitle) {
      removeSubtitle(savedSubtitle.id)
    } else {
      addSubtitle(videoId, currentSubtitle)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`fixed right-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all z-40 ${
        isSaved
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-white text-gray-600 hover:bg-gray-50 border'
      }`}
      title={isSaved ? '자막 담기 취소' : '자막 담기'}
    >
      <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
    </button>
  )
}