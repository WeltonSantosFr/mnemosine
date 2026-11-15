"use client";

import React from "react";
import { Project, ServiceItem } from "@/types/project";
import { ServiceCard } from "./ServiceCard";
import { Plus, ChevronUp, Globe } from "lucide-react";

interface ProjectScrollProps {
  project: Project;
  onClose?: () => void;
  onAddService: (project: Project) => void;
  onEditService: (service: ServiceItem) => void;
  onDeleteService: (serviceId: string) => void;
}

export function ProjectScroll({
  project,
  onClose,
  onAddService,
  onEditService,
  onDeleteService,
}: ProjectScrollProps) {
  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#18161b] via-[#131217] to-[#0e0e12] border-2 border-[#8c734b]/80 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.12)] p-3.5 sm:p-6 md:p-8 transition-all duration-300">
      {/* Header of the Scroll */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 pt-1 border-b border-[#382e1e]">
        <div className="min-w-0">
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-stone-100 font-semibold tracking-wider truncate">
            {project.name}
          </h2>
          {project.description && (
            <p className="text-[11px] sm:text-xs md:text-sm text-stone-400 mt-1 font-sans max-w-xl">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          {/* Add Service Button */}
          <button
            type="button"
            onClick={() => onAddService(project)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#2c2417] to-[#1e1910] border border-[#d4af37]/60 text-[#f3e5ab] text-[11px] sm:text-xs font-medium hover:border-[#d4af37] hover:shadow-[0_0_12px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Adicionar Serviço</span>
          </button>

          {/* Optional Collapse Button */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              title="Recolher pasta"
              className="p-1.5 rounded-lg border border-[#3e3423] text-stone-400 hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Service Cards Grid inside the Scroll */}
      <div className="mt-5 sm:mt-6">
        {project.services.length === 0 ? (
          <div className="py-8 sm:py-12 flex flex-col items-center justify-center text-center px-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1b1915] border border-[#483d29] flex items-center justify-center text-[#d4af37] mb-3">
              <Globe className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <p className="font-serif text-base sm:text-lg text-stone-200">
              Nenhum serviço atrelado a este projeto ainda.
            </p>
            <p className="text-[11px] sm:text-xs text-stone-400 max-w-md mt-1 mb-4">
              Adicione links de hospedagem, banco de dados, APIs ou pagamentos para ter acesso rápido com 1 clique.
            </p>
            <button
              type="button"
              onClick={() => onAddService(project)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#ebd06b] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Primeiro Serviço</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 min-[440px]:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 justify-items-center items-start">
            {project.services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onEdit={onEditService}
                onDelete={onDeleteService}
              />
            ))}

            {/* Quick Add Button: only the round container with plus inside */}
            <button
              type="button"
              onClick={() => onAddService(project)}
              title="Adicionar Novo Serviço"
              className="flex flex-col items-center justify-center group cursor-pointer select-none w-[84px] sm:w-[96px] md:w-[104px]"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-[#8c734b]/70 group-hover:border-[#d4af37] bg-[#141217]/60 group-hover:bg-[#252016] flex items-center justify-center text-[#8c734b] group-hover:text-[#d4af37] group-hover:scale-110 shadow-sm transition-all duration-200">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
