#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

required_files=(
  "$REPO_ROOT/README.md"
  "$REPO_ROOT/QUICK-START.md"
  "$REPO_ROOT/package.json"
  "$REPO_ROOT/bin/mobile-ui-generator.cjs"
  "$REPO_ROOT/packages/mobile-ui-generator/README.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/design-spec.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/command-contract.yaml"
  "$REPO_ROOT/packages/mobile-ui-generator/core/workflow.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/prompt-rules.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/pencil-prompt-template.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/page-hierarchy.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/tabbar-styles.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/ui-direction-template.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/design-guidance.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/theming.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/extensibility.md"
  "$REPO_ROOT/packages/mobile-ui-generator/core/tokens/base-tokens.scss"
  "$REPO_ROOT/packages/mobile-ui-generator/core/tokens/semantic-tokens.scss"
  "$REPO_ROOT/packages/mobile-ui-generator/core/tokens/theme-contract.ts"
  "$REPO_ROOT/packages/mobile-ui-generator/core/tokens/theme-presets/blue.json"
  "$REPO_ROOT/packages/mobile-ui-generator/core/tokens/theme-presets/orange.json"
  "$REPO_ROOT/packages/mobile-ui-generator/core/tokens/theme-presets/green.json"
  "$REPO_ROOT/packages/mobile-ui-generator/core/examples/simple-form.json"
  "$REPO_ROOT/packages/mobile-ui-generator/core/examples/complex-workbench-auto.json"
  "$REPO_ROOT/packages/mobile-ui-generator/core/examples/design-first-missing-pencil.json"
  "$REPO_ROOT/packages/mobile-ui-generator/core/examples/refactor-with-reference.json"
  "$REPO_ROOT/packages/mobile-ui-generator/core/examples/refactor-without-reference.json"
  "$REPO_ROOT/packages/mobile-ui-generator/core/examples/alias-design-list.json"
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
  "$REPO_ROOT/scripts/install-pencil-mcp.sh"
  "$REPO_ROOT/scripts/command-contract-lib.cjs"
  "$REPO_ROOT/scripts/render-command-docs.cjs"
  "$REPO_ROOT/scripts/validate-command-contract.cjs"
)


for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required file: $file" >&2
    exit 1
  fi
done

node --check "$REPO_ROOT/bin/mobile-ui-generator.cjs"
node --check "$REPO_ROOT/scripts/command-contract-lib.cjs"
node --check "$REPO_ROOT/scripts/render-command-docs.cjs"
node --check "$REPO_ROOT/scripts/validate-command-contract.cjs"
bash -n "$REPO_ROOT/scripts/install-codex.sh"
bash -n "$REPO_ROOT/scripts/install-claude.sh"
bash -n "$REPO_ROOT/scripts/install-cursor.sh"
bash -n "$REPO_ROOT/scripts/install-pencil-mcp.sh"
bash -n "$REPO_ROOT/scripts/check-suite.sh"
node "$REPO_ROOT/scripts/validate-command-contract.cjs"

echo "Suite validation passed."
