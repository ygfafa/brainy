import { CheckCircle, MoreVertical } from 'lucide-react'
import { useNavigate } from 'react-router'

import { paths } from '@/config/paths'
import type { Video } from '@/types/youtube'

type VideoCardProps = {
  video: Video
  onVideoClick?: () => void
  onMoreClick?: () => void
}

export const VideoCard = ({ video, onVideoClick, onMoreClick }: VideoCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onVideoClick) {
      onVideoClick()
    } else {
      navigate(paths.watch.getHref(video.videoId))
    }
  }

  return (
    <div className="flex flex-col cursor-pointer" onClick={handleClick}>
      <div className="relative">
        <img src={video.thumbnail} alt={video.title} className="w-full aspect-video object-cover" />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
          {video.duration}
        </div>
      </div>
      <div className="flex gap-3 mt-3 px-4">
        <img
          src={video.channel.avatar}
          alt={video.channel.name}
          className="w-9 h-9 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium line-clamp-2 leading-5 mb-1">{video.title}</h3>
          <div className="text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <span>{video.channel.name}</span>
              {video.channel.verified && <CheckCircle className="w-3 h-3 fill-current" />}
            </div>
            <div className="flex items-center gap-1">
              <span>{video.views}</span>
              <span>•</span>
              <span>{video.uploadedAt}</span>
            </div>
          </div>
        </div>
        <button
          className="p-1 h-fit"
          onClick={e => {
            e.stopPropagation()
            onMoreClick?.()
          }}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
