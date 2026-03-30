# Mobile UI Generator Core Prompt Rules

When a page is complex, build a structured Pencil prompt instead of passing the raw user request through unchanged.

## Prompt Must Include

- Page type and business goal
- Target users and business scenario
- Core modules and their priority
- Style constraints
- Technical delivery constraints
- Content restraint rules
- Reference material if the user provided screenshots, a `.pen` file, or a design draft

## Style Constraints

- B-end enterprise tone
- Rational blue-gray direction
- Information restraint
- Weak decoration
- No marketing-style layout or copy

## Technical Constraints

- uni-app
- Vue 3
- UnoCSS
- wot-design-uni

## Content Constraints

- No weak-value descriptions
- No automatic item counts
- No generic function explanations
- No promotional wording

## Fallback Rule

- If Pencil MCP is unavailable, keep the same constraints and generate the page directly from the local skill or adapter rules
