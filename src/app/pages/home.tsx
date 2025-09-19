import { Bookmark } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { CategoryTabs } from '@/components/youtube/category-tabs'
import { Header } from '@/components/youtube/header'
import { ShortsSection } from '@/components/youtube/shorts-section'
import { VideoFeed } from '@/components/youtube/video-feed'
import { paths } from '@/config/paths'
import { mockCategories, mockShorts, mockVideos } from '@/data/mock-youtube-data'
import { useSavedSubtitlesStore } from '@/stores/saved-subtitles-store'

const HomePage = () => {
  const [categories, setCategories] = useState(mockCategories)
  const navigate = useNavigate()
  const { savedSubtitles } = useSavedSubtitlesStore()

  const handleCategoryClick = (clickedCategory: (typeof categories)[0]) => {
    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        active: category.id === clickedCategory.id,
      })),
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryTabs categories={categories} onCategoryClick={handleCategoryClick} />

      {/* 내가 담은 자막 링크 */}
      <div className="px-4 py-3 bg-white border-b">
        <button
          onClick={() => navigate(paths.savedSubtitles.getHref())}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Bookmark className="w-4 h-4" />
          <span className="font-medium">내가 담은 자막</span>
          {savedSubtitles.length > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
              {savedSubtitles.length}
            </span>
          )}
        </button>
      </div>

      <div className="pt-28">
        <ShortsSection shorts={mockShorts} />
        <VideoFeed videos={mockVideos} />
      </div>
    </div>
  )
}

export default HomePage
