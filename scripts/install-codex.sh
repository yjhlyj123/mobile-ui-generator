#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: install-codex.sh [--source PATH] [--dest PATH]

Install the Codex adapter into $CODEX_HOME/skills/mobile-ui-generator by default.
EOF
}

SCRIPT_DIR="$(cd -- "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DEFAULT_SOURCE="$REPO_ROOT/packages/mobile-ui-generator/codex"
DEFAULT_DEST="${CODEX_HOME:-$HOME/.codex}/skills/mobile-ui-generator"

SOURCE_PATH="$DEFAULT_SOURCE"
DEST_PATH="$DEFAULT_DEST"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --source)
      SOURCE_PATH="$2"
      shift 2
      ;;
    --dest)
      DEST_PATH="$2"
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
  if [[ -d "$DEFAULT_SOURCE" ]]; then
    SOURCE_PATH="$DEFAULT_SOURCE"
  else
    echo "Source skill not found: $SOURCE_PATH" >&2
    exit 1
  fi
fi

if [[ -e "$DEST_PATH" ]]; then
  echo "Destination already exists: $DEST_PATH" >&2
  exit 1
fi

mkdir -p "$(dirname "$DEST_PATH")"
cp -R "$SOURCE_PATH" "$DEST_PATH"

echo "Installed Codex adapter to $DEST_PATH"
