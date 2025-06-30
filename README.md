# CalliOpen Frontend
CalliOpen é uma aplicação web moderna para streaming de música, construída com React, Vite e Tauri, com foco em performance, experiência do usuário e integração desktop.

**Índice**
* Visão Geral
* Estrutura do Projeto
* Principais Componentes
* Providers e Contextos
* Arquitetura e Fluxos
* Ferramentas e Tecnologias
* Scripts Disponíveis
* Como Rodar
* Docker
* Dicas para Desenvolvimento
* Contribuição
* Documentação da API

---

## Visão Geral
O frontend do CalliOpen é responsável por toda a experiência do usuário, desde a autenticação, navegação, busca, reprodução de músicas, gerenciamento de playlists, até a integração com o backend via OpenAPI. O projeto é modular, escalável e preparado para rodar tanto na web quanto como aplicativo desktop (Tauri).

---

## Estrutura do Projeto
```bash
frontend/
├── api/                # OpenAPI specs e scripts de geração de client
├── docker/             # Dockerfile e configs do nginx
├── public/             # Assets públicos (logo, imagens)
├── src/
│   ├── api/            # Serviços, modelos e integrações com backend
│   │   ├── core/       # Infraestrutura de requisições
│   │   ├── models/     # Tipos e interfaces OpenAPI
│   │   └── services/   # Serviços de domínio (álbuns, playlists, etc)
│   ├── assets/         # Ícones, imagens, identidade visual
│   ├── components/
│   │   ├── blocks/     # Blocos de UI (cards, listas, forms, etc)
│   │   ├── generics/   # Componentes genéricos reutilizáveis
│   │   ├── identity/   # Branding e identidade visual
│   │   └── partials/   # Partes de páginas
│   ├── helpers/        # Funções utilitárias (ex: formatadores)
│   ├── hooks/          # React hooks customizados
│   ├── http/           # Hooks e serviços HTTP
│   ├── models/         # Tipos e interfaces locais
│   ├── pages/          # Páginas principais (álbuns, auth, dashboard, playlists)
│   ├── providers/      # Providers de contexto global
│   ├── traits/         # Tipos utilitários para props
│   ├── App.tsx         # Componente raiz
│   ├── main.tsx        # Entry point
├── src-tauri/          # Integração com Tauri (desktop)
├── index.html          # HTML principal
├── package.json        # Dependências e scripts
├── tailwind.config.js  # Configuração do TailwindCSS
├── vite.config.ts      # Configuração do Vite
└── ...
```

**Principais Componentes**
* **Covers:** Exibição de capas de álbuns, playlists, etc.
* **Blocks:** Blocos de UI como listas de favoritos, playlists, loading, forms, cards, top charts, etc.
* **Partials:** Componentes parciais para composição de páginas.
* **Identity:** Componentes de identidade visual (logo, branding).
* **Generics:** Componentes genéricos reutilizáveis.

**Providers e Contextos**
* **AudioProvider:** Gerencia o estado global do player de áudio (play, pause, fila, etc).
* **ContextMenuProvider:** Gerencia menus de contexto customizados.
* **PopupProvider:** Gerencia popups e modais globais.

Esses providers ficam em providers e são usados no topo da árvore de componentes para fornecer contexto global.

## Arquitetura e Fluxos
* **Autenticação:** Utiliza hooks e contextos para login, registro e persistência de sessão.
* **Requisições HTTP:** Centralizadas em api e http, com tipagem forte via OpenAPI.
* **Gerenciamento de Estado:** Contextos para áudio, popups, menus e hooks para dados locais.
* **Estilização:** TailwindCSS para utilitários rápidos, SCSS para customizações e temas.
* **Componentização:** UI dividida em blocos reutilizáveis, facilitando manutenção e evolução.
* **Desktop:** Integração com Tauri para recursos nativos (notificações, arquivos, etc).

## Ferramentas e Tecnologias
* **React:** Biblioteca principal para UI.
* **Vite:** Bundler e dev server ultrarrápido.
* **TypeScript:** Tipagem estática.
* **TailwindCSS:** Utilitários CSS para estilização rápida.
* **Tauri:** Empacotamento para desktop (Windows, Linux, macOS).
* **Docker:** Containerização para desenvolvimento e produção.
* **OpenAPI:** Integração tipada com backend via client gerado.
* **ESLint:** Linting de código.
* **PostCSS:** Processamento de CSS.

## Scripts Disponíveis
* `npm install` — Instala dependências
* `npm run dev` — Inicia o servidor de desenvolvimento
* `npm run build` — Gera build de produção
* `npm run preview` — Visualiza build localmente
* `npm run lint` — Lint do código
* `npm run tauri dev` — Roda versão desktop (Tauri)

## Como Rodar

```bash
# 1. Instale as dependências:
npm install

# 2. Inicie o servidor de desenvolvimento:
npm run dev

# 3. Para rodar como app desktop (Tauri):
npm run tauri dev
```

## Docker
O projeto inclui Dockerfile e docker-compose.yml para facilitar deploy e testes em ambiente isolado.
Para rodar com Docker:

```bash
docker-compose up --build
```

## Api docs
A documentação da API para desenvolvimento pode ser encontrada em https://calliopen.com.br/api/documentation

## Contribuição
Pull requests são bem-vindos! Siga o padrão de código, escreva componentes reutilizáveis e utilize os providers/contextos globais quando necessário.