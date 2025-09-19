import { Play } from 'lucide-react'

import type { Shorts } from '@/types/youtube'

type ShortsSectionProps = {
  shorts: Shorts[]
}

export const ShortsSection = ({ shorts }: ShortsSectionProps) => {
  return (
    <div className="px-4 pb-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
          <Play className="w-3 h-3 text-white fill-white" />
        </div>
        <h2 className="text-lg font-semibold">Shorts</h2>
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {shorts.map(short => (
          <div key={short.id} className="flex-shrink-0 w-40 cursor-pointer">
            <div className="relative">
              <img
                src={short.thumbnail}
                alt={short.title}
                className="w-full aspect-[9/16] object-cover rounded-lg"
              />
              <div className="absolute bottom-2 left-2 text-white text-xs">
                조회수 {short.views}회
              </div>
            </div>
            <h3 className="text-sm mt-2 line-clamp-2">{short.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}