import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// 기본 애니메이션 설정
export const defaultEase = "power2.out";
export const defaultDuration = 0.6;

// 애니메이션 유틸리티 함수들
export const fadeIn = (element: string | Element, options?: gsap.TweenVars) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: defaultDuration,
      ease: defaultEase,
      ...options,
    }
  );
};

export const staggerFadeIn = (
  elements: string | Element[],
  options?: gsap.TweenVars
) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: defaultDuration,
      ease: defaultEase,
      stagger: 0.1,
      ...options,
    }
  );
};

export const typeWriter = (
  element: string | Element,
  text: string,
  options?: gsap.TweenVars
) => {
  const tl = gsap.timeline();

  // 텍스트를 한 글자씩 나타내는 애니메이션
  tl.to(element, {
    duration: text.length * 0.05,
    ease: "none",
    onUpdate: function () {
      const progress = this.progress();
      const currentLength = Math.floor(progress * text.length);
      if (element instanceof Element) {
        element.textContent = text.substring(0, currentLength);
      }
    },
    ...options,
  });

  return tl;
};

// Hero 섹션용 애니메이션
export const heroEntranceAnimation = (
  titleElement: Element,
  subtitleElement: Element,
  buttonsElement: Element,
  backgroundElement?: Element
) => {
  const tl = gsap.timeline({ delay: 0.5 });

  // 배경 요소 애니메이션
  if (backgroundElement) {
    const bgElements = backgroundElement.children;
    gsap.set(bgElements, { scale: 0, opacity: 0 });

    tl.to(
      bgElements,
      {
        scale: 1,
        opacity: 0.1,
        duration: 2,
        ease: "power2.out",
        stagger: 0.3,
      },
      0
    );
  }

  // 타이틀 타이핑 효과
  gsap.set(titleElement, { opacity: 0 });
  tl.to(titleElement, { opacity: 1, duration: 0.3 }, 0.8);

  // 서브타이틀 등장
  gsap.set(subtitleElement, { opacity: 0, y: 30 });
  tl.to(
    subtitleElement,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    },
    3.8
  );

  // 버튼들 등장
  const buttons = buttonsElement.children;
  gsap.set(buttons, { opacity: 0, y: 30, scale: 0.9 });
  tl.to(
    buttons,
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.15,
    },
    4.8
  );

  return tl;
};

// 버튼 호버 애니메이션
export const buttonHoverAnimation = (button: Element, isPrimary = false) => {
  const hoverTl = gsap.timeline({ paused: true });

  hoverTl.to(button, {
    scale: 1.08,
    y: -3,
    duration: 0.3,
    ease: "power2.out",
  });

  if (isPrimary) {
    hoverTl.to(
      button,
      {
        boxShadow: "0 20px 40px rgba(143, 70, 255, 0.4)",
        duration: 0.3,
      },
      0
    );
  }

  return hoverTl;
};

// 배경 요소 지속적 애니메이션
export const backgroundFloatingAnimation = (elements: Element[]) => {
  elements.forEach((element, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    const xMovement = (20 + index * 10) * direction;
    const yMovement = (15 + index * 5) * direction;
    const duration = 8 + index * 2;

    gsap.to(element, {
      x: `+=${xMovement}`,
      y: `+=${yMovement}`,
      duration: duration,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  });
};

export default {
  fadeIn,
  staggerFadeIn,
  typeWriter,
  heroEntranceAnimation,
  buttonHoverAnimation,
  backgroundFloatingAnimation,
  defaultEase,
  defaultDuration,
};
