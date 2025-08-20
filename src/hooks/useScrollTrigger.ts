import { useEffect, useRef } from "react";
// Optimized GSAP imports - selective loading
import { gsap } from "gsap/dist/gsap";

// Dynamic import for ScrollTrigger to reduce initial bundle size
let ScrollTrigger: any = null;

const loadScrollTrigger = async () => {
  if (!ScrollTrigger) {
    const { ScrollTrigger: ST } = await import("gsap/dist/ScrollTrigger");
    ScrollTrigger = ST;
    gsap.registerPlugin(ScrollTrigger);
  }
  return ScrollTrigger;
};

interface UseScrollTriggerOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

/**
 * ScrollTrigger를 위한 커스텀 훅 (최적화된 버전 - 동적 로딩)
 * @param animation GSAP 애니메이션 함수
 * @param options ScrollTrigger 옵션
 */
const useScrollTrigger = (
  animation: () => gsap.core.Timeline | gsap.core.Tween,
  options: UseScrollTriggerOptions = {}
) => {
  const triggerRef = useRef<any>(undefined);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    const initScrollTrigger = async () => {
      try {
        // 동적으로 ScrollTrigger 로드
        await loadScrollTrigger();

        // 이전 트리거가 있다면 제거
        if (triggerRef.current) {
          triggerRef.current.kill();
        }

        // 새로운 ScrollTrigger 생성
        triggerRef.current = ScrollTrigger.create({
          animation: animation(),
          ...options,
        });

        isLoadedRef.current = true;
      } catch (error) {
        console.warn("ScrollTrigger 로딩 실패:", error);
      }
    };

    initScrollTrigger();

    // 클린업 함수
    return () => {
      if (triggerRef.current && isLoadedRef.current) {
        triggerRef.current.kill();
      }
    };
  }, []);

  return triggerRef.current;
};

export default useScrollTrigger;
