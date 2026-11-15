import { describe, it, expect } from 'vitest';
import {
  extractDomain,
  getFaviconUrl,
  detectServiceKey,
  detectCategory,
} from './iconResolver';

describe('iconResolver utils', () => {
  describe('extractDomain', () => {
    it('deve extrair hostname de URLs com http/https', () => {
      expect(extractDomain('https://github.com/welton/mnemosine')).toBe('github.com');
      expect(extractDomain('http://api.supabase.com/v1')).toBe('api.supabase.com');
    });

    it('deve extrair hostname mesmo sem protocolo inicial', () => {
      expect(extractDomain('vercel.com/dashboard')).toBe('vercel.com');
    });

    it('deve retornar string vazia para URLs inválidas', () => {
      expect(extractDomain(':::invalid-url:::')).toBe('');
    });
  });

  describe('getFaviconUrl', () => {
    it('deve gerar rota interna da api para favicon', () => {
      const url = 'https://github.com';
      expect(getFaviconUrl(url)).toBe(`/api/icon?url=${encodeURIComponent(url)}`);
    });

    it('deve retornar vazio se URL não tiver domínio válido', () => {
      expect(getFaviconUrl('')).toBe('');
    });
  });

  describe('detectServiceKey', () => {
    it('deve identificar serviços conhecidos pelo nome ou domínio', () => {
      expect(detectServiceKey('Deploy Vercel', 'https://foo.com')).toBe('vercel');
      expect(detectServiceKey('API Backend', 'https://render.com')).toBe('render');
      expect(detectServiceKey('Database', 'https://app.supabase.com')).toBe('supabase');
      expect(detectServiceKey('Source Code', 'https://github.com')).toBe('github');
      expect(detectServiceKey('Auth Service', 'https://firebase.google.com')).toBe('firebase');
    });

    it('deve retornar null para serviços desconhecidos', () => {
      expect(detectServiceKey('Meu Sistema Interno', 'https://meudominio.com.br')).toBeNull();
    });
  });

  describe('detectCategory', () => {
    it('deve classificar categorias com base em palavras-chave', () => {
      expect(detectCategory('AWS EC2', 'https://aws.amazon.com')).toBe('hosting');
      expect(detectCategory('PostgreSQL DB', 'https://database.internal')).toBe('database');
      expect(detectCategory('Clerk Auth', 'https://clerk.dev')).toBe('auth');
      expect(detectCategory('Stripe Checkout', 'https://stripe.com')).toBe('payments');
      expect(detectCategory('Resend Newsletter', 'https://resend.com')).toBe('email');
      expect(detectCategory('Cloudflare DNS', 'https://cloudflare.com')).toBe('dns');
      expect(detectCategory('OpenAI Assistant', 'https://openai.com')).toBe('ai');
      expect(detectCategory('Sentry Errors', 'https://sentry.io')).toBe('analytics');
      expect(detectCategory('Object Storage', 'https://bucket.minio.io')).toBe('storage');
    });

    it('deve retornar "other" para serviços não categorizados', () => {
      expect(detectCategory('Ferramenta Customizada', 'https://ferramenta.org')).toBe('other');
    });
  });
});
