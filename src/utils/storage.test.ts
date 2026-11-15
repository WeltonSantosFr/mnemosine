import { describe, it, expect, beforeEach } from "vitest";
import {
  getStoredProjects,
  saveStoredProjects,
  resetStoredProjects,
  parseBackupFile,
} from "./storage";
import { Project } from "@/types/project";
import { DEFAULT_PROJECTS } from "@/data/defaultProjects";

describe("Unitário: storage utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getStoredProjects", () => {
    it("deve retornar array vazio (DEFAULT_PROJECTS) quando o localStorage estiver vazio", () => {
      const projects = getStoredProjects();
      expect(projects).toEqual([]);
      expect(projects).toEqual(DEFAULT_PROJECTS);
    });

    it("deve retornar array vazio quando o localStorage contiver um array vazio explicitamente salvo", () => {
      localStorage.setItem("mnemosine_projects_v1", JSON.stringify([]));
      const projects = getStoredProjects();
      expect(projects).toEqual([]);
    });

    it("deve retornar projetos salvos quando houver dados válidos no localStorage", () => {
      const mockProjects: Project[] = [
        {
          id: "proj-1",
          name: "Projeto Teste",
          services: [],
          createdAt: "2026-01-01T00:00:00.000Z",
          updatedAt: "2026-01-01T00:00:00.000Z",
        },
      ];
      localStorage.setItem("mnemosine_projects_v1", JSON.stringify(mockProjects));

      const loaded = getStoredProjects();
      expect(loaded).toHaveLength(1);
      expect(loaded[0].name).toBe("Projeto Teste");
    });

    it("deve retornar fallback seguro (DEFAULT_PROJECTS) quando o JSON for inválido", () => {
      localStorage.setItem("mnemosine_projects_v1", "json_corrompido_<<<");
      const projects = getStoredProjects();
      expect(projects).toEqual([]);
    });
  });

  describe("saveStoredProjects", () => {
    it("deve persistir a lista de projetos em mnemosine_projects_v1", () => {
      const mockProjects: Project[] = [
        {
          id: "proj-abc",
          name: "Meu App",
          services: [],
          createdAt: "2026-01-01T00:00:00.000Z",
          updatedAt: "2026-01-01T00:00:00.000Z",
        },
      ];

      saveStoredProjects(mockProjects);
      const raw = localStorage.getItem("mnemosine_projects_v1");
      expect(raw).not.toBeNull();
      expect(JSON.parse(raw!)).toEqual(mockProjects);
    });
  });

  describe("resetStoredProjects", () => {
    it("deve remover a chave do localStorage e retornar array vazio", () => {
      localStorage.setItem("mnemosine_projects_v1", JSON.stringify([{ id: "1" }]));
      const reset = resetStoredProjects();

      expect(reset).toEqual([]);
      expect(localStorage.getItem("mnemosine_projects_v1")).toBeNull();
    });
  });

  describe("parseBackupFile", () => {
    it("deve fazer parse de backup estruturado com chave projects", () => {
      const backupJson = JSON.stringify({
        version: "1.0",
        exportedAt: "2026-01-01T00:00:00.000Z",
        projects: [{ id: "p1", name: "Backup Proj", services: [] }],
      });

      const parsed = parseBackupFile(backupJson);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].name).toBe("Backup Proj");
    });

    it("deve fazer parse quando o backup for um array direto", () => {
      const backupJson = JSON.stringify([{ id: "p2", name: "Direct Array", services: [] }]);
      const parsed = parseBackupFile(backupJson);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].name).toBe("Direct Array");
    });

    it("deve disparar erro quando o formato for inválido", () => {
      expect(() => parseBackupFile(JSON.stringify({ algo: "invalido" }))).toThrow(
        "Arquivo de backup com formato inválido."
      );
    });
  });
});
