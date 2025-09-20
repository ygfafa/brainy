import type { Video } from '@/types/youtube'

import { VideoCard } from './video-card'

type VideoFeedProps = {
  videos: Video[]
}

export const VideoFeed = ({ videos }: VideoFeedProps) => {
  return (
    <div className="flex flex-col gap-4 pb-4">
      {videos.map(video => (
        <VideoCard
          key={video.id}
          video={video}
          onMoreClick={() => console.log('More clicked:', video.id)}
        />
      ))}
    </div>
  )
}
