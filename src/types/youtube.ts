export type Level = 'easy' | 'medium' | 'hard'
export type Video = {
  videoId: string
  thumbnail: string
  title: string
  description: string
  level: Level
  dialogueCount: number
  startTime: string
  endTime: string
}

export type Category = {
  id: string
  label: string
  active?: boolean
}

export type Dialogue = {
  id: string
  startTime: string
  endTime: string
  text: string // 원문
  translation: string // 번역
  commentary?: string // 코멘트
}
