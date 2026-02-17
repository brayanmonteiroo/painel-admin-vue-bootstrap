## Painel Admin Vue + Bootstrap

Painel administrativo simples desenvolvido com **Vue 3**, **Vite** e **Bootstrap 5**, utilizando também **Chart.js** para gráficos.  
Serve como base para criação de dashboards e áreas administrativas responsivas.

## Tecnologias principais

- **Vue 3**
- **Vite**
- **Bootstrap 5** e **Bootstrap Icons**
- **Vue Router**
- **Chart.js** / **vue-chartjs**

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

## Licença

Use este projeto como base para estudos ou para criar o seu próprio painel administrativo.
