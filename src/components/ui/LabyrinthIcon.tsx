import React from "react";

interface LabyrinthIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function LabyrinthIcon({
  className = "w-5 h-5",
  ...props
}: LabyrinthIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="180 12 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Anel Externo + Entrada Superior */}
      <path d="M 203.47 14.96 A 16 16 0 1 1 192.53 14.96 L 194.24 19.66" />
      {/* Anel Intermediário (Esquerda e Direita) */}
      <path d="M 194.24 19.66 A 11 11 0 0 1 202.65 39.97" />
      <path d="M 193.35 39.97 A 11 11 0 0 1 201.76 19.66" />
      {/* Conexão ao Anel Interno */}
      <path d="M 193.35 39.97 L 195.46 35.44 A 6 6 0 1 1 200.05 24.36" />
      {/* Ponto Central (Núcleo da Memória) */}
      <circle cx="198" cy="30" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
