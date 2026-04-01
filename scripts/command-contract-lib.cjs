const fs = require("node:fs");
const path = require("node:path");

const REPO_ROOT = path.resolve(__dirname, "..");
const CONTRACT_PATH = path.join(
  REPO_ROOT,
  "packages",
  "mobile-ui-generator",
  "core",
  "command-contract.yaml"
);
const EXAMPLES_DIR = path.join(
  REPO_ROOT,
  "packages",
  "mobile-ui-generator",
  "core",
  "examples"
);

const DOC_TARGETS = {
  readme: path.join(REPO_ROOT, "README.md"),
  claudeGuide: path.join(
    REPO_ROOT,
    "packages",
    "mobile-ui-generator",
    "claude",
    "CLAUDE.md"
  ),
  claudeCommand: path.join(
    REPO_ROOT,
    "packages",
    "mobile-ui-generator",
    "claude",
    "commands",
    "mobile-ui-generator.md"
  ),
  claudeAgent: path.join(
    REPO_ROOT,
    "packages",
    "mobile-ui-generator",
    "claude",
    "agents",
    "mobile-ui-generator.md"
  ),
  codexSkill: path.join(
    REPO_ROOT,
    "packages",
    "mobile-ui-generator",
    "codex",
    "SKILL.md"
  ),
  cursorAgents: path.join(
    REPO_ROOT,
    "packages",
    "mobile-ui-generator",
    "cursor",
    "AGENTS.md"
  ),
  cursorRule: path.join(
    REPO_ROOT,
    "packages",
    "mobile-ui-generator",
    "cursor",
    "rules",
    "mobile-ui-generator.mdc"
  )
};

function loadJsonLikeFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadContract() {
  return loadJsonLikeFile(CONTRACT_PATH);
}

function loadExamples() {
  return fs
    .readdirSync(EXAMPLES_DIR)
    .filter((fileName) => fileName.endsWith(".json"))
    .sort()
    .map((fileName) => loadJsonLikeFile(path.join(EXAMPLES_DIR, fileName)));
}

function parseCommand(command, contract) {
  const namespace = contract.namespace;
  if (!command) {
    return {
      input: null,
      namespace,
      tokens: [],
      complexity: null,
      specialty: null,
      utility: null,
      normalizedCommand: namespace,
      errors: []
    };
  }

  if (!command.startsWith(namespace)) {
    return {
      input: command,
      namespace,
      tokens: [],
      complexity: null,
      specialty: null,
      utility: null,
      normalizedCommand: null,
      errors: [`Command must start with ${namespace}`]
    };
  }

  const suffix = command.slice(namespace.length);
  const tokens = suffix.split(":").filter(Boolean);
  const complexityTokens = [];
  const specialtyTokens = [];
  const utilityTokens = [];
  const unknownTokens = [];

  const utilityDefs = contract.tokens.utility || {};

  for (const token of tokens) {
    if (contract.tokens.complexity[token]) {
      complexityTokens.push(token);
      continue;
    }
    if (contract.tokens.specialty[token]) {
      specialtyTokens.push(token);
      continue;
    }
    if (utilityDefs[token]) {
      utilityTokens.push(token);
      continue;
    }
    unknownTokens.push(token);
  }

  const errors = [];
  if (unknownTokens.length > 0) {
    errors.push(`Unknown token(s): ${unknownTokens.join(", ")}`);
  }

  if (specialtyTokens.length > 1) {
    errors.push("Only one specialty token is allowed.");
  }

  if (utilityTokens.length > 1) {
    errors.push("Only one utility token is allowed.");
  }

  if (utilityTokens.length > 0 && (complexityTokens.length > 0 || specialtyTokens.length > 0)) {
    errors.push("Utility tokens cannot be combined with complexity or specialty tokens.");
  }

  const complexitySet = new Set(complexityTokens);
  const hasD = complexitySet.has("d");
  const hasX = complexitySet.has("x");
  const hasS = complexitySet.has("s");

  if (hasS && hasX) {
    errors.push("Simple and complex tokens cannot be combined.");
  }

  if (hasS && hasD) {
    errors.push("Simple and design-first tokens cannot be combined.");
  }

  let complexity = null;
  if (hasD) {
    complexity = "d";
  } else if (hasX) {
    complexity = "x";
  } else if (hasS) {
    complexity = "s";
  }

  const specialty = specialtyTokens[0] || null;
  const utility = utilityTokens[0] || null;
  const normalizedTokens = [];
  if (utility) {
    normalizedTokens.push(utility);
  } else {
    if (complexity) {
      normalizedTokens.push(complexity);
    }
    if (specialty) {
      normalizedTokens.push(specialty);
    }
  }

  return {
    input: command,
    namespace,
    tokens,
    complexity,
    specialty,
    utility,
    normalizedCommand: normalizedTokens.length
      ? `${namespace}:${normalizedTokens.join(":")}`
      : namespace,
    errors
  };
}

