import { BookType } from 'lucide-react'
import { useNavigate } from 'react-router'

import { paths } from '@/config/paths'

import { MAX_MOBILE_SCREEN_WIDTH } from './layout/mobile-only-layout'

export const HEADER_HEIGHT = 64
export const Header = () => {
  const navigate = useNavigate()
  return (
    <header
      className="fixed top-0 left-0 right-0 bg-white z-50"
      style={{ maxWidth: MAX_MOBILE_SCREEN_WIDTH, margin: '0 auto', height: HEADER_HEIGHT }}
    >
      <div className="flex items-center justify-between p-3">
        <h1 className="text-lg font-bold">Logo</h1>
        <div className="flex items-center gap-4">
          <button className="p-2" onClick={() => navigate(paths.my.dialogues.getHref())}>
            <BookType className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
