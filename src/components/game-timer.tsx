import { motion } from 'framer-motion'

import { useTimer } from '@/hooks/use-timer'
import { cn } from '@/lib/utils'

export const GameTimer = ({
  time,
  onTimeout,
  progressThreshold = 0.3,
}: {
  time: number
  onTimeout: () => void
  progressThreshold?: number
}) => {
  const remaining = useTimer(time, onTimeout)
  const progress = remaining / time
  const isDanger = progress <= progressThreshold
  return (
    <div className="relative w-full flex items-center justify-start bg-transparent py-4">
      <div className="w-full h-6 bg-blue-50 border-2 border-black rounded-full relative flex items-center">
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
          className={cn(
            'absolute left-0 top-0 h-full rounded-full z-0',
            isDanger ? 'bg-red-500' : 'bg-gradient-to-r from-blue-400 to-blue-700',
          )}
        />
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 border-2 border-black bg-white rounded-full flex items-center justify-center z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="12 5 12 12 17 15" />
        </svg>
      </div>
    </div>
  )
}
