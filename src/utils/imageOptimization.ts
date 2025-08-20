/**
 * 고급 이미지 최적화 유틸리티
 */

import type { PropsWithChildren } from "react";

// 이미지 포맷 지원 감지
export const detectImageFormatSupport = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  return {
    webp: canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0,
    avif: canvas.toDataURL("image/avif").indexOf("data:image/avif") === 0,
  };
};

// 반응형 이미지 srcSet 생성
export const generateResponsiveSrcSet = (
  baseSrc: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  return sizes
    .map((size) => {
      const extension = baseSrc.split(".").pop();
      const baseName = baseSrc.replace(`.${extension}`, "");
      return `${baseName}-${size}w.${extension} ${size}w`;
    })
    .join(", ");
};

// 이미지 프리로딩
export const preloadImage = (
  src: string,
  priority: "high" | "low" = "low"
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // 우선순위 설정 (Chrome 73+)
    if ("fetchPriority" in img) {
      (img as PropsWithChildren<HTMLImageElement>).fetchPriority = priority;
    }

    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// 중요한 이미지들 프리로딩
export const preloadCriticalImages = async (images: string[]) => {
  const preloadPromises = images.map((src) => preloadImage(src, "high"));

  try {
    await Promise.all(preloadPromises);
    console.log("✅ Critical images preloaded");
  } catch (error) {
    console.warn("⚠️ Some critical images failed to preload:", error);
  }
};

// 이미지 압축 품질 자동 조정
export const getOptimalImageQuality = (
  imageSize: number,
  connectionSpeed: string = "unknown"
): number => {
  // 연결 속도에 따른 품질 조정
  const qualityMap: Record<string, number> = {
    "slow-2g": 60,
    "2g": 70,
    "3g": 80,
    "4g": 90,
    unknown: 85,
  };

  let baseQuality = qualityMap[connectionSpeed] || 85;

  // 이미지 크기에 따른 추가 조정
  if (imageSize > 1024 * 1024) {
    // 1MB 이상
    baseQuality -= 10;
  } else if (imageSize < 100 * 1024) {
    // 100KB 미만
    baseQuality += 5;
  }

  return Math.max(60, Math.min(95, baseQuality));
};

// 이미지 로딩 전략 결정
export const getImageLoadingStrategy = (
  element: HTMLElement,
  viewport: { width: number; height: number }
) => {
  const rect = element.getBoundingClientRect();
  const isAboveFold = rect.top < viewport.height;
  const isLargeImage = rect.width > 300 || rect.height > 300;

  return {
    loading: isAboveFold ? "eager" : ("lazy" as const),
    priority: isAboveFold && isLargeImage,
    fetchPriority: isAboveFold ? "high" : ("low" as const),
  };
};

// WebP/AVIF 변환 URL 생성 (CDN 사용시)
export const generateOptimizedImageUrl = (
  originalUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "avif" | "auto";
  } = {}
): string => {
  const { width, height, quality = 85, format = "auto" } = options;

  // 실제 CDN 서비스에 맞게 URL 구성
  // 예: Cloudinary, ImageKit, 등
  const params = new URLSearchParams();

  if (width) params.set("w", width.toString());
  if (height) params.set("h", height.toString());
  if (quality) params.set("q", quality.toString());
  if (format !== "auto") params.set("f", format);

  // 개발 환경에서는 원본 URL 반환
  if (process.env.NODE_ENV === "development") {
    return originalUrl;
  }

  // 프로덕션에서는 최적화된 URL 반환 (CDN 설정 필요)
  return `${originalUrl}?${params.toString()}`;
};

// 이미지 메타데이터 추출
export const getImageMetadata = (
  file: File
): Promise<{
  width: number;
  height: number;
  size: number;
  type: string;
}> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: file.size,
        type: file.type,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
};
