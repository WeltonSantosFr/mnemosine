"use client";

import React, { useState, useEffect } from "react";
import { useProjects } from "@/hooks/useProjects";
import { Project, ServiceItem } from "@/types/project";
import { Sidebar, ActiveTab } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { LabyrinthView } from "@/components/labyrinth/LabyrinthView";
import { CommandPalette } from "@/components/modals/CommandPalette";
import { ProjectModal } from "@/components/modals/ProjectModal";
import { ServiceModal } from "@/components/modals/ServiceModal";
import { SettingsModal } from "@/components/modals/SettingsModal";
import { GreekAmphora } from "@/components/ui/GreekIllustrations";
import { LabyrinthIcon } from "@/components/ui/LabyrinthIcon";
import { FolderPlus, Sparkles, Plus, Menu, Folder, Search } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";

export default function MnemosineDashboard() {
  const {
    projects,
    isLoaded,
    activeProjectId,
    setActiveProjectId,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
    restoreDefaults,
    exportBackup,
    importBackup,
  } = useProjects();

  // Navigation and view state
  const [activeTab, setActiveTab] = useState<ActiveTab>("projects");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [targetProjectForService, setTargetProjectForService] = useState<Project | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Global keyboard shortcut for Command Palette (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter projects by search term if active
  const filteredProjects = projects.filter((p) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const matchProj = p.name.toLowerCase().includes(term);
    const matchService = p.services.some((s) =>
      s.name.toLowerCase().includes(term)
    );
    return matchProj || matchService;
  });

  // Handlers for Project CRUD
  const handleOpenNewProject = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (name: string) => {
    if (editingProject) {
      updateProject(editingProject.id, name);
    } else {
      addProject(name);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    if (
      window.confirm(
        "Deseja realmente remover esta pasta de projeto e todos os seus serviços?"
      )
    ) {
      deleteProject(projectId);
    }
  };

  // Handlers for Service CRUD
  const handleOpenAddService = (project: Project) => {
    setTargetProjectForService(project);
    setEditingService(null);
    setIsServiceModalOpen(true);
  };

  const handleEditService = (service: ServiceItem, project?: Project) => {
    const target = project || projects.find((p) => p.services.some((s) => s.id === service.id));
    if (!target) return;
    setTargetProjectForService(target);
    setEditingService(service);
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (serviceData: Omit<ServiceItem, "id">) => {
    if (!targetProjectForService) return;

    if (editingService) {
      updateService(
        targetProjectForService.id,
        editingService.id,
        serviceData
      );
    } else {
      addService(targetProjectForService.id, serviceData);
    }
  };

  const handleDeleteService = (serviceId: string, projectId?: string) => {
    const targetProjId = projectId || projects.find((p) => p.services.some((s) => s.id === serviceId))?.id;
    if (!targetProjId) return;
    if (window.confirm("Deseja remover este serviço do projeto?")) {
      deleteService(targetProjId, serviceId);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0a090d] flex items-center justify-center text-[#d4af37]">
        <div className="flex flex-col items-center gap-3">
          <GreekAmphora className="w-12 h-16 animate-bounce text-[#d4af37]" />
          <span className="font-serif tracking-widest text-sm uppercase">
            Invocando o Palácio da Memória...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0c0b0f] via-[#09080c] to-[#060508] text-stone-100 relative overflow-x-hidden">
      {/* Classical Goddess (Mnemosine) Artwork in Bottom-Right Corner */}
      <div
        className="fixed bottom-0 right-0 pointer-events-none select-none z-0 overflow-hidden flex items-end justify-end"
        aria-hidden="true"
      >
        <img
          src="/images/mnemosine-bg.jpg"
          alt=""
          className="h-[40vh] lg:h-[50vh] w-auto object-contain object-bottom object-right mix-blend-screen opacity-70 transition-opacity duration-500"
        />
      </div>

      {/* Desktop Navigation Sidebar (visible on lg+) */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === "settings") {
              setIsSettingsModalOpen(true);
            }
          }}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          projectCount={projects.length}
        />
      </div>

      {/* Mobile Drawer Navigation (visible on <lg when toggled) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Off-canvas sidebar */}
          <div className="relative w-72 max-w-[85vw] h-full z-10 shadow-2xl animate-fade-in flex flex-col">
            <Sidebar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                if (tab === "settings") {
                  setIsSettingsModalOpen(true);
                }
              }}
              onOpenSettings={() => setIsSettingsModalOpen(true)}
              projectCount={projects.length}
              onCloseMobile={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <Header
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          onLogoClick={() => {
            setActiveTab("projects");
            setActiveProjectId(null);
          }}
        />

        <main className="flex-1 p-3 sm:p-6 md:p-8 pb-24 lg:pb-8 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8">
          {/* Active View: "O Labirinto" */}
          {activeTab === "labyrinth" && (
            <LabyrinthView projects={projects} />
          )}

          {/* Active View: "Projetos" Dashboard */}
          {activeTab === "projects" && (
            <div className="space-y-6 sm:space-y-8">
              {/* Top View Header */}
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-stone-100 flex items-center gap-2 sm:gap-3">
                  Projetos
                </h1>
                <p className="text-[11px] sm:text-xs md:text-sm text-stone-400 font-sans mt-0.5 sm:mt-1">
                  Selecione uma pasta para abrir seus serviços ou adicione novos projetos ao seu palácio.
                </p>
              </div>

              {/* If no projects exist */}
              {projects.length === 0 ? (
                <div className="py-20 rounded-2xl bg-[#131218]/80 border-2 border-dashed border-[#3e3423] flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#1e1a14] border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] mb-4">
                    <FolderPlus className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-200">
                    Nenhum projeto cadastrado
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 max-w-md mt-1 mb-6">
                    Crie sua primeira pasta de projeto ou restaure os dados demonstrativos nas configurações.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleOpenNewProject}
                      className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#ebce67] transition-all"
                    >
                      Criar Primeira Pasta
                    </button>
                    <button
                      type="button"
                      onClick={restoreDefaults}
                      className="px-5 py-2.5 rounded-xl bg-[#18161d] border border-[#3e3423] text-stone-300 text-xs hover:border-[#d4af37]/60 transition-all"
                    >
                      Restaurar Projetos Padrão
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 sm:space-y-8">
                  {/* Folders Grid: 2 columns on mobile, 4 columns on desktop */}
                  <div>
                    <div className="flex items-center justify-between mb-3 px-0.5">
                      <span className="text-xs font-serif uppercase tracking-widest text-[#8c734b] font-semibold">
                        Pastas de Projetos
                      </span>
                    </div>

                    <LayoutGroup id="projects-grid">
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 [grid-auto-flow:dense] gap-3.5 sm:gap-4 md:gap-5">
                        {filteredProjects.map((project) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            isActive={project.id === activeProjectId}
                            onSelect={() => {
                              setActiveProjectId((prev) => (prev === project.id ? null : project.id));
                            }}
                            onClose={() => setActiveProjectId(null)}
                            onEdit={handleEditProject}
                            onDelete={handleDeleteProject}
                            onAddService={handleOpenAddService}
                            onEditService={(service) => handleEditService(service, project)}
                            onDeleteService={(serviceId) => handleDeleteService(serviceId, project.id)}
                          />
                        ))}

                        {/* Square "+ Nova Pasta" Card (Same sizing and geometry as ProjectCard) */}
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
                          onClick={handleOpenNewProject}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleOpenNewProject();
                            }
                          }}
                          className="group col-span-1 w-full aspect-square rounded-2xl border-2 border-dashed border-[#3e3423] hover:border-[#d4af37] bg-transparent hover:shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center gap-2.5 text-[#8c734b] hover:text-[#d4af37] transition-all duration-300 cursor-pointer p-3.5 sm:p-4 select-none relative overflow-hidden"
                        >
                          {/* Hover Center-Radiating Light Overlay */}
                          <div
                            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 overflow-hidden"
                            style={{
                              background:
                                "radial-gradient(ellipse 95% 95% at 50% 50%, rgba(212, 175, 55, 0.035) 0%, rgba(212, 175, 55, 0.01) 50%, transparent 80%), radial-gradient(ellipse at 50% 50%, rgba(28, 25, 34, 0.7) 0%, rgba(22, 19, 27, 0.55) 55%, rgba(14, 13, 17, 0.4) 100%)",
                            }}
                          />

                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1c1914] border border-[#4a3e29] group-hover:border-[#d4af37] flex items-center justify-center transition-colors relative z-10">
                            <Plus className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-serif tracking-wider font-medium text-center relative z-10">
                            Nova Pasta
                          </span>
                        </motion.div>
                      </div>
                    </LayoutGroup>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (< lg) */}
      <nav
        aria-label="Navegação rápida mobile"
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0c0b10]/95 backdrop-blur-md border-t border-[#3e3423] px-2 py-1.5 flex items-center justify-around shadow-2xl select-none"
      >
        <button
          type="button"
          onClick={() => setActiveTab("projects")}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-xs font-serif transition-colors ${
            activeTab === "projects"
              ? "text-[#d4af37] font-semibold"
              : "text-stone-400 hover:text-stone-200"
          }`}
        >
          <Folder className="w-5 h-5" />
          <span className="text-[10px] tracking-wider">Projetos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("labyrinth")}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-xs font-serif transition-colors ${
            activeTab === "labyrinth"
              ? "text-[#d4af37] font-semibold"
              : "text-stone-400 hover:text-stone-200"
          }`}
        >
          <LabyrinthIcon className="w-5 h-5" />
          <span className="text-[10px] tracking-wider">O Labirinto</span>
        </button>

        <button
          type="button"
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-xs font-serif text-stone-400 hover:text-[#d4af37] transition-colors"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] tracking-wider">Buscar</span>
        </button>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-xs font-serif text-stone-400 hover:text-[#d4af37] transition-colors"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] tracking-wider">Menu</span>
        </button>
      </nav>

      {/* Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        projects={projects}
        onSelectProject={(id) => {
          setActiveProjectId(id);
          setActiveTab("projects");
        }}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
        project={editingProject}
        onSave={handleSaveProject}
      />

      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => {
          setIsServiceModalOpen(false);
          setEditingService(null);
          setTargetProjectForService(null);
        }}
        projectName={targetProjectForService?.name}
        service={editingService}
        onSave={handleSaveService}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => {
          setIsSettingsModalOpen(false);
          if (activeTab === "settings") {
            setActiveTab("projects");
          }
        }}
        projects={projects}
        onExport={exportBackup}
        onImport={importBackup}
        onReset={restoreDefaults}
      />
    </div>
  );
}
