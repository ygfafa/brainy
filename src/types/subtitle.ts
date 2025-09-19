export type Subtitle = {
  id: string
  startTime: number // 초 단위
  endTime: number
  text: string // 원문
  translation: string // 번역
}