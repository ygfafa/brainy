import { IconShoppingCartStar } from '@tabler/icons-react'
import { useNavigate } from 'react-router'

import { CATEGORY_TABS_HEIGHT, CategoryTabs } from '@/components/category-tabs'
import { Page, PageAppBarWithLogo } from '@/components/layout/page'
import { VideoFeed } from '@/components/video-feed'
import { APP_BAR_HEIGHT } from '@/config/app'
import { paths } from '@/config/paths'
import { videos } from '@/data/videos'
import { type Category, useCategories } from '@/hooks/use-categories'

const HomePage = () => {
  const navigate = useNavigate()
  const { categories, updateCategoryActive } = useCategories()

  const handleCategoryActive = (data: Category) => {
    updateCategoryActive(data)
  }
  return (
    <Page>
      <PageAppBarWithLogo
        right={
          <button className="p-2" onClick={() => navigate(paths.my.dialogues.getHref())}>
            <IconShoppingCartStar />
          </button>
        }
      />
      <CategoryTabs categories={categories} onCategoryClick={handleCategoryActive} />
      <div style={{ paddingTop: CATEGORY_TABS_HEIGHT + APP_BAR_HEIGHT }}>
        <VideoFeed videos={videos} />
      </div>
    </Page>
  )
}

export default HomePage
