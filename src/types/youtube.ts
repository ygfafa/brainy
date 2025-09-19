export type Video = {
  id: string
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

export type Shorts = {
  id: string
  thumbnail: string
  title: string
  views: string
}

export type Category = {
  id: string
  label: string
  active?: boolean
}