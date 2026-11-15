"use client";

import React from "react";
import { Project, ServiceItem } from "@/types/project";
import { ServiceCard } from "./ServiceCard";
import { Plus } from "lucide-react";
import { ActionIconButton } from "@/components/ui/ActionIconButton";
import { motion, AnimatePresence } from "motion/react";

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onSelect: () => void;
  onClose?: () => void;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
  onAddService?: (project: Project) => void;
  onEditService?: (service: ServiceItem) => void;
  onDeleteService?: (serviceId: string) => void;
}

/**
 * Retorna as classes de coluna (col-span) para a pasta aberta de acordo com a quantidade
 * de itens internos (serviços + botão de adicionar) e o breakpoint da tela:
 * - Mobile (< md, 2 colunas): ocupa col-span-2 (todas as colunas).
 * - Meio termo (md:, 3 colunas): até 8 itens (2 linhas x 4) fica em 2 colunas;
 *   se precisar de uma 3ª linha (> 8 itens), cresce horizontalmente para col-span-3.
 * - Desktop (xl:, 4 colunas): até 8 itens ocupa 2 colunas; 9-12 itens ocupa 3 colunas;
 *   > 12 itens ocupa todas as 4 colunas (col-span-4).
 * A 3ª linha vertical só é criada se todas as colunas horizontais disponíveis já estiverem ocupadas.
 */
function getFolderColSpanClass(totalItems: number): string {
  const mobileSpan = "col-span-2";
  const mdSpan = totalItems > 8 ? "md:col-span-3" : "md:col-span-2";

  let xlSpan = "xl:col-span-2";
  if (totalItems > 12) {
    xlSpan = "xl:col-span-4";
  } else if (totalItems > 8) {
    xlSpan = "xl:col-span-3";
  }

  return `${mobileSpan} ${mdSpan} ${xlSpan}`;
}

/**
 * Retorna o número de colunas da grade interna de serviços para manter
 * proporção harmoniosa de ~2 serviços por coluna de largura do card pai:
 * - 2 colunas pai -> 4 colunas internas
 * - 3 colunas pai -> 6 colunas internas
 * - 4 colunas pai -> 8 colunas internas
 */
function getInnerGridCols(totalItems: number): string {
  const mobileCols = "grid-cols-4";
  const mdCols = totalItems > 8 ? "md:grid-cols-6" : "md:grid-cols-4";

  let xlCols = "xl:grid-cols-4";
  if (totalItems > 12) {
    xlCols = "xl:grid-cols-8";
  } else if (totalItems > 8) {
    xlCols = "xl:grid-cols-6";
  }

  return `${mobileCols} ${mdCols} ${xlCols}`;
}

