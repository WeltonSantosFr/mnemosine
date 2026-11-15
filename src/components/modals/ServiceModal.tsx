"use client";

import React, { useState, useEffect } from "react";
import { ServiceItem, ServiceCategory, CATEGORIES_META } from "@/types/project";
import {
  KNOWN_LOGOS,
  detectServiceKey,
  detectCategory,
  renderCategoryIcon,
  SmartServiceIcon,
} from "@/utils/iconResolver";
import { X, Sparkles, Globe, Save } from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
  service?: ServiceItem | null;
  onSave: (serviceData: Omit<ServiceItem, "id">) => void;
}

export function ServiceModal({
  isOpen,
  onClose,
  projectName,
  service,
  onSave,
}: ServiceModalProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<ServiceCategory>("hosting");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (service) {
      setName(service.name);
      setUrl(service.url);
      setCategory(service.category);
      setDescription(service.description || "");
    } else {
      setName("");
      setUrl("");
      setCategory("hosting");
      setDescription("");
    }
    setError("");
  }, [service, isOpen]);

  if (!isOpen) return null;

  // Real-time detection previews
  const detectedKey = detectServiceKey(name, url);

  const handleNameOrUrlChange = (newName: string, newUrl: string) => {
    // Only auto-detect category if creating a new service
    if (!service && (newName || newUrl)) {
      const autoCat = detectCategory(newName, newUrl);
      setCategory(autoCat);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Informe o nome do serviço.");
      return;
    }
    if (!url.trim()) {
      setError("Informe o link/URL do serviço.");
      return;
    }

    const formattedUrl = url.trim().startsWith("http")
      ? url.trim()
      : `https://${url.trim()}`;

    onSave({
      name: name.trim(),
      url: formattedUrl,
      category,
      icon: detectedKey || undefined,
      description: description.trim() || undefined,
    });
    onClose();
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
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide">
                {service ? "Editar Serviço" : "Adicionar Novo Serviço"}
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-400 font-sans">
                {projectName ? `Destino: Pasta ${projectName}` : "Vincule uma ferramenta ao projeto"}
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

        {/* Live Icon Preview Banner */}
        <div className="mx-3.5 sm:mx-5 my-2 p-2.5 sm:p-3 rounded-xl bg-[#0d0c10] border border-[#2d2417] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#18161d] border border-[#3d3220] flex items-center justify-center p-2 text-[#d4af37]">
              <SmartServiceIcon
                url={url}
                name={name}
                category={category}
                className="w-6 h-6"
              />
            </div>
            <div>
              <span className="text-xs font-serif text-[#d4af37] block">
                {url
                  ? "Ícone Real Detectado Automaticamente"
                  : detectedKey
                  ? `Logo Oficial: ${detectedKey.toUpperCase()}`
                  : "Ícone Padrão da Categoria"}
              </span>
              <span className="text-[11px] text-stone-400">
                {CATEGORIES_META[category]?.label} • {CATEGORIES_META[category]?.greekTitle}
              </span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-3.5 sm:p-5 space-y-3.5 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-serif tracking-wider uppercase text-[#c5a059] mb-1.5">
                Nome do Serviço <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Vercel, Supabase, Stripe..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  handleNameOrUrlChange(e.target.value, url);
                  if (error) setError("");
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0c10] border border-[#3e3423] text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-serif tracking-wider uppercase text-[#c5a059] mb-1.5">
                Categoria / Função <span className="text-red-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0c0c10] border border-[#3e3423] text-stone-100 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 transition-all cursor-pointer"
              >
                {Object.entries(CATEGORIES_META).map(([key, meta]) => (
                  <option key={key} value={key} className="bg-[#121116] text-stone-100">
                    {meta.label} ({meta.greekTitle})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-serif tracking-wider uppercase text-[#c5a059] mb-1.5">
              Link de Acesso (URL) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-[#8c734b] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="https://exemplo.com ou dashboard.exemplo.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  handleNameOrUrlChange(name, e.target.value);
                  if (error) setError("");
                }}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0c0c10] border border-[#3e3423] text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 transition-all"
              />
            </div>
            {error && <span className="text-xs text-red-400 mt-1 block">{error}</span>}
          </div>

          <div>
            <label className="block text-xs font-serif tracking-wider uppercase text-[#c5a059] mb-1.5">
              Nota / Finalidade (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: Deploy do front-end Next.js, Banco de dados principal..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0c10] border border-[#3e3423] text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 transition-all"
            />
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
              <span>{service ? "Salvar Serviço" : "Vincular Serviço"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
