import React from "react";
import {
  Globe,
  Server,
  Database,
  CreditCard,
  Mail,
  Shield,
  Layers,
  Cpu,
  Terminal,
  Cloud,
} from "lucide-react";
import { ServiceCategory } from "@/types/project";

export function extractDomain(url: string): string {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    return parsed.hostname;
  } catch {
    return "";
  }
}

export function getFaviconUrl(url: string): string {
  const domain = extractDomain(url);
  if (!domain) return "";
  const full = url.startsWith("http") ? url : `https://${url}`;
  return `/api/icon?url=${encodeURIComponent(full)}`;
}

export function getExternalFaviconFallback(url: string): string {
  const domain = extractDomain(url);
  if (!domain) return "";
  return `https://unavatar.io/${domain}?fallback=https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${domain}&size=128`;
}

// Built-in tech SVGs with authentic official brand logos and original colors
export const KNOWN_LOGOS: Record<string, (className?: string) => React.ReactNode> = {
  vercel: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 1155 1000" fill="none">
      <path d="m577.3 0 577.4 1000H0z" fill="#FFFFFF" />
    </svg>
  ),
  render: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 21 21" fill="none">
      <path
        d="M15.65.006a5.137 5.137 0 0 0-5.321 4.367c-.016.119-.039.233-.058.348-.597 3.182-3.381 5.59-6.725 5.59a6.8 6.8 0 0 1-3.287-.84.174.174 0 0 0-.259.153v10.998h10.268v-7.733a2.573 2.573 0 0 1 2.567-2.577H15.4c2.906 0 5.245-2.42 5.13-5.365C20.43 2.297 18.289.132 15.65.006"
        fill="#46E3B7"
      />
    </svg>
  ),
  supabase: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="supa-grad" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#249361" />
          <stop offset="100%" stopColor="#3ECF8E" />
        </linearGradient>
      </defs>
      <path
        d="M21.362 9.873a1.666 1.666 0 0 0-1.283-.605h-6.477l2.67-8.267A1.198 1.198 0 0 0 16.02.27a1.153 1.153 0 0 0-1.19-.241L2.83 4.2a1.666 1.666 0 0 0-1.142 1.604c.005.626.36 1.192.946 1.483l7.24 3.63-7.98 11.18a1.198 1.198 0 0 0 .252 1.23 1.153 1.153 0 0 0 1.19.242l12-4.17a1.666 1.666 0 0 0 1.142-1.604 1.666 1.666 0 0 0-.946-1.483l-7.24-3.63 11.08-2.262c.594-.12.989-.647.989-1.277z"
        fill="url(#supa-grad)"
      />
    </svg>
  ),
  resend: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#000000" stroke="#333338" strokeWidth="1" />
      <path d="M4 6.5h16L12 13 4 6.5z" fill="#FFFFFF" />
      <path d="M4 8.5v9h16v-9L12 15 4 8.5z" fill="#D4D4D8" />
    </svg>
  ),
  cloudns: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
        fill="#0077FF"
      />
      <path
        d="M12 9l-3.5 3.5h2.2V16h2.6v-3.5h2.2L12 9z"
        fill="#FF7A00"
      />
    </svg>
  ),
  stripe: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#635BFF" />
      <path
        d="M19.5 13.8c-1.8-.7-2.8-1.2-2.8-2 0-.7.6-1.1 1.6-1.1 1.9 0 3.8.7 5.1 1.4l.7-4.6c-1.6-.7-3.7-1.1-6.1-1.1-5.1 0-8.6 2.6-8.6 6.9 0 5 4.6 5.9 6.9 6.7 2.1.8 2.8 1.4 2.8 2.2 0 .8-.7 1.3-1.9 1.3-1.9 0-4.4-.9-6-1.8l-.8 4.6c1.8.9 4.5 1.3 6.8 1.3 5.4 0 9-2.5 9-7 0-5.1-4.7-6.1-7.7-6.9z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  github: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 24 24" fill="#FFFFFF">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  cloudflare: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M18.8 9.5a5.5 5.5 0 0 0-10.7-1.4A4.5 4.5 0 0 0 4 12.5a4.4 4.4 0 0 0 .3 1.6A3.5 3.5 0 0 0 6.5 19h12a4.5 4.5 0 0 0 .3-9.5z"
        fill="#F38020"
      />
      <path
        d="M19.3 14.2c-.1-.4-.4-.7-.8-.8l-7.7-1.2c-.3 0-.5.2-.6.4l-.8 2.6c-.1.3.1.6.4.7l7.7 1.2c.4.1.8-.2.9-.6l.9-2.3z"
        fill="#FAAD3F"
      />
    </svg>
  ),
  aws: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#232F3E" />
      <path
        d="M10.2 14.5c0-.8.6-1.3 1.6-1.3.9 0 2 .4 2.8.9l.7-2.1c-.9-.5-2.2-.8-3.5-.8-2.7 0-4.4 1.4-4.4 3.5 0 2.9 2.7 3.3 3.9 3.8 1.1.4 1.5.8 1.5 1.3 0 .7-.6 1-1.6 1-1.3 0-2.6-.6-3.4-1.2l-.7 2.1c1 .7 2.6 1.1 4.1 1.1 2.8 0 4.5-1.4 4.5-3.6 0-2.8-2.6-3.3-4-3.8-.9-.3-1.5-.6-1.5-1zM23.8 11.2l-2.8 7.5-2.2-7.5h-2.3l-2.2 7.5-2.7-7.5H9.2l3.8 10.6h2.2l2.2-6.8 2.2 6.8h2.2l3.9-10.6h-2.1z"
        fill="#FFFFFF"
      />
      <path
        d="M8.5 24.2c4.1 2.4 9.8 1.2 13.9-1.2.3-.2.1-.5-.2-.4-3.7 1.2-8.6 1.5-12.2-.3-.3-.2-.6.2-.5.5zm14.5-.7c.3-.4.8-1.5.4-1.9-.3-.3-1.4.1-1.8.3-.1.1-.1.2 0 .3.4.2 1.1 1.1 1.4 1.3z"
        fill="#FF9900"
      />
    </svg>
  ),
  firebase: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M4.6 17.8L6.8 4.2c.1-.5.7-.7 1-.3l2.8 4.8-5 9.1z" fill="#FFA000" />
      <path d="M19.4 16.3L16.2 3.4c-.2-.5-.9-.5-1.1 0L12 9.5l3.5 6.4 3.9.4z" fill="#F57C00" />
      <path d="M3.8 19.3l7.4 4.2c.5.3 1.1.3 1.6 0l7.4-4.2-4.1-7.7-12.3 7.7z" fill="#FFCA28" />
    </svg>
  ),
  figma: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M8 2a4 4 0 0 0-4 4 4 4 0 0 0 4 4h4V2H8z" fill="#F24E1E" />
      <path d="M16 2h-4v8h4a4 4 0 0 0 0-8z" fill="#FF7262" />
      <path d="M8 10a4 4 0 0 0-4 4 4 4 0 0 0 4 4h4v-8H8z" fill="#A259FF" />
      <path d="M16 10h-4v8a4 4 0 1 0 4-4 4 4 0 0 0 0-4z" fill="#1ABCFE" />
      <path d="M8 18a4 4 0 1 0 4 4v-4H8z" fill="#0ACF83" />
    </svg>
  ),
  docker: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 24 24" fill="#2496ED">
      <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186zm0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185zm-2.929 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.119a.186.186 0 0 0-.186.186v1.888c0 .102.084.185.186.185zm-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.119a.186.186 0 0 0-.186.186v1.888c0 .102.084.185.186.185zm-2.929 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.185-.186h-2.12a.185.185 0 0 0-.184.186v1.888c0 .102.083.185.185.185M23.76 9.89c-.365-.236-1.53-.37-2.736-.087-.139-.81-.74-1.428-1.503-1.636l-.37-.099-.215.321c-.488.73-1.076 1.423-1.745 2.052h-.566v.894h4.721c.54 0 1.05.215 1.436.602.387.387.602.896.602 1.436 0 2.45-1.993 4.443-4.443 4.443H7.07c-2.45 0-4.443-1.993-4.443-4.443 0-.495.083-.98.243-1.436H.482A.482.482 0 0 0 0 14.443c0 4.195 3.413 7.608 7.608 7.608h11.233c4.195 0 7.608-3.413 7.608-7.608 0-1.758-.598-3.376-1.606-4.664z" />
    </svg>
  ),
  postgresql: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 24 24" fill="#336791">
      <path d="M11.667 0C5.223 0 0 5.223 0 11.667c0 4.44 2.476 8.3 6.136 10.27l1.378-2.67A8.608 8.608 0 0 1 3.043 11.667C3.043 6.903 6.903 3.043 11.667 3.043s8.624 3.86 8.624 8.624c0 3.02-1.56 5.68-3.924 7.227l1.464 2.67c3.42-2.073 5.503-5.74 5.503-9.897C23.333 5.223 18.11 0 11.667 0z" />
    </svg>
  ),
  redis: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 24 24" fill="#DC382D">
      <path d="M21.28 7.15l-8.77-5.07c-.32-.18-.71-.18-1.02 0L2.72 7.15c-.32.18-.51.52-.51.89v10.14c0 .37.19.71.51.89l8.77 5.07c.16.09.33.14.51.14s.35-.05.51-.14l8.77-5.07c.32-.18.51-.52.51-.89V8.04c0-.37-.19-.71-.51-.89zM12 3.15l7.53 4.35L17.2 8.82 9.67 4.47 12 3.15zM3.66 8.57l7.34 4.24v8.47l-7.34-4.24V8.57zm9.34 12.71v-8.47l7.34-4.24v8.47l-7.34 4.24z" />
    </svg>
  ),
  mongodb: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 24 24" fill="#47A248">
      <path d="M12 0c-.3 0-.6.1-.8.3-2.5 2.1-7.2 6.5-7.2 13.5 0 5.4 3.6 9.8 8 10.2v-24zm0 24c4.4-.4 8-4.8 8-10.2 0-7-4.7-11.4-7.2-13.5-.2-.2-.5-.3-.8-.3v24z" />
    </svg>
  ),
  openai: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 24 24" fill="#10A37F">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.487a4.47 4.47 0 0 1 2.34-1.974V12.06a.76.76 0 0 0 .387.676l5.814 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 8.487zm16.597 3.855l-5.833-3.387L15.119 7.8a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.674 8.105v-5.543a.79.79 0 0 0-.409-.681zm2.01-4.288l-.141-.085-4.779-2.782a.776.776 0 0 0-.785 0L9.409 8.536V6.204a.08.08 0 0 1 .033-.062L14.28 3.35a4.5 4.5 0 0 1 6.67 4.704zM8.86 14.156l-2.02-1.168a.076.076 0 0 1-.038-.052V7.353a4.504 4.504 0 0 1 7.37-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.392.681v6.737zm1.096-2.365l2.602-1.5 2.607 1.5v2.999l-2.607 1.505-2.602-1.505v-2.999z" />
    </svg>
  ),
  nextjs: (className = "w-6 h-6") => (
    <svg className={className} viewBox="0 0 180 180" fill="none">
      <circle cx="90" cy="90" r="90" fill="#000000" />
      <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="#FFFFFF" />
      <path d="M115 54H127V126H115V54Z" fill="#FFFFFF" />
    </svg>
  ),
};

