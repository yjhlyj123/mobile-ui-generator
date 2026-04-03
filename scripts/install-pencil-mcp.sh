#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: install-pencil-mcp.sh [--client auto|codex|claude|cursor|vscode] [--force] [--no-launch]

Install Pencil for the current AI client and print verification steps.

Examples:
  bash scripts/install-pencil-mcp.sh
  bash scripts/install-pencil-mcp.sh --client cursor
  bash scripts/install-pencil-mcp.sh --client codex --force
EOF
}

CLIENT="auto"
FORCE=0
NO_LAUNCH=0
PENCIL_EXTENSION_ID="highagency.pencildev"
PENCIL_APP_NAME="Pencil.app"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --client)
      CLIENT="${2:-}"
      shift 2
      ;;
    --force)
      FORCE=1
      shift
      ;;
    --no-launch)
      NO_LAUNCH=1
      shift
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

log() {
  printf '[install-pencil-mcp] %s\n' "$1" >&2
}

fail() {
  printf '[install-pencil-mcp] %s\n' "$1" >&2
  exit 1
}

have_cmd() {
  command -v "$1" >/dev/null 2>&1
}

resolve_mcp_server_binary_name() {
  local os arch
  os="$(uname -s)"
  arch="$(uname -m)"

  case "$os:$arch" in
    Darwin:arm64)
      printf 'mcp-server-darwin-arm64'
      ;;
    Darwin:x86_64)
      printf 'mcp-server-darwin-x64'
      ;;
    Linux:arm64|Linux:aarch64)
      printf 'mcp-server-linux-arm64'
      ;;
    Linux:x86_64)
      printf 'mcp-server-linux-x64'
      ;;
    *)
      fail "Unsupported platform for Pencil MCP server lookup: $os/$arch"
      ;;
  esac
}

detect_client() {
  if [[ "$CLIENT" != "auto" ]]; then
    printf '%s' "$CLIENT"
    return
  fi

  if have_cmd cursor; then
    printf 'cursor'
    return
  fi

  if have_cmd codex; then
    printf 'codex'
    return
  fi

  if have_cmd claude; then
    printf 'claude'
    return
  fi

  if have_cmd code; then
    printf 'vscode'
    return
  fi

  printf 'codex'
}

download_pencil_app() {
  local os arch url tmp_dir archive_path
  os="$(uname -s)"
  arch="$(uname -m)"
  tmp_dir="$(mktemp -d)"

  case "$os:$arch" in
    Darwin:arm64)
      url="https://www.pencil.dev/download/Pencil-mac-arm64.dmg"
      archive_path="$tmp_dir/Pencil-mac-arm64.dmg"
      ;;
    Darwin:x86_64)
      url="https://www.pencil.dev/download/Pencil-mac-x64.dmg"
      archive_path="$tmp_dir/Pencil-mac-x64.dmg"
      ;;
    Linux:x86_64)
      url="https://www.pencil.dev/download/Pencil-linux-x86_64.AppImage"
      archive_path="$tmp_dir/Pencil-linux-x86_64.AppImage"
      ;;
    *)
      rm -rf "$tmp_dir"
      fail "Unsupported platform: $os/$arch. Open https://www.pencil.dev/downloads and install Pencil manually."
      ;;
  esac

  log "Downloading Pencil from $url"
  curl -L --fail --progress-bar "$url" -o "$archive_path"
  printf '%s\n' "$archive_path"
}

install_mac_app() {
  local archive_path mount_point app_source preferred_dest fallback_dest install_root app_dest
  archive_path="$1"
  preferred_dest="/Applications"
  fallback_dest="$HOME/Applications"

  if [[ -w "$preferred_dest" ]]; then
    install_root="$preferred_dest"
  else
    install_root="$fallback_dest"
    mkdir -p "$install_root"
  fi

  app_dest="$install_root/$PENCIL_APP_NAME"

  if [[ -d "$app_dest" && "$FORCE" -ne 1 ]]; then
    log "Pencil already exists at $app_dest"
    printf '%s\n' "$app_dest"
    return
  fi

  mount_point="$(hdiutil attach "$archive_path" -nobrowse -quiet | awk 'END {print $NF}')"
  if [[ -z "$mount_point" ]]; then
    fail "Failed to mount Pencil disk image."
  fi

  app_source="$mount_point/$PENCIL_APP_NAME"
  if [[ ! -d "$app_source" ]]; then
    hdiutil detach "$mount_point" -quiet || true
    fail "Mounted image does not contain $PENCIL_APP_NAME."
  fi

  if [[ -d "$app_dest" ]]; then
    rm -rf "$app_dest"
  fi

  cp -R "$app_source" "$app_dest"
  hdiutil detach "$mount_point" -quiet || true

  if [[ "$NO_LAUNCH" -ne 1 ]]; then
    open -a "$app_dest" || true
  fi

  printf '%s\n' "$app_dest"
}

