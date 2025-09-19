export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  watch: {
    path: '/watch/:videoId',
    getHref: (videoId: string) => `/watch/${videoId}`,
  },
  savedSubtitles: {
    path: '/saved-subtitles',
    getHref: () => '/saved-subtitles',
  },
  auth: {
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },
} as const
