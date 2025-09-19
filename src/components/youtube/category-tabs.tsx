import { useRef } from 'react'

import { cn } from '@/lib/utils'
import type { Category } from '@/types/youtube'

type CategoryTabsProps = {
  categories: Category[]
  onCategoryClick?: (category: Category) => void
}

export const CategoryTabs = ({ categories, onCategoryClick }: CategoryTabsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="fixed bg-white z-40"
      style={{ maxWidth: 640, margin: '0 auto', top: 56, left: 0, right: 0 }}
    >
      <div ref={scrollContainerRef} className="flex gap-3 px-4 py-3 overflow-x-auto scrollbar-hide">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryClick?.(category)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors',
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
