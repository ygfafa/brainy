import type { Video } from '@/types/youtube'

export const mockVideos: Video[] = [
  {
    videoId: 'cW9D6_g6MR0',
    thumbnail:
      'https://fastly.picsum.photos/id/17/360/200.jpg?hmac=6rR953atscXo_NUu645AJ-iyifnk-71dWDh-JEuiwRE',
    title: '🎧 loreum ipsum',
    description: 'Et adipisicing ipsum nisi ullamco elit duis dolore aute nisi dolor. ',
    subtitleCount: 100,
    level: 1,
    duration: '2:25:02',
  },
] as const
