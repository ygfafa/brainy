import { useState } from 'react'

import { CategoryTabs } from '@/components/youtube/category-tabs'
import { Header } from '@/components/youtube/header'
import { ShortsSection } from '@/components/youtube/shorts-section'
import { VideoFeed } from '@/components/youtube/video-feed'
import { mockCategories, mockShorts, mockVideos } from '@/data/mock-youtube-data'
import { useScrollDirection } from '@/hooks/use-scroll-direction'

const HomePage = () => {
  const [categories, setCategories] = useState(mockCategories)
  const isHeaderVisible = useScrollDirection()

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
      <Header isVisible={isHeaderVisible} />
      <CategoryTabs
        categories={categories}
        onCategoryClick={handleCategoryClick}
        isVisible={isHeaderVisible}
      />
      <div
        className="pt-28"
        style={{
          paddingTop: isHeaderVisible ? '112px' : '0px',
          transition: 'padding-top 0.3s',
        }}
      >
        <ShortsSection shorts={mockShorts} />
        <VideoFeed videos={mockVideos} />
      </div>
    </div>
  )
}

export default HomePage