install_linux_app() {
  local archive_path install_root app_dest
  archive_path="$1"
  install_root="$HOME/.local/bin"
  app_dest="$install_root/pencil"

  mkdir -p "$install_root"

  if [[ -f "$app_dest" && "$FORCE" -ne 1 ]]; then
    log "Pencil already exists at $app_dest"
    printf '%s\n' "$app_dest"
    return
  fi

  cp "$archive_path" "$app_dest"
  chmod +x "$app_dest"
  printf '%s\n' "$app_dest"
}

install_desktop_app() {
  local archive_path os installed_path
  os="$(uname -s)"

  case "$os" in
    Darwin)
      if [[ -d "/Applications/$PENCIL_APP_NAME" && "$FORCE" -ne 1 ]]; then
        installed_path="/Applications/$PENCIL_APP_NAME"
        log "Pencil already exists at $installed_path"
        if [[ "$NO_LAUNCH" -ne 1 ]]; then
          open -a "$installed_path" || true
        fi
      elif [[ -d "$HOME/Applications/$PENCIL_APP_NAME" && "$FORCE" -ne 1 ]]; then
        installed_path="$HOME/Applications/$PENCIL_APP_NAME"
        log "Pencil already exists at $installed_path"
        if [[ "$NO_LAUNCH" -ne 1 ]]; then
          open -a "$installed_path" || true
        fi
      else
        archive_path="$(download_pencil_app)"
        installed_path="$(install_mac_app "$archive_path")"
      fi
      ;;
    Linux)
      if [[ -f "$HOME/.local/bin/pencil" && "$FORCE" -ne 1 ]]; then
        installed_path="$HOME/.local/bin/pencil"
        log "Pencil already exists at $installed_path"
      else
        archive_path="$(download_pencil_app)"
        installed_path="$(install_linux_app "$archive_path")"
      fi
      ;;
    *)
      fail "Unsupported desktop platform: $os"
      ;;
  esac

  log "Installed Pencil to $installed_path"
  printf '%s\n' "$installed_path"
}

find_pencil_mcp_server() {
  local installed_path binary_name candidate
  installed_path="${1:-}"
  binary_name="$(resolve_mcp_server_binary_name)"

  shopt -s nullglob
  local -a candidates=()

  # 优先查找 IDE 插件（Cursor / VS Code），再查找桌面应用
  candidates+=(
    "$HOME/.cursor/extensions"/highagency.pencildev-*/out/"$binary_name"
    "$HOME/.vscode/extensions"/highagency.pencildev-*/out/"$binary_name"
  )

  if [[ -n "$installed_path" && -d "$installed_path" ]]; then
    candidates+=("$installed_path/Contents/Resources/app.asar.unpacked/out/$binary_name")
  fi

  candidates+=(
    "/Applications/$PENCIL_APP_NAME/Contents/Resources/app.asar.unpacked/out/$binary_name"
    "$HOME/Applications/$PENCIL_APP_NAME/Contents/Resources/app.asar.unpacked/out/$binary_name"
  )

  for candidate in "${candidates[@]}"; do
    if [[ -x "$candidate" ]]; then
      shopt -u nullglob
      printf '%s\n' "$candidate"
      return
    fi
  done

  shopt -u nullglob
  fail "Pencil MCP server binary not found. Pencil desktop app is installed, but no usable mcp-server binary was found for Codex registration."
}

configure_codex_mcp() {
  local installed_path server_path existing_config latest_config
  installed_path="$1"

  if ! have_cmd codex; then
    fail "Codex CLI not found. Install Codex and enable its shell command first."
  fi

  # find_pencil_mcp_server 已按 IDE 插件优先、桌面应用兜底的顺序查找
  server_path="$(find_pencil_mcp_server "$installed_path")"
  existing_config="$(codex mcp get pencil 2>/dev/null || true)"

  if [[ "$existing_config" == *"command: $server_path"* && "$existing_config" == *"args: --app desktop"* ]]; then
    log "Codex MCP server 'pencil' is already configured correctly."
    return
  fi

  if [[ -n "$existing_config" ]]; then
    log "Replacing existing Codex MCP server config for pencil."
    codex mcp remove pencil >/dev/null
  fi

  log "Registering Pencil MCP server in Codex using $server_path"
  codex mcp add pencil -- "$server_path" --app desktop >/dev/null

  latest_config="$(codex mcp get pencil 2>/dev/null || true)"
  if [[ "$latest_config" != *"command: $server_path"* ]]; then
    fail "Codex MCP registration failed: configured command does not point to $server_path."
  fi

  if [[ "$latest_config" != *"args: --app desktop"* ]]; then
    fail "Codex MCP registration failed: configured args are not '--app desktop'."
  fi

  log "Codex MCP server 'pencil' is configured."
}

