export type Subtitle = {
  id: string
  startTime: string
  endTime: string
  text: string // 원문
  translation: string // 번역
  commentary?: string // 코멘트
}
