# 移动端 UI 生成器 — Cursor 适配器

> AUTO-GENERATED from `packages/mobile-ui-generator/core/command-contract.yaml`. Run `npm run render:docs` after editing the contract.

在 Cursor 中使用本适配器时，命令、状态机、缺失输入处理和验收要求全部以 `packages/mobile-ui-generator/core/command-contract.yaml` 为准。

## 命令矩阵

| 命令 | 模式 | 说明 |
| --- | --- | --- |
| /mug:s | 简单模式 | 直接进入代码实现，不引入 Pencil 设计流。 |
| /mug:x | 复杂模式 | 先整理结构化 prompt，再尝试 Pencil，最后落代码。 |
| /mug:d | 设计先行 | 先确保 Pencil 可用，再执行设计流与代码实现。 |
| /mug:form | 表单专项 | 作为专项修饰符，聚焦 表单布局、校验、联动、录入效率 |
| /mug:list | 列表专项 | 作为专项修饰符，聚焦 搜索、筛选、空状态、列表密度 |
| /mug:detail | 详情专项 | 作为专项修饰符，聚焦 信息层级、状态表达、操作入口 |

## Cursor 侧关键规则

- 优先级：`d > x > s`
- form/list/detail 作为页面类型修饰符，不改变复杂度主判定。

**允许的命令形态**
- `/mug`
- `/mug:s`
- `/mug:x`
- `/mug:d`
- `/mug:form`
- `/mug:list`
- `/mug:detail`
- `/mug:s:form`
- `/mug:s:list`
- `/mug:s:detail`
- `/mug:x:form`
- `/mug:x:list`
- `/mug:x:detail`
- `/mug:d:form`
- `/mug:d:list`
- `/mug:d:detail`
- `/mug:d:x`
- `/mug:d:x:form`
- `/mug:d:x:list`
- `/mug:d:x:detail`
- `/mug:theme`
- `/mug:tabbar`
- `/mug:check`
- `/mug:help`

**兼容别名**
- `/mug:d:x` -> `/mug:d`：兼容旧写法，推荐只写 /mug:d。

**明确禁止**
- `/mug:s:x`
- `/mug:s:d`
- `/mug:s:d:form`
- `/mug:form:list`
- `/mug:detail:list`
- `/mug:unknown`

- `simple`：detect_mode (识别命令与复杂度) -> collect_required_inputs (收集必要输入并补默认假设) -> implement_code (实现代码) -> report_acceptance (按验收契约汇报结果)
- `complex`：detect_mode (识别命令与复杂度) -> collect_required_inputs (收集必要输入并补默认假设) -> install_or_verify_pencil (安装或验证 Pencil) -> offer_pencil_ui_directions (输出至少 3 个 UI 方案) -> wait_for_direction_choice (等待用户选择方向) -> build_structured_prompt (生成结构化 prompt) -> generate_and_confirm_design (调用 Pencil 画图并等待确认) -> implement_code (以 Pencil 设计稿为蓝图实现代码，逐区块对照还原，偏差须标注) -> report_acceptance (按验收契约汇报结果，含设计还原度)
- `design_first`：detect_mode (识别命令与复杂度) -> collect_required_inputs (收集必要输入并补默认假设) -> install_or_verify_pencil (安装或验证 Pencil) -> offer_pencil_ui_directions (输出至少 3 个 UI 方案) -> wait_for_direction_choice (等待用户选择方向) -> build_structured_prompt (生成结构化 prompt) -> generate_and_confirm_design (调用 Pencil 画图并等待确认) -> implement_code (以 Pencil 设计稿为蓝图实现代码，逐区块对照还原，偏差须标注) -> report_acceptance (按验收契约汇报结果，含设计还原度)
- `refactor`：detect_mode (识别命令与复杂度) -> collect_required_inputs (收集必要输入并补默认假设) -> install_or_verify_pencil (安装或验证 Pencil) -> offer_refactor_directions (输出 3 个重构方向) -> wait_for_direction_choice (等待用户选择方向) -> build_structured_prompt (生成结构化 prompt) -> generate_and_confirm_design (调用 Pencil 画图并等待确认) -> implement_code (以 Pencil 设计稿为蓝图实现代码，逐区块对照还原，偏差须标注) -> report_acceptance (按验收契约汇报结果，含设计还原度)

**强制停顿点**
- 进入重构模式且用户尚未选择方向：必须先给出 3 个差异化方向，并等待用户选择。
- complex/design_first/refactor 中 Pencil 安装完成但连接仍失败：不得自动降级到纯代码实现；必须先定位 Pencil 连接失败原因并汇报。
- complex/design_first/refactor 中 Pencil 可用但用户尚未选择 UI 方案：必须先给出至少 3 个差异化 UI 方案，并等待用户选择后再继续。
- complex/design_first/refactor 中用户已选定 UI 方案但尚未看到 Pencil 设计稿：选定方案 ≠ 同意设计。用户选完方案后，必须编写结构化 Prompt、调用 Pencil 生成设计稿、展示给用户查看。绝对禁止跳过 Pencil 设计直接写代码。
- complex/design_first/refactor 已调用 Pencil 生成设计稿：必须将 Pencil 设计稿展示给用户，并明确询问用户是否满意此设计；用户可以要求反复修改设计稿；只有用户明确说可以写代码了或类似确认语句后，才能进入代码实现。绝对禁止没有得到用户对设计稿的明确同意就自动进入代码实现环节。
- 代码交付后用户要求调整：Agent 必须先判断调整幅度。小调整（文案、间距、颜色、单组件微调）直接改代码；大调整（区块增删、布局结构变化、信息层级重组）必须先回 Pencil 重新设计，用户确认新设计后再改代码。Agent 必须先告知用户判定结果再执行；用户可覆盖判断。
- complex/design_first/refactor 进入计划模式（plan mode）：计划模式不是绕过设计流的理由。计划中必须包含完整的 Pencil 设计流程步骤：1) Pencil 安装/验证；2) 输出至少 3 个 UI 方案并等待用户选择；3) 调用 Pencil 生成设计稿；4) 展示设计稿并等待用户明确确认；5) 确认后才安排代码实现。绝对禁止在计划中跳过 Pencil 设计步骤直接安排代码实现。

