#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const {
  buildRenderedDocs,
  loadContract
} = require("./command-contract-lib.cjs");

function main() {
  const contract = loadContract();
  const renderedDocs = buildRenderedDocs(contract);

  for (const [filePath, contents] of Object.entries(renderedDocs)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, contents);
    process.stdout.write(`Rendered ${path.relative(process.cwd(), filePath)}\n`);
  }
}

main();
