import { useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string;
  examples: string[];
  screenshot?: string;
}

const features: Feature[] = [
  {
    id: "spec-management",
    title: "Spec 기반 프로젝트 관리",
    description:
      "단순한 프롬프트 입력만으로도 요구사항, 시스템 디자인, 개발 작업으로 이어지는 전체 개발 과정을 명확하게 구조화하고 전환",
    icon: "📋",
    details:
      "복잡하고 막연한 아이디어를 입력하면, 키로가 곧바로 구체적인 요구사항, 시스템 디자인, 개발 작업으로 명확하게 정리해줍니다. 여러 단계로 나뉘는 작업을 명확히 보여줌으로써 프로젝트의 흐름을 한눈에 파악할 수 있게 합니다.",
    examples: [
      "사용자 인증 시스템 → 로그인 폼, 회원가입, 비밀번호 재설정으로 자동 분할.",
      "쇼핑몰 프로젝트 → 상품 목록, 장바구니, 결제 시스템으로 단계별 구현.",
      "블로그 시스템 → 글 작성, 댓글, 검색 기능으로 체계적 개발.",
    ],
    screenshot: "spec-management-demo.png",
  },
  {
    id: "visual-hooks",
    title: "에이전트 Hook",
    description: "코드 저장과 동시에 문서화, 테스트, 최적화까지 자동화까지",
    icon: "🔗",
    details:
      "일상 언어로 필요한 자동화 작업을 GUI로 쉽게 추가해, 반복적인 작업은 KIRO에게 위임 할 수 있습니다.",
    examples: [
      "오류 리포트 자동 생성: 특정 에러 발생 시, 어떤 문제가 발생하고 해결했는지를 포함하는 Markdown 형식 리포트 파일 생성.",
      "주석 및 문서 자동화: 컴포넌트의 props나 내부 동작에 대한 JSDoc 주석을 자동으로 생성하도록 설정.",
    ],
    screenshot: "visual-hooks-demo.png",
  },
  {
    id: "natural-language",
    title: "고급 컨텍스트 관리",
    description: "MCP, HOOKS, SPECS, STEERING 모든 관리를 GUI로 한 눈에 제어",
    icon: "💬",
    details:
      "기획 문서, 디자인 시안, API 명세서 등 흩어져 있는 자료를 하나의 프로젝트 파일로 연결하고, 손으로 그린 스케치 같은 아이디어를 개발 가이드라인으로 만들어 줍니다.",
    examples: [
      "네이티브MCP 통합을 통해 문서,데이터베이스, API 등에 연결.",
      "각 프로젝트의 스티어링 파일을 통해 Kiro 에이전트가 상호작용하는 방식을 설정.",
      "UI 디자인 이미지나 아키텍처 화이트보드 세션의 사진을 전달하면, Kiro가 이를 사용하여 구현을 안내.",
    ],
    screenshot: "natural-language-demo.png",
  },
];

// 모달 컴포넌트
interface FeatureModalProps {
  feature: Feature | null;
  isOpen: boolean;
  onClose: () => void;
}

const FeatureModal = ({ feature, isOpen, onClose }: FeatureModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 200);
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleClose]);

  if (!isOpen || !feature) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* 오버레이 */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      {/* 모달 콘텐츠 - 모바일 바텀 시트 스타일 */}
      <div
        className={`relative bg-gray-900 border-t border-gray-700 rounded-t-3xl shadow-2xl w-full transition-transform duration-300 ease-out ${
          isAnimating ? "translate-y-full" : "translate-y-0"
        }`}
        style={{
          maxWidth: "480px",
          maxHeight: "85vh",
        }}
      >
        {/* 드래그 핸들 */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
        </div>

        {/* 헤더 */}
        <div className="px-6 pb-4 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-xl">
              {feature.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{feature.title}</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 bg-gray-800 rounded-xl transition-colors text-gray-400"
              aria-label="모달 닫기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 콘텐츠 - 스크롤 가능 */}
        <div
          className="px-6 py-4 overflow-y-auto"
          style={{ maxHeight: "calc(85vh - 120px)" }}
        >
          {/* 상세 설명 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">기능 설명</h3>
            <p className="text-base text-gray-300 leading-relaxed">
              {feature.details}
            </p>
          </div>

          {/* 사용 예시 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">사용 예시</h3>
            <div className="space-y-4">
              {feature.examples.map((example, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700"
                >
                  <div className="w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {example}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleClose}
              className="w-full py-4 text-gray-400 transition-colors text-lg"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeaturesProps {
  className?: string;
}

export const Features = ({ className = "" }: FeaturesProps) => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // 모바일 터치 이벤트 핸들러
  const handleTouchStart = (featureId: string) => {
    setActiveCard(featureId);
  };

  const handleTouchEnd = () => {
    setActiveCard(null);
  };

  const handleFeatureClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedFeature(null), 300);
  };

  return (
    <>
      <section
        className={`py-12 px-6 bg-gray-900 ${className}`}
        style={{
          maxWidth: "480px",
          margin: "0 auto",
        }}
      >
        {/* 섹션 헤더 - 모바일 최적화 */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">주요 기능</h2>
          <p className="text-base text-gray-300 leading-relaxed">
            KIRO만의 독특한 기능들로
            <br />
            개발 효율성을 극대화하세요
          </p>
        </div>

        {/* 기능 카드 리스트 - 모바일 세로 배치 */}
        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.id} className="relative">
              <button
                onClick={() => {
                  handleTouchStart(feature.id);
                  setTimeout(() => {
                    handleTouchEnd();
                    handleFeatureClick(feature);
                  }, 150);
                }}
                className="w-full p-6 bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl text-left transition-all duration-200"
                style={{
                  transform:
                    activeCard === feature.id ? "scale(0.98)" : "scale(1)",
                  boxShadow:
                    activeCard === feature.id
                      ? "0 8px 25px rgba(143, 70, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                      : "0 4px 15px rgba(0, 0, 0, 0.1)",
                }}
                aria-label={`${feature.title} 기능 상세보기`}
              >
                <div className="flex items-start space-x-4">
                  {/* 아이콘 */}
                  <div
                    className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-200"
                    style={{
                      transform:
                        activeCard === feature.id
                          ? "rotate(6deg) scale(1.1)"
                          : "rotate(0deg) scale(1)",
                    }}
                  >
                    {feature.icon}
                  </div>

                  {/* 콘텐츠 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* 더보기 힌트 */}
                    <div className="mt-3 flex items-center text-primary text-sm">
                      <span>자세히 보기</span>
                      <svg
                        className="w-4 h-4 ml-1 transition-transform duration-200"
                        style={{
                          transform:
                            activeCard === feature.id
                              ? "translateX(4px)"
                              : "translateX(0px)",
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 터치 피드백 오버레이 */}
                <div
                  className="absolute inset-0 rounded-2xl bg-primary/5 transition-opacity duration-200"
                  style={{
                    opacity: activeCard === feature.id ? 1 : 0,
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 모달 */}
      <FeatureModal
        feature={selectedFeature}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
