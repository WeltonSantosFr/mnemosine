"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { X, FolderPlus, Save } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
  onSave: (name: string, description?: string) => void;
}

export function ProjectModal({
  isOpen,
  onClose,
  project,
  onSave,
}: ProjectModalProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name);
    } else {
      setName("");
    }
    setError("");
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Por favor, informe o nome do projeto.");
      return;
    }
    onSave(name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-[#151419] border-2 border-[#8c734b] shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-[#332819]">
          <div className="flex items-center gap-2 text-stone-100">
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#241d13] text-[#d4af37] border border-[#483d29]">
              <FolderPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide">
                {project ? "Editar Pasta de Projeto" : "Nova Pasta de Projeto"}
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-400 font-sans">
                {project ? "Atualize as informações do projeto" : "Organize seus serviços sob um mesmo teto"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-[#201d26] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="border-b border-[#282218]" />

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-3.5 sm:p-5 space-y-3.5 sm:space-y-4">
          <div>
            <label className="block text-xs font-serif tracking-wider uppercase text-[#c5a059] mb-1.5">
              Nome do Projeto <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Infraestrutura, Web Apps, Ferramentas..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0c10] border border-[#3e3423] text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 transition-all"
            />
            {error && <span className="text-xs text-red-400 mt-1 block">{error}</span>}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#292014]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-stone-200 hover:bg-[#1f1d24] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c59f2d] text-black font-semibold text-xs hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{project ? "Salvar Alterações" : "Criar Pasta"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
