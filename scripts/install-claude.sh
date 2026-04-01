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
  echo "Source Claude adapter not found: $SOURCE_PATH" >&2
  echo "This installer now requires generated adapter files from the repository source of truth." >&2
  exit 1
fi

echo "Installed Claude adapter to $DEST_ROOT"
