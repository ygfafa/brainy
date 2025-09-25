import type { ReactNode } from 'react'

type HighlightedTextProps = {
  text: string
  className?: string
}

export const HighlightedText = ({ text, className = '' }: HighlightedTextProps) => {
  // 중괄호로 감싸진 텍스트를 찾는 정규식
  const highlightRegex = /\{([^}]+)\}/g

  const renderHighlightedText = (text: string): ReactNode[] => {
    const parts: ReactNode[] = []
    let lastIndex = 0
    let match

    while ((match = highlightRegex.exec(text)) !== null) {
      // 하이라이트 이전 텍스트 추가
      if (match.index > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, match.index)}</span>)
      }

      // 하이라이트된 텍스트 추가 (중괄호 제거)
      parts.push(
        <mark
          key={`highlight-${match.index}`}
          className="bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-900 px-2 py-1 rounded font-semibold border-yellow-400 transition-all duration-300"
          style={{
            background: 'linear-gradient(120deg, #fef3c7 0%, #fde047 100%)',
            boxShadow: '0 2px 4px rgba(251, 191, 36, 0.3)',
          }}
        >
          {match[1]}
        </mark>,
      )

      lastIndex = match.index + match[0].length
    }

    // 마지막 남은 텍스트 추가
    if (lastIndex < text.length) {
      parts.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>)
    }

    return parts
  }

  return <span className={className}>{renderHighlightedText(text)}</span>
}
