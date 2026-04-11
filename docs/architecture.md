# Architecture notes

## Component organization

`components/` is organized by responsibility:

- `components/layout/`: Site chrome (header/footer/shell)
- `components/home/`: Homepage-only sections and related components
- `components/ui/`: Reusable UI elements used across routes
- `components/visuals/`: Three.js / canvas / visual-only components

`components/index.ts` exports the main public surface so app routes can import from `@/components`.

## Styling

- Global styles live in `app/globals.css` (tokens, base elements, global utilities).
- Feature and section styles are colocated as CSS Modules next to the owning component (example: `components/home/*.module.css`).

