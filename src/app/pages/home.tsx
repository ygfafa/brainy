import { CATEGORY_TABS_HEIGHT, CategoryTabs } from '@/components/youtube/category-tabs'
import { Header, HEADER_HEIGHT } from '@/components/youtube/header'
import { VideoFeed } from '@/components/youtube/video-feed'
import { mockVideos } from '@/data/mock-youtube-data'
import { type Category, useCategories } from '@/hooks/use-categories'

const HomePage = () => {
  const { categories, updateCategoryActive } = useCategories()

  const handleCategoryActive = (data: Category) => {
    updateCategoryActive(data)
  }
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryTabs categories={categories} onCategoryClick={handleCategoryActive} />
      <div style={{ paddingTop: CATEGORY_TABS_HEIGHT + HEADER_HEIGHT }}>
        <VideoFeed videos={mockVideos} />
      </div>
    </div>
  )
}

export default HomePage
