# Design Document

## Overview

KIRO 랜딩 페이지는 취준생, 저연차 개발자, 프론트엔드 개발자를 대상으로 한 현대적이고 매력적인 단일 페이지 웹사이트입니다. Vite + React + Tailwind CSS + GSAP을 활용하여 빠른 로딩과 부드러운 애니메이션을 제공하며, KIRO의 독특한 기능들을 직관적으로 소개합니다.

### 핵심 디자인 원칙

- **명확성**: 3초 내에 KIRO의 가치 제안을 전달
- **상호작용성**: GSAP 애니메이션으로 몰입감 있는 사용자 경험
- **접근성**: 모든 기기에서 최적화된 반응형 디자인
- **신뢰성**: KIRO 브랜드 컬러와 일관된 디자인 시스템

## Architecture

### 기술 스택

```
Frontend Framework: React 18
Build Tool: Vite
Styling: Tailwind CSS
Animation: GSAP (GreenSock Animation Platform)
Deployment: Static Site (Vercel/Netlify 호환)
```

### 프로젝트 구조

```
kiro-landing-page/
├── src/
│   ├── components/
│   │   ├── Hero/
│   │   ├── Features/
│   │   ├── Pricing/
│   │   ├── Showcase/
│   │   └── Footer/
│   ├── hooks/
│   ├── utils/
│   └── styles/
├── public/
└── package.json
```

## Components and Interfaces

### 1. Hero Section

**목적**: 첫 인상에서 KIRO의 핵심 가치 제안을 전달

**구성 요소**:

- 메인 헤드라인: "빠르게 내 상상을 증명하게 도와주는 AI 개발 어시스턴트"
- 서브 헤드라인: "취준생과 저연차 개발자를 위한 스마트한 코딩 파트너"
- 주요 CTA 버튼들:
  - "시작하기" (Primary)
  - "한국 사용자 가이드" (Secondary)
  - "가격 정책" (Tertiary)
- 배경: GSAP으로 애니메이션되는 코드 스니펫 또는 추상적 패턴

**애니메이션**:

- 텍스트 타이핑 효과 (GSAP TextPlugin)
- 버튼 호버 시 확대/색상 변화
- 배경 요소들의 부드러운 움직임

### 2. Features Section

**목적**: KIRO만의 독특한 4가지 핵심 기능 소개

**구성 요소**:

```
Feature Cards (4개):
1. Spec 기반 프로젝트 관리
   - 아이콘: 📋 또는 체크리스트 아이콘
   - 설명: 복잡한 기능을 요구사항→디자인→구현으로 자동 분할

2. 시각적 Hooks 시스템
   - 아이콘: 🔗 또는 연결 아이콘
   - 설명: GUI로 개발 워크플로우를 쉽게 설정

3. 자연어 기반 자동화
   - 아이콘: 💬 또는 말풍선 아이콘
   - 설명: 일상 언어로 "파일 저장 시 테스트 실행" 같은 작업 자동화

4. MCP 통합
   - 아이콘: 🔌 또는 플러그 아이콘
   - 설명: 외부 도구와 API를 코드 없이 연결
```

**인터랙션**:

- 카드 호버 시 확대 및 그림자 효과
- 클릭 시 모달 또는 확장 영역으로 상세 정보 표시
- 스크롤 트리거로 순차적 등장 애니메이션

### 3. Differentiation Section

**목적**: KIRO만의 특별한 장점들을 경쟁사 대비 강조

**구성 요소**:

- 제목: "다른 AI 도구와 뭐가 다른가요?"
- 3가지 핵심 차별화 요소를 시각적으로 표현
- 실제 사용 예시:
  - "코드 저장할 때마다 자동으로 prettier 실행하기"
  - "새 컴포넌트 만들 때 자동으로 테스트 파일도 생성하기"
  - "Git 커밋 전에 자동으로 린트 검사하기"

**애니메이션**:

- 비교 차트나 인포그래픽의 순차적 등장
- 사용 예시의 코드 블록 타이핑 효과

### 4. Blog Section

**목적**: KIRO 관련 유용한 블로그 글들을 소개하여 사용자 교육 및 참여 유도

**구성 요소**:

- 메인 메시지: "KIRO와 함께하는 개발 여정"
- 블로그 카드 레이아웃:
  - 글 제목
  - 간단한 요약 (2-3줄)
  - 작성 날짜
  - 외부 링크 버튼
- 반응형 그리드: 모바일 1열, 태블릿 2열, 데스크톱 3열
- 관련 블로그 글 예시:
  - KIRO 사용법 가이드
  - 개발 팁 및 트릭
  - 사용자 성공 사례

### 5. Pricing Section

**목적**: 가격 정책과 특별 혜택 안내

**구성 요소**:

