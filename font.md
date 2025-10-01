# 폰트 구현 계획 - 한국어 교육 서비스 (베트남 사용자 대상)

## 📋 개요
베트남 사용자를 위한 한국어 교육 서비스에 최적화된 폰트 시스템 구축

## 🎯 목표
- 한국어 학습 콘텐츠의 명확한 가독성
- 베트남어 UI의 자연스러운 표시
- 빠른 초기 로딩 (베트남 네트워크 환경 고려)
- 접근성 및 SEO 최적화

## 🔤 폰트 선택
### 한국어 콘텐츠
- **Primary**: Noto Sans KR
- **Fallback**: Apple SD Gothic Neo → Malgun Gothic → sans-serif
- **이유**: 학습자에게 최적화된 가독성, 명확한 획 구분

### 베트남어 UI
- **Primary**: Inter
- **Fallback**: -apple-system → BlinkMacSystemFont → Segoe UI → sans-serif
- **이유**: 베트남어 성조 표시 최적화, 깔끔한 UI 텍스트

## 🚀 구현 단계

### 1. 패키지 설치
```bash
yarn add @fontsource-variable/noto-sans-kr @fontsource-variable/inter
```

### 2. 폰트 Import (src/main.tsx)
```typescript
// 한국어 - 필요한 weight만 선택적 로드
import '@fontsource-variable/noto-sans-kr/wght-400.css'  // Regular
import '@fontsource-variable/noto-sans-kr/wght-500.css'  // Medium
import '@fontsource-variable/noto-sans-kr/wght-700.css'  // Bold

// 베트남어 - subset 최적화
import '@fontsource-variable/inter/latin.css'
import '@fontsource-variable/inter/vietnamese.css'
```

### 3. CSS 설정 (src/index.css)
```css
@layer base {
  /* 기본 폰트 (베트남어 UI) */
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-display: swap;
  }

  /* 한국어 콘텐츠 */
  [lang="ko"] {
    font-family: 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
    font-display: swap;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    word-break: keep-all; /* 한글 단어 단위 줄바꿈 */
  }

  /* 베트남어 명시적 선언 시 */
  [lang="vi"] {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6; /* 성조 기호 공간 확보 */
  }
}

/* Tailwind v4 테마 확장 */
@theme {
  --font-family-korean: 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
  --font-family-vietnamese: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### 4. Preload 추가 (index.html) - 선택사항
```html
<link rel="preload"
      href="/node_modules/@fontsource-variable/noto-sans-kr/files/noto-sans-kr-korean-400-normal.woff2"
      as="font"
      type="font/woff2"
      crossorigin>
```

### 5. 컴포넌트에서 사용
```jsx
// 학습 카드 예시
<div className="card">
  <h2 lang="ko" className="text-2xl font-bold">안녕하세요</h2>
  <p lang="vi" className="text-sm text-gray-600">Xin chào (Lời chào)</p>
  <p lang="vi">Câu chào phổ biến trong tiếng Hàn</p>
</div>

// 문장 학습 예시
<div className="space-y-2">
  <p lang="ko" className="text-lg">오늘 날씨가 좋네요</p>
  <p lang="vi" className="text-base">Hôm nay thời tiết đẹp nhỉ</p>
</div>
```

## ⚡ 성능 최적화

### 파일 크기
- **최적화 전**: ~3-4MB (전체 폰트)
- **최적화 후**:
  - Noto Sans KR (3 weights): ~500KB
  - Inter (vietnamese subset): ~30KB
  - **총 ~530KB** (85% 감소)

### 로딩 전략
1. `font-display: swap` - FOIT 방지, 즉시 텍스트 표시
2. Variable fonts 사용 - 파일 수 감소
3. Subset 로드 - 필요한 문자만
4. Weight 선택 - 400, 500, 700만 사용

## ✅ 체크리스트
- [ ] fontsource 패키지 설치
- [ ] main.tsx에 폰트 import
- [ ] index.css에 언어별 폰트 설정
- [ ] 컴포넌트에 lang 속성 적용
- [ ] 빌드 후 폰트 로딩 확인
- [ ] 베트남어/한국어 렌더링 테스트

## 🎨 결과
- 한국어 학습 콘텐츠: 선명하고 읽기 쉬운 한글
- 베트남어 UI: 자연스럽고 익숙한 표시
- 빠른 초기 로딩으로 좋은 사용자 경험
- 스크린 리더 지원으로 접근성 향상