import { useEffect, useRef } from "react";
// Optimized GSAP import - only import core
import { gsap } from "gsap/dist/gsap";

interface UseGSAPOptions {
  dependencies?: React.DependencyList;
  revertOnUpdate?: boolean;
}

/**
 * GSAP 애니메이션을 위한 커스텀 훅 (최적화된 버전)
 * @param callback GSAP 애니메이션 함수
 * @param options 옵션 설정
 */
const useGSAP = (
  callback: (context: gsap.Context) => void,
  options: UseGSAPOptions = {}
) => {
  const { dependencies = [], revertOnUpdate = true } = options;
  const contextRef = useRef<gsap.Context | undefined>(undefined);

  useEffect(() => {
    // 이전 컨텍스트가 있다면 정리
    if (contextRef.current && revertOnUpdate) {
      contextRef.current.revert();
    }

    // 새로운 GSAP 컨텍스트 생성
    contextRef.current = gsap.context(() => {
      callback(contextRef.current!);
    });

    // 클린업 함수
    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  // 컨텍스트 반환 (필요시 외부에서 접근 가능)
  return contextRef.current;
};

export default useGSAP;
