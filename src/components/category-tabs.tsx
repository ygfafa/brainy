import { cn } from '@/lib/utils'
import type { Category } from '@/types/youtube'

import { MAX_MOBILE_SCREEN_WIDTH } from './layout/mobile-only-layout'

type CategoryTabsProps = {
  categories: Category[]
  onCategoryClick?: (category: Category) => void
}

export const CATEGORY_TABS_HEIGHT = 56

export const CategoryTabs = ({ categories, onCategoryClick }: CategoryTabsProps) => {
  return (
    <div
      className="fixed bg-white z-40"
      style={{
        maxWidth: MAX_MOBILE_SCREEN_WIDTH,
        margin: '0 auto',
        top: 64,
        left: 0,
        right: 0,
        height: CATEGORY_TABS_HEIGHT,
      }}
    >
      <div className="flex gap-3 px-4 py-3 overflow-x-auto scrollbar-hide">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryClick?.(category)}
            className={cn(
              'px-3 py-1.5 rounded text-sm whitespace-nowrap transition-colors',
              category.active
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}
