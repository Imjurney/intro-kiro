import { useRef } from "react";
import { Section } from "./Layout";
import useGSAP from "../hooks/useGSAP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  link: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "kiro-getting-started",
    title: "Kiro 한국 사용자를 위한 가이드",
    summary:
      "Kiro 한국 사용자를 위한 가이드는 AWS의 공식 입장이 아니며, 개인이 번역/의역한 가이드입니다.의미가 모호할 때는 각 블로그 내의 영어 원문을 참조합니다. 제9장은 AWS 계정 기반의 실습이므로, 비용이 발생할 수 있습니다.",
    date: "2054-07-17",
    link: "https://whchoi98.notion.site/Kiro-23104ef7e60e80d3b838e13d2d65498e",
    category: "가이드",
    readTime: "노션",
  },
  {
    id: "kiro-getting-intro",
    title:
      "Kiro: 프로토타입에서 프로덕션 레벨까지 지원하는 스펙 기반 Agentic IDE 출시",
    summary:
      "혹시 이런 경험을 해 본 적이 있으신가요? 많은 프롬프트가 표시되면 작동하는 애플리케이션이 있습니다. 재미있고 마법 같은 느낌이 듭니다. 그러나, 현업의 프로덕션 레벨까지 활용하기에 충분하지 않습니다. ",
    date: "2025-07-16",
    link: "https://aws.amazon.com/ko/blogs/korea/introducing-kiro/",
    category: "소개",
    readTime: "블로그",
  },
  {
    id: "kiro-price",
    title: "Kiro Pricing Plans Are Now Live",
    summary:
      "Over the past few weeks, we have shared several important Kiro pricing updates. We made these updates to our pricing model in response to your feedback. Many in our community have asked for a way to use Kiro above and beyond the",
    date: "2024-08-15",
    link: "https://kiro.dev/blog/pricing-plans-are-live/",
    category: "가격 정책",
    readTime: "블로그",
  },
  //   {
  //     id: "portfolio-success-story",
  //     title: "취준생이 KIRO로 포트폴리오 완성한 후기",
  //     summary:
  //       "실제 취준생이 KIRO를 활용해 8주 걸릴 프로젝트를 3주 만에 완성한 경험담과 노하우를 공유합니다.",
  //     date: "2024-02-01",
  //     link: "https://whchoi98.notion.site/Kiro-23104ef7e60e80d3b838e13d2d65498e",
  //     category: "성공 사례",
  //     readTime: "7분",
  //   },
  //   {
  //     id: "mcp-integration",
  //     title: "MCP로 외부 도구와 연결하기",
  //     summary:
  //       "KIRO의 MCP(Model Context Protocol) 기능을 활용해 다양한 외부 API와 도구들을 코드 없이 연결하는 방법을 알아보세요.",
  //     date: "2024-02-05",
  //     link: "https://whchoi98.notion.site/Kiro-23104ef7e60e80d3b838e13d2d65498e",
  //     category: "고급 기능",
  //     readTime: "10분",
  //   },
  //   {
  //     id: "junior-developer-tips",
  //     title: "주니어 개발자를 위한 KIRO 활용 팁 10가지",
  //     summary:
  //       "주니어 개발자가 KIRO를 더 효과적으로 활용할 수 있는 실용적인 팁들을 정리했습니다. 생산성 향상의 비밀을 확인해보세요.",
  //     date: "2024-02-10",
  //     link: "https://whchoi98.notion.site/Kiro-23104ef7e60e80d3b838e13d2d65498e",
  //     category: "팁 & 트릭",
  //     readTime: "12분",
  //   },
];

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      const card = cardRef.current;

      // 스크롤 트리거로 카드 등장 애니메이션
      gsap.fromTo(
        card,
        {
          y: 60,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 호버 애니메이션
      const tl = gsap.timeline({ paused: true });
      tl.to(card, {
        y: -8,
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(143, 70, 255, 0.15)",
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

  const handleCardClick = () => {
    window.open(post.link, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:border-primary/50"
    >
      {/* 카테고리 및 읽기 시간 */}
      <div className="flex items-center justify-between mb-3">
        <span className="px-2 sm:px-3 py-1 bg-primary/20 text-primary text-xs sm:text-sm font-medium rounded-full">
          {post.category}
        </span>
        <span className="text-xs sm:text-sm text-gray-400">
          {post.readTime}
        </span>
      </div>

      {/* 제목 */}
      <h3 className="text-base font-bold text-white mb-3 line-clamp-2 leading-tight">
        {post.title}
      </h3>

      {/* 요약 */}
      <p className="text-sm sm:text-base text-gray-300 mb-4 line-clamp-3 leading-relaxed">
        {post.summary}
      </p>

      {/* 날짜 및 링크 */}
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm text-gray-500">
          {new Date(post.date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <div className="flex items-center text-primary text-sm font-medium">
          읽어보기
          <svg
            className="w-4 h-4 ml-1"
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
  );
};

interface BlogProps {
  className?: string;
}

export const Blog = ({ className = "" }: BlogProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // 스크롤 트리거 애니메이션
  useGSAP(
    () => {
      if (!sectionRef.current || !headerRef.current) return;

      // 헤더 애니메이션
      gsap.fromTo(
        headerRef.current.children,
        {
          y: 50,
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
    },
    { dependencies: [] }
  );

  return (
    <Section ref={sectionRef} background="gray" className={className}>
      {/* 섹션 헤더 */}
      <div ref={headerRef} className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl font-bold text-white mb-4 sm:mb-6">
          KIRO와 함께하는 개발 여정
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
          KIRO를 더 효과적으로 활용하고 개발 실력을 향상시킬 수 있는{" "}
          <br className="hidden sm:block" />
          <span className="font-semibold text-primary">
            유용한 가이드와 팁들을 확인해보세요
          </span>
        </p>
      </div>

      {/* 블로그 포스트 그리드 */}
      <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 mb-12 sm:mb-16">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {/* 하단 CTA */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 sm:p-8 border border-primary/20">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
            더 많은 KIRO 활용법이
            <br /> 궁금하신가요?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            DOCS에서 더 자세한 사용법과 고급 기능들을 확인할 수 있습니다.{" "}
            <br className="hidden sm:block" />
            지금 바로 확인해보세요!
          </p>
          <div className="flex flex-col gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <button
              onClick={() =>
                window.open(
                  "https://kiro.dev/docs/getting-started/",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="bg-white/10 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
            >
              🚀 KIRO DOCS 보러가기
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};