function compareMetric(signal, traits) {
  const actual = traits[signal.metric];
  switch (signal.operator) {
    case "gte":
      return actual >= signal.value;
    case "gt":
      return actual > signal.value;
    case "eq":
      return actual === signal.value;
    default:
      throw new Error(`Unsupported operator: ${signal.operator}`);
  }
}

function inferComplexity(traits, contract) {
  const matchedSignals = contract.auto_detection.complex_signals
    .filter((signal) => compareMetric(signal, traits))
    .map((signal) => signal.id);

  const inferred =
    matchedSignals.length >= contract.auto_detection.complex_threshold
      ? "complex"
      : contract.auto_detection.default_without_hits;

  return {
    inferred,
    matchedSignals
  };
}

function normalizeFlow(parsed, inferredComplexity, example) {
  const missingInputs = new Set(example.missing_inputs || []);
  const request = example.request || {};
  const wantsRefactor = Boolean(request.refactor_requested);
  const hasReference = !missingInputs.has("reference_page");

  let flow;
  if (parsed.complexity === "d") {
    flow = "design_first";
  } else if (parsed.complexity === "x") {
    flow = "complex";
  } else if (parsed.complexity === "s") {
    flow = "simple";
  } else {
    flow = inferredComplexity;
  }

  if (wantsRefactor && hasReference) {
    flow = "refactor";
  }

  return flow;
}

function buildHandling(example, flow) {
  const missingInputs = new Set(example.missing_inputs || []);
  const request = example.request || {};
  const handling = [];

  if (missingInputs.has("screenshot")) {
    handling.push("missing_screenshot");
  }

  if (missingInputs.has("existing_code")) {
    handling.push("missing_existing_code");
  }

  if (missingInputs.has("interface_fields")) {
    handling.push("missing_interface_fields");
  }

  if (request.refactor_requested && missingInputs.has("reference_page")) {
    handling.push("missing_reference_page");
  }

  if (
    (flow === "complex" || flow === "design_first") &&
    example.runtime &&
    example.runtime.pencil_available === false
  ) {
    handling.push("missing_pencil");
  }

  return handling;
}

function resolveExample(example, contract) {
  const parsed = parseCommand(example.command, contract);
  const inferred = inferComplexity(example.traits || {}, contract);
  const flow = normalizeFlow(parsed, inferred.inferred, example);
  const handling = buildHandling(example, flow);
  const request = example.request || {};
  const needsDirectionChoice =
    flow === "refactor" ||
    ((flow === "complex" || flow === "design_first") &&
      example.runtime &&
      example.runtime.pencil_available !== false);
  const mustPause = needsDirectionChoice && !request.direction_selected;
  const pencilPolicy =
    flow === "design_first"
      ? "required"
      : flow === "complex" || flow === "refactor"
        ? "try"
        : "none";

  return {
    normalizedCommand: parsed.normalizedCommand,
    specialty: parsed.specialty,
    flow,
    pencilPolicy,
    mustPause,
    handling,
    stateFlow: contract.state_flows[flow],
    errors: parsed.errors,
    matchedSignals: inferred.matchedSignals
  };
}

