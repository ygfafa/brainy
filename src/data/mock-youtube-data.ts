import type { Category, Video } from '@/types/youtube'

export const mockCategories: Category[] = [
  { id: '1', label: '전체', active: true },
  { id: '2', label: '음악' },
  { id: '3', label: '라이브' },
  { id: '4', label: '게임' },
  { id: '5', label: '뉴스' },
  { id: '6', label: '스포츠' },
  { id: '7', label: '학습' },
  { id: '8', label: '요리' },
  { id: '9', label: '최근에 업로드된 동영상' },
  { id: '10', label: '감상한 동영상' },
  { id: '11', label: '새로운 맞춤 동영상' },
]

export const mockVideos: Video[] = [
  {
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/360/200?random=1',
    title: '🎧 loreum ipsum',
    description: 'Et adipisicing ipsum nisi ullamco elit duis dolore aute nisi dolor. ',
    subtitleCount: 100,
    level: 1,
    duration: '2:25:02',
  },
  {
    videoId: 'jNQXAC9IVRw',
    thumbnail: 'https://picsum.photos/360/200?random=2',
    title: 'Veniam cillum velit mollit consequat mollit.',
    description: 'Cupidatat occaecat exercitation adipisicing excepteur dolore.',
    subtitleCount: 100,
    level: 2,
    duration: '12:26',
  },
]
