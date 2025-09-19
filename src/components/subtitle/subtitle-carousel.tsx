import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'
import { useEffect } from 'react'

import { useSubtitleStore } from '@/stores/subtitle-store'
import type { Subtitle } from '@/types/subtitle'

import { SubtitleCard } from './subtitle-card'

type SubtitleCarouselProps = {
  subtitles: Subtitle[]
}

export const SubtitleCarousel = ({ subtitles }: SubtitleCarouselProps) => {
  const { currentIndex, setCurrentIndex } = useSubtitleStore()

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    mode: 'snap',
    slides: {
      origin: 'center',
      perView: 1.2,
      spacing: 16,
    },
    slideChanged(slider) {
      // 슬라이드가 변경되면 스토어 업데이트 (영상 시간도 변경됨)
      if (slider.track.details) {
        setCurrentIndex(slider.track.details.rel)
      }
    },
  })

  // currentIndex가 변경되면 슬라이더도 이동
  useEffect(() => {
    if (
      instanceRef.current &&
      instanceRef.current.track.details &&
      currentIndex !== instanceRef.current.track.details.rel
    ) {
      instanceRef.current.moveToIdx(currentIndex)
    }
  }, [currentIndex, instanceRef])

  return (
    <div className="relative w-full bg-gray-50 py-4">
      <div ref={sliderRef} className="keen-slider">
        {subtitles.map((subtitle, index) => (
          <div key={subtitle.id} className="keen-slider__slide">
            <SubtitleCard
              subtitle={subtitle}
              isActive={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          </div>
        ))}
      </div>

      {/* 인디케이터 */}
      <div className="flex justify-center gap-1 mt-4">
        {subtitles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-red-500' : 'w-1.5 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
