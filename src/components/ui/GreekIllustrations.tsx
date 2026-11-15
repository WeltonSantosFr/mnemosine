import React from "react";

export function GreekAmphora({ className = "w-10 h-14" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[#d4af37]/70 ${className}`}
    >
      {/* Amphora Rim & Lip */}
      <ellipse cx="50" cy="12" rx="20" ry="5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M32 14 C35 24, 40 30, 42 36" stroke="currentColor" strokeWidth="2" />
      <path d="M68 14 C65 24, 60 30, 58 36" stroke="currentColor" strokeWidth="2" />

      {/* Main Body */}
      <path
        d="M42 36 C25 50, 15 75, 20 98 C24 116, 38 126, 42 128 L58 128 C62 126, 76 116, 80 98 C85 75, 75 50, 58 36 Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* Foot / Base */}
      <path d="M40 128 L36 135 H64 L60 128" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="50" cy="135" rx="14" ry="3" stroke="currentColor" strokeWidth="2" />

      {/* Handles */}
      <path
        d="M32 20 C14 20, 10 50, 22 65"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M68 20 C86 20, 90 50, 78 65"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Decorative Greek frieze bands on vase body */}
      <path d="M22 62 H78" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M19 78 H81" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
      <path d="M22 92 H78" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Center Greek flame/anthemion motif */}
      <path
        d="M50 68 C46 72, 45 78, 50 84 C55 78, 54 72, 50 68 Z"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}

export function MnemosynePortrait({
  className = "w-12 h-14",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[#d4af37]/70 ${className}`}
    >
      {/* Classical bust silhouette with headband/laurel */}
      <path
        d="M65 20 C60 12, 45 10, 35 18 C25 26, 22 42, 28 54 C30 58, 30 62, 26 68 C22 74, 20 86, 24 94 C26 98, 32 108, 48 112 C64 114, 76 104, 78 92 C80 80, 75 70, 70 66 C65 62, 68 45, 72 38 C75 32, 72 24, 65 20 Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Profile facial outline */}
      <path
        d="M60 38 C62 44, 66 48, 65 54 C64 57, 58 59, 62 64 C64 66, 61 70, 56 72"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Greek headband / diadem */}
      <path
        d="M34 28 C45 25, 58 26, 68 32"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M36 32 C46 29, 58 30, 66 36"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Eye and classical calm expression */}
      <path d="M54 46 C56 45, 59 47, 61 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Classical hair waves */}
      <path
        d="M30 38 C36 44, 40 40, 48 48 C50 50, 46 62, 42 66"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M26 50 C32 56, 36 62, 35 72"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function TempleColumnCapital({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M3 4h18M5 4v3c1 0 2 1 2 2v11h10V9c0-1 1-2 2-2V4M2 20h20" strokeLinecap="round" />
      <circle cx="7" cy="8" r="1.5" fill="currentColor" />
      <circle cx="17" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}
