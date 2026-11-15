"use client";

import React from "react";
import { Search, Command, Menu } from "lucide-react";
import { MnemosineLogo } from "@/components/ui/MnemosineLogo";

interface HeaderProps {
  onOpenCommandPalette: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onToggleMobileMenu: () => void;
  onLogoClick?: () => void;
}

export function Header({
  onOpenCommandPalette,
  searchTerm,
  onSearchChange,
  onToggleMobileMenu,
  onLogoClick,
}: HeaderProps) {

  return (
    <header className="h-16 sticky top-0 z-30 bg-[#0e0d11]/95 backdrop-blur-md border-b border-[#282218] flex items-center">
      <div className="w-full flex items-center justify-between px-3 sm:px-6">
        {/* Left: Mobile menu toggle + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label="Abrir menu de navegação"
            className="lg:hidden p-2 rounded-xl bg-[#141318] border border-[#3e3423] text-[#d4af37] hover:bg-[#1f1b24] transition-colors cursor-pointer shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={onLogoClick}
            role={onLogoClick ? "button" : undefined}
            tabIndex={onLogoClick ? 0 : undefined}
            onKeyDown={(e) => {
              if (onLogoClick && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onLogoClick();
              }
            }}
            aria-label="Ir para a página inicial"
            className="lg:hidden flex items-center h-8 w-32 sm:w-40 shrink-0 cursor-pointer select-none"
          >
            <MnemosineLogo className="w-full h-auto drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)]" />
          </div>
        </div>

        {/* Right Tools (Search, New Folder, Fullscreen) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button (visible < sm) */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            aria-label="Pesquisar"
            className="sm:hidden p-2 rounded-xl bg-[#141318] border border-[#3e3423] text-[#d4af37] hover:bg-[#1f1b24] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Desktop/Tablet Search Trigger (visible >= sm) */}
          <div
            onClick={onOpenCommandPalette}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpenCommandPalette();
              }
            }}
            className="hidden sm:flex items-center justify-between gap-3 px-3 py-1.5 md:py-2 rounded-xl bg-[#141318] border border-[#3e3423] hover:border-[#d4af37]/80 text-stone-400 hover:text-stone-200 transition-all cursor-pointer w-48 md:w-64 lg:w-72 group shadow-sm select-none"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Search className="w-3.5 h-3.5 text-[#8c734b] group-hover:text-[#d4af37] transition-colors shrink-0" />
              <span className="text-xs font-sans truncate">
                {searchTerm || "Pesquisar..."}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#201c15] text-[#d4af37] border border-[#483d29] shrink-0">
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
