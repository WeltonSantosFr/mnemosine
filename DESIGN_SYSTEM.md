# Mnemosine — Design System 🏛️

> **Diretriz Mandatória**: Este documento estabelece os padrões visuais, cromáticos, tipográficos, estruturais e comportamentais do **Mnemosine (O Palácio da Memória)**.  
> **SEMPRE que qualquer alteração de layout, componente, estilo ou interação for realizada, este arquivo DEVE ser consultado e seguido rigorosamente.**

---

## 1. Filosofia de Design & Princípios Fundamentais

O Mnemosine combina a solenidade e o mistério da **mitologia clássica grega** com uma interface de altíssima produtividade e clareza para desenvolvedores.

### Princípios Cardeais:
1. **Minimalismo Estrutural ("Zero Containers Desnecessários")**:
   - **Nunca** aninhe containers sem justificativa semântica ou funcional.
   - Se um elemento já está dentro de um card, não crie caixas intermediárias com bordas ou fundos para envolver itens que podem ficar dispostos diretamente no grid ou flexbox.
2. **Ícones Puros ("Naked Icons")**:
   - Ícones de serviços e ferramentas vivem soltos e nítidos, com seus traçados e cores originais de marca.
   - **Proibido** encapsular ícones de serviços em caixas cinzas, bordas decorativas ou containers retangulares ao redor de ícone + nome.
3. **Linhas Divisórias Simples**:
   - Utilize linhas divisórias limpas e discretas (`border-[#282218]` ou `border-[#3e3423]`).
   - **Proibido** adicionar frisos rebuscados imitando colunas gregas, meandros ou frisos arquitetônicos onde uma linha simples cumpre o papel.
4. **Alinhamento e Continuidade Visual**:
   - O cabeçalho da sidebar e o header do container principal compartilham exatamente a mesma altura (`h-16`, 64px) e a mesma borda inferior contínua, formando um horizonte visual perfeito de ponta a ponta.

---

## 2. Paleta de Cores Oficial

A paleta de cores é inspirada no contraste entre o ônix profundo, mármores escuros e o ouro antigo/bronze clássico.

### 2.1 Tons Dourados (Acentos & Realces)

| Token / Variável | Hex | Uso Principal |
| :--- | :--- | :--- |
| `--color-gold-ancient` | `#d4af37` | **Ouro Antigo Oficial**: Borda de seleção da sidebar, bordas ativas de pastas, ícone do Labirinto, hover de títulos e botões primários. |
| `--color-gold-light` | `#f3e5ab` | **Ouro Luminoso / Pergaminho**: Hover de textos, texto de botões secundários, seleções de texto do sistema (`selection:bg-[#d4af37]/30`). |
| `--color-gold-dark` | `#8c734b` | **Bronze Envelhecido**: Bordas de cards fechados, ícones inativos, bordas tracejadas do botão "+", labels uppercase de seções. |
| `gold-metallic` | `#c5a059` / `#c59f2d` | Gradientes de botões dourados, subtítulos monocromáticos e detalhes de realce. |

### 2.2 Superfícies & Fundos (Ônix & Carvão)

| Hex | Aplicação |
| :--- | :--- |
| `#060508` a `#0a090d` | Fundo global da aplicação (`body`, `html`), tom mais profundo de ônix. |
| `#0e0d11` | Fundo da **Sidebar** e do **Header principal** (com `backdrop-blur-md`). |
| `bg-transparent` | **Fundo Normal das Pastas**: Estado de repouso das pastas de projetos fechadas e do card "+ Nova Pasta". |
| `radial-gradient` central | **Fundo Hover das Pastas**: Iluminação ultrassuave e etérea (`rgba(212,175,55,0.035)`) sobre base ônix translúcida (`rgba(28,25,34,0.7)`), iluminando apenas o suficiente para distinguir o card dos demais e proporcionar um fundo de contraste sutil com os ícones dos serviços, sem saturação ou halos dourados marcados. |
| `#141217` a `#1c181f` | Fundo do card de pasta aberta/expandida. |
| `#151419` | Superfície de modais e caixas de diálogo (`CommandPalette`, `ProjectModal`, `SettingsModal`). |

### 2.3 Bordas & Divisores

