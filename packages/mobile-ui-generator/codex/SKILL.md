---
name: mobile-ui-generator
description: Build enterprise mobile UI for uni-app projects with a rational blue-gray, business-first style. Use for mini program pages, H5 pages, form pages, list pages, detail pages, workbench home pages, dashboards, approval flows, search pages, and starter-layer UI. For simple pages generate directly; for complex pages first synthesize a structured Pencil prompt, then call Pencil MCP when available.
---

# Mobile UI Generator For Codex

Use this Codex adapter to generate business mobile pages that follow the shared mobile UI generator rules.

## Read Order

1. Read `references/design-spec.md`
2. Read `references/workflow.md`
3. If the page is complex, read `references/prompt-rules.md` and `references/pencil-prompt-template.md`
4. If the task is starter or project setup work, read `references/project-setup.md`
5. If the task includes empty states, read `references/empty-state-assets.md`

## Core Rules

- Prefer `wd-xxx` components
- Use `<script setup lang="ts">`
- Keep the UI enterprise-first, restrained, and information-dense
- Do not add filler descriptions, count hints, or generic feature explanations unless the user explicitly asks
- For complex pages, never send raw user text to Pencil; always synthesize a structured Pencil prompt first
- If Pencil MCP is unavailable, fall back to the same design rules and continue delivery

## Assets

- Reuse `assets/starter/` when setting up a new project
- Reuse `assets/placeholders/` for empty states before inventing new placeholder graphics

## Final Check

- The final page matches the business scenario and information priority
- The final page satisfies both the Pencil structure and the Codex implementation constraints
- The final page still looks like an enterprise system instead of a marketing page
