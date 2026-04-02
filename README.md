# Mobile UI Generator

> 面向 Codex / Claude Code / Cursor 的移动端 UI 生成 Skill 套件。
> 技术栈：uni-app + Vue 3 + UnoCSS + wot-design-uni（微信小程序 + H5）

---

## 它能做什么

通过 `/mug` 命令驱动 AI 生成符合设计规范的移动端页面代码。支持从简单页面直出到 Pencil 设计稿驱动的完整工作流。

**典型场景：**

```bash
/mug:s 做一个用户列表页，包含搜索和状态筛选      # 简单页面，直接出代码
/mug:x 做一个工作台首页，有待办、统计、快捷入口   # 复杂页面，先出 3 个方案再选
/mug:d 做一个合同管理数据看板，有图表和审批流     # 设计先行，Pencil 出图 → 确认 → 写代码
/mug:s:form 做一个合同录入表单，含联动校验        # 表单专项
```

---

## 快速开始

### 1. 安装

```bash
# Codex
npx mobile-ui-generator install codex

# Claude Code
npx mobile-ui-generator install claude --dest /path/to/project

# Cursor
npx mobile-ui-generator install cursor --dest /path/to/project
```

### 2. 验证

在 AI 对话中输入 `/mug:help`，看到命令列表即安装成功。

### 3. 安装 Pencil（可选，复杂/设计模式需要）

```bash
npx mobile-ui-generator install-pencil-mcp
# 指定客户端：--client cursor | codex | claude
```

---

## 命令速查

### 复杂度模式

| 命令 | 模式 | 工作流 |
|------|------|--------|
| `/mug:s` | 简单 | 直接出代码 |
| `/mug:x` | 复杂 | 3 个方案 → 选方案 → Pencil 设计 → 确认 → 出代码 |
| `/mug:d` | 设计先行 | 同复杂模式，但强制要求 Pencil 可用 |
| `/mug` | 自动判定 | 根据复杂度信号自动选择简单或复杂模式 |

> 优先级：`d > x > s`。无命令时，命中 ≥2 条复杂信号自动进入复杂模式。

### 页面类型修饰符

| 修饰符 | 聚焦领域 |
|--------|----------|
| `:form` | 表单布局、校验、联动、录入效率 |
| `:list` | 搜索、筛选、空状态、操作按钮、列表密度 |
| `:detail` | 信息层级、状态表达、操作入口 |

修饰符可与模式组合使用：`/mug:x:form`、`/mug:d:list`、`/mug:s:detail`

### 工具命令

| 命令 | 说明 |
|------|------|
| `/mug:theme` | 预览和切换主题（商务蓝 / 活力橙 / 清新绿） |
| `/mug:tabbar` | 生成 Tabbar 页面套件（4 种预设风格） |
| `/mug:check` | 对照设计规范自检当前页面 |
| `/mug:help` | 查看命令帮助 |

---

## 工作流概览

```
用户输入 /mug 命令
       ↓
  解析命令 & 判定复杂度
       ↓
  ┌─ 简单模式 ────→ 收集输入 → 直接写代码 → 验收汇报
  │
  └─ 复杂/设计先行 → 收集输入 → 验证 Pencil
                          ↓
                    输出 3 个差异化方案 ← 用户选择
                          ↓
                    编写结构化 Prompt → 调用 Pencil 出图
                          ↓
                    展示设计稿 ← 用户确认（可反复修改）
                          ↓
                    以设计稿为蓝图写代码 → 验收汇报
```

**关键规则：**
- 复杂模式必须先给 3 个方案，用户选定后才能继续
- 选定方案 ≠ 同意设计：必须调用 Pencil 出图并获得用户明确确认
- Pencil 连接失败时停在排查阶段，不自动降级为纯代码

---

## 设计规范体系

所有规范集中在 `packages/mobile-ui-generator/core/` 目录下：

| 文件 | 内容 |
|------|------|
| `design-spec.md` | **核心规范**：Design Tokens、布局、表单、列表、详情页、弹窗浮层、图片处理、长列表性能、数据可视化、输入法适配、异常状态、权限角色、自检清单 |
| `design-guidance.md` | 设计引导流程：需求收集 → 风格推荐 → 方案选择 → Pencil 确认 → 迭代 |
| `prompt-rules.md` | Pencil Prompt 编写规则 + 反 AI 生成感规则 |
| `pencil-prompt-template.md` | 5 类页面的结构化 Prompt 模板 |
| `page-hierarchy.md` | 一级/二级页面差异规范 |
| `tabbar-styles.md` | 4 种 Tabbar 首页风格预设 |
| `theming.md` | 主题系统（预设 + 自定义 + 运行时切换） |
| `ui-direction-template.md` | UI 方案输出模板 |
| `workflow.md` | 完整工作流定义 |
| `command-contract.yaml` | 命令契约（单一事实源） |
| `extensibility.md` | 扩展机制（新页面类型、新主题、新端适配器） |

### Design Tokens 速览

```
品牌色    $color-primary (#0E74FF)    功能色    成功/警告/危险/信息
字号      10-26px（7 级）              字重      400-800（5 级）
间距      4-40px（8 级）               圆角      8px / 18px
阴影      5 级（sm → xl）              层级      6 级（base → loading）
动效      150/250/400ms               状态色    四层体系（主/浅底/描边/文字）
```

---

## 项目结构

```
mobile-ui-generator-suite/
├── packages/mobile-ui-generator/
│   ├── core/               # 共享规范（单一事实源）
│   │   ├── tokens/          #   Design Token 文件（SCSS / TS）
│   │   └── examples/        #   黄金示例（JSON）
│   ├── claude/              # Claude Code 适配器
│   ├── codex/               # Codex 适配器
│   │   ├── references/      #   规范副本
│   │   └── assets/          #   空状态占位图等资源
│   └── cursor/              # Cursor 适配器
├── scripts/                 # 安装/生成/校验脚本
├── bin/                     # CLI 入口
└── package.json
```

**核心原则：** `core/` 是规范唯一可信来源。各端适配器（claude/codex/cursor）引用 core，不做独立分叉。命令文档由 `command-contract.yaml` 自动生成。

---

## 开发

```bash
npm run render:docs          # 从 command-contract.yaml 生成各端文档
npm run validate:contract    # 校验命令契约一致性
npm run check                # 运行完整检查
```

---

## 更多

- 极简上手指南：[QUICK-START.md](./QUICK-START.md)
- 设计规范详情：[core/design-spec.md](./packages/mobile-ui-generator/core/design-spec.md)
- 主题定制：[core/theming.md](./packages/mobile-ui-generator/core/theming.md)
- 扩展开发：[core/extensibility.md](./packages/mobile-ui-generator/core/extensibility.md)