install_cursor_extension() {
  local args
  if ! have_cmd cursor; then
    fail "Cursor CLI not found. Install Cursor and enable its shell command first."
  fi

  log "Installing Cursor extension $PENCIL_EXTENSION_ID"
  args=(--install-extension "$PENCIL_EXTENSION_ID")
  if [[ "$FORCE" -eq 1 ]]; then
    args+=(--force)
  fi
  cursor "${args[@]}"
}

install_vscode_extension() {
  local args
  if ! have_cmd code; then
    fail "VS Code CLI not found. Install VS Code and enable its shell command first."
  fi

  log "Installing VS Code extension $PENCIL_EXTENSION_ID"
  args=(--install-extension "$PENCIL_EXTENSION_ID")
  if [[ "$FORCE" -eq 1 ]]; then
    args+=(--force)
  fi
  code "${args[@]}"
}

print_common_next_steps() {
  cat <<'EOF'

Next steps:
1. Complete Pencil activation in the app or IDE extension.
2. Open an existing `.pen` file, or create a new one such as `test.pen`.
EOF
}

print_cursor_verification() {
  cat <<'EOF'

Verify in Cursor:
- Open `Settings -> Tools & MCP` and confirm Pencil is connected.
- Create or open a `.pen` file and check that the Pencil editor/icon appears.

How to use next:
- Keep the `.pen` file open in Cursor.
- Continue with `/mug:d`, `/mug:d:form`, or a complex page request so AI can use Pencil first, then implement code.
EOF
}

print_vscode_verification() {
  cat <<'EOF'

Verify in VS Code:
- Create or open a `.pen` file and confirm the Pencil icon/editor appears.
- Check MCP connectivity in your AI tooling settings if your workflow exposes it.

How to use next:
- Keep the `.pen` file open in VS Code.
- Then continue your design task from the AI panel so Pencil can handle the design structure first.
EOF
}

print_codex_verification() {
  cat <<'EOF'

Verify in Codex:
- Keep Pencil running.
- Run `codex mcp get pencil` and confirm the command points to Pencil's `mcp-server` with args `--app desktop`.
- Open Codex and run `/mcp`.
- Confirm Pencil appears in the MCP server list and is no longer relying on a Cursor-hosted MCP process.

How to use next:
- Open an existing `.pen` file in Pencil, or create a new one.
- Then continue with `/mug:d` or a complex page request in Codex so the design flow runs before code generation.
EOF
}

print_claude_verification() {
  cat <<'EOF'

Verify in Claude Code:
- Keep Pencil running.
- Run `claude` once and complete browser login if you have not authenticated yet.
- Open a `.pen` file and confirm Pencil no longer shows a Claude connection warning.

How to use next:
- Keep Pencil open with the `.pen` file.
- Then continue with `/mug:d`, `/mug:d:form`, or another design-first request in Claude Code.
EOF
}

main() {
  local resolved_client installed_path
  resolved_client="$(detect_client)"
  log "Resolved client: $resolved_client"

  case "$resolved_client" in
    cursor)
      install_cursor_extension
      print_common_next_steps
      print_cursor_verification
      ;;
    vscode)
      install_vscode_extension
      print_common_next_steps
      print_vscode_verification
      ;;
    codex)
      # 优先检查是否已有 IDE 插件的 mcp-server 可用，避免强制安装桌面应用
      local existing_server=""
      existing_server="$(find_pencil_mcp_server "" 2>/dev/null || true)"
      if [[ -n "$existing_server" && "$FORCE" -ne 1 ]]; then
        log "Found existing Pencil MCP server via IDE extension: $existing_server"
        installed_path=""
      else
        installed_path="$(install_desktop_app)"
      fi
      configure_codex_mcp "$installed_path"
      print_common_next_steps
      print_codex_verification
      ;;
    claude)
      install_desktop_app
      print_common_next_steps
      print_claude_verification
      ;;
    *)
      fail "Unsupported client: $resolved_client"
      ;;
  esac
}

main "$@"