function renderTable(headers, rows) {
  const head = `| ${headers.join(" | ")} |`;
  const divider = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.join(" | ")} |`);
  return [head, divider, ...body].join("\n");
}

function renderCommandMatrix(contract) {
  const rows = [];
  for (const [token, config] of Object.entries(contract.tokens.complexity)) {
    rows.push([`${contract.namespace}:${token}`, config.label, config.summary]);
  }
  for (const [token, config] of Object.entries(contract.tokens.specialty)) {
    rows.push([
      `${contract.namespace}:${token}`,
      config.label,
      `作为专项修饰符，聚焦 ${config.focus}`
    ]);
  }
  return renderTable(["命令", "模式", "说明"], rows);
}

function renderCombinationRules(contract) {
  const accepted = contract.combination_rules.accepted_commands.map((item) => `- \`${item}\``);
  const invalid = contract.combination_rules.invalid_examples.map((item) => `- \`${item}\``);
  const aliases = contract.combination_rules.compatibility_aliases.map(
    (item) => `- \`${item.command}\` -> \`${item.normalized_to}\`：${item.note}`
  );

  return [
    `- 优先级：\`${contract.combination_rules.precedence.join(" > ")}\``,
    `- ${contract.combination_rules.specialty_role}`,
    "",
    "**允许的命令形态**",
    ...accepted,
    "",
    "**兼容别名**",
    ...aliases,
    "",
    "**明确禁止**",
    ...invalid
  ].join("\n");
}

function renderAutoDetection(contract) {
  const rows = contract.auto_detection.complex_signals.map((signal) => [
    signal.label,
    signal.description
  ]);
  return [
    `- 无命令时，命中复杂信号达到 \`${contract.auto_detection.complex_threshold}\` 条及以上，解析为复杂模式。`,
    `- 未达到阈值时，默认解析为 \`${contract.auto_detection.default_without_hits}\`。`,
    "",
    renderTable(["复杂信号", "说明"], rows)
  ].join("\n");
}

function renderStateFlows(contract) {
  const flowEntries = Object.entries(contract.state_flows).map(([name, states]) => {
    const labels = states.map((stateId) => {
      const match = contract.execution_states.find((state) => state.id === stateId);
      return match ? `${stateId} (${match.label})` : stateId;
    });
    return `- \`${name}\`：${labels.join(" -> ")}`;
  });
  const pauses = contract.forced_pauses.map(
    (pause) => `- ${pause.trigger}：${pause.message}`
  );
  return [...flowEntries, "", "**强制停顿点**", ...pauses].join("\n");
}

function renderMissingMatrix(contract) {
  const rows = contract.missing_input_matrix.map((item) => [
    item.label,
    item.allowed_action,
    item.required_note,
    item.mode_effect
  ]);
  return renderTable(["缺失项", "允许动作", "必须说明", "模式影响"], rows);
}

function renderOutputContracts(contract) {
  const sections = Object.entries(contract.output_contracts).map(
    ([flow, items]) => `- \`${flow}\`：${items.join("；")}`
  );
  return sections.join("\n");
}

function renderAcceptance(contract) {
  return contract.acceptance_report.map((item) => `- ${item}`).join("\n");
}

function renderExampleSummary() {
  const examples = loadExamples();
  return examples
    .map((example) => `- \`${example.id}\`：${example.description}`)
    .join("\n");
}

function renderRootReadme(contract) {
  return `# ${contract.hosts.root_readme.title}

${contract.generated_notice}

一个面向 \`Codex\`、\`Claude Code\`、\`Cursor\` 的移动端 UI 生成 skill 套件。当前命令系统以 \`packages/mobile-ui-generator/core/command-contract.yaml\` 作为单一事实源，并通过脚本生成各端说明文档。

## 安装

### Codex

\`\`\`bash
npx mobile-ui-generator install codex
npx mobile-ui-generator update codex
\`\`\`

### Claude Code

\`\`\`bash
npx mobile-ui-generator install claude --dest /path/to/project
npx mobile-ui-generator update claude --dest /path/to/project
\`\`\`

### Cursor

\`\`\`bash
npx mobile-ui-generator install cursor --dest /path/to/project
npx mobile-ui-generator install cursor --dest /path/to/project --force
\`\`\`

### Pencil MCP

\`\`\`bash
npx mobile-ui-generator install-pencil-mcp
npx mobile-ui-generator install-pencil-mcp --client cursor
npx mobile-ui-generator install-pencil-mcp --client codex
npx mobile-ui-generator install-pencil-mcp --client claude
\`\`\`

## 命令契约

${renderCommandMatrix(contract)}

## 组合与优先级

${renderCombinationRules(contract)}

## 自动判定

${renderAutoDetection(contract)}

## 执行状态机

${renderStateFlows(contract)}

## 输入缺失处理矩阵

${renderMissingMatrix(contract)}

## 输出契约

${renderOutputContracts(contract)}

## 验收汇报

${renderAcceptance(contract)}

## 黄金示例

${renderExampleSummary()}

## 开发命令

\`\`\`bash
npm run render:docs
npm run validate:contract
npm run check
\`\`\`
`;
}

