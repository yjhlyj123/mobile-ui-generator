# mobile-ui-generator package

This package contains one shared mobile UI generator distributed to multiple agent runtimes.

## Contents

- `core`
  Shared design direction, workflow, and Pencil prompt guidance
- `codex`
  Codex skill adapter
- `claude`
  Claude Code adapter
- `cursor`
  Cursor adapter

## Shared Behavior

- Simple pages generate directly
- Complex pages first synthesize a structured Pencil prompt, then call Pencil MCP when available
- Final implementation must stay aligned with enterprise B-end constraints, information restraint, and project-level technical rules

## Complex Page Signals

- Workbench home pages
- Dashboards
- Approval-flow orchestration pages
- Multi-section composite home pages
- Custom-navigation business home pages
- Pages referencing a Pencil draft or `.pen` style
- Pages with clearly complex hierarchy or interaction flow

## Source of Truth

Treat `core/` as the canonical rule set.
Adapters should reference `core/` behavior instead of redefining product intent independently.
