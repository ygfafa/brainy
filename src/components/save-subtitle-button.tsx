import { ShoppingCart } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import { useSavedSubtitlesStore } from '@/stores/saved-subtitles-store'
import { useSubtitleStore } from '@/stores/subtitle-store'

export const SaveSubtitleButton = () => {
  const { videoId } = useParams<{ videoId: string }>()
  const navigate = useNavigate()
  const { subtitles, currentIndex } = useSubtitleStore()
  const { addSubtitle, removeSubtitle, getSavedSubtitle } = useSavedSubtitlesStore()

  const currentSubtitle = subtitles[currentIndex]

  if (!currentSubtitle || !videoId) return null

  const savedSubtitle = getSavedSubtitle(videoId, currentSubtitle.id)
  const isSaved = !!savedSubtitle

  const handleClick = () => {
    if (isSaved && savedSubtitle) {
      removeSubtitle(savedSubtitle.id)
      toast.success('자막이 장바구니에서 제거되었습니다')
    } else {
      addSubtitle(videoId, currentSubtitle)
      toast.success('자막이 장바구니에 담겼습니다', {
        action: {
          label: '보러가기',
          onClick: () => navigate('/saved-subtitles'),
        },
      })
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
      title={isSaved ? '장바구니에서 빼기' : '장바구니에 담기'}
    >
      <ShoppingCart className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
    </button>
  )
}