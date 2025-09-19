import { useState } from 'react'

import { CategoryTabs } from '@/components/youtube/category-tabs'
import { Header } from '@/components/youtube/header'
import { ShortsSection } from '@/components/youtube/shorts-section'
import { VideoFeed } from '@/components/youtube/video-feed'
import { mockCategories, mockShorts, mockVideos } from '@/data/mock-youtube-data'

const HomePage = () => {
  const [categories, setCategories] = useState(mockCategories)

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
      <div className="pt-28">
        <ShortsSection shorts={mockShorts} />
        <VideoFeed videos={mockVideos} />
      </div>
    </div>
  )
}

export default HomePage
