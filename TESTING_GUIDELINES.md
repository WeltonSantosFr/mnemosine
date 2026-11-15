# Mnemosine — Diretrizes e Padrões de Testes 🏛️

> **Propósito do Documento**: Este arquivo estabelece os padrões normativos, arquiteturais e práticos de engenharia de software para a escrita, organização e automação de testes no **Mnemosine (O Palácio da Memória)**.  
> Todos os desenvolvedores e agentes de IA que contribuírem para este repositório devem seguir rigorosamente estas diretrizes.

---

## 1. Visão Geral e Pirâmide de Testes

O Mnemosine adota uma abordagem de garantia de qualidade em 4 camadas, equilibrando velocidade de feedback, segurança de refatoração, fidelidade visual ao [DESIGN_SYSTEM.md](file:///home/weltonsf/Projetos/mnemosine/DESIGN_SYSTEM.md) e prevenção de reincidência de falhas com base no [REGRESSION_TESTS.md](file:///home/weltonsf/Projetos/mnemosine/REGRESSION_TESTS.md).

```
          / \
         /   \     E2E & Regressão Visual (Playwright + Docker)
        / E2E \    Full-Matrix: Mobile (375px), Tablet (768px), Desktop (1280px), 4K (3840px)
       /-------\
      / Regressão\  Regressão de Bugs ("Bug-First TDD" em tests/regression/bugs/)
     /   Bugs    \  Casos isolados reproduzindo falhas reportadas
    /-------------\
   /  Integração   \ Fluxos de componentes, modais e persistência (tests/integration/)
  /-----------------\
 /     Unitários     \ Funções utilitárias, hooks e micro-componentes (src/**/*.test.tsx)
/_____________________\
```

### Stack Oficial de Testes:
| Camada | Ferramenta Principal | Ambiente / Executor | Propósito |
| :--- | :--- | :--- | :--- |
| **Unitários** | **Vitest** + React Testing Library | `happy-dom` | Utilitários, hooks, renderização básica de componentes |
| **Integração** | **Vitest** + React Testing Library | `happy-dom` | Fluxos de modais, storage (`localStorage`), interações complexas |
| **Regressão de Bugs** | **Vitest** (Bug-First TDD) | `happy-dom` | Prevenir reincidência de bugs corrigidos com suítes dedicadas |
| **Regressão Visual** | **Playwright** (`toHaveScreenshot`) | Container Oficial Docker | Validação pixel-perfect (< 0.2% diff) nos 4 viewports oficiais |

---

## 2. Estrutura de Diretórios Híbrida

A base de código segue uma organização híbrida para maximizar a coesão do código fonte e a clareza das suítes de maior escopo:

```text
mnemosine/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── ActionIconButton.tsx
│   │   │   └── ActionIconButton.test.tsx      # [Unitário] Co-localizado
│   │   └── projects/
│   │       ├── ProjectCard.tsx
│   │       └── ProjectCard.test.tsx          # [Unitário] Co-localizado
│   ├── utils/
│   │   ├── iconResolver.ts
│   │   └── iconResolver.test.ts              # [Unitário] Co-localizado
│   └── hooks/
│       ├── useProjects.ts
│       └── useProjects.test.ts               # [Unitário] Co-localizado
│
├── tests/
│   ├── integration/                          # [Integração] Fluxos transversais
│   │   ├── projectModal.test.tsx
│   │   └── commandPalette.test.tsx
│   │
│   ├── regression/
│   │   └── bugs/                             # [Regressão de Bugs] Bug-First TDD
│   │       ├── bug-001-empty-url-crash.test.tsx
│   │       └── bug-template.test.tsx
│   │
│   └── e2e-visual/                           # [Visual Regression] Playwright
│       ├── layout-matrix.spec.ts
│       ├── folder-states.spec.ts
│       └── snapshots/                        # Baselines gerados via Docker
│
├── vitest.config.ts                          # Configuração do Vitest
├── vitest.setup.ts                           # Setup global e mocks DOM
└── playwright.config.ts                      # Configuração do Playwright
```

---

## 3. Testes Unitários e Hooks (`Vitest` + `happy-dom`)

### 3.1 O que testar unitariamente
- Funções puras em `src/utils/` (`iconResolver`, validadores, formatadores).
- Hooks customizados em `src/hooks/` (`useProjects`, filtros de busca).
- Componentes atômicos de UI em `src/components/ui/` (`ActionIconButton`, `GreekBorder`, etc.).

### 3.2 Boas Práticas
1. **Evite testar detalhes de implementação**: foque no comportamento percebido pelo usuário (acessibilidade, labels, eventos disparados).
2. **Utilize `screen.getByRole` ou `screen.getByLabelText`**: prefira queries com semântica de acessibilidade em vez de seletores CSS genéricos.
3. **Mocks limpos**: utilize `vi.fn()` e restaure mocks entre testes com `afterEach(() => { vi.clearAllMocks(); })`.

### 3.3 Exemplo de Teste Unitário (`src/utils/iconResolver.test.ts`)
```typescript
import { describe, it, expect } from 'vitest';
import { resolveServiceIcon } from './iconResolver';

describe('resolveServiceIcon', () => {
  it('deve resolver ícones conhecidos por palavra-chave exata', () => {
    const result = resolveServiceIcon('GitHub', 'https://github.com');
    expect(result.iconType).toBe('named');
    expect(result.resolvedName).toBe('github');
  });

  it('deve fornecer fallback semântico gracioso para serviços desconhecidos', () => {
    const result = resolveServiceIcon('Custom Service XYZ', 'https://example.com');
    expect(result.iconType).toBe('fallback');
    expect(result.fallbackChar).toBe('C');
  });
});
```

---

## 4. Testes de Integração (`tests/integration/`)

### 4.1 O que testar na integração
- Comunicação entre modais (`ProjectModal`, `ServiceModal`, `CommandPalette`) e o gerenciamento de estado (`useProjects` / `localStorage`).
- Submissão de formulários, validação síncrona de campos obrigatórios e persistência dos dados.
- Comportamento de atalhos globais (como `Ctrl + K` / `Cmd + K` para abrir a paleta de comandos).

### 4.2 Exemplo de Teste de Integração
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ProjectModal } from '@/components/modals/ProjectModal';

