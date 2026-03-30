# Mobile UI Generator Cursor Adapter

This folder packages the Cursor-facing rules for `mobile-ui-generator`.

Source of truth:
- `rules/mobile-ui-generator.mdc`

Use this adapter when generating or refining mobile business pages in Cursor.
Keep the same default behavior as the main skill:
- Simple pages: generate directly from the skill rules
- Complex pages: generate a structured Pencil prompt first, then use Pencil if available
- Keep all outputs B-end business-oriented, information-dense, and restrained

When installing into a project, copy the rule file into the project’s `.cursor/rules/` directory and keep any project-specific instructions alongside the repo’s own agent guidance.
