import React from "react";

interface GreekBorderProps {
  className?: string;
  variant?: "subtle" | "prominent" | "faded";
}

export function GreekBorder({
  className = "",
  variant = "subtle",
}: GreekBorderProps) {
  const opacity =
    variant === "prominent"
      ? "opacity-60"
      : variant === "faded"
      ? "opacity-20"
      : "opacity-40";

  return (
    <div
      className={`w-full h-3 overflow-hidden flex items-center select-none pointer-events-none ${opacity} ${className}`}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="10"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#d4af37]"
      >
        <defs>
          <pattern
            id="greek-key"
            width="28"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            {/* Authentic Greek Meander Fret (Key pattern) */}
            <path
              d="M0,9 H16 V3 H6 V6 H11 V5 H9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="square"
            />
            <path
              d="M16,9 H28 V1 H2 V3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="square"
            />
          </pattern>
        </defs>
        <rect width="100%" height="10" fill="url(#greek-key)" />
      </svg>
    </div>
  );
}