| Hex / Classe Tailwind | Aplicação |
| :--- | :--- |
| `border-[#282218]` | **Divisor Horizontal Padrão**: Borda inferior contínua da Sidebar e do Header (`h-16 border-b border-[#282218]`). |
| `border-[#2d2518]` | **Divisor Vertical**: Borda direita de separação da Sidebar (`border-r border-[#2d2518]`). |
| `border-[#352c1e]` | Borda padrão dos cards de pastas fechadas no estado normal. |
| `border-[#3e3423]` | Borda de inputs, cards pontilhados de nova pasta e caixas secundárias. |
| `border-[#d4af37]` | Borda de pastas selecionadas/expandidas e foco ativo em formulários. |

### 2.4 Botões de Ação Contextuais Icon-Only (`ActionIconButton`)

Para preservar o minimalismo, reduzir ruído visual, eliminar caixas desnecessárias e garantir consistência absoluta em todo o sistema, os botões de ação icon-only secundários e contextuais (como editar, excluir e fechar em **pastas** e **serviços**) utilizam o componente unificado `<ActionIconButton />` (`@/components/ui/ActionIconButton`).

Eles adotam **fundo transparente em repouso e ausência total de bordas coloridas**, revelando uma sutil tonalidade translúcida apenas no estado `hover`:

| Ação / Variante | Ícone & Cor Padrão | Fundo Padrão | Borda | Hover: Background | Hover: Ícone | Componente & Uso |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`edit`** (Edição / Neutro) | `#FFFFFF` (Branco / `text-white`) | `transparent` (`bg-transparent`) | **Sem borda** (`border-0`) | `rgba(255, 255, 255, 0.10)` (`hover:bg-white/10`) | `#FFFFFF` (`text-white`) | `<ActionIconButton variant="edit" title="Editar..." />` |
| **`delete`** (Exclusão / Destrutivo) | `#F87171` (Vermelho Claro / `text-red-400`) | `transparent` (`bg-transparent`) | **Sem borda** (`border-0`) | `rgba(239, 68, 68, 0.15)` (`hover:bg-red-500/15`) | `#FCA5A5` (`hover:text-red-300`) | `<ActionIconButton variant="delete" title="Excluir..." />` |
| **`close`** (Fechar / Secundário) | `#D6D3D1` (`text-stone-300`) | `transparent` (`bg-transparent`) | **Sem borda** (`border-0`) | `rgba(255, 255, 255, 0.10)` (`hover:bg-white/10`) | `#FFFFFF` (`hover:text-white`) | `<ActionIconButton variant="close" title="Fechar..." />` |
| **`neutral`** (Ação Neutra Genérica) | `#D6D3D1` (`text-stone-300`) | `transparent` (`bg-transparent`) | **Sem borda** (`border-0`) | `rgba(255, 255, 255, 0.10)` (`hover:bg-white/10`) | `#FFFFFF` (`hover:text-white`) | `<ActionIconButton variant="neutral" icon={Icon} title="..." />` |

**Propriedades de Controle de Eventos**:
- `stopPropagation`: Ativado por padrão (`true`) para evitar que o clique no botão dispare seleções de pastas ou abertura de cards pai.
- `preventDefault`: Pode ser ativado (`preventDefault={true}`) quando o botão de ação estiver sobreposto a links `<a>` (como no `ServiceCard`), prevenindo navegações indesejadas.

### 2.5 Hover Individual de Serviços (`ServiceCard`)

Para evitar que a passagem do cursor sobre o card da pasta ative simultaneamente os botões e estados de todos os serviços, cada serviço possui seu próprio escopo de interação isolado:
- **Identificador de Grupo**: `group/service` (em vez de `group` genérico), impedindo herança de hover do `ProjectCard`.
- **Fundo Cinza Suave no Hover**: Em repouso, o container é transparente (`bg-transparent`); no hover individual com pasta aberta, ganha um fundo cinza suave ultratranslúcido (`hover:bg-white/[0.03] transition-all duration-200 rounded-xl`), iluminando suavemente a área sem conflitar com os botões de ação (`ActionIconButton`), que utilizam `hover:bg-white/10`.
- **Padding e Espaçamento Seguro**: `p-2 sm:p-2.5` no container e espaçamento seguro (`gap-1.5 sm:gap-2 md:gap-2.5`) na grade interna, garantindo que o fundo do hover não colida com os elementos vizinhos.
- **Botões de Ação Exclusivos**: Os botões de editar e excluir de cada serviço utilizam `group-hover/service:opacity-100 pointer-events-none group-hover/service:pointer-events-auto`, aparecendo **apenas** no serviço sob o cursor.

