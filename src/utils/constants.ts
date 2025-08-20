// KIRO 브랜드 컬러 및 상수들
export const COLORS = {
  primary: "#8f46ff",
  secondary: "#000000",
  accent: "#6366f1",
  white: "#ffffff",
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
} as const;

// 레이아웃 및 간격 설정
export const LAYOUT = {
  container: {
    maxWidth: "1200px",
    padding: {
      mobile: "1rem",
      tablet: "1.5rem",
      desktop: "2rem",
    },
  },
  section: {
    padding: {
      mobile: "5rem 0",
      desktop: "8rem 0",
    },
  },
  grid: {
    columns: {
      mobile: 1,
      tablet: 2,
      desktop: 4,
    },
    gap: {
      mobile: "1.5rem",
      desktop: "2rem",
    },
  },
} as const;

// 타이포그래피 시스템
export const TYPOGRAPHY = {
  fontFamily: {
    primary: "Inter, ui-sans-serif, system-ui, sans-serif",
    heading: "Inter, ui-sans-serif, system-ui, sans-serif",
  },
  fontSize: {
    hero: {
      mobile: "2.25rem", // 36px
      tablet: "3rem", // 48px
      desktop: "4.5rem", // 72px
    },
    sectionTitle: {
      mobile: "1.875rem", // 30px
      desktop: "3rem", // 48px
    },
    body: {
      small: "0.875rem", // 14px
      normal: "1rem", // 16px
      large: "1.125rem", // 18px
      xl: "1.25rem", // 20px
    },
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.6,
    relaxed: 1.8,
  },
} as const;

// 외부 링크들
export const LINKS = {
  wait: "https://kiro.dev/waitlist/",
  download: "#", // KIRO 다운로드 링크 (추후 업데이트)
  koreanGuide:
    "https://whchoi98.notion.site/Kiro-23104ef7e60e80d3b838e13d2d65498e",
  pricing: "https://kiro.dev/pricing/",
} as const;

// 애니메이션 설정
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
  },
  ease: {
    default: "power2.out",
    bounce: "back.out(1.7)",
    elastic: "elastic.out(1, 0.3)",
  },
  stagger: 0.1,
} as const;

// 반응형 브레이크포인트
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export default {
  COLORS,
  LAYOUT,
  TYPOGRAPHY,
  LINKS,
  ANIMATION_CONFIG,
  BREAKPOINTS,
};
