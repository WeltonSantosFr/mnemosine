import React from "react";

interface ScrollCornerProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export function ScrollCorner({ position, className = "" }: ScrollCornerProps) {
  // Rotations for different corners
  const rotationClass = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }[position];

  return (
    <div
      className={`absolute w-7 h-7 pointer-events-none select-none text-[#d4af37]/80 ${rotationClass} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
        {/* Outer scroll handle */}
        <circle
          cx="14"
          cy="14"
          r="9"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="#141419"
        />
        {/* Inner spiraling coil */}
        <path
          d="M14 8a6 6 0 1 1-5 2.7c.8-.8 2-1.2 3.2-.7 1.2.5 1.8 1.8 1.8 3"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}

export function ClassicAcanthusCorner({
  position,
  className = "",
}: ScrollCornerProps) {
  const transform = {
    "top-left": "scale-100",
    "top-right": "-scale-x-100",
    "bottom-left": "-scale-y-100",
    "bottom-right": "-scale-100",
  }[position];

  return (
    <div
      className={`absolute w-10 h-10 pointer-events-none select-none text-[#d4af37]/40 ${transform} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <path
          d="M3 3h16c-3 3-5 7-5 12 0 6 3 9 7 9s8-3 8-9c0-6-3-11-9-12h17v34"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  );
}
