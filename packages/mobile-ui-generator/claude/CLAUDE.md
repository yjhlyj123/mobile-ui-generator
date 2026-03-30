# mobile-ui-generator for Claude Code

Use this adapter when working on mobile UI tasks for uni-app + Vue 3 + UnoCSS + wot-design-uni projects.

## Default Behavior

- Treat simple pages as direct generation tasks
- Treat complex pages as prompt-first design tasks
- Keep the final output aligned with enterprise B-end UI, rational blue-gray tone, information restraint, and weak decoration

## Page Complexity Rules

Simple pages:

- Standard form pages
- Ordinary list pages
- Ordinary detail pages
- Basic search pages
- Standard empty-state pages
- Ordinary result pages

Complex pages:

- Workbench home pages
- Data dashboards
- Approval flow composition pages
- Multi-section composite home pages
- Business home pages with custom navigation
- Pages that reference existing Pencil designs, `.pen` styles, or explicit design drafts
- Pages with clearly complex information hierarchy or interaction relationships

## Workflow

1. Classify the page as simple or complex
2. For simple pages, generate directly with the project and design rules
3. For complex pages, first write a structured Pencil prompt, then call Pencil MCP with that prompt
4. Use the Pencil result only as structure and visual guidance
5. Final implementation must still follow the project UI rules and this adapter's restraint rules
6. If Pencil MCP is unavailable, fall back to direct generation and continue delivery

## Copy Rules

- Prefer concise copy
- Keep titles, states, key data, and action labels
- Do not auto-add "X items", feature descriptions, or explanatory subtitles unless the user explicitly asks
