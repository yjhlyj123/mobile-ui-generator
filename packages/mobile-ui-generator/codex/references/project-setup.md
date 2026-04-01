# 新项目接入指南

本文件用于解决“每开一个新项目都要重新转一遍规范”的问题。

核心思路是：只把规范落地一次，之后所有页面都复用这一层。

## 推荐落地顺序

### 1. 先建立主题层

建议至少建立以下文件或等价能力：

```text
styles/
├── tokens.scss
├── theme-wot.scss
└── mixins.scss
```

建议内容：

- `tokens.scss`
  放颜色、字体、间距、圆角、阴影变量

- `theme-wot.scss`
  覆盖 `wot-design-uni` 的主题变量

- `mixins.scss`
  放少量确实无法被 UnoCSS 替代的样式能力

如果你想快速开箱，直接从 `skill/assets/starter/styles/` 复制 `tokens.scss`、`theme-wot.scss` 与 `mixins.scss` 作为起点。

> **关于双色蓝：** `tokens.scss` 中存在两个蓝色变量，分工不同，不可混用：
> - `$color-primary`（`#0e74ff`）：用于按钮、链接等交互元素主色
> - `$status-brand-main`（`#2563eb`）：用于状态标签、信息面板等品牌语义色

## 2. 再建立 UnoCSS 基础层

建议把设计规范里的常用组合沉淀成 shortcuts，例如：

- `page-container`
- `safe-area`
- `card`
- `section-gap`
- `text-title`
- `text-subtitle`
- `text-body`
- `text-caption`
- `text-hint`
- `surface-primary`
- `surface-success`
- `surface-warning`
- `surface-danger`
- `filter-active`
- `filter-inactive`

目标是后续页面尽量写语义类，而不是重复拼视觉原子类。

如果你希望少走一步，可以直接把 `skill/assets/starter/uno-shortcuts.ts` 中的 shortcuts 合并进项目的 `uno.config.ts`。

> **颜色同步提示：** `uno-shortcuts.ts` 中的颜色值与 `tokens.scss` 的变量值需保持一致。UnoCSS 无法直接引用 SCSS 变量，需人工同步。`tokens.scss` 是 source of truth，修改颜色时记得同步更新 shortcuts 中对应的硬编码值。

## 3. 再建立通用业务组件

优先沉淀这几个：

- `EmptyState`
- `StatusTag`
- `FilterDrawer`
- `PageSection`
- `PageCard`

这样以后做新页面时，大多数规范不需要重新解释或重新拼装。

其中 `EmptyState` 可以直接从 `skill/assets/starter/components/EmptyState.vue` 开始，并配合 `skill/assets/starter/constants/empty-state.ts` 使用。

## 4. 占位图接入

推荐把空状态图片复制到项目内固定位置：

```text
static/
└── empty-state/
    ├── empty-data.png
    ├── load-failed.png
    ├── network-error.png
    ├── no-search-results.png
    └── server-busy.png
```

这些图片可直接从 `skill/assets/placeholders/` 复制。

默认 starter 组件会按 `/static/empty-state/<assetName>` 读取图片，因此新项目只要保持这个目录约定，就不需要额外改路径逻辑。

## 5. 页面层只做业务差异

页面文件里只关心：

- 字段结构
- 数据状态
- 交互动作
- 页面布局差异

不要在页面里重复定义品牌色、空状态样式、统一卡片样式。

## 最省事的复用方式

### 方案 A：做一个 starter

准备一个可复制的项目基础目录，例如：

```text
starter/
├── styles/
├── components/
├── composables/
└── uno.config.ts
```

新项目直接复制 starter，再按业务增量修改。

你现在这个 skill 已经自带 starter 素材，建议直接以 `skill/assets/starter/` 作为内部 starter 原型继续扩展。

### 方案 B：把基础层抽成内部包

如果你们项目多，可以把这些通用能力抽成内部共享包：

- design tokens
- UnoCSS shortcuts
- EmptyState / StatusTag 等组件
- 主题覆盖文件

这样新项目只需要安装并接入，不需要重新整理规范。

## 与总规范的关系

建议保持下面这套关系：

- 根目录的 `mobile-ui-design-spec.md` 是总规范源文件
- `skill/references/design-spec.md` 是 skill 运行时读取的规范副本
- 项目中的 `tokens.scss`、`uno.config.ts`、通用组件，是对规范的代码化落地

更新顺序建议是：

1. 先更新总规范
2. 再同步 skill 的规范副本
3. 最后更新 starter 或共享基础层

## 什么时候不需要重做

如果项目已经具备下面这些能力，就不要重复“转规范”：

- 已有 design tokens
- 已有 UnoCSS shortcuts
- 已有主题覆盖
- 已有空状态与状态标签组件

此时只需要在页面生成时复用现有能力即可。
