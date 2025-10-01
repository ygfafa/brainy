import { IconShoppingCartStar } from '@tabler/icons-react'

type SaveSubtitleButtonProps = {
  onClick: () => void
  isSaved: boolean
  hasCommentary?: boolean
}
export const SaveSubtitleButton = ({
  onClick,
  isSaved,
  hasCommentary = false,
}: SaveSubtitleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-[72px] left-1/2 -translate-x-1/2 p-3 rounded-full shadow-lg transition-all z-40 ${
        isSaved
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-white text-gray-600 hover:bg-gray-50 border'
      } ${hasCommentary ? 'animate-bounce' : ''}`}
      title={isSaved ? '장바구니에서 빼기' : '장바구니에 담기'}
    >
      <IconShoppingCartStar />
    </button>
  )
}
