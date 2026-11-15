import { Project, MnemosineBackup } from "@/types/project";
import { DEFAULT_PROJECTS } from "@/data/defaultProjects";

const STORAGE_KEY = "mnemosine_projects_v1";

export function getStoredProjects(): Project[] {
  if (typeof window === "undefined") {
    return DEFAULT_PROJECTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_PROJECTS;
  } catch (err) {
    console.error("Falha ao carregar projetos do localStorage:", err);
    return DEFAULT_PROJECTS;
  }
}

export function saveStoredProjects(projects: Project[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error("Falha ao salvar projetos no localStorage:", err);
  }
}

export function resetStoredProjects(): Project[] {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
  }
  return DEFAULT_PROJECTS;
}

export function exportBackupFile(projects: Project[]): void {
  const backup: MnemosineBackup = {
    version: "1.0",
    exportedAt: new Date().toISOString(),
    projects,
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const dateStr = new Date().toISOString().split("T")[0];
  const a = document.createElement("a");
  a.href = url;
  a.download = `mnemosine-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseBackupFile(content: string): Project[] {
  const data = JSON.parse(content);
  if (data && Array.isArray(data.projects)) {
    return data.projects;
  }
  if (Array.isArray(data)) {
    return data;
  }
  throw new Error("Arquivo de backup com formato inválido.");
}