export function detectServiceKey(name: string, url: string): string | null {
  const normalizedName = name.toLowerCase().trim();
  const domain = extractDomain(url).toLowerCase();

  const checks: [string, string[]][] = [
    ["vercel", ["vercel"]],
    ["render", ["render"]],
    ["supabase", ["supabase"]],
    ["resend", ["resend"]],
    ["cloudns", ["cloudns"]],
    ["stripe", ["stripe"]],
    ["github", ["github"]],
    ["cloudflare", ["cloudflare"]],
    ["aws", ["aws", "amazon"]],
    ["firebase", ["firebase"]],
    ["figma", ["figma"]],
    ["docker", ["docker"]],
    ["postgresql", ["postgres", "postgresql"]],
    ["redis", ["redis", "upstash"]],
    ["mongodb", ["mongo", "mongodb"]],
    ["openai", ["openai", "chatgpt"]],
    ["nextjs", ["nextjs", "next.js"]],
  ];

  for (const [key, aliases] of checks) {
    if (aliases.some((a) => normalizedName.includes(a) || domain.includes(a))) {
      return key;
    }
  }

  return null;
}

export function detectCategory(name: string, url: string): ServiceCategory {
  const text = `${name} ${url}`.toLowerCase();

  if (text.includes("vercel") || text.includes("render") || text.includes("netlify") || text.includes("aws") || text.includes("fly.io") || text.includes("railway") || text.includes("digitalocean") || text.includes("github")) {
    return "hosting";
  }
  if (text.includes("supabase") || text.includes("postgres") || text.includes("sql") || text.includes("mongo") || text.includes("redis") || text.includes("planetscale") || text.includes("prisma")) {
    return "database";
  }
  if (text.includes("auth") || text.includes("clerk") || text.includes("kinde") || text.includes("auth0")) {
    return "auth";
  }
  if (text.includes("stripe") || text.includes("paypal") || text.includes("pagarme") || text.includes("asaas") || text.includes("mercadopago")) {
    return "payments";
  }
  if (text.includes("resend") || text.includes("mail") || text.includes("sendgrid") || text.includes("postmark")) {
    return "email";
  }
  if (text.includes("dns") || text.includes("cloudns") || text.includes("cloudflare") || text.includes("route53") || text.includes("namecheap") || text.includes("godaddy")) {
    return "dns";
  }
  if (text.includes("openai") || text.includes("anthropic") || text.includes("gemini") || text.includes("groq") || text.includes("huggingface")) {
    return "ai";
  }
  if (text.includes("analytics") || text.includes("posthog") || text.includes("mixpanel") || text.includes("sentry") || text.includes("datadog")) {
    return "analytics";
  }
  if (text.includes("s3") || text.includes("storage") || text.includes("r2") || text.includes("bucket")) {
    return "storage";
  }

  return "other";
}

export function renderCategoryIcon(category: ServiceCategory, className = "w-4 h-4") {
  switch (category) {
    case "hosting":
      return <Server className={className} />;
    case "database":
      return <Database className={className} />;
    case "auth":
      return <Shield className={className} />;
    case "payments":
      return <CreditCard className={className} />;
    case "email":
      return <Mail className={className} />;
    case "dns":
      return <Globe className={className} />;
    case "ai":
      return <Cpu className={className} />;
    case "analytics":
      return <Terminal className={className} />;
    case "storage":
      return <Layers className={className} />;
    default:
      return <Cloud className={className} />;
  }
}

export { SmartServiceIcon } from "@/components/ui/SmartServiceIcon";
