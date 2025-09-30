import { CATEGORY_TABS_HEIGHT, CategoryTabs } from '@/components/category-tabs'
import { Header, HEADER_HEIGHT } from '@/components/header'
import { VideoFeed } from '@/components/video-feed'
import { videos } from '@/data/videos'
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
        <VideoFeed videos={videos} />
      </div>
    </div>
  )
}

export default HomePage
