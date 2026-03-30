# /mobile-ui-generator

Generate or refine a mobile UI page for a uni-app + Vue 3 + UnoCSS + wot-design-uni project.

## Use This Command When

- The user asks for a mobile page, mini program page, H5 page, or business mobile UI.
- The user asks for a page in a B-end enterprise style.
- The user asks for a workbench, list, detail, search, approval, dashboard, or starter-layer UI.

## Process

1. Classify the page as simple or complex.
2. For simple pages, generate directly from the project rules.
3. For complex pages, first write a structured Pencil prompt and then call Pencil MCP.
4. Keep the Pencil prompt focused on business goal, page modules, hierarchy, style constraints, technical constraints, and content restraint.
5. If the user provided a reference page or `.pen` style, include that in the prompt.
6. After Pencil returns, implement the page in the project with enterprise restraint and business clarity.
7. If Pencil is unavailable, fall back to direct generation.

## Prompt Template

Use this shape when preparing a Pencil prompt:

```text
Page type:
Business goal:
Target users:
Core modules:
Priority order:
Style constraints:
Technical constraints:
Content constraints:
User references:
Expected output:
```

## Style Rules

- Enterprise B-end first.
- Rational blue-gray first.
- No decorative copy unless required.
- No marketing-style hero sections unless explicitly requested.
- Keep information density focused on decisions and actions.