describe('Integração: ProjectModal e Criação de Pasta', () => {
  it('deve preencher e submeter o formulário de criação chamando o callback onSave', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(
      <ProjectModal
        isOpen={true}
        onClose={vi.fn()}
        onSave={handleSave}
      />
    );

    const nameInput = screen.getByLabelText(/nome do projeto/i);
    await user.type(nameInput, 'Projeto Mitologia');

    const submitBtn = screen.getByRole('button', { name: /salvar/i });
    await user.click(submitBtn);

    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Projeto Mitologia',
      })
    );
  });
});
```

---

## 5. Política "Bug-First TDD" para Regressão de Bugs 🛡️

### 5.1 O Ciclo Mandatório
Sempre que um defeito funcional for identificado e reportado no Mnemosine:

1. **FASE 1 (Red)**: Crie o arquivo em `tests/regression/bugs/bug-<id-ou-slug>.test.tsx` com o teste reproduzindo a falha. **O teste DEVE falhar**.
2. **FASE 2 (Green)**: Aplique a correção no código-fonte até que o teste passe.
3. **FASE 3 (Refactor & Protect)**: Garanta que a suíte passe em conjunto com todos os demais testes e comite o teste junto com a correção.

### 5.2 Estrutura do Cabeçalho Padronizado
Todo arquivo em `tests/regression/bugs/` deve incluir o seguinte bloco de metadados no topo:

```typescript
/**
 * @regression-test
 * @bug-id: BUG-042
 * @title: Pasta com URL de serviço vazia causa quebra no clique
 * @reported-date: 2026-11-15
 * @severity: High
 * @steps-to-reproduce:
 *   1. Criar um serviço com URL vazia ou com espaços.
 *   2. Clicar no card do serviço dentro da pasta expandida.
 *   3. Aplicação lançava exceção não tratada ao tentar invocar window.open.
 * @expected-behavior:
 *   O clique deve ser ignorado de forma segura ou abrir diálogo de edição sem quebrar a UI.
 */
