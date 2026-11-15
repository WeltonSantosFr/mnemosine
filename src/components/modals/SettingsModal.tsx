"use client";

import React, { useRef, useState } from "react";
import { Project } from "@/types/project";
import { GreekAmphora } from "@/components/ui/GreekIllustrations";
import {
  X,
  Settings,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onExport: () => void;
  onImport: (content: string) => void;
  onReset: () => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  projects,
  onExport,
  onImport,
  onReset,
}: SettingsModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const totalServices = projects.reduce((acc, p) => acc + p.services.length, 0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        onImport(text);
        setSuccessMsg("Backup restaurado com sucesso no Palácio da Memória!");
        setErrorMsg("");
      } catch (err: unknown) {
        setErrorMsg(err instanceof Error ? err.message : "Erro ao ler o arquivo JSON.");
        setSuccessMsg("");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleResetConfirm = () => {
    if (
      window.confirm(
        "Tem certeza que deseja restaurar os projetos padrão (Maestrum, Nipponic, Dragon Studio)? Suas alterações personalizadas não exportadas serão substituídas."
      )
    ) {
      onReset();
      setSuccessMsg("Projetos restaurados para os valores padrão com sucesso!");
      setErrorMsg("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-[#151419] border-2 border-[#8c734b] shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-[#332819]">
          <div className="flex items-center gap-2 text-stone-100">
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#241d13] text-[#d4af37] border border-[#483d29]">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide">
                Configurações & Backup
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-400 font-sans">
                Mnemosine • O Palácio da Memória
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

        {/* Content */}
        <div className="p-3.5 sm:p-5 space-y-4 sm:space-y-5">
          {/* Messages */}
          {successMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#0e0d11] border border-[#2e2518]">
            <div className="text-center border-r border-[#241d13]">
              <span className="text-2xl font-serif text-[#d4af37] font-bold">
                {projects.length}
              </span>
              <span className="block text-[11px] text-stone-400 uppercase tracking-wider font-mono">
                Projetos
              </span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-serif text-[#d4af37] font-bold">
                {totalServices}
              </span>
              <span className="block text-[11px] text-stone-400 uppercase tracking-wider font-mono">
                Serviços Vinculados
              </span>
            </div>
          </div>

          {/* Backup & Restore section */}
          <div>
            <h4 className="font-serif text-sm text-[#f3e5ab] font-semibold mb-2 flex items-center gap-2">
              <span>🏺</span> Gestão de Memória & Dados (JSON)
            </h4>
            <p className="text-xs text-stone-400 mb-3 font-sans">
              Como este aplicativo funciona 100% no navegador via LocalStorage, você pode exportar um arquivo de backup para transferir entre dispositivos ou salvar em segurança.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Export Button */}
              <button
                type="button"
                onClick={onExport}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#1b1915] border border-[#d4af37]/60 text-[#f3e5ab] text-xs font-medium hover:border-[#d4af37] hover:bg-[#252019] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#d4af37]" />
                <span>Exportar Backup JSON</span>
              </button>

              {/* Import Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#1b1915] border border-[#3e3423] text-stone-300 text-xs font-medium hover:border-[#8c734b] hover:bg-[#201d26] transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4 text-[#8c734b]" />
                <span>Importar Backup JSON</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          {/* Reset section */}
          <div className="pt-3 border-t border-[#292014]">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-xs font-serif text-stone-200 font-semibold">
                  Restaurar Padrão de Fábrica
                </h5>
                <p className="text-[11px] text-stone-500">
                  Restaura os dados originais (Maestrum, Nipponic, Dragon Studio).
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetConfirm}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-950/40 hover:border-red-500 transition-colors text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar</span>
              </button>
            </div>
          </div>

          {/* Classical footer attribution */}
          <div className="p-3 rounded-xl bg-[#0f0e13] border border-[#2a2217] flex items-center gap-3">
            <GreekAmphora className="w-7 h-10 text-[#d4af37]/60 shrink-0" />
            <div className="text-[11px] text-stone-400">
              <span className="font-serif text-[#d4af37] font-semibold block">
                Mnemosine (Μνημοσύνη)
              </span>
              Deusa da memória e da lembrança na mitologia grega, mãe das Musas. Mantenha seus recursos memorizados com clareza.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
