import { useNavigate } from 'react-router'

import { paths } from '@/config/paths'
import type { Video } from '@/types/youtube'

type VideoCardProps = {
  video: Video
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(paths.watch.getHref(video.videoId))
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
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>{video.channel.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
