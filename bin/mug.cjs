#!/usr/bin/env node

const process = require("node:process");
const { installCodex, installClaude, installCursor, parseOptions, fail } = require("./mobile-ui-generator.cjs");

const VERSION = require("../package.json").version;

function printHelp() {
  console.log(`
mug v${VERSION} — Mobile UI Generator

Usage:
  mug init [--codex | --cursor | --claude] [--dest PATH] [--force]

Flags:
  --codex     Install Codex adapter (to ~/.codex/skills/)
  --cursor    Install Cursor adapter (to .cursor/)
  --claude    Install Claude Code adapter (default)
  --dest PATH Target project directory (default: current directory)
  --force     Overwrite existing files
  -h, --help  Show this help

Examples:
  npx mug init                   # Claude Code (default)
  npx mug init --codex           # Codex
  npx mug init --cursor          # Cursor
  npx mug init --cursor --dest /path/to/project
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

  if (command !== "init") {
    fail(`Unknown command: ${command}\nRun "mug --help" for usage.`);
  }

  const rest = args.slice(1);

  // Extract target flag from args
  let target = "claude"; // default
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

  const installers = { codex: installCodex, claude: installClaude, cursor: installCursor };
  installers[target](options);
}

run();
