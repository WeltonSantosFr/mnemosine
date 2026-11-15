# Mnemosine — Especificação Completa para Testes de Regressão 🏛️

> **Propósito do Documento**: Este arquivo serve como a **matriz oficial de especificações e casos de teste de regressão** para o Mnemosine.  
> Qualquer implementação futura de testes automatizados (Playwright, Cypress, Vitest, Jest, Testing Library) ou refatoração de código deve validar rigorosamente todos os cenários aqui descritos para garantir que nenhum ajuste de usabilidade, layout, responsividade ou fidelidade ao Design System seja revertido.

---

## Índice de Módulos e Suítes de Teste
1. [Painel de Pastas e Projetos (ProjectCard)](#1-painel-de-pastas-e-projetos-projectcard)
2. [Serviços dentro da Pasta (ServiceCard)](#2-serviços-dentro-da-pasta-servicecard)
3. [Botão e Card "+ Nova Pasta"](#3-botão-e-card--nova-pasta)
4. [Grid Principal e Expansão Horizontal Progressiva](#4-grid-principal-e-expansão-horizontal-progressiva)
5. [Busca Global e Command Palette (Ctrl + K)](#5-busca-global-e-command-palette-ctrl--k)
6. [Header, Sidebar e Navegação](#6-header-sidebar-e-navegação)
7. [Arte da Deusa Mnemosine e Fundo](#7-arte-da-deusa-mnemosine-e-fundo)
8. [Componente Unificado ActionIconButton](#8-componente-unificado-actioniconbutton)

---

## 1. Painel de Pastas e Projetos (`ProjectCard`)

### 1.1 Estado Fechado (Closed Folder)
- [ ] **CT-FOLD-001 | Geometria Quadrada Estrita**:
  - Em qualquer resolução de tela (de 320px no mobile até 4K no desktop), o card de pasta fechada deve renderizar rigorosamente na proporção quadrada (`aspect-square`).
  - O conteúdo interno (título, 2x2 grid de ícones e paddings) **nunca** deve empurrar a altura do card além de sua largura.
- [ ] **CT-FOLD-002 | Apenas o Nome no Topo**:
  - O card de pasta fechada exibe exclusivamente o nome do projeto (`h3`, `font-cormorant text-base sm:text-lg`).
  - **Não deve existir** texto de descrição nem subtítulo abaixo do nome.
- [ ] **CT-FOLD-003 | Grid 2x2 de Ícones Puros com Gap de 4px**:
  - Na pasta fechada, os serviços são dispostos em uma grade estrita de 2 colunas x 2 linhas com `gap-[4px]`.
  - Os ícones vivem soltos ("Naked Icons"), sem bordas, containers cinzas ou fundos intermediários envolvendo o ícone.
- [ ] **CT-FOLD-004 | Badge de Serviços Excedentes (+N)**:
  - Se a pasta contiver mais de 3 serviços, os slots 1, 2 e 3 exibem os 3 primeiros serviços e o slot 4 exibe exclusivamente o indicador numérico `+N` (onde N = total de serviços - 3).
  - O badge deve utilizar `font-mono font-bold text-[#d4af37]` e tamanho proporcional (`text-base sm:text-lg md:text-xl`).
- [ ] **CT-FOLD-005 | Fundo Transparente em Repouso & Luz Suave no Hover**:
  - Em repouso, o fundo do card da pasta fechada é `bg-transparent`.
  - No estado `:hover`, ativa-se um overlay com gradiente radial difuso e suave (`radial-gradient` a partir do centro) sobre base translúcida, sem fundos sólidos pesados ou halos dourados saturados.
- [ ] **CT-FOLD-006 | Ações Contextuais no Hover da Pasta Fechada**:
  - No hover do card fechado, surgem no canto superior direito os botões de ação: Editar Pasta e Excluir Pasta (`opacity-0 group-hover:opacity-100`).
  - Quando não estiver sob hover, esses botões devem ter `opacity-0` e `pointer-events-none`.

### 1.2 Estado Aberto (Open Folder)
- [ ] **CT-FOLD-007 | Ausência de Linha Divisória**:
  - Ao expandir a pasta, **não deve haver** borda divisória (`border-b`) entre o título e os serviços.
- [ ] **CT-FOLD-008 | Paridade de Padding com o Estado Fechado**:
  - O padding da pasta aberta (`p-3.5 sm:p-4`) deve ser exatamente o mesmo da pasta fechada, prevenindo saltos de alinhamento vertical no grid.
- [ ] **CT-FOLD-009 | Cabeçalho e Ações da Pasta Aberta**:
  - No topo da pasta aberta permanecem visíveis: botão de Editar Pasta, botão de Excluir Pasta e botão de Fechar Pasta (`X`), implementados com `ActionIconButton`.
- [ ] **CT-FOLD-010 | Fechamento por Clique no Espaço Vazio ou Tecla Esc**:
  - Clicar em qualquer área de fundo do card da pasta aberta deve fechar a pasta.
  - Pressionar a tecla `Escape` com a pasta aberta deve fechar a pasta.

### 1.3 Transições e Animações Fluidas Bidirecionais
- [ ] **CT-FOLD-011 | Efeito Reverso Completo (Simetria de Movimento)**:
  - A animação de fechamento deve ser tão suave e detalhada quanto a de abertura (`duration: 0.55s, ease: [0.16, 1, 0.3, 1]`).
  - É proibido unmount seco ou corte abrupto ao fechar a pasta.
- [ ] **CT-FOLD-012 | Continuidade Física com FLIP (`motion.div layout`)**:
  - Os ícones compartilhados entre os estados fechado e aberto mantêm sua chave (`key={service.id}`) e deslizam fisicamente para suas novas posições.
  - Ao abrir, o 3º ícone desliza da linha 2 para a coluna 3. Ao fechar, desliza suavemente de volta da coluna 3 para a linha 2.
- [ ] **CT-FOLD-013 | Entrada/Saída Escalonada (Stagger) de Excedentes e Botão +**:
  - Ao abrir, serviços adicionais (4º em diante) e o botão `+` surgem em cascata suave (`stagger`).
  - Ao fechar, colapsam suavemente com `<AnimatePresence mode="popLayout">` enquanto os ícones principais retornam à grade 2x2.
- [ ] **CT-FOLD-014 | Deslocamento Coordenado dos Cards Vizinhos**:
  - Todos os cards vizinhos no grid compartilham `<LayoutGroup id="projects-grid">` e deslizam suavemente sem saltos secos de quebra de linha.

---

## 2. Serviços dentro da Pasta (`ServiceCard`)

- [ ] **CT-SERV-001 | Ícones Puros ("Naked Icons")**:
  - Os ícones dos serviços devem ser renderizados limpos, sem containers cinzas, bordas decorativas ou caixas retangulares envolvendo o conjunto ícone + nome.
  - Devem manter as cores originais da marca de cada serviço (ex: Supabase esmeralda, Stripe roxo, Render verde-menta).
- [ ] **CT-SERV-002 | Nome com Abertura e Fechamento Suaves**:
  - O nome do serviço é renderizado diretamente abaixo do ícone com transição suave (`height: 0 -> auto`, `opacity: 0 -> 1`).
- [ ] **CT-SERV-003 | Hover Individual Isolado (Sem Efeito em Lote)**:
  - Passar o mouse sobre o card da pasta ou sobre um serviço vizinho **não pode** ativar o estado de hover dos outros serviços.
  - O container do serviço deve utilizar `group/service` para isolar seu estado de hover.
- [ ] **CT-SERV-004 | Fundo Translúcido Suave no Hover do Serviço**:
  - Ao passar o mouse sobre um serviço específico, o container ganha o fundo cinza suave ultratranslúcido `hover:bg-white/[0.03]` com cantos `rounded-xl` e padding seguro `p-2 sm:p-2.5`.
  - A transparência de 3% (`0.03`) garante distinção visual sem competir com os botões de ação contextuais.
- [ ] **CT-SERV-005 | Botões de Editar e Excluir Exclusivos por Serviço**:
  - Os botões de editar e excluir de cada serviço aparecem exclusivamente sobre o serviço em foco (`group-hover/service:opacity-100`).
  - Ao retirar o cursor do serviço, os botões somem imediatamente (`opacity-0 pointer-events-none`).
- [ ] **CT-SERV-006 | Prevenção de Propagação e Abertura Indesejada de Link**:
  - Clicar nos botões de editar ou excluir do serviço deve acionar `e.preventDefault()` e `e.stopPropagation()`, garantindo que o link externo do serviço não seja aberto no navegador.
- [ ] **CT-SERV-007 | Botão de Novo Serviço ("+")**:
  - O botão de novo serviço dentro da pasta aberta deve ser circular tracejado (`rounded-full border-2 border-dashed border-[#8c734b]/70 hover:border-[#d4af37]`).
  - O botão deve compartilhar o mesmo alinhamento de padding e linha de base vertical dos demais cards de serviço.

---

## 3. Botão e Card "+ Nova Pasta"

- [ ] **CT-NEWF-001 | Ponto Único de Criação**:
  - A criação de pastas é realizada exclusivamente pelo card "+ Nova Pasta" inline no grid de projetos.
  - Não devem existir botões redundantes de "Nova Pasta" no cabeçalho ou na barra superior.
- [ ] **CT-NEWF-002 | Paridade Geométrica Absoluta**:
  - O card "+ Nova Pasta" deve possuir exatamente a mesma geometria e classes estruturais das pastas fechadas:  
    `col-span-1 w-full aspect-square rounded-2xl p-3.5 sm:p-4`.
  - No mobile, tablet e desktop, sua altura e largura devem ser rigorosamente idênticas às das pastas fechadas vizinhas.
- [ ] **CT-NEWF-003 | Estilo Visual e Interação**:
  - Borda tracejada `border-2 border-dashed border-[#3e3423] hover:border-[#d4af37]`.
  - Fundo transparente `bg-transparent` em repouso e mesmo efeito de luz radial translúcida suave no `:hover`.
  - Suporte completo a foco por teclado (`tabIndex={0}`, ativação por `Enter` ou `Espaço`).

---

## 4. Grid Principal e Expansão Horizontal Progressiva

### 4.1 Breakpoints Oficiais da Grade
- [ ] **CT-GRID-001 | Breakpoints do Grid**:
  - **Mobile (< 768px)**: 2 colunas (`grid-cols-2`).
  - **Meio Termo / Tablet (768px a 1279px, `md:`)**: 3 colunas (`md:grid-cols-3`).
  - **Desktop (>= 1280px, `xl:`)**: 4 colunas (`xl:grid-cols-4`).
  - A classe do container do grid deve ser:  
    `grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 [grid-auto-flow:dense] gap-3.5 sm:gap-4 md:gap-5`.

### 4.2 Regra de Expansão Horizontal da Pasta Aberta
- [ ] **CT-GRID-002 | Prioridade Horizontal sobre Quebra Vertical**:
  - A pasta aberta **nunca** deve criar uma 3ª linha vertical se ainda existirem colunas horizontais disponíveis na grade do breakpoint ativo.
- [ ] **CT-GRID-003 | Comportamento no Mobile (< 768px, 2 colunas)**:
  - Aberta ocupa `col-span-2` (100% da largura horizontal).
  - Quebra para linhas adicionais se necessário, pois já ocupa todo o espaço horizontal.
- [ ] **CT-GRID-004 | Comportamento no Meio Termo (768px - 1279px, 3 colunas)**:
  - Com até 8 itens (serviços + botão `+`): ocupa 2 colunas (`md:col-span-2`, comportando até 2 linhas x 4 itens).
  - Com 9 a 12 itens: **expande horizontalmente para 3 colunas (`md:col-span-3`)**, comportando até 2 linhas x 6 itens sem criar 3ª linha.
  - Com 13+ itens: cria a 3ª linha vertical (somente após ocupar todas as 3 colunas).
- [ ] **CT-GRID-005 | Comportamento no Desktop (>= 1280px, 4 colunas)**:
  - Com até 8 itens: ocupa 2 colunas (`xl:col-span-2`, grade interna de 4 colunas).
  - Com 9 a 12 itens: expande para 3 colunas (`xl:col-span-3`, grade interna de 6 colunas).
  - Com 13 a 16 itens: expande para 4 colunas (`xl:col-span-4`, grade interna de 8 colunas).
  - Com 17+ itens: cria a 3ª linha vertical (somente após ocupar todas as 4 colunas).

---

## 5. Busca Global e Command Palette (`Ctrl + K`)

### 5.1 Abertura e Usabilidade Geral
- [ ] **CT-CMD-001 | Atalhos Globais**:
  - `Ctrl + K` (Windows/Linux) ou `Cmd + K` (macOS) abre a Command Palette a partir de qualquer ponto do aplicativo.
  - Clicar no campo de busca do Header abre a Command Palette.
  - Ao abrir, o input recebe foco automaticamente.
- [ ] **CT-CMD-002 | Busca em Tempo Real**:
  - Filtra instantaneamente projetos (por nome) e serviços (por nome, URL e categoria).
  - Exibe no máximo 10 resultados com ícones e subtítulos informativos.

### 5.2 Navegação por Teclado no Desktop (Desktop Experience)
- [ ] **CT-CMD-003 | Navegação por Setas**:
  - Pressionar seta para baixo (`↓`) avança a seleção ciclicamente.
  - Pressionar seta para cima (`↑`) recua a seleção ciclicamente.
  - O item selecionado ganha realce com fundo `#252018` e borda `#d4af37`/80.
- [ ] **CT-CMD-004 | Auto-Scroll do Item Selecionado**:
  - **Ao navegar pelas setas, caso o item selecionado esteja fora da área visível do container com scroll (`max-h-[380px]`), a lista deve rolar automaticamente (`scrollIntoView({ block: "nearest" })`) para que o item selecionado fique visível**.
- [ ] **CT-CMD-005 | Seleção por Tecla Enter**:
  - Pressionar `Enter` com um serviço selecionado abre a URL em uma nova aba e fecha o modal.
  - Pressionar `Enter` com uma pasta selecionada abre a pasta correspondente no dashboard e fecha o modal.
- [ ] **CT-CMD-006 | Badges de Instrução no Desktop (lg+)**:
  - Em telas desktop (`lg+`), são exibidos os badges de teclado no rodapé (`↑`, `↓`, `ENTER`) e o badge `ESC` no canto superior direito do input.

### 5.3 Adaptação Tátil para Mobile e Tablet (< lg)
- [ ] **CT-CMD-007 | Ocultação de Badges de Teclado no Mobile/Tablet**:
  - Em telas de celulares e tablets (`< lg`), **os badges de navegação com setas (`↑`, `↓`), `ENTER` e `ESC` devem estar completamente ocultados** (`hidden lg:flex`, `hidden lg:inline-flex`).
- [ ] **CT-CMD-008 | Botão Tátil de Fechar (X)**:
  - Em telas móveis e tablets (`< lg`), um botão de fechar explícito com ícone `X` deve estar visível no topo direito do input para permitir fechar a busca com um simples toque.
- [ ] **CT-CMD-009 | Usabilidade Tátil**:
  - A rolagem tátil na lista de resultados deve ser suave, e o toque em qualquer resultado deve abrir o item e fechar o modal.

---

## 6. Header, Sidebar e Navegação

- [ ] **CT-NAV-001 | Alinhamento Pixel-Perfect de Altura e Divisor**:
  - O cabeçalho da Sidebar e o Header principal possuem rigorosamente a mesma altura (`h-16`, 64px) e a mesma borda inferior contínua (`border-b border-[#282218]`).
- [ ] **CT-NAV-002 | Remoção de Botões Supérfluos no Header**:
  - O botão de "+ Nova Pasta" e o botão de tela cheia foram permanentemente removidos do Header.
- [ ] **CT-NAV-003 | Indicador Lateral Limpo na Sidebar**:
  - O item ativo na Sidebar possui exclusivamente uma borda dourada na lateral esquerda (`border-l-2 border-[#d4af37]`), sem bordas circundantes ou fundos pesados.
- [ ] **CT-NAV-004 | Rodapé Minimalista da Sidebar**:
  - Removidos os cards decorativos de ânfora/jarro e arte grega do rodapé da Sidebar, assim como o texto "Memória Eterna".
- [ ] **CT-NAV-005 | Ícone Unificado do Labirinto (`LabyrinthIcon`)**:
  - O ícone do labirinto grego oficial em ouro (`#d4af37`) substitui o antigo ícone de bússola em todas as visualizações (sidebar desktop, bottom navigation mobile e cabeçalho do labirinto).
- [ ] **CT-NAV-006 | Ícones Padronizados de Menu Móvel**:
  - O botão hambúrguer do header móvel e o botão de menu da barra inferior utilizam o mesmo ícone padronizado `Menu` da Lucide, e o drawer móvel utiliza `X` para fechar.

---

## 7. Arte da Deusa Mnemosine e Fundo

- [ ] **CT-BG-001 | Posicionamento no Canto Inferior Direito**:
  - Ancorada em `fixed bottom-0 right-0 pointer-events-none select-none z-0`.
- [ ] **CT-BG-002 | Proporção Responsiva de Altura**:
  - Desktop (`lg+`): altura de **50% da viewport** (`lg:h-[50vh]`).
  - Mobile (`< lg`): altura de **40% da viewport** (`h-[40vh]`).
- [ ] **CT-BG-003 | Fusão com Fundo (`mix-blend-screen`)**:
  - Deve utilizar `mix-blend-screen` e `opacity-70`, integrando as linhas douradas diretamente ao fundo ônix sem bordas ou recortes retangulares visíveis.
- [ ] **CT-BG-004 | Ausência de Cantoneiras Rebuscadas**:
  - Não devem existir cantoneiras decorativas ou molduras de acanto nos cantos da tela.

---

## 8. Componente Unificado `ActionIconButton`

- [ ] **CT-ACT-001 | Fundo Transparente em Repouso**:
  - O botão deve ter fundo transparente (`bg-transparent`) e sem bordas (`border-0`) em repouso.
- [ ] **CT-ACT-002 | Estilos e Variantes Semânticas**:
  - `variant="edit"`: ícone `Edit2`, texto branco (`text-white hover:bg-white/10`).
  - `variant="delete"`: ícone `Trash2`, texto vermelho suave (`text-red-400 hover:bg-red-500/15 hover:text-red-300`).
  - `variant="close"`: ícone `X`, texto neutro claro (`text-stone-300 hover:bg-white/10 hover:text-white`).
  - `variant="neutral"`: ícone flexível com tom neutro.
- [ ] **CT-ACT-003 | Suporte a Eventos**:
  - `stopPropagation`: ativado por padrão (`true`).
  - `preventDefault`: ativado via prop para impedir navegação acidental em links `<a>`.
