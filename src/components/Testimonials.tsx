import { useState } from "react";
import { testimonialData } from "../data/testimonialData";

interface TestimonialCardProps {
  name: string;
  position: string;
  company: string;
  testimonial: string;

  isActive?: boolean;
}

const TestimonialCard = ({
  name,
  position,
  company,
  testimonial,
}: TestimonialCardProps) => {
  const [activeCard, setActiveCard] = useState(false);

  const handleClick = () => {
    setActiveCard(true);
    setTimeout(() => setActiveCard(false), 200);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 transition-all duration-200 cursor-pointer"
      style={{
        transform: activeCard ? "scale(0.98)" : "scale(1)",
        boxShadow: activeCard
          ? "0 8px 25px rgba(143, 70, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
          : "0 4px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* 리뷰 텍스트 */}
      <p className="text-gray-300 text-sm leading-relaxed mb-6">
        "{testimonial}"
      </p>

      {/* 사용자 정보 */}
      <div className="flex items-center space-x-3">
        <div>
          <h4 className="text-white font-semibold text-sm">{name}</h4>
          <p className="text-gray-400 text-xs">
            {position}
            {company.includes("-") ? null : `• ${company}`}
          </p>
        </div>
      </div>

      {/* 클릭 피드백 오버레이 */}
      <div
        className="absolute inset-0 rounded-2xl bg-primary/5 transition-opacity duration-200"
        style={{
          opacity: activeCard ? 1 : 0,
        }}
      />
    </div>
  );
};

interface TestimonialsProps {
  className?: string;
}

export const Testimonials = ({ className = "" }: TestimonialsProps) => {
  return (
    <section
      className={`py-12 px-6 bg-secondary ${className}`}
      style={{
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      {/* 섹션 헤더 */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">
          글로벌 엔지니어에게도 사랑받는 KIRO
        </h2>
        <p className="text-base text-gray-300 leading-relaxed">
          실제 개발자들이 KIRO를 사용하며
          <br />
          경험한 생생한 후기를 확인해보세요
        </p>
      </div>

      {/* 리뷰 카드 리스트 */}
      <div className="space-y-4">
        {testimonialData.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            name={testimonial.name}
            position={testimonial.position}
            company={testimonial.company}
            testimonial={testimonial.testimonial}
          />
        ))}
      </div>
    </section>
  );
};
