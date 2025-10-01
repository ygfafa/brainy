import { IconShoppingCartStar } from '@tabler/icons-react'
import { useNavigate } from 'react-router'

import { CategoryTabs } from '@/components/category-tabs'
import { Page, PageAppBarWithLogo, PageContent } from '@/components/layout/page'
import { VideoFeed } from '@/components/video-feed'
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
      <PageContent noSidePadding>
        <CategoryTabs categories={categories} onCategoryClick={handleCategoryActive} />
        <VideoFeed videos={videos} />
      </PageContent>
    </Page>
  )
}

export default HomePage
