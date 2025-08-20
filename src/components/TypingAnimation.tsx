import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface TypingAnimationProps {
  className?: string;
  onComplete?: () => void;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  className = "",
  onComplete,
}) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const animateTyping = (): void => {
      if (!h1Ref.current || !pRef.current) return;

      // 텍스트 내용
      const line1Text = "아이디어 스케치에서,";
      const line2Text = "서비스 런칭까지.";
      const subtitleText = "Kiro와 함께 시작해보세요.";

      // HTML 구조 설정
      h1Ref.current.innerHTML = `
        <span class="line1"></span>
        <br />
        <span class="text-primary line2"></span>
      `;

      const line1Element = h1Ref.current.querySelector(".line1") as HTMLElement;
      const line2Element = h1Ref.current.querySelector(".line2") as HTMLElement;

      // 초기 텍스트 설정 (빈 문자열)
      line1Element.textContent = "";
      line2Element.textContent = "";
      pRef.current.textContent = "";

      // 타임라인 생성
      const tl = gsap.timeline({
        onComplete: () => {
          // 커서 효과 추가
          const cursor = document.createElement("span");
          cursor.textContent = "|";
          cursor.className = "typing-cursor text-primary ml-1";
          pRef.current?.appendChild(cursor);

          // 커서 깜빡임 애니메이션
          gsap.to(cursor, {
            opacity: 0,
            duration: 0.5,
            repeat: 5,
            yoyo: true,
            ease: "power2.inOut",
            onComplete: () => {
              cursor.remove();
              if (onComplete) onComplete();
            },
          });
        },
      });

      // 첫 번째 줄 타이핑 애니메이션
      tl.to(line1Element, {
        duration: line1Text.length * 0.05,
        ease: "none",
        onUpdate: function () {
          const progress = this.progress();
          const currentLength = Math.floor(progress * line1Text.length);
          line1Element.textContent = line1Text.slice(0, currentLength);
        },
      });

      // 잠시 대기
      tl.to({}, { duration: 0.3 });

      // 두 번째 줄 타이핑 애니메이션
      tl.to(line2Element, {
        duration: line2Text.length * 0.05,
        ease: "none",
        onUpdate: function () {
          const progress = this.progress();
          const currentLength = Math.floor(progress * line2Text.length);
          line2Element.textContent = line2Text.slice(0, currentLength);
        },
      });

      // 잠시 대기
      tl.to({}, { duration: 0.5 });

      // 서브타이틀 타이핑 애니메이션
      tl.to(pRef.current, {
        duration: subtitleText.length * 0.03,
        ease: "none",
        onUpdate: function () {
          const progress = this.progress();
          const currentLength = Math.floor(progress * subtitleText.length);
          if (pRef.current) {
            pRef.current.textContent = subtitleText.slice(0, currentLength);
          }
        },
      });
    };

    // 애니메이션 시작
    animateTyping();

    // 클린업
    return () => {
      gsap.killTweensOf([h1Ref.current, pRef.current]);
      const cursor = document.querySelector(".typing-cursor");
      if (cursor) cursor.remove();
    };
  }, [onComplete]);

  return (
    <div className={className}>
      <h1
        ref={h1Ref}
        className="text-3xl font-bold text-white leading-tight tracking-tight mb-4"
      >
        아이디어 스케치에서,
        <br />
        <span className="text-primary">서비스 런칭까지.</span>
      </h1>

      <p ref={pRef} className="text-lg font-medium text-gray-200">
        Kiro와 함께 시작해보세요.
      </p>
    </div>
  );
};

export default TypingAnimation;
