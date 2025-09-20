export type Video = {
  id: string
  videoId: string
  thumbnail: string
  title: string
  channel: {
    name: string
    avatar: string
    verified?: boolean
  }
  views: string
  uploadedAt: string
  duration: string
}

export type Category = {
  id: string
  label: string
  active?: boolean
}