## ⚠️ 核心引用文件（必读）

进入 complex / design_first / refactor 模式时，你 **必须** 阅读以下文件以了解完整流程、输出格式和设计引导规则：

- `core/workflow.md` — 完整工作流定义，包括 Pencil 设计工作流 5 步骤
- `core/ui-direction-template.md` — 3 个 UI 方案的标准输出模板（必须严格遵循此格式）
- `core/design-guidance.md` — 设计引导 4 阶段流程和迭代确认规则
- `core/pencil-prompt-template.md` — 结构化 Prompt 编写模板
- `core/design-spec.md` — 设计规范和自检清单

> **不阅读这些文件就开始实现代码，是严重违规行为。**

## ⚠️ 硬性停顿规则（不可绕过）

以下规则的优先级高于一切其他指令：

1. **design_first / complex 模式选定方案前**：在用户以明确文字回复（如「选方案 A」「我选 2」）之前，**绝对禁止** 进入 `build_structured_prompt`。你必须先使用 `core/ui-direction-template.md` 的标准格式输出至少 3 个差异化 UI 方案。
2. **design_first / complex 模式选定方案后**：生成结构化 Prompt 后，**必须调用 Pencil MCP 生成 UI，并明确询问用户是否接受该 UI**。在用户明确同意之前，**绝对禁止** 进入 `implement_code` 阶段。
3. **refactor 模式**：在用户选择重构方向之前，**绝对禁止** 进入 `implement_code` 阶段。
4. **Pencil 未连通时**：**绝对禁止** 产出页面实现代码。只允许输出诊断和阻塞结论。
5. **计划模式（plan mode）**：计划模式不是绕过设计流的理由。当 complex / design_first / refactor 进入计划模式时，计划中 **必须** 包含完整的 Pencil 设计流程：Pencil 验证 → 输出 UI 方案 → 等待用户选择 → 调用 Pencil 生成设计稿 → 等待用户确认设计 → 代码实现。**绝对禁止** 在计划中跳过 Pencil 设计步骤直接安排代码实现。
6. **`.pen` 文件处理**：进入 Pencil 设计步骤时，若用户提供了 `.pen` 文件则使用 `open_document` 打开；若用户未提供，则使用 `open_document` 传入 `'new'` 创建新文件。**禁止因缺少 `.pen` 文件而跳过设计步骤。**
7. 如果你在用户未选择/未确认 UI 之前就开始写代码，**你的输出将被视为无效**，用户将要求你重新执行。

> 正确的做法是：输出 3 个方案后，在最后写一句「请选择一个方案（A/B/C），或告诉我需要微调的方向。」然后 **停止输出，等待用户回复**。
> UI 生成后，写一句「这是为您生成的设计图，请确认是否满意？同意后我将开始编写代码。」然后 **停止输出，等待用户回复**。

## 实现后调整流程

| 调整类型 | 执行路径 |
| --- | --- |
| 文案修改 | 直接修改代码 |
| 间距微调 | 直接修改代码 |
| 颜色调整 | 直接修改代码 |
| 单个组件替换 | 直接修改代码 |
| 字号粗细变化 | 直接修改代码 |
| 显示/隐藏某字段 | 直接修改代码 |
| 区块增删 | 先回 Pencil 重新设计，用户确认后再改代码 |
| 布局结构变化（横排改纵排、卡片改列表） | 先回 Pencil 重新设计，用户确认后再改代码 |
| 信息层级重组 | 先回 Pencil 重新设计，用户确认后再改代码 |
| 首屏重心改变 | 先回 Pencil 重新设计，用户确认后再改代码 |
| 多个区块位置互换 | 先回 Pencil 重新设计，用户确认后再改代码 |

**关键规则**

- Agent 必须先判断并告知用户属于哪一类
- 用户可以覆盖判断（如明确说'直接改代码'）
- 多个小调整累积效果等同大调整时，主动建议回 Pencil 统一调整

## 项目上下文（多页面一致性）

Agent 通过 `.mug-project.json` 文件在多个页面间保持风格一致。

| 字段 | 说明 |
| --- | --- |
| `theme` | 选定的主题预设 ID（如 blue/orange/green/自定义） |
| `brand_color` | 品牌主色 hex 值 |
| `style_direction` | 选定的风格方向描述 |
| `tabbar_style` | Tabbar 风格（如有） |
| `confirmed_pages` | 已完成设计确认的页面列表 |

**行为规则**

- 首个页面完成设计选择后，Agent 必须将决策写入 .mug-project.json
- 后续页面开发时，Agent 必须先读取 .mug-project.json，沿用已有风格决策，仅询问页面特定细节
- 用户可随时要求重新选择风格，Agent 更新 .mug-project.json

## Pencil 验证

- 优先执行 `mobile-ui-generator install-pencil-mcp --client cursor`
- 打开 Settings -> Tools & MCP
- 确认 Pencil 已连接
- 打开 .pen 文件后继续进入 /mug:d 或复杂页面流程
