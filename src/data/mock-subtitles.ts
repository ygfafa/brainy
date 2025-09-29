import type { Subtitle } from '@/types/subtitle'

// Rick Astley - Never Gonna Give You Up 가사 예시
export const mockSubtitles: Record<string, Subtitle[]> = {
  cW9D6_g6MR0: [
    {
      id: '1',
      startTime: '00:17:27',
      endTime: '00:17:29',
      text: '근데 이거 리뷰가 그 변태 같은 맛이 있어요.',
      translation: 'Mà cái review này có kiểu hơi biến thái ấy.',
    },
    {
      id: '2',
      startTime: '00:17:29',
      endTime: '00:17:33',
      text: '지금 보면 상당히 우리 둘 다 변태거든.',
      translation: 'Nhìn kỹ thì cả hai chúng mình cũng hơi biến thái đó.',
    },
    {
      id: '3',
      startTime: '00:17:33',
      endTime: '00:17:39',
      text: '난 지금 일정 짜는 데만 1시간 {걸렸어}.',
      translation: 'Mình mất hẳn một tiếng chỉ để lên lịch.',
      commentary: `
### 걸렸어 (걸리다)
- giải thích cho người Việt
- Ý nghĩa: Diễn tả thời gian bị tốn/đã tốn cho một việc. Gần với “mất (bao nhiêu thời gian)”.
- Thường nói: “mất [thời gian] (rồi)”. Từ “rồi” dùng khi việc đã xong.
### Mẫu câu cơ bản
- [thời gian] + 걸렸어 → “Mất [thời gian] (rồi).”
- [V-는 데(만)] + [thời gian] + 걸렸어 → “Chỉ riêng [việc V] thôi cũng mất [thời gian].”
-는 데: biến động từ thành cụm danh từ “việc [V]”
- 만: “chỉ, riêng”
### Ví dụ
- 1시간 걸렸어 → Mất một tiếng rồi.
- 난 지금 일정 짜는 데만 1시간 걸렸어 → Chỉ riêng việc lên lịch thôi cũng mất một tiếng.
- 집 가는 데 30분 걸렸어 → Đi về nhà mất 30 phút.
      `,
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
