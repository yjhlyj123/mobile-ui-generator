# Codex Adapter: Workflow

Use this adapter flow in Codex.

## 1. Classify the Page

- Simple pages: standard forms, normal lists, normal detail pages, base search pages, empty states, ordinary result pages
- Complex pages: workbench home pages, dashboards, workflow editors, multi-section composite home pages, custom-navigation business home pages, and pages referencing existing Pencil drafts or `.pen` style

## 2. Decide the Path

- Simple page: generate directly from the skill rules
- Complex page: first synthesize a Pencil prompt, then call Pencil MCP if available
- Pencil unavailable: fall back to the skill rules and keep shipping

## 3. Implement

- Use the Pencil output as structure and visual direction only
- Convert the result into uni-app + Vue 3 + UnoCSS + wot-design-uni code
- Apply the core design spec and information restraint rules during implementation

## 4. Verify

- Check that the page matches the business scenario and interaction priority
- Check that the page does not add redundant explanatory text
- Check that the final UI still looks like an enterprise business system
