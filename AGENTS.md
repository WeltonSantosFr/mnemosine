<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Regras de Design e UI do Mnemosine

Sempre que for alterar qualquer aspecto do layout, componentes, cores, tipografia, bordas, espaçamentos ou comportamentos visuais do app, **consulte obrigatoriamente o arquivo `DESIGN_SYSTEM.md`** localizado na raiz do projeto (`DESIGN_SYSTEM.md`).
Siga rigorosamente as diretrizes documentadas no Design System (minimalismo estrutural sem containers desnecessários, cores e tipografia Cinzel/Inter, escala de arredondamentos, botões da sidebar com apenas borda esquerda no estado ativo, ícones limpos sem containers extras, gap de 4px nas pastas e animações fluidas completas com efeito reverso simétrico).

## Diretrizes Operacionais de Desenvolvimento e Fluxo Git do Mnemosine

Sempre que atuar no repositório no modo local do Antigravity, **consulte e siga obrigatoriamente as diretrizes de [DEVELOPMENT_GUIDELINES.md](DEVELOPMENT_GUIDELINES.md)**:

1. **Início de Novo Chat / Demanda**:
   - Atualize a branch `main`: `git checkout main && git pull origin main`.
   - Crie a branch temática em inglês: `git checkout -b <type>/<kebab-case-in-english>`.
   - Publique imediatamente no remote: `git push -u origin <type>/<kebab-case-in-english>`.
2. **Decomposição Obrigatória em Tarefas Atômicas**:
   - **Proibido gerar "mega-diffs" ou executar pedidos em lote único sem commits intermediários**.
   - Decomponha o prompt em uma lista sequencial de tarefas atômicas numeradas e apresente o checklist.
   - Execute tarefa por tarefa, realizando um commit atômico e `git push` ao final de cada uma para garantir pontos de restauração no histórico.
3. **Padrão de Conventional Commits em Inglês**:
   - Formato: `<type>(<scope>): <short imperative description in english>`.
   - Tipos: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`, `perf`.
   - Mensagens concisas, no imperativo presente, em minúsculas e sem ponto final.
4. **Validação Incremental Contínua**:
   - Execute `pnpm tsc --noEmit` e os testes unitários relevantes antes de cada commit atômico.
   - Execute `pnpm test && pnpm build` antes de finalizar a branch.
