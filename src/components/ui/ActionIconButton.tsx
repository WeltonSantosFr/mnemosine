"use client";

import React from "react";
import { LucideIcon, Edit2, Trash2, X } from "lucide-react";

export type ActionIconVariant = "edit" | "delete" | "close" | "neutral";

export interface ActionIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionIconVariant;
  icon?: LucideIcon;
  size?: "sm" | "md";
  stopPropagation?: boolean;
  preventDefault?: boolean;
  title: string;
}

const VARIANT_ICONS: Record<ActionIconVariant, LucideIcon> = {
  edit: Edit2,
  delete: Trash2,
  close: X,
  neutral: Edit2,
};

const VARIANT_STYLES: Record<ActionIconVariant, string> = {
  edit: "text-white hover:bg-white/10 hover:text-white",
  delete: "text-red-400 hover:bg-red-500/15 hover:text-red-300",
  close: "text-stone-300 hover:bg-white/10 hover:text-white",
  neutral: "text-stone-300 hover:bg-white/10 hover:text-white",
};

const SIZE_STYLES = {
  sm: {
    button: "p-1 rounded-md",
    icon: "w-3 h-3",
  },
  md: {
    button: "p-1.5 rounded-md",
    icon: "w-3.5 h-3.5",
  },
};

/**
 * ActionIconButton
 *
 * Componente oficial do Design System para botões de ação contextuais icon-only (editar, excluir, fechar).
 * Fundo transparente em repouso, sem bordas, com hover translúcido suave.
 */
export function ActionIconButton({
  variant = "neutral",
  icon,
  size = "sm",
  stopPropagation = true,
  preventDefault = false,
  title,
  onClick,
  className = "",
  type = "button",
  ...props
}: ActionIconButtonProps) {
  const IconComponent = icon || VARIANT_ICONS[variant];
  const sizeConfig = SIZE_STYLES[size];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (preventDefault) {
      e.preventDefault();
    }
    if (stopPropagation) {
      e.stopPropagation();
    }
    onClick?.(e);
  };

  return (
    <button
      type={type}
      title={title}
      aria-label={title}
      onClick={handleClick}
      className={`bg-transparent transition-colors cursor-pointer flex items-center justify-center shrink-0 border-0 ${sizeConfig.button} ${VARIANT_STYLES[variant]} ${className}`}
      {...props}
    >
      <IconComponent className={sizeConfig.icon} />
    </button>
  );
}
