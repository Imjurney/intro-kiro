import { Banner } from "./nurui/banner";

export const Footer = () => {
  return (
    <footer
      style={{
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      <Banner
        className="shadow-lg bg-transparent w-full font-light"
        rainbowColors={[
          "rgba(231,77,255,0.77)",
          "rgba(231,77,255,0.77)",
          "transparent",
          "rgba(231,77,255,0.77)",
          "transparent",
          "rgba(231,77,255,0.77)",
          "transparent",
        ]}
        variant="rainbow"
      >
        이 사이트는 100% Kiro의 Spec 모드로 완성되었습니다!
      </Banner>
    </footer>
  );
};
