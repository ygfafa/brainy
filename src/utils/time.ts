/**
 * 시간 문자열을 초로 변환
 * @param timeString - "HH:MM:SS" 또는 "MM:SS" 형식의 시간 문자열
 * @returns 초 단위의 시간
 * @example
 * timeStringToSeconds("00:17:27") // 1047
 * timeStringToSeconds("17:27") // 1047
 * timeStringToSeconds("1:30:45") // 5445
 */
export function timeStringToSeconds(timeString: string): number {
  const parts = timeString.split(':').map(part => parseInt(part, 10))

  if (parts.length === 3) {
    // HH:MM:SS
    const [hours, minutes, seconds] = parts
    return hours * 3600 + minutes * 60 + seconds
  } else if (parts.length === 2) {
    // MM:SS
    const [minutes, seconds] = parts
    return minutes * 60 + seconds
  } else if (parts.length === 1) {
    // SS
    return parts[0]
  }

  return 0
}

/**
 * 초를 시간 문자열로 변환
 * @param seconds - 초 단위의 시간
 * @returns "HH:MM:SS" 형식의 시간 문자열 (1시간 미만인 경우 "MM:SS")
 * @example
 * secondsToTimeString(1047) // "17:27"
 * secondsToTimeString(5445) // "1:30:45"
 */
export function secondsToTimeString(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return `${minutes}:${secs.toString().padStart(2, '0')}`
}
