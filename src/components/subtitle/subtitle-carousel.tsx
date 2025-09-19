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
      perView: 1.1, // 중앙 카드와 좌우 카드 일부가 보이도록
      spacing: 12,
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
    <div className="relative w-full bg-gray-50 py-6 px-4">
      <div ref={sliderRef} className="keen-slider">
        {subtitles.map((subtitle, index) => (
          <div key={subtitle.id} className="keen-slider__slide py-2">
            <SubtitleCard
              subtitle={subtitle}
              isActive={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