function renderClaudeGuide(contract) {
  return `# ${contract.hosts.claude.title}

${contract.generated_notice}

## 单一事实源

- 命令契约：\`packages/mobile-ui-generator/core/command-contract.yaml\`
- 文档生成：\`npm run render:docs\`
- 契约校验：\`npm run validate:contract\`

## 命令矩阵

${renderCommandMatrix(contract)}

## 组合规则

${renderCombinationRules(contract)}

## 执行状态机

${renderStateFlows(contract)}

## 缺失输入处理

${renderMissingMatrix(contract)}

## 输出与验收

**输出契约**

${renderOutputContracts(contract)}

**验收汇报**

${renderAcceptance(contract)}

## Pencil 安装与验证

- 优先执行 \`${contract.installer_commands.pencil_npx}\`
${contract.hosts.claude.verification.map((item) => `- ${item}`).join("\n")}
`;
}

function renderClaudeCommand(contract) {
  return `# /mug:* — 移动端 UI 生成器

${contract.generated_notice}

## 统一命令矩阵

${renderCommandMatrix(contract)}

## 组合优先级

${renderCombinationRules(contract)}

## 默认自动判定

${renderAutoDetection(contract)}

## 标准执行流程

${renderStateFlows(contract)}

## 缺失输入矩阵

${renderMissingMatrix(contract)}

## 标准输出

${renderOutputContracts(contract)}

## Claude Code 内的 Pencil 处理

- 未检测到 Pencil 时，优先执行 \`${contract.installer_commands.pencil_npx}\`
${contract.hosts.claude.verification.map((item) => `- ${item}`).join("\n")}
`;
}

function renderClaudeAgent(contract) {
  return `# mobile-ui-generator Agent Notes

${contract.generated_notice}

- 所有命令解析、缺失输入处理、状态机与验收要求，都以 \`packages/mobile-ui-generator/core/command-contract.yaml\` 为准。
- complex/design_first 在 Pencil 可用时，必须先给出至少 3 个 UI 方案；用户未选方向前，禁止继续结构化 prompt 或直接实现。
- 设计先行模式必须先完成 Pencil 安装或验证。
- 如果 Pencil 未连通，只允许排查问题、汇报阻塞原因并终止当前开发；禁止继续输出页面实现代码。
- 重构模式必须先给出 3 个方向；用户未选方向前，禁止直接实现。
- 每次交付都要汇报：${contract.acceptance_report.join("、")}。
`;
}

function renderCodexSkill(contract) {
  const description =
    "基于可校验命令契约的移动端 UI 生成器，统一管理 /mug:* 命令、状态机、缺失输入处理与验收汇报。";

  return `---
name: mobile-ui-generator
description: ${description}
---

# ${contract.hosts.codex.title}

${contract.generated_notice}

## 命令契约

${renderCommandMatrix(contract)}

## 组合与状态机

${renderCombinationRules(contract)}

${renderStateFlows(contract)}

## 缺失输入处理

${renderMissingMatrix(contract)}

## Pencil 验证

- 优先执行 \`${contract.installer_commands.pencil}\`
${contract.hosts.codex.verification.map((item) => `- ${item}`).join("\n")}

## 交付要求

${renderOutputContracts(contract)}

## 验收汇报

${renderAcceptance(contract)}
`;
}

