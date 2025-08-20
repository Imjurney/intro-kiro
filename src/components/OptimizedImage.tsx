import { useState, useRef, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  priority?: boolean;
  fallback?: string;
  webpSrc?: string;
  avifSrc?: string;
}

/**
 * 최적화된 이미지 컴포넌트
 * - AVIF/WebP 포맷 지원
 * - Lazy loading
 * - 인터섹션 옵저버 기반 로딩
 * - 폴백 이미지 지원
 */
export const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  priority = false,
  fallback,
  webpSrc,
  avifSrc,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === "eager") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px", // Load 50px before entering viewport
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Generate srcSet for different formats
  const generateSrcSet = () => {
    const sources = [];

    if (avifSrc) {
      sources.push(<source key="avif" srcSet={avifSrc} type="image/avif" />);
    }

    if (webpSrc) {
      sources.push(<source key="webp" srcSet={webpSrc} type="image/webp" />);
    }

    return sources;
  };

  const finalSrc = hasError && fallback ? fallback : src;

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>
      )}

      {/* Optimized image with modern formats */}
      {isInView && (
        <picture>
          {generateSrcSet()}
          <img
            src={finalSrc}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={`transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } ${className}`}
            decoding="async"
          />
        </picture>
      )}
    </div>
  );
};
