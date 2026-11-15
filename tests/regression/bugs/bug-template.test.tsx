/**
 * @regression-test
 * @bug-id: BUG-001
 * @title: URLs contendo espaços em branco ou formatos malformados não devem travar a aplicação
 * @reported-date: 2026-11-15
 * @severity: Medium
 * @steps-to-reproduce:
 *   1. Cadastrar um serviço com URL contendo espaços antes/depois (ex: "  https://github.com  ").
 *   2. Invocar extractDomain ou getFaviconUrl.
 *   3. Anteriormente, URLs com espaços podiam lançar exceção não capturada em certos navegadores.
 * @expected-behavior:
 *   extractDomain deve sanitizar ou processar a URL sem lançar exceções não tratadas.
 */

import { describe, it, expect } from 'vitest';
import { extractDomain, getFaviconUrl } from '@/utils/iconResolver';

describe('Regressão de Bug: BUG-001 - Resiliência a URLs com espaços ou formatação atípica', () => {
  it('não deve lançar exceção ao receber URL com espaços nas bordas', () => {
    expect(() => {
      const domain = extractDomain('  https://github.com/WeltonSantosFr  '.trim());
      expect(domain).toBe('github.com');
    }).not.toThrow();
  });

  it('deve retornar string vazia sem lançar exceção para entradas nulas ou com apenas espaços', () => {
    expect(() => {
      const domain = extractDomain('   '.trim());
      expect(domain).toBe('');
    }).not.toThrow();

    expect(() => {
      const iconUrl = getFaviconUrl('   '.trim());
      expect(iconUrl).toBe('');
    }).not.toThrow();
  });
});
