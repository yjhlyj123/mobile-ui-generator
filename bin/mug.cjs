#!/usr/bin/env node

const process = require("node:process");
const { installCodex, installClaude, installCursor, detectInstalledTargets, upgradeToLatest, parseOptions, fail } = require("./mobile-ui-generator.cjs");

const VERSION = require("../package.json").version;

function printHelp() {
  console.log(`
mug v${VERSION} — Mobile UI Generator

Usage:
  mug init [--codex | --cursor | --claude] [--dest PATH] [--force]
  mug upgrade [--codex | --cursor | --claude] [--dest PATH]

Commands:
  init      Install adapter to the specified target (default: claude)
  upgrade   Fetch latest version from npm and update adapter(s)
            Without a target flag, auto-detects and upgrades all installed adapters

Flags:
  --codex     Target Codex adapter (to ~/.codex/skills/)
  --cursor    Target Cursor adapter (to .cursor/)
  --claude    Target Claude Code adapter (default for init)
  --dest PATH Target project directory (default: current directory)
  --force     Overwrite existing files
  -h, --help  Show this help

Examples:
  npx mug init                   # Claude Code (default)
  npx mug init --codex           # Codex
  npx mug init --cursor          # Cursor
  npx mug upgrade                # Upgrade all installed adapters
  npx mug upgrade --codex        # Upgrade Codex only
  npx mug upgrade --cursor --dest /path/to/project
`.trim());
}

function run() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "-h" || command === "--help") {
    printHelp();
    return;
  }

  if (command === "-v" || command === "--version") {
    console.log(VERSION);
    return;
  }

  if (command !== "init" && command !== "upgrade") {
    fail(`Unknown command: ${command}\nRun "mug --help" for usage.`);
  }

  const rest = args.slice(1);

  // Extract target flag from args
  let target = command === "init" ? "claude" : null; // upgrade defaults to auto-detect
  const filtered = [];

  for (const arg of rest) {
    if (arg === "--codex") {
      target = "codex";
    } else if (arg === "--cursor") {
      target = "cursor";
    } else if (arg === "--claude") {
      target = "claude";
    } else {
      filtered.push(arg);
    }
  }

  const options = parseOptions(filtered);

  if (options.help) {
    printHelp();
    return;
  }

  if (command === "upgrade") {
    if (target) {
      upgradeToLatest([target], filtered);
    } else {
      const detected = detectInstalledTargets(options.dest);
      if (detected.length === 0) {
        fail("No installed adapters detected. Use 'mug upgrade --codex' or similar to specify a target.");
      }
      console.log(`Detected installed adapters: ${detected.join(", ")}`);
      upgradeToLatest(detected, filtered);
    }
    return;
  }

  const installers = { codex: installCodex, claude: installClaude, cursor: installCursor };
  installers[target](options);
}

run();
