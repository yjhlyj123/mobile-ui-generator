# Codex Adapter: Design Spec

Use this adapter as the Codex-facing summary of the core design rules.

## Design Direction

- Default to B端 enterprise pages for electronic signature, approval, contract, and workflow scenarios
- Use a rational blue-gray palette, weak decoration, clear hierarchy, and restrained emphasis
- Favor information structure, section rhythm, status tags, and spacing over visual packaging
- Keep the page professional, credible, and calm; do not drift into marketing or portfolio styling

## Information Restraint

- Keep only information that helps task completion, status reading, risk handling, or next-step action
- Do not add weak-value descriptive copy such as "currently X items", "this feature is used for...", or "helps you quickly..."
- Do not auto-fill section subtitles, functional descriptions, or count hints unless the user explicitly asks for them
- Allow helper text only for status explanation, validation, risk reminder, empty state guidance, or consequence disclosure

## Prohibited Patterns

- No large gradient hero, marketing banner, glass effect, floating icon, or oversized illustration by default
- No repeated high-saturation color blocks on the same screen
- No purely decorative copy or generic promotional CTA
- No exaggerated rounding or exhibition-style home pages for normal business pages

## Complex Page Signal

- Treat workbench home pages, dashboards, workflow editors, multi-section composite home pages, custom-navigation business home pages, and pages referencing a `.pen` design as complex pages
- Treat standard forms, normal lists, normal details, base search pages, empty states, and ordinary result pages as simple pages
- Complex pages should first produce a Pencil prompt before calling Pencil MCP when available
