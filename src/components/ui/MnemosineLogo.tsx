import React from "react";

interface MnemosineLogoProps {
  className?: string;
  accentColor?: string;
}

export function MnemosineLogo({
  className = "w-full h-auto",
  accentColor = "#d4af37",
}: MnemosineLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420 60"
      width="420"
      height="60"
      fill="none"
      className={className}
      aria-label="Mnemosine Logo"
    >
      <style>{`
        .mnemosine-text {
          font-family: var(--font-cinzel), 'Cinzel', 'Cormorant Garamond', 'Times New Roman', Georgia, serif;
          font-size: 32px;
          font-weight: 500;
          letter-spacing: 0.14em;
          fill: #ECE8DF;
        }
      `}</style>

      {/* Texto Esquerdo */}
      <text x="174" y="41" textAnchor="end" className="mnemosine-text">
        MNEM
      </text>

      {/* "O" em Labirinto (Terceira Letra / Centro Óptico) */}
      <g stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Anel Externo + Entrada Superior */}
        <path d="M 203.47 14.96 A 16 16 0 1 1 192.53 14.96 L 194.24 19.66" />
        {/* Anel Intermediário (Esquerda e Direita) */}
        <path d="M 194.24 19.66 A 11 11 0 0 1 202.65 39.97" />
        <path d="M 193.35 39.97 A 11 11 0 0 1 201.76 19.66" />
        {/* Conexão ao Anel Interno */}
        <path d="M 193.35 39.97 L 195.46 35.44 A 6 6 0 1 1 200.05 24.36" />
        {/* Ponto Central (Núcleo da Memória) */}
        <circle cx="198" cy="30" r="1.6" fill={accentColor} stroke="none" />
      </g>

      {/* Texto Direito */}
      <text x="223" y="41" textAnchor="start" className="mnemosine-text">
        SINE
      </text>
    </svg>
  );
}
