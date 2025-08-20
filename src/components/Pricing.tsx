import { useRef } from "react";
import { gsap } from "gsap";
import { Section } from "./Layout";
import useGSAP from "../hooks/useGSAP";
import { LINKS } from "../utils/constants";
import { fadeIn, staggerFadeIn } from "../utils/animations";

export const Pricing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const discountBubbleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // 섹션 요소들 애니메이션
    const title = sectionRef.current.querySelector(".pricing-title");
    const subtitle = sectionRef.current.querySelector(".pricing-subtitle");

    if (title && subtitle) {
      staggerFadeIn([title, subtitle], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
        },
      });
    }

    // 특별 혜택 배너 애니메이션
    if (bannerRef.current) {
      fadeIn(bannerRef.current, {
        delay: 0.3,
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 80%",
        },
      });
    }

    // 할인 말풍선 펄스 애니메이션
    if (discountBubbleRef.current) {
      fadeIn(discountBubbleRef.current, {
        delay: 0.5,
        scrollTrigger: {
          trigger: discountBubbleRef.current,
          start: "top 80%",
        },
      });

      // 지속적인 펄스 효과
      gsap.to(discountBubbleRef.current, {
        scale: 1.05,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    // CTA 버튼 애니메이션
    if (ctaRef.current) {
      fadeIn(ctaRef.current, {
        delay: 0.7,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
      });
    }
  });

  const handleClick = () => {
    window.open(LINKS.wait, "_blank", "noopener,noreferrer");
  };

  return (
    <Section ref={sectionRef} background="primary" className="pricing-section">
      {/* 섹션 제목 */}
      <h2 className="pricing-title text-3xl font-bold text-white mb-4 sm:mb-6">
        Kiro가 드리는 첫 14일의 선물
      </h2>
      <p className="pricing-subtitle text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
        빠르게 시작해도 완성도 있게. Kiro와 시작해보세요.
      </p>

      {/* 특별 혜택 배너 */}
      <div
        ref={bannerRef}
        className="relative bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-primary/20"
      >
        {/* 할인 말풍선 */}
        <div
          ref={discountBubbleRef}
          className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-12"
        >
          <div className="relative">
            첫 달 할인 중! 🎉
            {/* 말풍선 꼬리 */}
            <div className="absolute -bottom-1 left-2 sm:left-3 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-red-500 transform rotate-45"></div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            신규 사용자 특별 혜택
          </h3>
          <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-xl p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
              14일 무료 체험
            </div>
            <div className="text-base sm:text-lg text-gray-200 mb-2 sm:mb-3">
              <span className="font-semibold text-primary">100개</span>의 spec
              요청 + <span className="font-semibold text-primary">100개</span>의
              vibe 요청
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              복잡한 설정 없이 바로 시작하세요
            </div>
          </div>
        </div>
      </div>

      {/* CTA 버튼 */}
      <div ref={ctaRef} className="space-y-3 max-w-md mx-auto">
        <button
          onClick={handleClick}
          className="group relative w-full inline-flex items-center justify-center px-6 py-4 sm:py-3 text-base sm:text-lg font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
        >
          <span className="relative z-10">대기 등록하러 가기</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg
            className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </Section>
  );
};
