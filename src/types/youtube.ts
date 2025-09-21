export type Video = {
  videoId: string
  thumbnail: string
  title: string
  description: string
  level: number
  subtitleCount: number
  duration: string
}

export type Category = {
  id: string
  label: string
  active?: boolean
}
