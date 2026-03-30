#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const process = require("node:process");

const REPO_ROOT = path.resolve(__dirname, "..");
const PACKAGE_ROOT = path.join(REPO_ROOT, "packages", "mobile-ui-generator");

function printHelp() {
  console.log(`
mobile-ui-generator

Usage:
  mobile-ui-generator install <codex|claude|cursor> [--dest PATH] [--source PATH]
  mobile-ui-generator help

Examples:
  mobile-ui-generator install codex
  mobile-ui-generator install claude --dest /path/to/project
  mobile-ui-generator install cursor --dest /path/to/project
`.trim());
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDir(source, destination) {
  fs.cpSync(source, destination, { recursive: true, errorOnExist: false });
}

function parseOptions(args) {
  const options = {};

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--dest" || arg === "--source") {
      const value = args[index + 1];
      if (!value) {
        fail(`Missing value for ${arg}`);
      }
      options[arg.slice(2)] = value;
      index += 1;
      continue;
    }

    if (arg === "-h" || arg === "--help") {
      options.help = true;
      continue;
    }

    fail(`Unknown argument: ${arg}`);
  }

  return options;
}

function installCodex(options) {
  const sourcePath = path.resolve(
    options.source || path.join(PACKAGE_ROOT, "codex")
  );
  const destPath = path.resolve(
    options.dest || path.join(process.env.CODEX_HOME || path.join(process.env.HOME || "", ".codex"), "skills", "mobile-ui-generator")
  );

  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isDirectory()) {
    fail(`Source skill not found: ${sourcePath}`);
  }

  if (fs.existsSync(destPath)) {
    fail(`Destination already exists: ${destPath}`);
  }

  ensureDir(path.dirname(destPath));
  copyDir(sourcePath, destPath);
  console.log(`Installed Codex adapter to ${destPath}`);
}

function installClaude(options) {
  const sourcePath = path.resolve(
    options.source || path.join(PACKAGE_ROOT, "claude")
  );
  const destRoot = path.resolve(options.dest || process.cwd());

  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isDirectory()) {
    fail(`Source Claude adapter not found: ${sourcePath}`);
  }

  const claudeFile = path.join(destRoot, "CLAUDE.md");
  if (fs.existsSync(claudeFile)) {
    fail(`Destination already has CLAUDE.md: ${claudeFile}`);
  }

  ensureDir(path.join(destRoot, ".claude"));
  fs.copyFileSync(path.join(sourcePath, "CLAUDE.md"), claudeFile);

  const commandsSource = path.join(sourcePath, "commands");
  if (fs.existsSync(commandsSource)) {
    ensureDir(path.join(destRoot, ".claude", "commands"));
    copyDir(commandsSource, path.join(destRoot, ".claude", "commands"));
  }

  const agentsSource = path.join(sourcePath, "agents");
  if (fs.existsSync(agentsSource)) {
    ensureDir(path.join(destRoot, ".claude", "agents"));
    copyDir(agentsSource, path.join(destRoot, ".claude", "agents"));
  }

  console.log(`Installed Claude adapter to ${destRoot}`);
}

function installCursor(options) {
  const sourcePath = path.resolve(
    options.source || path.join(PACKAGE_ROOT, "cursor")
  );
  const destRoot = path.resolve(options.dest || process.cwd());

  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isDirectory()) {
    fail(`Source Cursor adapter not found: ${sourcePath}`);
  }

  const destCursorRoot = path.join(destRoot, ".cursor");
  const ruleSource = path.join(sourcePath, "rules", "mobile-ui-generator.mdc");
  const ruleDest = path.join(destCursorRoot, "rules", "mobile-ui-generator.mdc");

  ensureDir(path.join(destCursorRoot, "rules"));

  if (fs.existsSync(ruleDest)) {
    fail(`Destination already has Cursor rule: ${ruleDest}`);
  }

  fs.copyFileSync(ruleSource, ruleDest);

  const agentsSource = path.join(sourcePath, "AGENTS.md");
  const agentsDest = path.join(destCursorRoot, "AGENTS.md");
  if (fs.existsSync(agentsSource) && !fs.existsSync(agentsDest)) {
    fs.copyFileSync(agentsSource, agentsDest);
  }

  console.log(`Installed Cursor adapter to ${destCursorRoot}`);
}

function run() {
  const [command, target, ...rest] = process.argv.slice(2);

  if (!command || command === "help" || command === "-h" || command === "--help") {
    printHelp();
    return;
  }

  if (command !== "install") {
    fail(`Unknown command: ${command}`);
  }

  if (!target || ["-h", "--help"].includes(target)) {
    printHelp();
    return;
  }

  const options = parseOptions(rest);
  if (options.help) {
    printHelp();
    return;
  }

  if (target === "codex") {
    installCodex(options);
    return;
  }

  if (target === "claude") {
    installClaude(options);
    return;
  }

  if (target === "cursor") {
    installCursor(options);
    return;
  }

  fail(`Unsupported target: ${target}`);
}

run();
