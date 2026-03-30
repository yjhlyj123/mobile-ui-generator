# Mobile UI Generator Core Workflow

## 1. Split by Page Complexity

Simple pages:

- Standard form pages
- Regular list pages
- Regular detail pages
- Basic search pages
- Standard empty states
- Simple result pages

Complex pages:

- Workbench home pages
- Data dashboards
- Approval-flow orchestration pages
- Multi-section compound home pages
- Business home pages with custom navigation
- Pages referencing an existing Pencil draft or `.pen` style
- Pages with clearly complex information hierarchy or interaction flow

## 2. Choose the Path

- Simple page: generate directly from project rules and design constraints
- Complex page: first synthesize a structured Pencil prompt, then call Pencil MCP when available
- Pencil unavailable: fall back to the same business-first rules and continue delivery

## 3. Implement

- Use Pencil output as structure and visual direction, not as a license to drift away from enterprise style
- Convert the result into uni-app + Vue 3 + UnoCSS + wot-design-uni implementation
- Re-apply information restraint, business semantics, and safe-area requirements during implementation

## 4. Verify

- The final page still looks like an enterprise business system
- The final page does not add redundant explanatory text
- The final page satisfies both the Pencil structure and the local project rules
