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
    title: "프로젝트 요구사항 자동 정리",
    description: "막연한 아이디어도 '개발할 수 있는 목록'으로 바꿔주는 기능",
    icon: "📋",
    details:
      "예를 들어 '블로그 만들고 싶다'라고만 적어도, Kiro가 로그인/회원가입, 글 작성, 댓글, 검색 같은 기능 단위로 나눠서 정리해줘요. 과제나 포트폴리오 시작할 때 막막함을 줄여줍니다.",
    examples: [
      "팀 프로젝트 시작할 때 — '쇼핑몰' 아이디어 → 상품 목록, 장바구니, 결제 기능으로 자동 분리",
      "포트폴리오 기획할 때 — '스터디 관리 앱' → 출석, 과제 제출, 공지 알림으로 구조화",
    ],
    screenshot: "spec-management-demo.png",
  },
  {
    id: "visual-hooks",
    title: "에이전트 Hook",
    description: "코드 저장·생성·삭제 같은 이벤트에 맞춰 반복 작업을 자동화",
    icon: "🔗",
    details:
      "Agent Hook은 IDE에서 특정 이벤트(파일 저장, 새 파일 생성 등)가 발생했을 때 Kiro가 자동으로 작업을 실행하는 기능입니다. 매번 직접 명령하지 않아도 반복    작업을 줄이고, 코드 품질을 일정하게 유지할 수 있습니다.",
    examples: [
      "개발문서 자동 생성 - API 추가 될때마다 자동 API 문서 업데이트 (ex. JSDoc에 함수 설명 자동 추가)",
      "디버깅 — 오류 발생 시 Markdown 리포트 자동 생성",
      "팀플 협업 — 새 파일 생성 시 테스트 파일 자동 세팅",
      "보안 강화 — 커밋 전에 API Key나 비밀번호 같은 민감 정보 자동 스캔",
    ],
    screenshot: "visual-hooks-demo.png",
  },
  {
    id: "steering",
    title: "Steering",
    description:
      "프로젝트 내 규칙에 맞는 일관된 코드와 문서를 자동 생성해, 반복을 줄이고 누구나 같은 기준으로 협업할 수 있게 해줘요.",
    icon: "💡",
    details:
      "매번 대화에서 규칙을 설명하지 않아도, Kiro가 내가 정한 기준을 일관되게 따를 수 있도록 도와줍니다.",
    examples: [
      "API 가이드 라인 문서 작성 후, 일관된 가이드 제공 가능",
      "UI 스케치를 상황에 맞는 구현 가이드 제공",
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
            기획·코드·테스트까지
            <br />
            KIRO가 팀원이 되어드려요.
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
