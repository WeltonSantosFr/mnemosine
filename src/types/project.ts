export type ServiceCategory =
  | "hosting"
  | "database"
  | "auth"
  | "payments"
  | "email"
  | "dns"
  | "ai"
  | "analytics"
  | "storage"
  | "other";

export interface CategoryMeta {
  id: ServiceCategory;
  label: string;
  greekTitle: string;
  color: string;
}

export const CATEGORIES_META: Record<ServiceCategory, CategoryMeta> = {
  hosting: {
    id: "hosting",
    label: "Hosting & Deploy",
    greekTitle: "Altar dos Servidores",
    color: "#eab308",
  },
  database: {
    id: "database",
    label: "Banco de Dados",
    greekTitle: "Arquivo de Mnemosine",
    color: "#3b82f6",
  },
  auth: {
    id: "auth",
    label: "Autenticação",
    greekTitle: "Portões do Olimpo",
    color: "#a855f7",
  },
  payments: {
    id: "payments",
    label: "Pagamentos",
    greekTitle: "Tesouro de Delfos",
    color: "#10b981",
  },
  email: {
    id: "email",
    label: "Email & Mensagens",
    greekTitle: "Mensageiro de Hermes",
    color: "#f97316",
  },
  dns: {
    id: "dns",
    label: "DNS & Domínios",
    greekTitle: "Farol de Rodes",
    color: "#06b6d4",
  },
  ai: {
    id: "ai",
    label: "Inteligência Artificial",
    greekTitle: "Oráculo de Apolo",
    color: "#ec4899",
  },
  analytics: {
    id: "analytics",
    label: "Métricas & Logs",
    greekTitle: "Olho dos Ciclopes",
    color: "#84cc16",
  },
  storage: {
    id: "storage",
    label: "Armazenamento",
    greekTitle: "Cofres do Minotauro",
    color: "#6366f1",
  },
  other: {
    id: "other",
    label: "Outros Serviços",
    greekTitle: "Recantos do Palácio",
    color: "#d4af37",
  },
};

export interface ServiceItem {
  id: string;
  name: string;
  url: string;
  category: ServiceCategory;
  icon?: string;
  customIconUrl?: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  services: ServiceItem[];
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MnemosineBackup {
  version: string;
  exportedAt: string;
  projects: Project[];
}
