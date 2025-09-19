import type { Subtitle } from '@/types/subtitle'

// Rick Astley - Never Gonna Give You Up 가사 예시
export const mockSubtitles: Record<string, Subtitle[]> = {
  dQw4w9WgXcQ: [
    {
      id: '1',
      startTime: 0,
      endTime: 3,
      text: "We're no strangers to love",
      translation: '우리는 사랑에 대해 낯설지 않아요',
    },
    {
      id: '2',
      startTime: 4,
      endTime: 7,
      text: 'You know the rules and so do I',
      translation: '당신도 규칙을 알고 나도 알아요',
    },
    {
      id: '3',
      startTime: 8,
      endTime: 11,
      text: "A full commitment's what I'm thinking of",
      translation: '내가 생각하는 건 완전한 헌신이에요',
    },
    {
      id: '4',
      startTime: 12,
      endTime: 15,
      text: "You wouldn't get this from any other guy",
      translation: '다른 남자에게선 이런 걸 얻지 못할 거예요',
    },
    {
      id: '5',
      startTime: 16,
      endTime: 18,
      text: "I just wanna tell you how I'm feeling",
      translation: '내 감정을 당신에게 말하고 싶어요',
    },
    {
      id: '6',
      startTime: 19,
      endTime: 22,
      text: 'Gotta make you understand',
      translation: '당신이 이해하도록 해야 해요',
    },
    {
      id: '7',
      startTime: 23,
      endTime: 24,
      text: 'Never gonna give you up',
      translation: '절대 당신을 포기하지 않을 거예요',
    },
    {
      id: '8',
      startTime: 25,
      endTime: 26,
      text: 'Never gonna let you down',
      translation: '절대 당신을 실망시키지 않을 거예요',
    },
    {
      id: '9',
      startTime: 27,
      endTime: 30,
      text: 'Never gonna run around and desert you',
      translation: '절대 도망가거나 당신을 버리지 않을 거예요',
    },
    {
      id: '10',
      startTime: 31,
      endTime: 32,
      text: 'Never gonna make you cry',
      translation: '절대 당신을 울리지 않을 거예요',
    },
    {
      id: '11',
      startTime: 33,
      endTime: 34,
      text: 'Never gonna say goodbye',
      translation: '절대 작별인사를 하지 않을 거예요',
    },
    {
      id: '12',
      startTime: 35,
      endTime: 38,
      text: 'Never gonna tell a lie and hurt you',
      translation: '절대 거짓말로 당신을 아프게 하지 않을 거예요',
    },
    {
      id: '13',
      startTime: 39,
      endTime: 42,
      text: "We've known each other for so long",
      translation: '우리는 오랫동안 서로를 알아왔어요',
    },
    {
      id: '14',
      startTime: 43,
      endTime: 46,
      text: "Your heart's been aching, but you're too shy to say it",
      translation: '당신의 마음은 아프지만, 너무 수줍어서 말하지 못하죠',
    },
    {
      id: '15',
      startTime: 47,
      endTime: 50,
      text: "Inside, we both know what's been going on",
      translation: '마음속으로, 우리 둘 다 무슨 일이 일어나고 있는지 알아요',
    },
  ],
  // 다른 비디오에 대한 자막도 추가 가능
  jNQXAC9IVRw: [
    {
      id: '1',
      startTime: 0,
      endTime: 3,
      text: 'Hello everyone!',
      translation: '안녕하세요 여러분!',
    },
    {
      id: '2',
      startTime: 3,
      endTime: 6,
      text: 'Welcome to my channel',
      translation: '제 채널에 오신 것을 환영합니다',
    },
    {
      id: '3',
      startTime: 6,
      endTime: 10,
      text: "Today we're going to learn something new",
      translation: '오늘은 새로운 것을 배워볼 거예요',
    },
    {
      id: '4',
      startTime: 10,
      endTime: 14,
      text: "Let's get started!",
      translation: '시작해봅시다!',
    },
  ],
}

// 기본 자막 (비디오 ID가 없을 때)
export const defaultSubtitles: Subtitle[] = [
  {
    id: '1',
    startTime: 0,
    endTime: 5,
    text: 'No subtitles available',
    translation: '자막을 사용할 수 없습니다',
  },
]
