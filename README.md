# mobile-ui-generator

> AUTO-GENERATED from `packages/mobile-ui-generator/core/command-contract.yaml`. Run `npm run render:docs` after editing the contract.

一个面向 `Codex`、`Claude Code`、`Cursor` 的移动端 UI 生成 skill 套件。当前命令系统以 `packages/mobile-ui-generator/core/command-contract.yaml` 作为单一事实源，并通过脚本生成各端说明文档。

## 安装

### Codex

```bash
npx mobile-ui-generator install codex
npx mobile-ui-generator update codex
```

### Claude Code

```bash
npx mobile-ui-generator install claude --dest /path/to/project
npx mobile-ui-generator update claude --dest /path/to/project
```

### Cursor

```bash
npx mobile-ui-generator install cursor --dest /path/to/project
npx mobile-ui-generator install cursor --dest /path/to/project --force
```

### Pencil MCP

```bash
npx mobile-ui-generator install-pencil-mcp
npx mobile-ui-generator install-pencil-mcp --client cursor
npx mobile-ui-generator install-pencil-mcp --client codex
npx mobile-ui-generator install-pencil-mcp --client claude
```

## 命令契约

| 命令 | 模式 | 说明 |
| --- | --- | --- |
| /mug:s | 简单模式 | 直接进入代码实现，不引入 Pencil 设计流。 |
| /mug:x | 复杂模式 | 先整理结构化 prompt，再尝试 Pencil，最后落代码。 |
| /mug:d | 设计先行 | 先确保 Pencil 可用，再执行设计流与代码实现。 |
| /mug:form | 表单专项 | 作为专项修饰符，聚焦 表单布局、校验、联动、录入效率 |
| /mug:list | 列表专项 | 作为专项修饰符，聚焦 搜索、筛选、空状态、列表密度 |
| /mug:detail | 详情专项 | 作为专项修饰符，聚焦 信息层级、状态表达、操作入口 |

## 组合与优先级

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

## 自动判定

- 无命令时，命中复杂信号达到 `2` 条及以上，解析为复杂模式。
- 未达到阈值时，默认解析为 `simple`。

| 复杂信号 | 说明 |
| --- | --- |
| 接口数量 ≥ 3 | 需要聚合多个接口数据。 |
| 独立业务模块 ≥ 3 | 同屏存在多个独立模块。 |
| 存在状态流转或审批流 | 页面存在明确的业务状态跳转。 |
| 存在自定义导航或 Tabbar | 页面结构超出普通单页。 |
| 首屏需展示 3 类以上不同性质的数据 | 同屏出现指标、列表、操作区等多类数据。 |
| 用户角色影响页面内容 | 不同角色看到的模块或操作不同。 |
| 包含图表或统计卡片 | 页面出现图表、进度环、统计卡片。 |
| 独立功能点 > 5 | 功能点较多，信息承载显著增加。 |

## 执行状态机

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

## 输入缺失处理矩阵

| 缺失项 | 允许动作 | 必须说明 | 模式影响 |
| --- | --- | --- | --- |
| 缺截图 | 允许按文字需求实现 | 必须标记“无视觉参考” | 保持原模式 |
| 缺现有页面代码 | 允许从零生成 | 不得声称“重构已完成” | 重构模式可继续，但要明确缺少目标代码上下文 |
| 缺字段/接口 | 允许生成 stub 结构 | 必须列出关键假设 | 保持原模式 |
| 缺参考页 | 禁止进入重构模式，改走普通生成模式 | 必须明确说明未进入重构模式 | 从 refactor 回退到 simple/complex/design_first |
| 缺 Pencil | 必须先执行安装、验证与诊断 | 优先调用 mobile-ui-generator install-pencil-mcp；若连接失败，必须定位根因、停止当前开发并阻塞，不得自动降级 | complex/design_first/refactor 先走安装校验，连接失败时终止当前开发并停在排查阶段 |

## 输出契约

- `simple`：直接产出页面实现代码；如缺字段，附带假设项
- `complex`：先给出至少 3 个 UI 方案；用户未选方案前不得继续结构化 prompt 或实现；用户选定后再产出结构化 prompt；若 Pencil 未连通，只允许输出诊断与阻塞结论，不得产出页面实现代码；若 Pencil 连通，必须调用 Pencil 生成图并明确询问用户是否接受，未同意前不得产出页面实现代码；再产出页面实现代码；说明是否成功走到 Pencil
- `design_first`：先说明 Pencil 验证或安装结果；再给出至少 3 个 UI 方案；用户未选方案前不得继续结构化 prompt / 设计意图或实现；用户选定后再产出结构化 prompt / 设计意图；若 Pencil 未连通，只允许输出诊断与阻塞结论，不得产出页面实现代码；若 Pencil 连通，必须调用 Pencil 生成图并明确询问用户是否接受，未同意前不得产出页面实现代码；最后产出页面实现代码
- `refactor`：先给出 3 个差异化重构方向；用户未选方向前不得直接实现；用户选定方向后再产出结构化 prompt；若 Pencil 未连通，只允许输出诊断与阻塞结论，不得产出页面实现代码；若 Pencil 连通，必须调用 Pencil 生成设计稿并展示给用户确认，未同意前不得写代码；实现后说明与参考页的差异点

## 验收汇报

- 是否走了 Pencil
- 若 Pencil 未连通，失败原因是什么
- 若 Pencil 未连通，是否已终止当前开发
- 关键假设有哪些
- 输出了哪些实现物
- **设计还原度**：逐区块对照 Pencil 设计稿的还原情况，偏差项及原因

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

## 黄金示例

- `alias-design-list`：兼容旧写法 /mug:d:x:list，并归一到设计先行
- `complex-workbench-auto`：无命令时根据复杂信号进入复杂模式
- `design-first-missing-pencil`：设计先行时缺 Pencil，必须先进入安装验证
- `detail-specialty`：/mug:s:detail 完整详情示例 — 合同详情，三层头部 + 附件 + 关联付款记录
- `form-specialty`：/mug:s:form 完整表单示例 — 合同新建表单，含自动推断校验规则和键盘类型
- `list-specialty`：/mug:s:list 完整列表示例 — 审批列表，信息密集型变体，含状态筛选和操作按钮
- `refactor-with-pencil`：重构模式必须走 Pencil 设计流程：选方向 → Pencil 设计 → 用户确认 → 写代码
- `refactor-with-reference`：有参考页的重构模式必须先停在方向选择
- `refactor-without-reference`：缺参考页时禁止进入重构模式
- `simple-form`：简单表单直接实现

## 开发命令

```bash
npm run render:docs
npm run validate:contract
npm run check
```
