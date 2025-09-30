import type { Dialogue } from '@/types/youtube'

export const dialogue: Record<string, Dialogue[]> = {
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
      endTime: '00:17:35',
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
    {
      id: '4',
      startTime: '00:17:35',
      endTime: '00:17:37',
      text: '얜 지금 거의 한시간 동안 이러고 있고.',
      translation: 'Bạn ấy ngồi thế này gần một tiếng rồi.',
    },
    {
      id: '5',
      startTime: '00:17:37',
      endTime: '00:17:39',
      text: '내 빨간색 어디갔어.',
      translation: 'Màu đỏ của mình đâu rồi?',
    },
    {
      id: '6',
      startTime: '00:17:39',
      endTime: '00:17:46',
      text: '뭐야? 여기 분명히 있었는데.',
      translation: 'Gì vậy? Rõ ràng nó vừa ở đây mà.',
    },
    {
      id: '7',
      startTime: '00:17:46',
      endTime: '00:17:49',
      text: '숨겼지?',
      translation: 'Giấu rồi hả?',
    },
    {
      id: '8',
      startTime: '00:17:49',
      endTime: '00:17:52',
      text: '숨겨놨지?',
      translation: 'Giấu để đó rồi hả?',
    },
    {
      id: '9',
      startTime: '00:17:52',
      endTime: '00:17:54',
      text: '뭐야, 다른것도 없어졌는데?',
      translation: 'Gì vậy, mấy thứ khác cũng mất rồi hả?',
    },
    {
      id: '10',
      startTime: '00:17:54',
      endTime: '00:17:57',
      text: '다른건 진짜 모르겠다.',
      translation: 'Mấy cái khác thì thật sự không biết.',
    },
    {
      id: '11',
      startTime: '00:17:57',
      endTime: '00:18:00',
      text: '근데 두개 어디갔지?',
      translation: 'Mà hai cái đâu rồi nhỉ?',
    },
    {
      id: '12',
      startTime: '00:18:00',
      endTime: '00:18:06',
      text: '아, 시킨거에요?',
      translation: 'À, là được bảo làm hả?',
    },
    {
      id: '13',
      startTime: '00:18:06',
      endTime: '00:18:08',
      text: '현진아, 고쳐줘',
      translation: 'Hyunjin ơi, sửa giúp mình với.',
    },
    {
      id: '14',
      startTime: '00:18:08',
      endTime: '00:18:09',
      text: '헉, 부러졌어',
      translation: 'Ôi, gãy rồi!',
    },
  ],
}

// 기본 자막 (비디오 ID가 없을 때)
export const defaultSubtitles: Dialogue[] = [
  {
    id: '1',
    startTime: '00:00:00',
    endTime: '00:00:00',
    text: 'No subtitles available',
    translation: '자막을 사용할 수 없습니다',
  },
]