```

---

## 6. Regressão de Layout Visual com Playwright 📸

O Mnemosine possui regras estéticas rigorosas (vide [DESIGN_SYSTEM.md](file:///home/weltonsf/Projetos/mnemosine/DESIGN_SYSTEM.md)), como a geometria quadrada das pastas (`aspect-square`), ícones sem containers, gaps de 4px e gradientes suaves. A automação visual garante que nenhum refactor quebre essas proporções.

### 6.1 Matriz Oficial de Resoluções (Full-Matrix)
Os testes de snapshot visual devem ser executados nos 4 viewports canônicos:

| Perfil | Largura x Altura | Dispositivo / Contexto | Foco de Validação |
| :--- | :--- | :--- | :--- |
| **Mobile** | `375 x 667` | iPhone SE / Mobile Padrão | Sidebar recolhida, grid 1 coluna, cards quadrados compactos |
| **Tablet** | `768 x 1024` | iPad / Tablets Verticais | Adaptação de grid intermediário (2 colunas), paddings seguros |
| **Desktop** | `1280 x 800` | Laptop / Desktop Padrão | Sidebar expandida, grid progressivo com scroll horizontal |
| **4K Ultrawide** | `3840 x 2160` | Monitores 4K / High-DPI | Escala, ausência de distorção de proporção dos cards quadrados |

### 6.2 Regras Críticas para Evitar Flakiness em Snapshots:
1. **Desabilitar Animações e Transições**:
   - Usar `animations: 'disabled'` na configuração do Playwright.
   - Aguardar o carregamento de fontes clássicas (`Cinzel`, `Inter`, `Cormorant Garamond`) via `document.fonts.ready`.
2. **Tolerância Estrita de Pixel Diff**:
   - `maxDiffPixelRatio: 0.002` (tolerância máxima de 0.2%).
3. **Isolamento de Carrossel e Relógio**:
   - Congelar temporizadores com `page.clock.setFixedTime()` quando houver elementos sensíveis a timestamp.

### 6.3 Execução Dockerizada para Consistência entre SOs
Diferentes sistemas operacionais (Linux vs macOS vs Windows) possuem mecanismos distintos de antialiasing e renderização de fontes tipográficas.  
Para garantir que os snapshots aprovados sejam 100% idênticos localmente e no CI:

> [!IMPORTANT]
> A geração e validação canônica de snapshots do Playwright deve ser executada através da imagem oficial do Playwright via Docker:
> ```bash
> pnpm test:visual:docker
> ```

---

## 7. Scripts e Comandos de Execução

Adicionados ao [package.json](file:///home/weltonsf/Projetos/mnemosine/package.json):

```bash
# Executa todos os testes unitários e de integração uma única vez
pnpm test

# Modo interativo com re-execução instantânea ao alterar arquivos
pnpm test:watch

# Gera relatório de cobertura de código
pnpm test:coverage

# Executa exclusivamente os testes de integração
pnpm test:integration

# Executa exclusivamente os testes de regressão de bugs (Bug-First TDD)
pnpm test:regression

# Executa os testes de regressão visual do Playwright (ambiente local)
pnpm test:visual

# Atualiza os snapshots de referência visual (ambiente local)
pnpm test:visual:update

# Executa os testes visuais dentro do container Docker oficial (padrão de CI)
pnpm test:visual:docker
```

---

## 8. Integração Contínua (CI/CD)

No pipeline de Pull Request do GitHub Actions:
1. O runner executa `pnpm test` (Unitários + Integração + Regressão de Bugs).
2. O runner executa `pnpm test:visual:docker` validando os snapshots da matriz Full-Matrix.
3. Se qualquer teste falhar ou houver divergência visual superior a 0.2%, o PR é bloqueado automaticamente para revisão.

---

## 9. Relação com Outros Documentos do Projeto
- **[DESIGN_SYSTEM.md](file:///home/weltonsf/Projetos/mnemosine/DESIGN_SYSTEM.md)**: Especificação da verdade visual, cores, tipografia e regras de container. O Playwright valida a fidelidade a este documento.
- **[REGRESSION_TESTS.md](file:///home/weltonsf/Projetos/mnemosine/REGRESSION_TESTS.md)**: Matriz e catálogo de cenários de teste funcionais e comportamentais do produto (CT-FOLD, CT-SRV, CT-GRID, etc.).
- **`TESTING_GUIDELINES.md`** (este documento): Guia técnico de implementação, arquitetura, automação e ferramentas de engenharia de testes.
