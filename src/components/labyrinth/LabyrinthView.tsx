"use client";

import React, { useState, useMemo } from "react";
import { Project, ServiceCategory, CATEGORIES_META } from "@/types/project";
import {
  KNOWN_LOGOS,
  detectServiceKey,
  renderCategoryIcon,
  SmartServiceIcon,
} from "@/utils/iconResolver";
import { ExternalLink, Layers, Search } from "lucide-react";
import { LabyrinthIcon } from "@/components/ui/LabyrinthIcon";

interface LabyrinthViewProps {
  projects: Project[];
}

export function LabyrinthView({ projects }: LabyrinthViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Flatten services with project association
  const allServicesWithProject = useMemo(() => {
    return projects.flatMap((p) =>
      p.services.map((s) => ({
        ...s,
        projectName: p.name,
        projectId: p.id,
      }))
    );
  }, [projects]);

  // Group by category
  const groupedByCategory = useMemo(() => {
    const groups: Partial<Record<ServiceCategory, typeof allServicesWithProject>> = {};

    allServicesWithProject.forEach((item) => {
      // Apply search filter
      if (
        searchTerm &&
        !item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return;
      }

      // Apply category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return;
      }

      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category]!.push(item);
    });

    return groups;
  }, [allServicesWithProject, selectedCategory, searchTerm]);

  const activeCategories = Object.keys(groupedByCategory) as ServiceCategory[];

  return (
    <div className="w-full space-y-6">
      {/* Header section with Greek aesthetic */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#17141b] via-[#1b1822] to-[#141219] p-4 sm:p-6 md:p-8 border border-[#3e3423] shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#d4af37]">
              <LabyrinthIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#c5a059]">
                Visão Consolidada
              </span>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl text-stone-100 font-bold tracking-wider mt-1">
              O Labirinto de Mnemosine
            </h1>
            <p className="text-[11px] sm:text-xs md:text-sm text-stone-400 mt-1 max-w-xl">
              Navegue por todos os serviços de infraestrutura dos seus projetos organizados por tipo e função.
            </p>
          </div>

          {/* Quick search input */}
          <div className="relative w-full sm:w-64 md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c734b]" />
            <input
              type="text"
              placeholder="Buscar no labirinto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0c0c10] border border-[#3a3020] text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 transition-all"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#d4af37] text-black font-semibold shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                : "bg-[#14141a] text-stone-400 hover:text-stone-200 border border-[#2d2518]"
            }`}
          >
            Todas as Categorias ({allServicesWithProject.length})
          </button>

          {Object.entries(CATEGORIES_META).map(([key, meta]) => {
            const count = allServicesWithProject.filter((s) => s.category === key).length;
            if (count === 0) return null;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCategory(key as ServiceCategory)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === key
                    ? "bg-[#d4af37] text-black font-semibold shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                    : "bg-[#14141a] text-stone-400 hover:text-stone-200 border border-[#2d2518]"
                }`}
              >
                {renderCategoryIcon(key as ServiceCategory, "w-3.5 h-3.5")}
                <span>{meta.label}</span>
                <span className="text-[10px] opacity-75 font-mono">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Simple Common Divider Line */}
        <div className="border-b border-[#282218] mt-4" />
      </div>

      {/* Categories Grid */}
      {activeCategories.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-[#121116] border border-[#2d2518]">
          <Layers className="w-12 h-12 mx-auto text-[#8c734b] mb-3" />
          <h3 className="font-serif text-lg text-stone-200">Nenhum serviço encontrado</h3>
          <p className="text-xs text-stone-400 mt-1">
            Tente outro termo na busca ou cadastre serviços nas suas pastas de projetos.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {activeCategories.map((catKey) => {
            const items = groupedByCategory[catKey] || [];
            const meta = CATEGORIES_META[catKey];

            return (
              <div
                key={catKey}
                className="rounded-2xl bg-[#141318]/90 border border-[#352c1d] p-3.5 sm:p-5 md:p-6 shadow-md"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#2b2316] mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#211b13] border border-[#524125] flex items-center justify-center text-[#d4af37]">
                      {renderCategoryIcon(catKey, "w-4 h-4")}
                    </div>
                    <div>
                      <h2 className="font-serif text-lg sm:text-xl text-stone-100 font-semibold tracking-wide flex items-center gap-2">
                        {meta.label}
                        <span className="text-xs text-[#8c734b] font-normal font-sans italic hidden sm:inline">
                          — {meta.greekTitle}
                        </span>
                      </h2>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#201a12] text-[#d4af37] border border-[#3d311d] font-mono">
                    {items.length} {items.length === 1 ? "item" : "itens"}
                  </span>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {items.map((service) => {
                    return (
                      <a
                        key={`${service.projectId}-${service.id}`}
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-3 rounded-xl bg-[#0e0e12] border border-[#2b2317] hover:border-[#d4af37]/70 hover:shadow-[0_0_15px_rgba(212,175,55,0.18)] transition-all select-none"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Logo */}
                          <div className="w-9 h-9 rounded-lg bg-[#18161b] border border-[#382e1e] flex items-center justify-center p-1.5 shrink-0">
                            <SmartServiceIcon
                              url={service.url}
                              name={service.name}
                              icon={service.icon}
                              customIconUrl={service.customIconUrl}
                              category={service.category}
                              className="w-5 h-5"
                            />
                          </div>

                          {/* Info */}
                          <div className="min-w-0">
                            <h4 className="text-sm font-medium text-stone-200 group-hover:text-[#f3e5ab] truncate transition-colors">
                              {service.name}
                            </h4>
                            <span className="text-xs text-[#8c734b] font-cormorant truncate block">
                              📁 {service.projectName}
                            </span>
                          </div>
                        </div>

                        <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#d4af37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
