export type Video = {
  id: string
  videoId: string
  thumbnail: string
  title: string
  channel: {
    name: string
    avatar: string
  }
  duration: string
}

export type Category = {
  id: string
  label: string
  active?: boolean
}