export function ProjectCard({
  project,
  isActive,
  onSelect,
  onClose,
  onEdit,
  onDelete,
  onAddService,
  onEditService,
  onDeleteService,
}: ProjectCardProps) {
  const extraCount = Math.max(0, project.services.length - 3);
  const totalItems = project.services.length + 1; // serviços + botão de adicionar

  return (
    <motion.div
      layout
      transition={{
        layout: {
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      role="button"
      tabIndex={0}
      onClick={isActive ? () => onClose?.() : onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (isActive) {
            onClose?.();
          } else {
            onSelect();
          }
        } else if (e.key === "Escape" && isActive) {
          e.preventDefault();
          onClose?.();
        }
      }}
      className={`w-full relative group select-none flex flex-col justify-between cursor-pointer text-left transition-colors duration-300 ${
        isActive
          ? `${getFolderColSpanClass(totalItems)} rounded-2xl border-2 border-[#d4af37] bg-gradient-to-b from-[#1c181f] via-[#141217] to-[#0e0d12] shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.22)] p-3.5 sm:p-4 min-h-[185px] sm:min-h-[200px]`
          : "col-span-1 aspect-square rounded-2xl border border-[#352c1e] hover:border-[#8c734b] bg-transparent hover:shadow-[0_4px_20px_rgba(0,0,0,0.6)] p-3.5 sm:p-4"
      }`}
    >
      {/* Hover Center-Radiating Light Overlay (Visible only on closed folder hover) */}
      {!isActive && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 95% 95% at 50% 50%, rgba(212, 175, 55, 0.035) 0%, rgba(212, 175, 55, 0.01) 50%, transparent 80%), radial-gradient(ellipse at 50% 50%, rgba(28, 25, 34, 0.7) 0%, rgba(22, 19, 27, 0.55) 55%, rgba(14, 13, 17, 0.4) 100%)",
          }}
        />
      )}

      {/* Header of Folder */}
      <div className="flex items-center justify-between gap-3 w-full relative z-10">
        <motion.h3
          layout="position"
          className={`font-cormorant text-base sm:text-lg font-semibold text-stone-100 tracking-wide truncate min-w-0 flex-1 ${
            !isActive ? "group-hover:text-[#f3e5ab] pr-6" : ""
          }`}
        >
          {project.name}
        </motion.h3>

        <AnimatePresence>
          {isActive && (
            /* Active Folder Actions: Edit, Delete, Close (Always visible in open folder) */
            <motion.div
              key="active-actions"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center gap-1.5 shrink-0"
            >
              {onEdit && (
                <ActionIconButton
                  variant="edit"
                  title="Editar Pasta"
                  onClick={() => onEdit(project)}
                />
              )}
              {onDelete && (
                <ActionIconButton
                  variant="delete"
                  title="Excluir Pasta"
                  onClick={() => onDelete(project.id)}
                />
              )}
              {onClose && (
                <ActionIconButton
                  variant="close"
                  title="Fechar Pasta"
                  onClick={() => onClose()}
                  className="ml-0.5"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Closed Folder Actions on Hover (Hidden by default, visible ONLY on hover of the card) */}
      {!isActive && (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none group-hover:pointer-events-auto">
          {onEdit && (
            <ActionIconButton
              variant="edit"
              title="Editar Pasta"
              onClick={() => onEdit(project)}
            />
          )}
          {onDelete && (
            <ActionIconButton
              variant="delete"
              title="Excluir Pasta"
              onClick={() => onDelete(project.id)}
            />
          )}
        </div>
      )}

      {/* Services Unified Grid */}
      {project.services.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-2 relative z-10">
          {isActive ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddService?.(project);
                }}
                title="Adicionar Primeiro Serviço"
                className="flex items-center justify-center cursor-pointer select-none"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-[#8c734b]/70 hover:border-[#d4af37] bg-[#141217]/60 hover:bg-[#252016] flex items-center justify-center text-[#8c734b] hover:text-[#d4af37] hover:scale-110 shadow-sm transition-all duration-200">
                  <Plus className="w-6 h-6" />
                </div>
              </button>
              <span className="text-[11px] text-stone-400 font-sans">
                Adicionar serviço
              </span>
            </motion.div>
          ) : (
            <span className="text-[11px] text-stone-500 italic">Vazia</span>
          )}
        </div>
      ) : (
        <motion.div
          layout
          transition={{ layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
          className={`grid flex-1 items-center justify-items-center w-full py-1 relative z-10 ${
            isActive
              ? `${getInnerGridCols(totalItems)} gap-1.5 sm:gap-2 md:gap-2.5`
              : "grid-cols-2 grid-rows-2 gap-[4px]"
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {/* The visible services (in closed state: first 3; in open state: all) */}
            {(isActive ? project.services : project.services.slice(0, 3)).map(
              (service, index) => {
                const isFirstThree = index < 3;
                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={
                      isFirstThree
                        ? false
                        : { opacity: 0, scale: 0.2, y: 12 }
                    }
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.2,
                      y: 10,
                      transition: {
                        duration: 0.25,
                        ease: [0.16, 1, 0.3, 1],
                        delay: Math.max(
                          0,
                          (project.services.length - index) * 0.03
                        ),
                      },
                    }}
                    transition={{
                      layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                      opacity: {
                        duration: 0.35,
                        delay: isFirstThree
                          ? 0
                          : 0.12 + (index - 2) * 0.05,
                      },
                      scale: {
                        duration: 0.35,
                        delay: isFirstThree
                          ? 0
                          : 0.12 + (index - 2) * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      },
                      y: {
                        duration: 0.35,
                        delay: isFirstThree
                          ? 0
                          : 0.12 + (index - 2) * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }}
                    className="w-full flex justify-center items-center"
                  >
                    <ServiceCard
                      service={service}
                      isOpen={isActive}
                      onEdit={onEditService}
                      onDelete={onDeleteService}
                    />
                  </motion.div>
                );
              }
            )}

            {/* Extra Count (+N) for Closed Folder in slot 4 */}
            {!isActive && extraCount > 0 && (
              <motion.div
                key="extra-count"
                layout
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.2,
                  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={{
                  layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.3, delay: 0.18 },
                  scale: {
                    duration: 0.3,
                    delay: 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                className="flex items-center justify-center w-full h-full"
              >
                <span className="text-base sm:text-lg md:text-xl font-mono font-bold text-[#d4af37]">
                  +{extraCount}
                </span>
              </motion.div>
            )}

            {/* Quick Add Button for Active Folder */}
            {isActive && (
              <motion.div
                key="add-service-btn"
                layout
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.2,
                  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={{
                  layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                  opacity: {
                    duration: 0.35,
                    delay: 0.16 + project.services.length * 0.04,
                  },
                  scale: {
                    duration: 0.35,
                    delay: 0.16 + project.services.length * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                className="w-full flex justify-center items-center"
              >
                <div className="flex flex-col items-center justify-center p-2 sm:p-2.5 w-full max-w-[84px] sm:max-w-[96px] md:max-w-[104px]">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddService?.(project);
                    }}
                    title="Adicionar Novo Serviço"
                    className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full border-2 border-dashed border-[#8c734b]/70 hover:border-[#d4af37] bg-[#141217]/60 hover:bg-[#252016] flex items-center justify-center text-[#8c734b] hover:text-[#d4af37] hover:scale-105 shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <span className="text-[11px] sm:text-xs text-stone-400 font-sans mt-1.5 opacity-0 pointer-events-none select-none">
                    Adicionar
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}
