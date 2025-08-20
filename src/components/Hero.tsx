import { useState } from "react";

import kiro from "../assets/kiro.svg";
import TypingAnimation from "./TypingAnimation";

interface HeroProps {
  className?: string;
}

export const Hero = ({ className = "" }: HeroProps) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleGetStarted = () => {
    window.open("https://kiro.dev", "_blank", "noopener,noreferrer");
  };

  const handlePricing = () => {
    window.open("https://kiro.dev/pricing/", "_blank", "noopener,noreferrer");
  };

  // 모바일 터치 이벤트 핸들러
  const handleTouchStart = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  const handleTouchEnd = () => {
    setActiveButton(null);
  };

  return (
    <section
      className={`hero-section min-h-screen bg-black relative overflow-hidden ${className}`}
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        background: `linear-gradient(135deg, #000000 0%, #0a0a0a 100%)`,
      }}
    >
      {/* 모바일 최적화된 배경 */}

      {/* 모바일 전용 컨테이너 */}
      <div className="w-full h-full flex flex-col justify-center px-6 py-12 relative z-10">
        <div className="text-center space-y-8">
          {/* 로고 섹션 - 모바일 최적화 */}
          <div className="flex items-center justify-center">
            <div>
              <img
                src={kiro}
                loading="eager"
                alt="Kiro Logo"
                width={64}
                height={64}
              />
            </div>
          </div>

          {/* 메인 헤드라인 - 모바일 최적화 */}
          <div className="space-y-4">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-16 left-4 w-48 h-48 rounded-full blur-2xl opacity-60"
                style={{
                  background: `radial-gradient(circle, rgba(143, 70, 255, 0.8) 0%, rgba(143, 70, 255, 0.3) 40%, transparent 70%)`,
                }}
              />
              <div
                className="absolute bottom-24 right-4 w-56 h-56 rounded-full blur-2xl opacity-50"
                style={{
                  background: `radial-gradient(circle, rgba(0, 255, 255, 0.7) 0%, rgba(0, 255, 255, 0.2) 40%, transparent 70%)`,
                }}
              />
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-xl opacity-40"
                style={{
                  background: `radial-gradient(circle, rgba(255, 107, 107, 0.6) 0%, rgba(255, 107, 107, 0.2) 50%, transparent 70%)`,
                }}
              />
            </div>
            <TypingAnimation />
          </div>

          {/* 서브 헤드라인 - 모바일 최적화 */}
          <p className="text-base text-gray-300 leading-relaxed max-w-sm mx-auto">
            스펙 중심 개발로 AI 코딩에 구조를 도입하여 최고의 작업을 수행할 수
            있도록 도와줍니다.
          </p>

          {/* CTA 버튼들 - 모바일 터치 최적화 */}
          <div className="space-y-4 pt-2">
            <button
              onClick={() => {
                handleTouchStart("waitlist");
                setTimeout(() => {
                  handleTouchEnd();
                  handleGetStarted();
                }, 150);
              }}
              className="w-full bg-primary text-white px-8 py-5 rounded-2xl font-bold text-lg relative overflow-hidden transition-all duration-200 shadow-2xl"
              style={{
                minHeight: "64px",
                transform:
                  activeButton === "waitlist" ? "scale(0.98)" : "scale(1)",
                boxShadow:
                  activeButton === "waitlist"
                    ? "0 8px 25px rgba(143, 70, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    : "0 12px 30px rgba(143, 70, 255, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)",
              }}
              aria-label="KIRO 바로가기 등록"
            >
              <span
                className="absolute inset-0 bg-white rounded-2xl transition-transform duration-300 ease-out"
                style={{
                  transformOrigin: "bottom left",
                  transform:
                    activeButton === "waitlist" ? "scale(1)" : "scale(0)",
                }}
              />
              <span
                className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 ${
                  activeButton === "waitlist" ? "text-black" : "text-white"
                }`}
              >
                <span className="text-xl">🚀</span>
                키로 바로 보러가기
              </span>
            </button>

            <button
              onClick={() => {
                handleTouchStart("pricing");
                setTimeout(() => {
                  handleTouchEnd();
                  handlePricing();
                }, 150);
              }}
              className="w-full bg-accent text-white px-8 py-5 rounded-2xl font-bold text-lg relative overflow-hidden transition-all duration-200 shadow-2xl"
              style={{
                minHeight: "64px",
                transform:
                  activeButton === "pricing" ? "scale(0.98)" : "scale(1)",
                boxShadow:
                  activeButton === "pricing"
                    ? "0 8px 25px rgba(0, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    : "0 12px 30px rgba(0, 255, 255, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)",
              }}
              aria-label="가격 정책 확인"
            >
              <span
                className="absolute inset-0 bg-white rounded-2xl transition-transform duration-300 ease-out"
                style={{
                  transformOrigin: "bottom left",
                  transform:
                    activeButton === "pricing" ? "scale(1)" : "scale(0)",
                }}
              />
              <span
                className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 ${
                  activeButton === "pricing" ? "text-black" : "text-white"
                }`}
              >
                <span className="text-xl">💰</span>
                가격 정책
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