---

## 3. Tipografia

O sistema tipográfico adota uma tríade harmônica entre solenidade clássica, distinção editorial e nitidez técnica:

### 3.1 Títulos e Logo: `Cinzel` (`var(--font-cinzel)` / `font-serif`)
- **Inspiração & Estética**: Inspirada em inscrições clássicas esculpidas em pedra, com proporções geométricas lapidares limpas que combinam perfeitamente com o glifo do labirinto e o ar de monumento grego.
- **Propósito**: Logo ("MNEMOSINE"), títulos de seções principais, cabeçalhos de modais (`Dialog`, `ProjectModal`, `SettingsModal`) e abas de navegação.
- **Pesos Disponíveis**: `400` (Regular), `600` (SemiBold), `700` (Bold), `800` (ExtraBold).
- **Rastreamento (Tracking)**: Utilize `tracking-wider` ou `tracking-widest` para realçar a nobreza e a cadência imperial.
- **Classes Tailwind**: `font-serif tracking-widest`, `font-cinzel font-bold text-lg sm:text-xl`.

### 3.2 Nomes dos Projetos (Papiros): `Cormorant Garamond` (`var(--font-cormorant)` / `font-cormorant`)
- **Inspiração & Estética**: Uma serifa editorial clássica mais fluida, delicada e elegante, ideal para dar personalidade única ao nome de cada projeto (como *Maestrum*, *Nipponic*) sem sobrecarregar a leitura visual do grid.
- **Propósito**: Título das pastas/projetos nos cards (`ProjectCard`), identificador de projeto no Labirinto e cabeçalho de projetos abertos.
- **Pesos Disponíveis**: `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold).
- **Classes Tailwind**: `font-cormorant text-base sm:text-lg font-semibold tracking-wide text-stone-100`.

### 3.3 Interface, Busca e Labels: `Geist Sans` (`var(--font-geist)` / `font-sans`)
- **Inspiração & Estética**: Sem-serifa moderna e geométrica de altíssima legibilidade e densidade de informação em telas digitais de alta resolução.
- **Propósito**: Nomes dos serviços e ferramentas (*Vercel*, *Supabase*, *Stripe*), barra de pesquisa e atalhos (`Ctrl + K`), campos de formulário, botões de ação e tooltips.
- **Classes Tailwind**: `font-sans text-xs sm:text-sm text-stone-200`, `font-sans font-medium`.

### 3.4 Numerais e Código: `font-mono`
- **Propósito**: Badges numéricos de contagem, indicador de serviços excedentes `+n` e teclas de atalho de teclado.
- **Classes comuns**: `font-mono text-xs font-bold text-[#d4af37]`.

---

## 4. Escala de Arredondamento (Border Radius)

| Classe Tailwind | Medida | Uso Estrito |
| :--- | :--- | :--- |
| `rounded-2xl` | `16px` | **Containers Maiores**: Cards de pastas de projetos (`ProjectCard`), modais (`Dialog`, `Palette`, `Settings`), banner heróico do Labirinto. |
| `rounded-xl` | `12px` | **Elementos de Ação Intermediários**: Inputs (`<input>`, `<textarea>`), botão de busca, botões primários de formulários. |
| `rounded-lg` / `rounded-md` | `8px` / `6px` | **Ações Menores & Botões de Ícone**: Botões do componente `ActionIconButton` (`rounded-md`), pílulas de filtros. |
| `rounded-full` | `9999px` | **Elementos Circulares**: Botão de "Novo Serviço" (`+`), badges e avatares circulares. |

---

## 5. Diretrizes de Animação e Movimento (Motion & Fluidity)

O movimento no Mnemosine deve transmitir **solenidade, fluidez física e refinamento**, evocando a solidez dos templos clássicos com a reatividade orgânica de uma ferramenta moderna. **Nenhuma transição deve ser abrupta, seca ou incompleta.**

### 5.1 Princípios Cardeais de Animação

1. **Simetria Bidirecional Obrigatória (Efeito Reverso Completo)**:
   - **Toda e qualquer animação de abertura, expansão ou entrada DEVE possuir uma animação de fechamento, contração ou saída igualmente detalhada e simétrica.**
   - É estritamente **proibido** criar aberturas ricas em animação acompanhadas de fechamentos secos, unmounts instantâneos ou fades genéricos sem movimento.
   - Se os elementos se expandiram e deslizaram na abertura, eles devem colapsar e deslizar de volta para as coordenadas de origem no fechamento.

2. **Continuidade de Layout e Física com FLIP (`motion.div layout`)**:
   - Elementos compartilhados entre estados estruturais (como os ícones de serviços entre a pasta fechada e a pasta aberta) **não devem ser destruídos e recriados**.
   - Eles devem manter sua chave React (`key={id}`) e utilizar o motor de layout do Motion (`layout` / FLIP), permitindo que o navegador interpole suavemente suas coordenadas físicas reais na tela.
   - Sempre que um container se expandir ou contrair em uma grade ou flexbox, os elementos vizinhos **devem ser coordenados via `<LayoutGroup>`**, garantindo que deslizem suavemente sem saltos de quebra de linha.

3. **Entrada e Saída Escalonada (Staggering & Cascading)**:
   - Elementos novos ou adicionais que surgem ao expandir uma seção (como os serviços excedentes além dos 3 primeiros ou o botão de adicionar) devem surgir em **cascata suave** (`stagger`), com atrasos progressivos de 30ms a 50ms por item.
   - Textos secundários (nomes sob ícones) devem desdobrar-se suavemente (`height: 0 -> auto`, `opacity: 0 -> 1`), nunca aparecendo antes ou de forma desincronizada em relação ao reposicionamento dos ícones.
   - No fechamento, os elementos excedentes devem colapsar de forma coordenada com `<AnimatePresence mode="popLayout">` antes ou durante a contração do card.

4. **Zero Aparições Abruptas ("No Pop-ins, No Hard Cuts")**:
   - Nenhum elemento deve aparecer ou sumir instantaneamente sem uma interpolação visual de opacidade, escala ou translação.
   - O badge numérico de excedentes (`+N`) do estado fechado dissolve suavemente ao expandir e ressurge pontualmente no fechamento no momento exato em que os ícones se assentam.

### 5.2 Tabela de Timings & Curvas de Aceleração (Easings)

| Categoria de Movimento | Duração Padrão | Curva de Easing | Aplicação Estrita |
| :--- | :--- | :--- | :--- |
| **Transições Estruturais / Layout** | `0.55s` (550ms) | `[0.16, 1, 0.3, 1]` (Desaceleração Quintic Suave) | Expansão e contração de pastas (`ProjectCard`), deslocamento de cards vizinhos no grid. |
| **Entradas de Elementos Secundários** | `0.25s` a `0.35s` | `[0.16, 1, 0.3, 1]` | Ícones adicionais na pasta aberta, botões de ação no cabeçalho, textos sob ícones. |
| **Saídas e Colapsos** | `0.20s` a `0.25s` | `[0.16, 1, 0.3, 1]` | Desaparecimento de serviços excedentes ao fechar a pasta, recolhimento de rótulos. |
| **Micro-interações & Hover** | `0.15s` a `0.20s` | `ease-out` / `duration-200` | Escala do ícone no hover (`scale-110`), transição de cor de borda, opacidade de ações discretas. |
| **Modais e Diálogos** | `0.18s` a `0.25s` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrada com leve escala (`0.98 -> 1`) e fade de backdrop nos diálogos e na paleta de comando. |

### 5.3 Diretrizes Técnicas para Agentes e Desenvolvedores

- **Containers Unificados**: Evite ternários no JSX que desmontem árvores inteiras de componentes (ex: `isActive ? <GridA /> : <GridB />`). Mantenha um único nó contínuo `<motion.div layout>` e altere apenas as classes utilitárias de Tailwind condicionalmente.
- **Prevenção de Distorção**: Em filhos de nós com `motion.div layout`, utilize `layout="position"` ou `layout` para que o Motion compense automaticamente a distorção de proporção (`scaleX`/`scaleY`) durante a interpolação.
- **Saídas Seguras**: Sempre envolva elementos condicionais de entrada/saída em `<AnimatePresence mode="popLayout">`.

---

## 6. Especificações de Componentes

### 6.1 Cabeçalho Principal (Header)
- **Altura & Alinhamento**: `h-16` (64px) com `border-b border-[#282218]`, perfeitamente alinhado com a altura do cabeçalho da sidebar.
- **Foco Funcional & Minimalismo**:
  - O cabeçalho é estritamente voltado para **busca (`Ctrl + K`)** e **identidade/navegação móvel**.
  - **Proibido** adicionar botões de ação redundantes (como "Nova Pasta") ou utilitários intrusivos (como botão de tela cheia/fullscreen), mantendo o cabeçalho desobstruído e limpo.
- **Versão Mobile (`< lg`)**:
  - **Botão Hambúrguer de Abertura**: Utiliza **obrigatoriamente o ícone `Menu` do `lucide-react`** (`<Menu className="w-5 h-5" />`) com estilização dourada (`text-[#d4af37] border border-[#3e3423] bg-[#141318]`).
  - **Identidade Visual Oficial**: Exibe a logomarca vetorial oficial `<MnemosineLogo />` com o "O" em formato de labirinto grego, com clique redirecionando para a visão inicial de projetos, em substituição a textos estáticos em span.
- **Consistência de Ícones de Menu Hambúrguer**:
  - O ícone do botão hambúrguer do cabeçalho superior e o ícone do botão "Menu" da barra inferior móvel (bottom navigation) **devem ser rigorosamente o mesmo componente `<Menu />` de `lucide-react`**. Variações na cor (dourado no cabeçalho vs tom de pedra na bottom nav) são contextuais, mas o traçado do ícone deve permanecer idêntico.

### 6.2 Barra Lateral (Sidebar) & Navegação Móvel
- **Cabeçalho com Logomarca**:
  - Altura fixa: `h-16` (64px) com `border-b border-[#282218]`.
  - Logomarca em SVG `<MnemosineLogo />` com `MNEM`, ícone do Labirinto integrado como terceira letra ("O") em `#d4af37`, e `SINE`.
  - Botão de fechar no mobile (`lg:hidden`): utiliza `<X className="w-5 h-5" />` do `lucide-react`.
- **Item de Navegação Ativo (Regra Inegociável)**:
  - O botão selecionado possui **apenas uma borda na lateral esquerda** (`border-l-2 border-l-[#d4af37]`).
  - Fundo sutil levemente iluminado (`bg-[#1a1714]/60`).
  - **PROIBIDO**: borda completa ao redor do botão, sombra interna, brilho falso ou molduras fechadas.
- **Item Inativo**:
  - `border-l-2 border-l-transparent text-stone-400 hover:text-stone-200 hover:bg-[#16141a]/60`.
- **Rodapé Minimalista (Sem Ruído Visual)**:
  - Cards decorativos (ânfora, busto grego) e textos soltos de rodapé ("Memória Eterna") foram removidos da sidebar para preservar a elegância estrita e foco absoluto na navegação e conteúdo.

### 6.3 Pastas de Projetos (`ProjectCard`)

#### Estado Fechado:
- **Formato & Proporção**: No desktop, quadrado estrito (`md:aspect-square col-span-1`). No mobile, altura mínima confortável (`min-h-[185px] md:min-h-0`) para acomodar com folga os ícones e títulos com padding equilibrado em todos os lados.
- **Container**: É o **único container** (`p-4 sm:p-4 rounded-2xl border border-[#352c1e] hover:border-[#8c734b] bg-transparent`).
- **Padding Simétrico em Todos os Lados**: `p-4 sm:p-4` (16px) em cima, embaixo, na esquerda e na direita. Nunca utilize `overflow-hidden` nas pastas fechadas que possa comprimir ou espremer o padding inferior dos ícones no mobile.
- **Fundo em Repouso**: Totalmente transparente (`bg-transparent`), integrando o card diretamente ao fundo da aplicação sem caixas sólidas.
- **Iluminação Radial no Hover ("Luz Central Ultrassuave & Alto Contraste")**:
  - Ao passar o cursor, revela suavemente uma iluminação delicadíssima no centro (`rgba(212, 175, 55, 0.035)` diminuindo para `0.01` a 50%) sobre uma base ônix translúcida (`radial-gradient(ellipse at 50% 50%, rgba(28, 25, 34, 0.7) 0%, rgba(22, 19, 27, 0.55) 55%, rgba(14, 13, 17, 0.4) 100%)`). O efeito é imperceptível como cor e atua estritamente elevando o contraste dos ícones e destacando a pasta com nobreza e sutileza, complementado por sombra suave sem halos dourados (`hover:shadow-[0_4px_20px_rgba(0,0,0,0.6)]`).
- **Topo**: Apenas o nome do projeto (`<h3 className="font-serif text-sm sm:text-base font-bold text-stone-100 truncate pr-6">`).
- **Sem Ícone de Pasta**: Ícones `Folder` foram removidos das pastas.
- **Sem Descrição**: As pastas não possuem descrição.
- **Sem Badges Decorativos**: Removidos templos (`🏛`), badges de contagem ou molduras extras.
- **Abaixo**: Grid 2x2 com os ícones dos serviços:
  - Grid puro: `<div className="grid grid-cols-2 grid-rows-2 gap-[4px] flex-1 items-center justify-items-center w-full py-1">`.
  - **Gap**: Exatamente **4px** (`gap-[4px]`).
  - **Tamanho dos Ícones**: Ocupam bastante espaço (`w-12 h-12` a `w-18 h-18`).
  - **Zero Caixas**: Os ícones ficam soltos na grade, sem containers cinzas ou bordas individuais.
  - **4º Slot**: Exibe diretamente o texto `+{extraCount}` em ouro clássico (`text-base sm:text-lg md:text-xl font-mono font-bold text-[#d4af37]`) quando houver mais de 3 serviços.
- **Ações de Edição/Exclusão (Apenas no Hover)**:
  - Ficam **100% invisíveis por padrão** (`opacity-0 pointer-events-none`).
  - Surgem no canto superior direito apenas ao passar o cursor sobre o card (`group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200`).
  - Seguem o padrão limpo da seção 2.4: **sem bordas coloridas**, fundo transparente, ícone de edição branco (`text-white hover:bg-white/10`) e lixeira vermelha (`text-red-400 hover:bg-red-500/15 hover:text-red-300`).

#### Estado Aberto / Expandido:
- **Expansão In-Place**: Ocupa a largura de **2 pastas** (`col-span-2`).
- **Reorganização Dinâmica**: Utiliza `[grid-auto-flow:dense]` no grid pai para que as pastas vizinhas se desloquem naturalmente para a direita e para a linha de baixo sem deixar lacunas.
- **Alinhamento Vertical e Padding**:
  - Utiliza exatamente o mesmo padding da pasta fechada (`p-4 sm:p-4`).
  - **Sem linha divisora** (`border-b`) entre o cabeçalho e os serviços.
  - O espaçamento vertical entre o título e os serviços é idêntico ao da pasta fechada (`flex-1 items-center justify-items-center w-full py-1`).
- **Título & Ações de Cabeçalho**:
  - Mantém o **mesmo tamanho de fonte da pasta fechada** (`text-sm sm:text-base font-bold`), alinhado aos botões de ação (editar, excluir e `X`).
  - **Ações Sempre Visíveis**: Botões limpos sem bordas coloridas, fundo transparente e hovers translúcidos sutis (`hover:bg-white/10` para editar/fechar e `hover:bg-red-500/15` para excluir).
  - **Sem descrição**.
- **Grade de Serviços Expandida**:
  - 4 a 5 colunas (`grid-cols-4 lg:grid-cols-5`).
  - Espaçamento horizontal de 4px (`gap-x-[4px]`).
- **Fechar ao Clicar no Espaço Vazio**:
  - Clicar em qualquer área vazia, fundo ou cabeçalho da pasta expandida (ou pressionar `Escape`) fecha a pasta de volta ao estado fechado 2x2.

#### Transição e Animações Fluidas (Abertura e Fechamento Simétricos):
- **Expansão e Contração Contínuas (`motion.div layout`)**:
  - A pasta transiciona continuamente entre o estado quadrado e o estado expandido de 2 colunas com curva fluida (`duration: 0.55s, ease: [0.16, 1, 0.3, 1]`) tanto na abertura quanto no fechamento.
  - As pastas vizinhas no grid (sob `<LayoutGroup id="projects-grid">`) deslizam suavemente para suas novas posições tanto ao expandir quanto ao contrair, sem saltos visuais.
- **Rearranjo Físico Bidirecional dos Ícones**:
  - Os serviços visíveis na grade 2x2 preservam suas identidades (`key={service.id}`) em um grid persistente.
  - Na abertura: o 3º ícone desliza da linha 2 para a coluna 3 da linha 1.
  - No fechamento: o 3º ícone desliza suavemente de volta da coluna 3 para a linha 2, enquanto o 1º e 2º ícones retornam aos seus espaçamentos originais 2x2.
- **Efeito Reverso nas Entradas e Saídas**:
  - Na abertura: ícones excedentes (4º em diante) e o botão circular `+` surgem em cascata (`stagger`), os nomes dos serviços entram em fade-in e o badge `+N` desvanece.
  - No fechamento: o botão circular `+` e os ícones excedentes colapsam suavemente (`exit={{ opacity: 0, scale: 0.2, y: 10 }}`), os nomes abaixo dos ícones colapsam suavemente, e o badge numérico `+N` surge no 4º slot no exato instante em que os 3 ícones assentam no grid 2x2.

#### Grid Principal & Breakpoints Oficiais:
- **Mobile (`< md` / `< 768px`)**: `grid-cols-2` — Pastas fechadas ocupam 1 coluna (`col-span-1`) e aberta ocupa 2 colunas (`col-span-2`).
- **Meio Termo (`md:` / `768px - 1279px`)**: `grid-cols-3` — Pastas fechadas ocupam 1 coluna. Aberta ocupa 2 colunas até 8 itens; a partir de 9 itens expande horizontalmente para 3 colunas (`md:col-span-3`). Só cria 3ª linha vertical se exceder 12 itens.
- **Desktop (`xl:` / `>= 1280px`)**: `grid-cols-4` — Pastas fechadas ocupam 1 coluna. Aberta expande horizontalmente (2 -> 3 -> 4 colunas) para acomodar itens antes de quebrar para a 3ª linha vertical.
- **Classe Tailwind do Grid**: `grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 [grid-auto-flow:dense] gap-3.5 sm:gap-4 md:gap-5`.

#### Regra Mandatória de Expansão Horizontal da Pasta Aberta:
- **Prioridade Horizontal Absoluta**: A pasta aberta **nunca** deve criar uma terceira linha vertical de serviços se ainda houver colunas livres na grade do breakpoint atual.
- O card da pasta aberta deve primeiro expandir horizontalmente para ocupar todas as colunas disponíveis da grade (`col-span-2` -> `col-span-3` no meio termo; `col-span-2` -> `col-span-3` -> `col-span-4` no desktop).
- Apenas quando a pasta já estiver ocupando **100% da largura da linha** (todas as colunas do breakpoint) e o número de itens exceder a capacidade de 2 linhas é que ela crescerá verticalmente para formar uma 3ª linha.

#### Card de Criação de Pasta ("+ Nova Pasta"):
- **Ponto Único de Criação**: A criação de novas pastas é realizada **exclusivamente através do card simulado de pasta** inline no grid de projetos.
- **Formato & Geometria Rigorosamente Idêntica às Pastas**: Card com `col-span-1 w-full aspect-square rounded-2xl` e padding `p-3.5 sm:p-4`, borda tracejada `border-2 border-dashed border-[#3e3423] hover:border-[#d4af37]`, fundo `bg-transparent` em repouso e mesmo efeito de luz radial difusa vinda do centro no hover (`radial-gradient`), ícone `+` em círculo centralizado e texto "Nova Pasta".
- **Elemento & Acessibilidade Mobile**: Utiliza `<motion.div role="button" tabIndex={0}>` com as mesmas dimensões para garantir renderização milimetricamente idêntica às pastas no mobile e no desktop.
- **Comportamento no Grid**: Participa do mesmo `<LayoutGroup id="projects-grid">` e desliza suavemente ao lado das pastas vizinhas durante transições e reordenações.
- **Proibição de Botões Redundantes**: É estritamente **proibido** criar botões soltos de "Nova Pasta" no cabeçalho superior ou no topo da página.

### 6.4 Blocos de Serviços (`ServiceCard`)
- **Conceito**: "Naked Icons" (ícone puro + texto diretamente abaixo).
- **Sem Containers Pesados**: Não possui bordas ou fundos sólidos englobando o ícone.
- **Hover Individual Isolado**: Cada serviço é encapsulado com `group/service` e ganha um suave realce ultratranslúcido (`hover:bg-white/[0.03] rounded-xl p-2 sm:p-2.5 transition-all duration-200`) quando o cursor repousa sobre ele, sem afetar os demais serviços da pasta aberta nem conflitar com os botões de ação.
- **Botões de Ação Exclusivos**: Botões de edição e deleção só aparecem no serviço sob hover (`group-hover/service:opacity-100 pointer-events-none group-hover/service:pointer-events-auto`).
- **Tamanho do Ícone**: Proeminente (`w-10 h-10` a `w-16 h-16`), com `drop-shadow-md` e leve escala no hover (`group-hover/service:scale-105`).
- **Cores Oficiais**: Sempre exibe as cores originais da marca do serviço (Render mint `#46E3B7`, Supabase `#3ECF8E`, Stripe `#635BFF`, Vercel `#FFFFFF`, etc.).
- **Botão de Novo Serviço**:
  - Container redondo tracejado com o ícone `+` dentro (`rounded-full border-2 border-dashed border-[#8c734b]/70 hover:border-[#d4af37]`).
  - Alinhado com o mesmo padding e baseline dos serviços adjacentes.

### 6.5 Modais e Diálogos
- Fundo do backdrop: `bg-black/80 backdrop-blur-sm`.
- Container do modal: `rounded-2xl bg-[#151419] border-2 border-[#8c734b] shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)]`.
- Limite de altura responsivo: `max-h-[92vh] overflow-y-auto`.
- Fechamento suave: `animate-fade-in`.

### 6.6 Arte de Fundo da Deusa Mnemosine (Background Art)
- **Localização**: Ancorada no canto inferior direito da tela principal (`fixed bottom-0 right-0 pointer-events-none select-none z-0`).
- **Dimensões & Escala**:
  - **Desktop (`lg`)**: Ocupa exatamente **50% da altura do container principal** (`lg:h-[50vh] w-auto`).
  - **Mobile (`< lg`)**: Ocupa **40% da altura do container principal** (`h-[40vh] w-auto`).
- **Técnica de Fusão (Blending)**: Utiliza `mix-blend-screen`, tornando o fundo preto da imagem perfeitamente transparente e permitindo que as linhas clássicas em ouro da deusa se integrem diretamente ao gradiente de fundo da aplicação, sem caixas ou recortes retangulares visíveis.
- **Opacidade Equilibrada**: `opacity-70` para garantir presença visual nobre e marcante sem ofuscar cards ou textos na frente.
- **Sem Adornos de Cantoneiras**: Cantoneiras decorativas (adornos de acanto nos cantos superior e inferior direito) foram eliminadas, mantendo o visual sóbrio e moderno.

---

## 7. Checklist de Conformidade para Agentes & Desenvolvedores

Antes de concluir qualquer alteração de layout, verifique:
- [ ] **Containers**: Existe algum container/caixa/borda intermediária desnecessária? Se sim, remova-a.
- [ ] **Pastas**: As pastas possuem apenas nome (sem descrição)?
- [ ] **Título das Pastas**: O tamanho da fonte do título na pasta aberta é idêntico ao da pasta fechada (`text-sm sm:text-base font-bold`)?
- [ ] **Divisores**: Foi adicionada alguma linha divisória desnecessária entre o título e os serviços da pasta? Se sim, remova-a.
- [ ] **Grid 2x2 Fechado**: O gap entre os ícones é de 4px (`gap-[4px]`) e os ícones estão amplos e soltos?
- [ ] **Sidebar**: O item selecionado tem apenas a borda esquerda (`border-l-2 border-l-[#d4af37]`) sem brilhos ou bordas totais?
- [ ] **Cores das Marcas**: Os ícones dos serviços mantêm suas cores autênticas e não foram dessaturados ou forçados para dourado?
- [ ] **Animações Fluidas & Simétricas**: Toda animação de abertura/expansão possui seu efeito reverso simétrico e suave ao fechar?
- [ ] **Continuidade de Layout**: Elementos reposicionados utilizam `layout` e `<LayoutGroup>` sem saltos secos de reflow na tela?
- [ ] **Zero Aparições Abruptas**: Elementos novos entram com fade/escala gradual ou stagger, sem pop-ins secos?