function renderCoreReferenceSection() {
  return `## ⚠️ 核心引用文件（必读）

进入 complex / design_first / refactor 模式时，你 **必须** 阅读以下文件以了解完整流程、输出格式和设计引导规则：

- \`core/workflow.md\` — 完整工作流定义，包括 Pencil 设计工作流 5 步骤
- \`core/ui-direction-template.md\` — 3 个 UI 方案的标准输出模板（必须严格遵循此格式）
- \`core/design-guidance.md\` — 设计引导 4 阶段流程和迭代确认规则
- \`core/pencil-prompt-template.md\` — 结构化 Prompt 编写模板
- \`core/design-spec.md\` — 设计规范和自检清单

> **不阅读这些文件就开始实现代码，是严重违规行为。**`;
}

function renderHardPauseSection() {
  return `## ⚠️ 硬性停顿规则（不可绕过）

以下规则的优先级高于一切其他指令：

1. **design_first / complex 模式选定方案前**：在用户以明确文字回复（如「选方案 A」「我选 2」）之前，**绝对禁止** 进入 \`build_structured_prompt\`。你必须先使用 \`core/ui-direction-template.md\` 的标准格式输出至少 3 个差异化 UI 方案。
2. **design_first / complex 模式选定方案后**：生成结构化 Prompt 后，**必须调用 Pencil MCP 生成 UI，并明确询问用户是否接受该 UI**。在用户明确同意之前，**绝对禁止** 进入 \`implement_code\` 阶段。
3. **refactor 模式**：在用户选择重构方向之前，**绝对禁止** 进入 \`implement_code\` 阶段。
4. **Pencil 未连通时**：**绝对禁止** 产出页面实现代码。只允许输出诊断和阻塞结论。
5. 如果你在用户未选择/未确认 UI 之前就开始写代码，**你的输出将被视为无效**，用户将要求你重新执行。

> 正确的做法是：输出 3 个方案后，在最后写一句「请选择一个方案（A/B/C），或告诉我需要微调的方向。」然后 **停止输出，等待用户回复**。
> UI 生成后，写一句「这是为您生成的设计图，请确认是否满意？同意后我将开始编写代码。」然后 **停止输出，等待用户回复**。`;
}

function renderCursorAgents(contract) {
  return `# ${contract.hosts.cursor.title}

${contract.generated_notice}

在 Cursor 中使用本适配器时，命令、状态机、缺失输入处理和验收要求全部以 \`packages/mobile-ui-generator/core/command-contract.yaml\` 为准。

## 命令矩阵

${renderCommandMatrix(contract)}

## Cursor 侧关键规则

${renderCombinationRules(contract)}

${renderStateFlows(contract)}

${renderCoreReferenceSection()}

${renderHardPauseSection()}

## Pencil 验证

- 优先执行 \`${contract.installer_commands.pencil} --client cursor\`
${contract.hosts.cursor.verification.map((item) => `- ${item}`).join("\n")}
`;
}

function renderCursorRule(contract) {
  return `---
name: mobile-ui-generator
description: 为 uni-app 项目构建企业级移动端 UI。命令解析、状态机、缺失输入矩阵与验收报告均由 command-contract.yaml 统一定义。
---

# ${contract.hosts.cursor.title}

${contract.generated_notice}

## 命令矩阵

${renderCommandMatrix(contract)}

## 组合规则

${renderCombinationRules(contract)}

## 执行状态机

${renderStateFlows(contract)}

${renderCoreReferenceSection()}

${renderHardPauseSection()}

## 缺失输入处理矩阵

${renderMissingMatrix(contract)}

## 输出与验收

${renderOutputContracts(contract)}

${renderAcceptance(contract)}
`;
}

function buildRenderedDocs(contract) {
  return {
    [DOC_TARGETS.readme]: renderRootReadme(contract),
    [DOC_TARGETS.claudeGuide]: renderClaudeGuide(contract),
    [DOC_TARGETS.claudeCommand]: renderClaudeCommand(contract),
    [DOC_TARGETS.claudeAgent]: renderClaudeAgent(contract),
    [DOC_TARGETS.codexSkill]: renderCodexSkill(contract),
    [DOC_TARGETS.cursorAgents]: renderCursorAgents(contract),
    [DOC_TARGETS.cursorRule]: renderCursorRule(contract)
  };
}

module.exports = {
  CONTRACT_PATH,
  DOC_TARGETS,
  EXAMPLES_DIR,
  REPO_ROOT,
  buildRenderedDocs,
  loadContract,
  loadExamples,
  parseCommand,
  resolveExample
};
