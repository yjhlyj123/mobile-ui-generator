#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const {
  CONTRACT_PATH,
  buildRenderedDocs,
  loadContract,
  loadExamples,
  parseCommand,
  resolveExample
} = require("./command-contract-lib.cjs");

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function validateAcceptedAndInvalidCommands(contract) {
  for (const command of contract.combination_rules.accepted_commands) {
    const parsed = parseCommand(command === contract.namespace ? null : command, contract);
    if (parsed.errors.length > 0) {
      fail(`Accepted command failed to parse: ${command} -> ${parsed.errors.join("; ")}`);
    }
  }

  for (const command of contract.combination_rules.invalid_examples) {
    const parsed = parseCommand(command, contract);
    if (parsed.errors.length === 0) {
      fail(`Invalid command parsed successfully: ${command}`);
    }
  }
}

function validateExamples(contract) {
  const examples = loadExamples();
  for (const example of examples) {
    const resolved = resolveExample(example, contract);
    if (resolved.errors.length > 0) {
      fail(`Example ${example.id} has parse errors: ${resolved.errors.join("; ")}`);
    }

    const expected = example.expected;
    const checks = [
      ["normalized_command", resolved.normalizedCommand, expected.normalized_command],
      ["flow", resolved.flow, expected.flow],
      ["specialty", resolved.specialty, expected.specialty],
      ["pencil_policy", resolved.pencilPolicy, expected.pencil_policy],
      ["must_pause", resolved.mustPause, expected.must_pause]
    ];

    for (const [field, actual, wanted] of checks) {
      if (actual !== wanted) {
        fail(
          `Example ${example.id} mismatch on ${field}: expected ${JSON.stringify(
            wanted
          )}, got ${JSON.stringify(actual)}`
        );
      }
    }

    if (JSON.stringify(resolved.handling) !== JSON.stringify(expected.handling)) {
      fail(
        `Example ${example.id} mismatch on handling: expected ${JSON.stringify(
          expected.handling
        )}, got ${JSON.stringify(resolved.handling)}`
      );
    }

    if (JSON.stringify(resolved.stateFlow) !== JSON.stringify(expected.state_flow)) {
      fail(
        `Example ${example.id} mismatch on state flow: expected ${JSON.stringify(
          expected.state_flow
        )}, got ${JSON.stringify(resolved.stateFlow)}`
      );
    }
  }
}

function validateRenderedDocs(contract) {
  const renderedDocs = buildRenderedDocs(contract);
  for (const [filePath, expectedContents] of Object.entries(renderedDocs)) {
    if (!fs.existsSync(filePath)) {
      fail(`Generated doc is missing: ${path.relative(process.cwd(), filePath)}`);
    }

    const actualContents = fs.readFileSync(filePath, "utf8");
    if (actualContents !== expectedContents) {
      fail(
        `Generated doc is out of date: ${path.relative(
          process.cwd(),
          filePath
        )}\nRun: npm run render:docs`
      );
    }
  }
}

function validateContractShape(contract) {
  if (!Array.isArray(contract.public_commands) || contract.public_commands.length === 0) {
    fail(`Contract at ${CONTRACT_PATH} must define public_commands.`);
  }

  const stateIds = new Set(contract.execution_states.map((state) => state.id));
  for (const [flowName, states] of Object.entries(contract.state_flows)) {
    for (const stateId of states) {
      if (!stateIds.has(stateId)) {
        fail(`Flow ${flowName} references unknown state: ${stateId}`);
      }
    }
  }
}

function main() {
  const contract = loadContract();
  validateContractShape(contract);
  validateAcceptedAndInvalidCommands(contract);
  validateExamples(contract);
  validateRenderedDocs(contract);
  process.stdout.write("Command contract validation passed.\n");
}

main();
