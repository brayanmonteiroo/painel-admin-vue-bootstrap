## Painel Admin Vue + Bootstrap

Painel administrativo simples desenvolvido com **Vue 3**, **Vite** e **Bootstrap 5**, utilizando também **Chart.js** para gráficos.  
Serve como base para criação de dashboards e áreas administrativas responsivas.

## Tecnologias principais

- **Vue 3**
- **Vite**
- **Bootstrap 5** e **Bootstrap Icons**
- **Vue Router**
- **Chart.js** / **vue-chartjs**
 - **Pinia** (state management)
 - **TypeScript**

## Pré‑requisitos

- **Node.js** `>= 20` (recomendado seguir a versão indicada no `package.json`)
- **npm** (vem junto com o Node)

## Como rodar o projeto

1. **Clonar o repositório**

   ```sh
   git clone <URL_DO_REPOSITORIO>
   cd painel-admin-vue-bootstrap
   ```

2. **Instalar as dependências**

   ```sh
   npm install
   ```

3. **Ambiente de desenvolvimento (hot reload)**

   ```sh
   npm run dev
   ```

   O Vite irá mostrar no terminal o endereço (geralmente `http://localhost:5173`).

4. **Build para produção**

   ```sh
   npm run build
   ```

   Os arquivos otimizados ficarão na pasta `dist/`.

5. **Preview do build de produção**

   ```sh
   npm run preview
   ```

## Scripts disponíveis

- **`npm run dev`**: sobe o servidor de desenvolvimento com hot reload.
- **`npm run build`**: faz o build otimizado para produção.
- **`npm run preview`**: serve localmente o build de produção.
- **`npm run type-check`**: roda o type-check com TypeScript/Vue.
 - **`npm run lint`**: roda o ESLint em arquivos `.ts`/`.vue`.
 - **`npm run format`**: formata o código com Prettier.
 - **`npm run test`**: executa testes unitários com Vitest.

## Arquitetura do template

- **Layouts**
  - `src/layouts/PublicLayout.vue`: layout simples para páginas públicas (Login, Cadastro, Recuperar senha, Home, About).
  - `src/layouts/DashboardLayout.vue`: layout principal do painel com sidebar, breadcrumb e área de conteúdo.
- **Rotas**
  - `src/router/auth.ts`: rotas públicas.
  - `src/router/dashboard.ts`: rotas do dashboard (protegidas por guard).
  - `src/router/errors.ts`: páginas de erro (`/403`, `/404`, `/500`).
- **Estado (Pinia)**
  - `src/store/auth.ts`: autenticação mock (usuário demo, login/logout, persistência em `localStorage`).
  - `src/store/ui.ts`: estado de UI (sidebar e notificações globais).
- **Serviços**
  - `src/services/authService.ts`: simulação de login.
  - `src/services/userService.ts`: lista de usuários mock.
  - `src/services/reportService.ts`: dados de relatórios mock.
- **Domínio**
  - `src/domain/*`: tipos TypeScript compartilhados (auth, usuários, relatórios).
- **Componentes de UI**
  - `src/components/ui/*`: botões, cards, inputs, selects, tabelas, alertas, etc.
  - `src/components/ui/GlobalNotifications.vue`: toasts/alerts globais baseados na store de UI.
- **Cores e tema**
  - `src/assets/theme.scss`: cores semânticas do template.
  - `src/assets/theme-contrast.scss`: contraste e tema light/dark (WCAG 2.1 AA). Regras de uso em [docs/design-tokens.md](docs/design-tokens.md).

## Como estender o template

1. **Criar uma nova view de dashboard**
   - Adicione um arquivo em `src/views`, por exemplo `RelatoriosFinanceirosView.vue`.
   - Use os componentes de UI (`AppPageHeader`, `AppCard`, `AppTable`, etc.) para montar a tela.
2. **Registrar a rota**
   - Inclua a nova rota em `src/router/dashboard.ts` como filha de `/dashboard`.
3. **Consumir um serviço**
   - Crie um serviço em `src/services` (ex.: `financeReportService.ts`) e tipos em `src/domain`.
   - Na view, chame o serviço em `onMounted` ou em uma action do Pinia, exibindo estados de loading/erro.
4. **Reutilizar componentes**
   - Prefira sempre os componentes `AppForm*` para inputs, `AppButton` para botões e `AppCard` para cartões.

## Licença

Use este projeto como base para estudos ou para criar o seu próprio painel administrativo.
