import { useRef, useState } from "react";
import { Section } from "./Layout";
import useGSAP from "../hooks/useGSAP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger, TextPlugin);

interface DifferentiationFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const differentiationFeatures: DifferentiationFeature[] = [
  {
    id: "spec-mode",
    title: "Spec 모드",
    description:
      "요구사항을 입력하면 설계 → 코드 → 테스트까지 자동으로 분리된 단위 작업으로 관리.",
    icon: "📋",
  },
  {
    id: "vs-code",
    title: "VS code와 호환",
    description: "그동안 사용해왔던 확장 \n 그대로 가져와 시작이 가능해요.",
    icon: "🖥️",
  },
  {
    id: "natural-language",
    title: "자연어로 Hooks 설정",
    description:
      "일상 언어로 원하는 개발 자동화를 지시하면 곧바로 실행 가능한 hook으로 변환.",
    icon: "💬",
  },
];

interface FeatureCardProps {
  feature: DifferentiationFeature;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const FeatureCard = ({
  feature,
  index,
  isActive,
  onClick,
}: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      const card = cardRef.current;
      const tl = gsap.timeline({ paused: true });

      tl.to(card, {
        y: -5,
        boxShadow: "0 20px 40px rgba(143, 70, 255, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      });

      const handleMouseEnter = () => tl.play();
      const handleMouseLeave = () => tl.reverse();

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { dependencies: [] }
  );

  return (
    <div
      ref={cardRef}
      className={`differentiation-card-${index} cursor-pointer transition-all duration-300 rounded-xl ${
        isActive
          ? "ring-2 ring-primary bg-gray-800/50 backdrop-blur-sm border border-primary shadow-lg"
          : "bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-primary/50 hover:bg-gray-800/50"
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="p-4 sm:p-6">
        {/* 아이콘 */}
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl mx-auto mb-3 sm:mb-4 flex items-center justify-center text-xl sm:text-2xl transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-br from-primary to-accent text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {feature.icon}
        </div>

        {/* 제목 */}
        <h3
          className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-center transition-colors duration-300 ${
            isActive ? "text-primary" : "text-white"
          }`}
        >
          {feature.title}
        </h3>

        {/* 설명 */}
        <p className="text-gray-300 text-center leading-relaxed text-sm sm:text-base break-words">
          {feature.description}
        </p>

        {/* 활성 상태 표시 */}
      </div>
    </div>
  );
};

interface DifferentiationProps {
  className?: string;
}

export const Differentiation = ({ className = "" }: DifferentiationProps) => {
  const [activeFeature, setActiveFeature] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeExample, setActiveExample] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 스크롤 트리거 애니메이션
  useGSAP(
    () => {
      if (!sectionRef.current || !headerRef.current || !contentRef.current)
        return;

      // 헤더 애니메이션
      gsap.fromTo(
        headerRef.current.children,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 카드들의 순차적 등장 애니메이션
      differentiationFeatures.forEach((_, index) => {
        const card = sectionRef.current?.querySelector(
          `.differentiation-card-${index}`
        );
        if (card) {
          gsap.fromTo(
            card,
            {
              y: 30,
              opacity: 0,
              scale: 0.9,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: index * 0.05,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card,
                start: "top center",
                end: "bottom 15%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // 콘텐츠 영역 애니메이션
      gsap.fromTo(
        contentRef.current,
        {
          x: 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { dependencies: [] }
  );

  return (
    <Section ref={sectionRef} background="gray" className={className}>
      {/* 섹션 헤더 */}
      <div ref={headerRef} className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl font-bold text-white mb-4 sm:mb-6">
          다른 AI 도구와 뭐가 다른가요?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          KIRO만의 핵심 차별화 요소로 <br />
          <span className="font-semibold text-primary">
            복잡한 설정 없이도 효율적인 개발 환경
          </span>
          을 <br />
          구축하세요
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:gap-12 items-start">
        {/* 왼쪽: 기능 카드들 */}
        <div className="space-y-4 sm:space-y-6">
          {differentiationFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              isActive={activeFeature === index}
              onClick={() => {
                setActiveFeature(index);
                setActiveExample(0);
              }}
            />
          ))}
        </div>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-900/30 rounded-lg border border-green-700">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h5 className="font-semibold text-green-300 mb-1 text-sm sm:text-base">
                주니어 개발자에게 특히 유용한 이유
              </h5>
              <p className="text-green-200 text-xs sm:text-sm leading-relaxed">
                복잡한 설정이나 깊은 도구 지식 없이도 요구사항을 곧바로
                UI·로직·테스트 코드로 바꾸고 반복 작업을 자동화할 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 CTA */}
      <div className="text-center mt-12 sm:mt-16">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 sm:p-8 border border-primary/20">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
            지금 바로 KIRO의 차별화된 기능을 경험해보세요
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            복잡한 설정 없이 바로 시작할 수 있는 스마트한 개발 환경을 만나보세요
          </p>
          <button
            onClick={() =>
              window.open("https://kiro.dev", "_blank", "noopener,noreferrer")
            }
            className="bg-primary text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            무료로 시작하기 →
          </button>
        </div>
      </div>
    </Section>
  );
};
