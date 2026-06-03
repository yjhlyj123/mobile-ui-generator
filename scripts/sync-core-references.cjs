#!/usr/bin/env node
// ============================================================
// sync-core-references.cjs
// 把 core/ 的规范内容文件同步到三端 references/，保证「单一事实源」不漂移。
//
// 用法：
//   node scripts/sync-core-references.cjs           清空-重建三端 references/ 并复制
//   node scripts/sync-core-references.cjs --check   dry-run：只比对是否一致，不一致 exit 1
//
// 同步内容：core 顶层全部 *.md + tokens/ + visual-prompt-examples/
// 不同步：examples/（命令契约测试用例）、command-contract.yaml（开发期单一事实源）
// 目标：packages/mobile-ui-generator/{codex,claude,cursor}/references/
// ============================================================

const fs = require("node:fs");
const path = require("node:path");
const process = require("node:process");

const REPO_ROOT = path.resolve(__dirname, "..");
const PACKAGE_ROOT = path.join(REPO_ROOT, "packages", "mobile-ui-generator");
const CORE_DIR = path.join(PACKAGE_ROOT, "core");

const HOSTS = ["codex", "claude", "cursor"];
const SYNC_DIRS = ["tokens", "visual-prompt-examples"];

const isCheck = process.argv.includes("--check");

// 递归收集 {相对路径(posix): 内容} 到 map
function walkInto(absDir, relDir, map) {
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    const abs = path.join(absDir, entry.name);
    const rel = relDir ? path.posix.join(relDir, entry.name) : entry.name;
    if (entry.isDirectory()) {
      walkInto(abs, rel, map);
    } else {
      map.set(rel, fs.readFileSync(abs, "utf8"));
    }
  }
}

// core 应同步的内容快照
function collectSource() {
  const map = new Map();
  for (const name of fs.readdirSync(CORE_DIR)) {
    if (name.endsWith(".md")) {
      map.set(name, fs.readFileSync(path.join(CORE_DIR, name), "utf8"));
    }
  }
  for (const dir of SYNC_DIRS) {
    const abs = path.join(CORE_DIR, dir);
    if (fs.existsSync(abs)) walkInto(abs, dir, map);
  }
  return map;
}

// 某 references 目录的现有内容快照
function collectTarget(refDir) {
  const map = new Map();
  if (fs.existsSync(refDir)) walkInto(refDir, "", map);
  return map;
}

function syncOne(refDir, source) {
  fs.rmSync(refDir, { recursive: true, force: true });
  for (const [rel, content] of source) {
    const dest = path.join(refDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, content);
  }
}

function diffOne(refDir, source) {
  const target = collectTarget(refDir);
  const diffs = [];
  for (const [rel, content] of source) {
    if (!target.has(rel)) diffs.push(`缺失 ${rel}`);
    else if (target.get(rel) !== content) diffs.push(`不一致 ${rel}`);
  }
  for (const rel of target.keys()) {
    if (!source.has(rel)) diffs.push(`多余 ${rel}`);
  }
  return diffs;
}

function main() {
  const source = collectSource();
  let hasDiff = false;

  for (const host of HOSTS) {
    const refDir = path.join(PACKAGE_ROOT, host, "references");
    if (isCheck) {
      const diffs = diffOne(refDir, source);
      if (diffs.length) {
        hasDiff = true;
        console.error(`[${host}] references 与 core 不一致（${diffs.length} 项）：`);
        diffs.slice(0, 12).forEach((d) => console.error(`  - ${d}`));
        if (diffs.length > 12) console.error(`  ...还有 ${diffs.length - 12} 项`);
      } else {
        console.log(`[${host}] references 与 core 一致 ✓`);
      }
    } else {
      syncOne(refDir, source);
      console.log(`[${host}] 已同步 ${source.size} 个文件 → ${path.relative(REPO_ROOT, refDir)}`);
    }
  }

  if (isCheck && hasDiff) {
    console.error("\n请运行 `npm run sync:references` 修复后再提交。");
    process.exit(1);
  }
  if (isCheck) {
    console.log("\n所有端 references 与 core 一致。");
  }
}

main();
