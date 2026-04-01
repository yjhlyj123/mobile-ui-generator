# 移动端 UI 生成器 — 核心工作流 v4.0

> 命令解析、组合优先级、缺失输入矩阵、状态机与验收汇报的单一事实源：`core/command-contract.yaml`
> 如需更新各端命令文档，执行：`npm run render:docs`

## 1. 页面类型与复杂度控制

用户使用 `/mug:` 命令显式控制页面类型和复杂度；无命令时按契约中的复杂信号自动判定。

- 命令与组合规则以 `core/command-contract.yaml` 为准
- `form/list/detail` 仅作为专项修饰符，不改变复杂度主判定
- `d > x > s`，兼容旧写法 `/mug:d:x`，但推荐统一使用 `/mug:d`

### 实用命令

| 命令 | 说明 |
|------|------|
| `/mug:theme` | 预览/切换主题配色方案 |
| `/mug:tabbar` | 快速生成 Tabbar 一级页面，触发风格选择流 |
| `/mug:check` | 对照 `design-spec.md` 自检当前页面 |
| `/mug:help` | 显示所有可用命令 |

## 2. 设计引导流程

当用户首次进入复杂模式或设计先行模式时，执行设计引导流程（详见 `core/design-guidance.md`）：

1. **需求收集**：通过结构化问答了解行业、人群、风格偏好
2. **风格推荐**：根据匹配矩阵推荐主题 + Tabbar 风格
3. **方案呈现**：使用 `core/ui-direction-template.md` 输出至少 3 个方案
4. **迭代确认**：用户选定前不得写代码

## 3. Tabbar 页面检测

当命中 `command-contract.yaml` 中的 `tabbar_signals` 时：

1. 自动判定为一级页面
2. 引用 `core/page-hierarchy.md` 的差异化规范
3. 从 `core/tabbar-styles.md` 选择至少 3 种风格方案呈现
4. 等待用户选择后进入实现

## 4. Pencil 设计工作流

针对所有非 simple 流程（`/mug:d`、`/mug:x`、重构模式），均须执行 Pencil 设计工作流。

> **核心原则：用户选完方案后不能直接写代码，必须先通过 Pencil 生成设计稿，用户确认设计满意后才进入代码实现。**

1. **工具检测**：
   - 执行 `mcp_call action='search', keyword='pencil'` 检测环境。
   - 若未找到 Pencil 相关工具，不要只停留在提醒层面；应先尝试帮助用户完成安装或接入。
   - 在本套件环境中，优先调用 `mobile-ui-generator install-pencil-mcp` 作为统一安装入口。
   - 优先按当前运行环境选择对应安装路径：
     - `Codex CLI`：安装 Pencil 桌面应用后，优先将 Pencil 自带 `mcp-server` 注册到 Codex；先执行 `codex mcp get pencil` 确认命令已指向 Pencil 自带二进制且参数为 `--app desktop`，再在 Codex 中执行 `/mcp` 确认 Pencil 已出现在 MCP 列表。
     - `Cursor`：优先引导安装 Pencil 扩展，并让用户到 `Settings -> Tools & MCP` 确认连接状态。
     - `Claude Code`：优先引导安装 Pencil 桌面应用或 IDE 扩展，并确认 Claude Code 已登录、Pencil 已激活。
   - 允许 AI 在本地具备明确安装能力时直接代用户执行安装步骤；若当前环境无法安全自动完成安装，则要输出一组可直接执行的安装步骤，而不是笼统地说"请自行安装"。
   - 无论是自动安装成功，还是仅完成引导，都必须补充"如何验证"和"如何开始使用"：
     - 如何验证 Pencil MCP 已接入
     - 下一步应使用什么命令或入口开始设计
   - 若安装或接入仍然失败，不得直接降级进入代码实现；必须继续定位失败原因，至少说明是"未注册到 Codex MCP / 注册命令错误 / 宿主进程未运行 / 版本路径失效"等哪一类问题。
   - 在 Pencil 未连通前，当前页面开发必须停止：只允许输出诊断结果、阻塞原因和下一步需要用户执行的动作，不允许继续产出页面实现代码，直到用户明确同意绕过 Pencil。
2. **方向提案**：若 Pencil 可用，必须先给出至少 3 个差异化 UI 方案（普通模式使用 `ui-direction-template.md`，重构模式使用 `pencil-prompt-template.md` 的 Refactor Mode Template），说明各自的布局策略、信息层级和首屏重点，并等待用户选择。
3. **结构化 Prompt**：用户选定方向后，再根据 `core/prompt-rules.md` 与 `core/pencil-prompt-template.md` 编写对应方向的结构化描述。
4. **视觉设计与迭代确认**：
   - 调用 Pencil 工具生成该方向的设计稿。
   - **必须将设计稿展示给用户查看**。
   - **必须等待用户对设计稿的明确确认**（如"可以了"、"开始写代码"）。
   - 如果用户要求修改，修改结构化 Prompt 后重新调用 Pencil，再次展示，循环直到用户满意。
   - **绝对禁止**：用户选完方案后跳过 Pencil 直接写代码。选定方案 ≠ 同意设计，用户还没看到实际视觉效果。
5. **工程化实现**：用户明确同意设计稿后，将设计意图转换为符合规范的 `uni-app` 代码。

> 具体状态机顺序（如 `install_or_verify_pencil`、`wait_for_direction_choice`）以 `core/command-contract.yaml` 为准。

## 5. 设计规范约束

本工具链严格遵循单源真理原则：
- **所有设计标记（Tokens）、组件用法和视觉规则详见：`core/design-spec.md`**。
- **Token 文件详见：`core/tokens/`（base-tokens.scss、semantic-tokens.scss）**。
- **主题扩展详见：`core/theming.md`**。
- **一级/二级页面差异详见：`core/page-hierarchy.md`**。
- 禁止在代码中硬编码任何非规范定义的颜色值、圆角或间距。
- 必须使用 CSS Custom Properties（`--mug-*`）引用 Token。

## 6. 实现与交付

- **技术栈**：uni-app + Vue 3 (`<script setup>`) + UnoCSS + SCSS。
- **组件库**：优先使用 `wot-design-uni` (前缀 `wd-`)。
- **语义化**：代码需具备清晰的业务语义，所有交互 handler 需提供 stub 实现。
- **主题**：所有颜色通过 CSS Custom Properties 引用。
- **自检**：交付前必须对照 `design-spec.md` 的自检清单。
