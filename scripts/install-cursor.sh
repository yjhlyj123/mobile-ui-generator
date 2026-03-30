#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: install-cursor.sh [--source PATH] [--dest PATH]

Install the Cursor adapter into the target project root by default.
The script copies the rule file into .cursor/rules and places the adapter note
into .cursor/AGENTS.md if it does not already exist.
EOF
}

SCRIPT_DIR="$(cd -- "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DEFAULT_SOURCE="$REPO_ROOT/packages/mobile-ui-generator/cursor"
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

if [[ ! -d "$SOURCE_PATH" ]]; then
  echo "Source Cursor adapter not found: $SOURCE_PATH" >&2
  exit 1
fi

mkdir -p "$DEST_ROOT/.cursor/rules"

if [[ -e "$DEST_ROOT/.cursor/rules/mobile-ui-generator.mdc" ]]; then
  echo "Destination already has Cursor rule: $DEST_ROOT/.cursor/rules/mobile-ui-generator.mdc" >&2
  exit 1
fi

cp "$SOURCE_PATH/rules/mobile-ui-generator.mdc" "$DEST_ROOT/.cursor/rules/mobile-ui-generator.mdc"

if [[ -f "$SOURCE_PATH/AGENTS.md" && ! -e "$DEST_ROOT/.cursor/AGENTS.md" ]]; then
  cp "$SOURCE_PATH/AGENTS.md" "$DEST_ROOT/.cursor/AGENTS.md"
fi

echo "Installed Cursor adapter to $DEST_ROOT/.cursor"
