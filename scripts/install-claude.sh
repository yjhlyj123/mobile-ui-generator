#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: install-claude.sh [--source PATH] [--dest PATH]

Install the Claude adapter into the target project root by default.
The script copies CLAUDE.md to the destination root and the helper folders into
the destination's .claude directory.
EOF
}

SCRIPT_DIR="$(cd -- "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DEFAULT_SOURCE="$REPO_ROOT/packages/mobile-ui-generator/claude"
DEFAULT_DEST="$PWD"

SOURCE_PATH="$DEFAULT_SOURCE"
DEST_ROOT="$DEFAULT_DEST"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --source)
      SOURCE_PATH="$2"
      shift 2
      ;;
    --dest)
      DEST_ROOT="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if [[ -e "$DEST_ROOT/CLAUDE.md" ]]; then
  echo "Destination already has CLAUDE.md: $DEST_ROOT/CLAUDE.md" >&2
  exit 1
fi

mkdir -p "$DEST_ROOT/.claude"

if [[ -d "$SOURCE_PATH" ]]; then
  cp "$SOURCE_PATH/CLAUDE.md" "$DEST_ROOT/CLAUDE.md"
  if [[ -d "$SOURCE_PATH/commands" ]]; then
    mkdir -p "$DEST_ROOT/.claude/commands"
    cp -R "$SOURCE_PATH/commands/." "$DEST_ROOT/.claude/commands/"
  fi
  if [[ -d "$SOURCE_PATH/agents" ]]; then
    mkdir -p "$DEST_ROOT/.claude/agents"
    cp -R "$SOURCE_PATH/agents/." "$DEST_ROOT/.claude/agents/"
  fi
else
  cat > "$DEST_ROOT/CLAUDE.md" <<'EOF'
# mobile-ui-generator for Claude Code

Use this adapter when working on mobile UI tasks for uni-app + Vue 3 + UnoCSS + wot-design-uni projects.

## Default Behavior

- Treat simple pages as direct generation tasks.
- Treat complex pages as prompt-first design tasks.
- Keep the final output aligned with enterprise B-end UI, rational blue-gray tone, information restraint, and weak decoration.

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

1. Classify the page as simple or complex.
2. For simple pages, generate directly with the project and design rules.
3. For complex pages, first write a structured Pencil prompt, then call Pencil MCP with that prompt.
4. The Pencil prompt must include:
   - page type and business goal
   - target users and business scenario
   - key modules and priority order
   - style constraints: B-end, rational blue-gray, information restraint, no marketing tone
   - technical constraints: uni-app, Vue 3, UnoCSS, wot-design-uni
   - content constraints: do not add redundant descriptions, counters, or explanatory copy
   - any reference page, `.pen` style, or design draft provided by the user
5. Use the Pencil result only as structure and visual guidance.
6. Final implementation must still follow the project UI rules and this adapter's restraint rules.
7. If Pencil MCP is unavailable, fall back to direct generation and continue delivery.

## Copy Rules

- Prefer concise copy.
- Keep titles, states, key data, and action labels.
- Do not auto-add "X items", feature descriptions, or explanatory subtitles unless the user explicitly asks.

## Output Expectations

- Produce production-ready mobile UI.
- Prefer `wd-` components over custom visual repetition.
- Preserve safe area handling and business-state consistency.
EOF
  mkdir -p "$DEST_ROOT/.claude/commands" "$DEST_ROOT/.claude/agents"
  cat > "$DEST_ROOT/.claude/commands/mobile-ui-generator.md" <<'EOF'
# mobile-ui-generator

Use this command guidance for mobile UI tasks. Treat simple pages as direct generation tasks. Treat complex pages as prompt-first design tasks, and build a structured Pencil prompt before calling Pencil MCP when available.
EOF
  cat > "$DEST_ROOT/.claude/agents/mobile-ui-generator.md" <<'EOF'
# mobile-ui-generator Agent Notes

Keep output B-end enterprise-oriented, information-dense, and restrained. For complex pages, synthesize a Pencil prompt first, then use Pencil MCP if available.
EOF
fi

echo "Installed Claude adapter to $DEST_ROOT"
