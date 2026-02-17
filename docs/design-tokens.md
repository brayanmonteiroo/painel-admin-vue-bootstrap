# Cores e tema

## Onde as cores são definidas

- **`src/assets/theme.scss`**: cores semânticas do template (primary, secondary, success, info, warning, danger). Importado antes do Bootstrap para sobrescrever o mapa de cores.
- **`src/assets/theme-contrast.scss`**: fonte de verdade para contraste e tema claro/escuro. Define variáveis para `[data-bs-theme='light']` e `[data-bs-theme='dark']`: body, secundárias, bordas, links, gráficos. Ajustes de tema e novos tokens de contraste devem ser feitos aqui.

O tema efetivo é aplicado em `html` via `data-bs-theme` (controlado pelo toggle no layout).

## Regras de uso

- Usar sempre `var(--bs-*)` (ou variáveis que derivem delas) em componentes e estilos. Evitar hex ou cores fixas.
- **Fundo de página**: em toda a aplicação é `--bs-body-bg`, aplicado na raiz (`html`, `#app`, `body`) e nos layouts. Não duplicar em wrappers full-page (evitar `bg-body` em divs que só querem o mesmo fundo da página).
- Superfícies elevadas (sidebar, header, cards) podem usar `bg-body`, `bg-body-secondary` ou variáveis do tema quando o design exigir.

## Contraste e acessibilidade

- O `theme-contrast.scss` segue WCAG 2.1 AA para combinações de texto e fundo (body-color sobre body-bg, secondary, bordas, links).
- Novos tokens devem manter contraste adequado; preferir variáveis já definidas em `theme-contrast.scss` em vez de cores soltas.
