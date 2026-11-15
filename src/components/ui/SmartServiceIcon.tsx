"use client";

import React, { useState, useEffect } from "react";
import { ServiceCategory } from "@/types/project";
import {
  extractDomain,
  detectServiceKey,
  KNOWN_LOGOS,
  renderCategoryIcon,
  getFaviconUrl,
  getExternalFaviconFallback,
} from "@/utils/iconResolver";

export interface SmartServiceIconProps {
  url?: string;
  name?: string;
  icon?: string;
  customIconUrl?: string;
  category?: ServiceCategory;
  className?: string;
  imgClassName?: string;
}

export function SmartServiceIcon({
  url = "",
  name = "",
  icon,
  customIconUrl,
  category = "other",
  className = "w-7 h-7",
  imgClassName = "object-contain rounded transition-transform group-hover:scale-110 drop-shadow-sm",
}: SmartServiceIconProps) {
  // Stage 0: customIconUrl OR primary /api/icon
  // Stage 1: external CDN fallback (unavatar -> gstatic)
  // Stage 2: known official vector SVG (KNOWN_LOGOS)
  // Stage 3: category icon
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    setStage(0);
  }, [url, customIconUrl, icon]);

  const domain = extractDomain(url);
  const detectedKey = detectServiceKey(name, url);
  const brandKey =
    icon && KNOWN_LOGOS[icon]
      ? icon
      : detectedKey && KNOWN_LOGOS[detectedKey]
      ? detectedKey
      : null;

  // 1. User-specified custom icon URL
  if (customIconUrl && stage === 0) {
    return (
      <img
        src={customIconUrl}
        alt={name || "icon"}
        className={`${className} ${imgClassName}`}
        onError={() => setStage(1)}
      />
    );
  }

  // 2. Primary: automatic real icon via internal API (/api/icon?url=...)
  const isInternalApiStage = customIconUrl ? stage === 1 : stage === 0;
  if (url && domain && isInternalApiStage) {
    return (
      <img
        src={getFaviconUrl(url)}
        alt={name || domain}
        className={`${className} ${imgClassName}`}
        onError={() => setStage(customIconUrl ? 2 : 1)}
      />
    );
  }

  // 3. Secondary: external CDN direct fallback (unavatar / gstatic)
  const isExternalCdnStage = customIconUrl ? stage === 2 : stage === 1;
  if (domain && isExternalCdnStage) {
    return (
      <img
        src={getExternalFaviconFallback(url)}
        alt={name || domain}
        className={`${className} ${imgClassName}`}
        onError={() => setStage(customIconUrl ? 3 : 2)}
      />
    );
  }

  // 4. Tertiary: Official brand vector SVG with authentic brand colors
  if (brandKey && KNOWN_LOGOS[brandKey]) {
    return (
      <div className={`flex items-center justify-center shrink-0 ${className}`}>
        {KNOWN_LOGOS[brandKey](className)}
      </div>
    );
  }

  // 5. Final fallback: category icon
  return (
    <div className={`flex items-center justify-center shrink-0 text-[#d4af37] ${className}`}>
      {renderCategoryIcon(category, className)}
    </div>
  );
}
