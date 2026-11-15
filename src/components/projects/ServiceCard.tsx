"use client";

import React from "react";
import { ServiceItem } from "@/types/project";
import { SmartServiceIcon } from "@/utils/iconResolver";
import { ActionIconButton } from "@/components/ui/ActionIconButton";
import { motion, AnimatePresence } from "motion/react";

interface ServiceCardProps {
  service: ServiceItem;
  isOpen?: boolean;
  onEdit?: (service: ServiceItem) => void;
  onDelete?: (serviceId: string) => void;
}

export function ServiceCard({
  service,
  isOpen = true,
  onEdit,
  onDelete,
}: ServiceCardProps) {
  return (
    <div
      className={`relative flex flex-col items-center select-none w-full max-w-[84px] sm:max-w-[96px] md:max-w-[104px] transition-all duration-200 ${
        isOpen
          ? "group/service p-2 sm:p-2.5 rounded-xl hover:bg-white/[0.03]"
          : "p-0 pointer-events-none"
      }`}
    >
      {/* Clickable service: naked icon with name below */}
      <a
        href={isOpen ? service.url : undefined}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (!isOpen) return;
          e.stopPropagation();
        }}
        title={isOpen ? `Abrir ${service.name} (${service.url})` : undefined}
        className={`flex flex-col items-center w-full ${
          isOpen ? "cursor-pointer" : "cursor-default"
        }`}
      >
        {/* Naked Icon without any container border or background */}
        <SmartServiceIcon
          url={service.url}
          name={service.name}
          icon={service.icon}
          customIconUrl={service.customIconUrl}
          category={service.category}
          className={`${
            isOpen
              ? "w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 group-hover/service:scale-105"
              : "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
          } transition-transform duration-200 drop-shadow-md object-contain`}
        />

        {/* Name directly below the icon with smooth enter/exit animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 6 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] sm:text-xs md:text-sm font-medium text-stone-200 group-hover/service:text-[#f3e5ab] text-center truncate w-full tracking-wide transition-colors block overflow-hidden"
            >
              {service.name}
            </motion.span>
          )}
        </AnimatePresence>
      </a>

      {/* Discrete contextual edit/delete buttons on hover (only when THIS service is hovered) */}
      {isOpen && (
        <div className="absolute top-1 right-1 flex items-center gap-0.5 opacity-0 group-hover/service:opacity-100 transition-opacity duration-150 z-20 pointer-events-none group-hover/service:pointer-events-auto">
          {onEdit && (
            <ActionIconButton
              variant="edit"
              title="Editar Serviço"
              preventDefault
              onClick={() => onEdit(service)}
            />
          )}
          {onDelete && (
            <ActionIconButton
              variant="delete"
              title="Excluir Serviço"
              preventDefault
              onClick={() => onDelete(service.id)}
            />
          )}
        </div>
      )}
    </div>
  );
}
