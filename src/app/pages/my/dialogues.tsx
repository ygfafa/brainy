import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

import { SavedSubtitleCard } from '@/components/saved-subtitle-card'
import { useSavedSubtitlesStore } from '@/stores/saved-subtitles-store'

const MyDialoguesPage = () => {
  const { savedSubtitles } = useSavedSubtitlesStore()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">내 문장</h1>
        </div>
      </header>

      {/* 콘텐츠 */}
      <main className="px-4 py-6">
        {savedSubtitles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">내 문장이 비어있습니다</p>
            <p className="text-sm text-gray-400">영상을 보며 자막을 담아보세요</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {savedSubtitles.map(savedSubtitle => (
              <SavedSubtitleCard key={savedSubtitle.id} savedSubtitle={savedSubtitle} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default MyDialoguesPage
