import { Clock } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Subtitle } from '@/types/subtitle'

type SubtitleCardProps = {
  subtitle: Subtitle
  isActive: boolean
  onClick?: () => void
}

export const SubtitleCard = ({ subtitle, isActive, onClick }: SubtitleCardProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300',
        'hover:shadow-lg hover:scale-105',
        isActive && 'border-2 border-red-500 bg-red-50',
      )}
    >
      <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
        <Clock className="w-3 h-3" />
        <span>
          {formatTime(subtitle.startTime)} - {formatTime(subtitle.endTime)}
        </span>
      </div>

      <div className="space-y-3">
        <p className="text-lg font-medium text-gray-900 leading-relaxed">{subtitle.text}</p>
        <p className="text-sm text-gray-600 leading-relaxed">{subtitle.translation}</p>
      </div>
    </div>
  )
}