"use client";

import { MnemosineLogo } from "@/components/ui/MnemosineLogo";
import { LabyrinthIcon } from "@/components/ui/LabyrinthIcon";
import { Folder, Settings, X } from "lucide-react";

export type ActiveTab = "projects" | "labyrinth" | "settings";

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenSettings: () => void;
  projectCount: number;
  onCloseMobile?: () => void;
}

export function Sidebar({
  activeTab,
  onTabChange,
  onOpenSettings,
  projectCount,
  onCloseMobile,
}: SidebarProps) {
  const handleTabClick = (tab: ActiveTab) => {
    onTabChange(tab);
    onCloseMobile?.();
  };

  const handleSettingsClick = () => {
    onOpenSettings();
    onCloseMobile?.();
  };

  return (
    <aside className="w-64 sm:w-72 bg-[#0e0d11] border-r border-[#2d2518] flex flex-col shrink-0 select-none h-full min-h-screen overflow-y-auto">
      {/* Top Branding Section */}
      <div>
        <div className="h-16 px-4 sm:px-6 flex items-center justify-center border-b border-[#282218] relative shrink-0">
          <div className="w-full max-w-[195px] sm:max-w-[215px] flex items-center justify-center">
            <MnemosineLogo className="w-full h-auto drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)]" />
          </div>

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden absolute top-1/2 -translate-y-1/2 right-3 p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-[#1f1d26] transition-colors cursor-pointer"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 sm:p-4 space-y-1 mt-2">
          {/* O Labirinto */}
          <button
            type="button"
            onClick={() => handleTabClick("labyrinth")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 font-serif text-sm tracking-wide transition-all cursor-pointer border-l-2 ${
              activeTab === "labyrinth"
                ? "border-l-[#d4af37] bg-[#1a1714]/60 text-stone-100 font-medium"
                : "border-l-transparent text-stone-400 hover:text-stone-200 hover:bg-[#16141a]/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <LabyrinthIcon
                className={`w-4 h-4 ${
                  activeTab === "labyrinth" ? "text-[#d4af37]" : "text-[#8c734b]"
                }`}
              />
              <span>O Labirinto</span>
            </div>
            <span className="text-[10px] font-mono text-[#8c734b] uppercase">
              Mapa
            </span>
          </button>

          {/* Projetos */}
          <button
            type="button"
            onClick={() => handleTabClick("projects")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 font-serif text-sm tracking-wide transition-all cursor-pointer border-l-2 ${
              activeTab === "projects"
                ? "border-l-[#d4af37] bg-[#1a1714]/60 text-stone-100 font-medium"
                : "border-l-transparent text-stone-400 hover:text-stone-200 hover:bg-[#16141a]/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <Folder
                className={`w-4 h-4 ${
                  activeTab === "projects" ? "text-[#d4af37]" : "text-[#8c734b]"
                }`}
              />
              <span>Projetos</span>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded font-mono ${
                activeTab === "projects"
                  ? "bg-[#251f15] text-[#d4af37]"
                  : "bg-[#17151c] text-stone-500"
              }`}
            >
              {projectCount}
            </span>
          </button>

          {/* Configurações */}
          <button
            type="button"
            onClick={handleSettingsClick}
            className="w-full flex items-center justify-between px-3.5 py-2.5 font-serif text-sm tracking-wide text-stone-400 hover:text-stone-200 hover:bg-[#16141a]/60 border-l-2 border-l-transparent transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 text-[#8c734b]" />
              <span>Configurações</span>
            </div>
            <span className="text-[10px] font-mono text-[#8c734b]">JSON</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
