#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

required_files=(
  "$REPO_ROOT/README.md"
  "$REPO_ROOT/package.json"
  "$REPO_ROOT/bin/mobile-ui-generator.cjs"
  "$REPO_ROOT/packages/mobile-ui-generator/README.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/design-spec.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/workflow.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/prompt-rules.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/pencil-prompt-template.md"
  "$REPO_ROOT/packages/mobile-ui-generator/codex/SKILL.md"
  "$REPO_ROOT/packages/mobile-ui-generator/codex/agents/openai.yaml"
  "$REPO_ROOT/packages/mobile-ui-generator/claude/CLAUDE.md"
  "$REPO_ROOT/packages/mobile-ui-generator/claude/commands/mobile-ui-generator.md"
  "$REPO_ROOT/packages/mobile-ui-generator/claude/agents/mobile-ui-generator.md"
  "$REPO_ROOT/packages/mobile-ui-generator/cursor/AGENTS.md"
  "$REPO_ROOT/packages/mobile-ui-generator/cursor/rules/mobile-ui-generator.mdc"
  "$REPO_ROOT/scripts/install-codex.sh"
  "$REPO_ROOT/scripts/install-claude.sh"
  "$REPO_ROOT/scripts/install-cursor.sh"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required file: $file" >&2
    exit 1
  fi
done

node --check "$REPO_ROOT/bin/mobile-ui-generator.cjs"
bash -n "$REPO_ROOT/scripts/install-codex.sh"
bash -n "$REPO_ROOT/scripts/install-claude.sh"
bash -n "$REPO_ROOT/scripts/install-cursor.sh"
bash -n "$REPO_ROOT/scripts/check-suite.sh"

echo "Suite validation passed."
