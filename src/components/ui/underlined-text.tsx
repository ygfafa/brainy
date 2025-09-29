import type { ReactNode } from 'react'

type UnderlinedTextProps = {
  text: string
  className?: string
  onUnderlineClick?: () => void
}

export const UnderlinedText = ({ text, className = '', onUnderlineClick }: UnderlinedTextProps) => {
  // 중괄호로 감싸진 텍스트를 찾는 정규식
  const highlightRegex = /\{([^}]+)\}/g

  const renderUnderlinedText = (text: string): ReactNode[] => {
    const parts: ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = highlightRegex.exec(text)) !== null) {
      // 하이라이트 이전 텍스트 추가
      if (match.index > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, match.index)}</span>)
      }

      // 언더라인된 텍스트 추가 (중괄호 제거)
      parts.push(
        <span
          key={`underline-${match.index}`}
          className="underline decoration-2 decoration-blue-500 cursor-pointer hover:decoration-blue-700 hover:text-blue-700 transition-colors duration-200"
          onClick={onUnderlineClick}
        >
          {match[1]}
        </span>,
      )

      lastIndex = match.index + match[0].length
    }

    // 마지막 남은 텍스트 추가
    if (lastIndex < text.length) {
      parts.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>)
    }

    return parts
  }

  return <span className={className}>{renderUnderlinedText(text)}</span>
}
