import type { Subtitle } from '@/types/subtitle'

import { HighlightedText } from './ui/highlighted-text'

type VideoSubtitlesProps = {
  data: Subtitle
}
export const VideoSubtitles = ({ data }: VideoSubtitlesProps) => {
  if (!data) return null

  return (
    <div className="p-4">
      <div className="">
        <HighlightedText text={data.text} className="text-lg font-medium mb-2 block" />
        <p className="text-sm text-gray-600">{data.translation}</p>
        {data.commentary && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">{data.commentary}</p>
          </div>
        )}
      </div>
    </div>
  )
}
