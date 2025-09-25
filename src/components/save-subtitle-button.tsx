import { ShoppingCart } from 'lucide-react'

type SaveSubtitleButtonProps = {
  onClick: () => void
  isSaved: boolean
}
export const SaveSubtitleButton = ({ onClick, isSaved }: SaveSubtitleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-[72px] left-1/2 -translate-x-1/2 p-3 rounded-full shadow-lg transition-all z-40 ${
        isSaved
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-white text-gray-600 hover:bg-gray-50 border'
      }`}
      title={isSaved ? '장바구니에서 빼기' : '장바구니에 담기'}
    >
      <ShoppingCart className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
    </button>
  )
}
