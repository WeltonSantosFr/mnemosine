"use client";

import { useState, useEffect, useCallback } from "react";
import { Project, ServiceItem } from "@/types/project";
import {
  getStoredProjects,
  saveStoredProjects,
  resetStoredProjects,
  exportBackupFile,
  parseBackupFile,
} from "@/utils/storage";

import { DEFAULT_PROJECTS } from "@/data/defaultProjects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [isLoaded, setIsLoaded] = useState(true);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  useEffect(() => {
    const loaded = getStoredProjects();
    setProjects(loaded);
  }, []);

  const updateStateAndStorage = useCallback((updater: (prev: Project[]) => Project[]) => {
    setProjects((prev) => {
      const next = updater(prev);
      saveStoredProjects(next);
      return next;
    });
  }, []);

  const addProject = useCallback(
    (name: string, description?: string) => {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        name: name.trim(),
        description: description?.trim(),
        services: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updateStateAndStorage((prev) => [newProj, ...prev]);
      setActiveProjectId(newProj.id);
      return newProj;
    },
    [updateStateAndStorage]
  );

  const updateProject = useCallback(
    (id: string, name: string, description?: string) => {
      updateStateAndStorage((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                name: name.trim(),
                description: description?.trim(),
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
    },
    [updateStateAndStorage]
  );

  const deleteProject = useCallback(
    (id: string) => {
      updateStateAndStorage((prev) => {
        const filtered = prev.filter((p) => p.id !== id);
        if (activeProjectId === id) {
          setActiveProjectId(filtered.length > 0 ? filtered[0].id : null);
        }
        return filtered;
      });
    },
    [activeProjectId, updateStateAndStorage]
  );

  const addService = useCallback(
    (projectId: string, serviceData: Omit<ServiceItem, "id">) => {
      const newService: ServiceItem = {
        ...serviceData,
        id: `srv-${Date.now()}`,
      };

      updateStateAndStorage((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p;
          return {
            ...p,
            services: [...p.services, newService],
            updatedAt: new Date().toISOString(),
          };
        })
      );
      return newService;
    },
    [updateStateAndStorage]
  );

  const updateService = useCallback(
    (
      projectId: string,
      serviceId: string,
      serviceData: Partial<Omit<ServiceItem, "id">>
    ) => {
      updateStateAndStorage((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p;
          return {
            ...p,
            services: p.services.map((s) =>
              s.id === serviceId ? { ...s, ...serviceData } : s
            ),
            updatedAt: new Date().toISOString(),
          };
        })
      );
    },
    [updateStateAndStorage]
  );

  const deleteService = useCallback(
    (projectId: string, serviceId: string) => {
      updateStateAndStorage((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p;
          return {
            ...p,
            services: p.services.filter((s) => s.id !== serviceId),
            updatedAt: new Date().toISOString(),
          };
        })
      );
    },
    [updateStateAndStorage]
  );

  const restoreDefaults = useCallback(() => {
    const defaults = resetStoredProjects();
    setProjects(defaults);
    setActiveProjectId(defaults.length > 0 ? defaults[0].id : null);
  }, []);

  const exportBackup = useCallback(() => {
    exportBackupFile(projects);
  }, [projects]);

  const importBackup = useCallback(
    (jsonContent: string) => {
      const imported = parseBackupFile(jsonContent);
      saveStoredProjects(imported);
      setProjects(imported);
      if (imported.length > 0) {
        setActiveProjectId(imported[0].id);
      }
    },
    []
  );

  return {
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
  };
}