- 특별 혜택 배너: "신규 사용자 14일 무료 체험 + 100 spec/vibe 요청"
- "첫 달 할인 중" 애니메이션 말풍선
- 가격 정책 페이지로 연결하는 CTA

**애니메이션**:

- 할인 말풍선의 펄스 효과
- 혜택 카운터 애니메이션

### 6. Meta Showcase Footer

**목적**: 이 페이지 자체가 KIRO로 만들어졌음을 강조

**구성 요소**:

- 임팩트 메시지: "이 프로젝트는 KIRO Spec 모드로 만들어진 프로젝트입니다"
- 특별한 배경 디자인 (그라데이션 또는 패턴)
- KIRO 로고 및 링크들

**애니메이션**:

- 텍스트 글로우 효과
- 배경 그라데이션 애니메이션

## Data Models

### Theme Configuration

```typescript
interface ThemeConfig {
  colors: {
    primary: "#8f46ff"; // KIRO 브랜드 컬러
    secondary: "#000000"; // 베이스 컬러
    accent: "#6366f1"; // 보조 컬러
    background: "#ffffff";
    text: {
      primary: "#1f2937";
      secondary: "#6b7280";
    };
  };
  fonts: {
    heading: "Inter, sans-serif";
    body: "Inter, sans-serif";
  };
}
```

### Feature Data Model

```typescript
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string;
  examples: string[];
}
```

### Animation Configuration

```typescript
interface AnimationConfig {
  duration: number;
  ease: string;
  stagger: number;
  scrollTrigger?: {
    trigger: string;
    start: string;
    end: string;
  };
}
```

## Error Handling

### 1. 네트워크 오류

- 외부 링크 연결 실패 시 사용자에게 알림
- 이미지 로딩 실패 시 플레이스홀더 표시

### 2. 애니메이션 오류

- GSAP 로딩 실패 시 기본 CSS 트랜지션으로 폴백
- 성능이 낮은 기기에서 애니메이션 자동 비활성화

### 3. 반응형 오류

- 극단적인 화면 크기에서의 레이아웃 깨짐 방지
- 터치 기기에서의 호버 효과 대체

## Testing Strategy

### 1. 단위 테스트

- React 컴포넌트 렌더링 테스트
- 유틸리티 함수 테스트
- 애니메이션 트리거 테스트

### 2. 통합 테스트

- 페이지 간 네비게이션 테스트
- 외부 링크 연결 테스트
- 반응형 레이아웃 테스트

### 3. 성능 테스트

- Lighthouse 점수 최적화 (90+ 목표)
- 모바일 3초 이내 로딩 검증
- GSAP 애니메이션 성능 모니터링

### 4. 접근성 테스트

- 키보드 네비게이션 테스트
- 스크린 리더 호환성 테스트
- 색상 대비 검증

### 5. 브라우저 호환성 테스트

- Chrome, Firefox, Safari, Edge 테스트
- 모바일 브라우저 테스트
- 구형 브라우저 폴백 테스트

## Performance Considerations

### 1. 번들 최적화

- Vite의 코드 스플리팅 활용
- 이미지 최적화 (WebP, lazy loading)
- GSAP 필요한 플러그인만 선택적 로딩

### 2. 애니메이션 최적화

- GPU 가속 활용 (transform, opacity 우선 사용)
- 애니메이션 중 레이아웃 변경 최소화
- IntersectionObserver로 뷰포트 내 애니메이션만 실행

### 3. SEO 최적화

- 메타 태그 최적화
- 구조화된 데이터 마크업
- 시맨틱 HTML 구조

## Responsive Design

### 브레이크포인트 및 레이아웃 전략

```css
/* Mobile First Approach with Center-Fixed Layout */
base: 0px     /* 모바일 (전체 너비) */
sm: 480px     /* 중앙 고정 시작점 */
md: 768px     /* 태블릿 */
lg: 1024px    /* 데스크톱 */
xl: 1280px    /* 대형 데스크톱 */
```

### 레이아웃 조정

- **모바일 (0-479px)**: 전체 너비 사용, 단일 컬럼 스택 레이아웃
- **480px 이상**: 중앙 고정 레이아웃 (max-width 적용), 좌우 여백 자동
- **태블릿 (768px+)**: 2컬럼 그리드, 중앙 정렬 유지
- **데스크톱 (1024px+)**: 3-4컬럼 그리드, 최대 너비 제한

### Secondary 컬러 기반 배경 시스템

- **기본 배경**: Secondary 컬러 (#000000) 기반 그라데이션
- **섹션별 배경**: Secondary에서 파생된 다크 톤 팔레트 사용
- **Footer 배경**: Secondary와 조화되는 보라-검정 그라데이션
- **브랜드 일관성**: 모든 배경이 Secondary 컬러와 통일감 유지
