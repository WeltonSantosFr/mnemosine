"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Project, ServiceItem, ServiceCategory, CATEGORIES_META } from "@/types/project";
import {
  KNOWN_LOGOS,
  detectServiceKey,
  renderCategoryIcon,
  SmartServiceIcon,
} from "@/utils/iconResolver";
import { Search, ExternalLink, Folder, X, CornerDownLeft } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject?: (projectId: string) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  projects,
  onSelectProject,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      itemRefs.current = [];
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Auto-scroll selected item into view during keyboard navigation
  useEffect(() => {
    if (isOpen && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [selectedIndex, isOpen]);

  // Build searchable items list
  const results = useMemo(() => {
    if (!isOpen) return [];
    const q = query.toLowerCase().trim();

    const items: Array<{
      type: "service" | "project";
      id: string;
      title: string;
      subtitle: string;
      url?: string;
      category?: string;
      iconKey?: string;
      customIconUrl?: string;
      projectId?: string;
    }> = [];

    // Match projects
    projects.forEach((p) => {
      if (!q || p.name.toLowerCase().includes(q)) {
        items.push({
          type: "project",
          id: p.id,
          title: p.name,
          subtitle: `${p.services.length} serviços cadastrados`,
          projectId: p.id,
        });
      }

      // Match services
      p.services.forEach((s) => {
        const catMeta = CATEGORIES_META[s.category];
        const matchName = s.name.toLowerCase().includes(q);
        const matchProject = p.name.toLowerCase().includes(q);
        const matchCategory =
          catMeta?.label.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q);

        if (!q || matchName || matchProject || matchCategory) {
          items.push({
            type: "service",
            id: s.id,
            title: s.name,
            subtitle: `${p.name} • ${catMeta?.label || s.category}`,
            url: s.url,
            category: s.category,
            iconKey: s.icon || detectServiceKey(s.name, s.url) || undefined,
            customIconUrl: s.customIconUrl,
            projectId: p.id,
          });
        }
      });
    });

    return items.slice(0, 10);
  }, [projects, query, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(0, results.length - 1) : prev - 1
        );
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected.type === "service" && selected.url) {
          window.open(selected.url, "_blank", "noopener,noreferrer");
          onClose();
        } else if (selected.type === "project" && onSelectProject) {
          onSelectProject(selected.id);
          onClose();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, onSelectProject]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-16 md:pt-20 px-2.5 sm:px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-[#141318] border-2 border-[#8c734b] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.2)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input */}
        <div className="relative flex items-center px-3 sm:px-4 py-3 sm:py-4 border-b border-[#312718]">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37] mr-2.5 sm:mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar projeto ou serviço (ex: Supabase, Stripe)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-stone-100 placeholder-stone-500 text-xs sm:text-sm md:text-base focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-stone-500 hover:text-stone-300 p-1 mr-1 sm:mr-2"
              title="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {/* Desktop Keyboard Badge */}
          <span className="hidden lg:inline-flex text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#201c15] text-[#d4af37] border border-[#483d29] select-none shrink-0">
            ESC
          </span>
          {/* Mobile/Tablet Touch Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1 text-stone-400 hover:text-stone-200 transition-colors shrink-0"
            title="Fechar busca"
            aria-label="Fechar busca"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="border-b border-[#282218]" />

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="py-12 text-center text-stone-500 font-serif">
              Nenhuma relíquia ou serviço encontrado para &quot;{query}&quot;.
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const hasSvg = item.iconKey && KNOWN_LOGOS[item.iconKey];

              return (
                <div
                  key={`${item.type}-${item.id}-${idx}`}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    if (item.type === "service" && item.url) {
                      window.open(item.url, "_blank", "noopener,noreferrer");
                      onClose();
                    } else if (item.type === "project" && onSelectProject) {
                      onSelectProject(item.id);
                      onClose();
                    }
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer select-none ${
                    isSelected
                      ? "bg-[#252018] border border-[#d4af37]/80 text-[#f3e5ab] shadow-sm"
                      : "bg-transparent text-stone-300 hover:bg-[#1c1a21] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Icon */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center p-1.5 shrink-0 ${
                        isSelected
                          ? "bg-[#14120f] border border-[#d4af37]/60"
                          : "bg-[#18161d] border border-[#2e261a]"
                      }`}
                    >
                      {item.type === "project" ? (
                        <Folder className="w-4 h-4 text-[#d4af37]" />
                      ) : (
                        <SmartServiceIcon
                          url={item.url || ""}
                          name={item.title}
                          icon={item.iconKey}
                          customIconUrl={item.customIconUrl}
                          category={(item.category as ServiceCategory) || "other"}
                          className="w-4 h-4"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-stone-100 truncate">
                          {item.title}
                        </span>
                        {item.type === "project" && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#352b1b] text-[#d4af37] font-serif uppercase tracking-wider">
                            Pasta
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-stone-400 block truncate font-sans">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-stone-400 text-xs shrink-0 ml-3">
                    {item.type === "service" ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-[#8c734b]">
                        <span className="hidden sm:inline">Abrir Link</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-[#8c734b]">
                        <span className="hidden sm:inline">Abrir Pasta</span>
                        <CornerDownLeft className="w-3.5 h-3.5 text-[#d4af37]" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts (Visible exclusively on desktop lg+) */}
        <div className="hidden lg:flex px-4 py-2.5 bg-[#0e0d11] border-t border-[#261f14] items-center justify-between text-[11px] text-stone-400 font-mono">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#1c1813] border border-[#3b301f] text-[#d4af37]">
                ↑
              </kbd>{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-[#1c1813] border border-[#3b301f] text-[#d4af37]">
                ↓
              </kbd>{" "}
              Navegar
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#1c1813] border border-[#3b301f] text-[#d4af37]">
                ENTER
              </kbd>{" "}
              Selecionar
            </span>
          </div>
          <span className="text-[#8c734b] font-serif">Mnemosine</span>
        </div>
      </div>
    </div>
  );
}
