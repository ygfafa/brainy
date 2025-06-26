import { GameTimer } from '@/components/game-timer'

const HomePage = () => {
  // 예시: 10초 타이머, 30% 이하에서 빨간색
  return <GameTimer time={10} onTimeout={() => console.log('타임아웃!')} progressThreshold={0.3} />
}

export default HomePage
