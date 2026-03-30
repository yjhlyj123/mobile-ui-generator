# mobile-ui-generator

一个面向 `Codex`、`Claude Code`、`Cursor` 的移动端 UI 生成 skill 套件，支持通过 npm / npx 方式快速安装。

## 安装

### Codex

```bash
npx mobile-ui-generator install codex
```

### Claude Code

在目标项目根目录执行：

```bash
npx mobile-ui-generator install claude --dest /path/to/project
```

### Cursor

在目标项目根目录执行：

```bash
npx mobile-ui-generator install cursor --dest /path/to/project
```

## 使用 Demo

### Demo 1：给 Codex 安装 skill

```bash
npx mobile-ui-generator install codex
```

安装完成后，默认会生成：

```text
~/.codex/skills/mobile-ui-generator/
├── SKILL.md
├── agents/
├── assets/
└── references/
```

接下来你就可以在 Codex 里把 `mobile-ui-generator` 当作一个已安装 skill 使用。

### Demo 2：给 Claude Code 安装到项目里

```bash
npx mobile-ui-generator install claude --dest /path/to/project
```

安装完成后，目标项目里会出现：

```text
/path/to/project/
├── CLAUDE.md
└── .claude/
    ├── agents/
    └── commands/
```

这时 Claude Code 进入该项目后，就能读取到这套移动端 UI 规则。

### Demo 3：给 Cursor 安装到项目里

```bash
npx mobile-ui-generator install cursor --dest /path/to/project
```

安装完成后，目标项目里会出现：

```text
/path/to/project/.cursor/
├── AGENTS.md
└── rules/
    └── mobile-ui-generator.mdc
```

这时 Cursor 就能在项目上下文里使用对应规则文件。

### Demo 4：简单页面需求

需求示例：

> 帮我做一个 uni-app 报销申请页，包含报销类型、金额、事由、附件上传和提交按钮。页面要简洁，适合企业内部使用。

你可以这样提需求：

```text
使用 mobile-ui-generator，帮我生成一个 uni-app 报销申请页：
1. 表单项包括报销类型、报销金额、报销事由、附件上传
2. 底部有提交按钮
3. 风格偏企业业务系统，简洁、克制
4. 技术栈使用 Vue 3 + uni-app
```

这个 skill 通常会直接生成：

- 页面结构和字段布局
- 更适合业务系统的表单层级
- 可继续落地到项目里的页面代码

这个场景属于简单页面，一般不会先走 Pencil prompt 流程。

### Demo 5：复杂页面需求

需求示例：

> 帮我做一个 uni-app 审批工作台首页，包含待我审批、我发起的流程、常用入口、最近审批动态。风格偏企业业务系统，信息密度高一点，不要做成营销页。

你可以这样提需求：

```text
使用 mobile-ui-generator，帮我生成一个 uni-app 审批工作台首页：
1. 顶部展示用户信息和快捷操作
2. 中间展示待我审批、我发起、抄送我的数据卡片
3. 下方展示常用审批入口和最近审批动态
4. 风格要求偏企业业务系统，简洁、克制、信息密度高
5. 技术栈使用 Vue 3 + uni-app，优先复用现有业务组件
```

这个 skill 通常会按下面的方式工作：

- 先判断这是复杂工作台页面
- 先整理结构化 Pencil prompt
- 再基于整理后的结构进入页面实现
- 最终产出仍保持企业业务系统风格，而不是偏宣传页的 UI

你预期拿到的结果通常包括：

- 页面结构建议
- 模块优先级划分
- 更贴近业务系统的文案和布局方向
- 可继续落地到项目代码中的实现结果

## 支持内容

- 简单页面直接生成
- 复杂页面先生成结构化 Pencil prompt，再在可用时调用 Pencil MCP
- 保持企业业务系统风格、信息节制和统一工作流

## 仓库结构

```text
packages/mobile-ui-generator/core
packages/mobile-ui-generator/codex
packages/mobile-ui-generator/claude
packages/mobile-ui-generator/cursor
bin/mobile-ui-generator.cjs
```

## 本地开发

本仓库仍保留 shell 脚本入口，适合本地调试或不走 npm 分发时使用：

```bash
bash scripts/install-codex.sh
bash scripts/install-claude.sh --dest /path/to/project
bash scripts/install-cursor.sh --dest /path/to/project
```

## 校验

```bash
npm run check
```

或：

```bash
bash scripts/check-suite.sh
```
