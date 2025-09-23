import type { Subtitle } from '@/types/subtitle'

// Rick Astley - Never Gonna Give You Up 가사 예시
export const mockSubtitles: Record<string, Subtitle[]> = {
  cW9D6_g6MR0: [
    {
      id: '1',
      startTime: '00:17:27',
      endTime: '00:17:29',
      text: 'Mà cái review này có kiểu hơi biến thái ấy.',
      translation: '근데 이거 리뷰가 그 변태 같은 맛이 있어요.',
    },
    {
      id: '2',
      startTime: '00:17:29',
      endTime: '00:17:33',
      text: 'Nhìn kỹ thì cả hai chúng mình cũng hơi biến thái đó.',
      translation: '지금 보면 상당히 우리 둘 다 변태거든.',
    },
    {
      id: '3',
      startTime: '00:17:33',
      endTime: '00:17:39',
      text: 'Mình mất hẳn một tiếng chỉ để lên lịch.',
      translation: '난 지금 일정 짜는 데만 1시간 걸렸어.',
    },
  ],
}

// 기본 자막 (비디오 ID가 없을 때)
export const defaultSubtitles: Subtitle[] = [
  {
    id: '1',
    startTime: '00:00:00',
    endTime: '00:00:00',
    text: 'No subtitles available',
    translation: '자막을 사용할 수 없습니다',
  },
]
