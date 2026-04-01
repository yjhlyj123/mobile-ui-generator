# 移动端 UI 设计规范 v5.0

> 适用范围：微信小程序 + H5 | 技术栈：uni-app + Vue 3 + UnoCSS + SCSS
> 组件库：wot-design-uni (小程序+H5, 前缀 `wd-`) / Vant 4 (仅H5, 前缀 `van-`)
> 主题配置：`theme.json`（单源真理） | Token 文件：`core/tokens/`

---

## 0. 设计哲学

> **核心理念：克制而不传统，新颖而不花里胡哨。**

| 原则 | 说明 | 正例 | 反例 |
|------|------|------|------|
| **信息克制** | 每个区块只传达一个核心信息，拒绝堆砌 | 统计卡片只展示数字 + 趋势 | 卡片内同时放数字、图表、说明文字、操作按钮 |
| **留白即设计** | 用间距而非装饰表达层次 | 模块间 `$spacing-lg`（24px） | 模块间用分割线 + 色块 + 图标分隔 |
| **功能驱动装饰** | 装饰元素服务于信息架构，仅一级页面头部允许品牌化元素 | 头部渐变 + 低透明度几何装饰引导视觉焦点 | 二级页面也加渐变头部和插图 |
| **微交互代替大动效** | `$duration-fast`（150ms）的按钮反馈 > 花哨的 Lottie | 按钮按压态 0.95 缩放 + 颜色变深 | 页面加载播放 2 秒品牌动画 |
| **一致性 > 个性化** | 所有页面共享同一套 Token，不允许页面级特殊处理 | 所有卡片统一 `$radius-md` | "这个页面特殊一点，用 12px 圆角" |
| **组件优先** | 优先使用 `wot-design-uni` 标准组件，仅在组件无法满足时自定义 | `wd-cell-group` 实现表单 | 手写 div 模拟表单布局 |

---

## 1. Design Tokens

Token 体系分三层：基础层 → 语义层 → 主题层。

- **基础层**：`core/tokens/base-tokens.scss` — 原始色值、字号、间距等
- **语义层**：`core/tokens/semantic-tokens.scss` — CSS Custom Properties 映射
- **主题层**：`core/tokens/theme-presets/*.json` — 可切换的主题配置
- **类型契约**：`core/tokens/theme-contract.ts` — TypeScript 类型定义

### 1.1 品牌色

| Token | 默认值 | CSS 变量 | 用途 |
|-------|--------|----------|------|
| `$color-primary` | `#0E74FF` | `--mug-color-primary` | 主按钮、链接、选中态、品牌强调 |
| `$color-primary-light` | `#E8F1FF` | `--mug-color-primary-light` | 主色背景、标签底色、hover态 |
| `$color-primary-dark` | `#0B5ED9` | `--mug-color-primary-dark` | 主按钮按压态 |
| `$color-primary-disabled` | `rgba(14,116,255,0.4)` | `--mug-color-primary-disabled` | 主按钮禁用态 |

### 1.2 功能色

| Token | 值 | 用途 |
|-------|-----|------|
| `$color-success` | `#34D19D` | 成功状态、通过提示 |
| `$color-warning` | `#F0883A` | 警告状态、注意提示 |
| `$color-danger` | `#FA4350` | 错误状态、删除操作、必填星号 |
| `$color-info` | `#909399` | 次要信息、辅助提示 |

### 1.3 业务状态色（四层体系：主色 / 浅底 / 描边 / 文字）

| 状态 | 主色 | 浅底色 | 描边色 | 文字色 | 场景 |
|------|------|--------|--------|--------|------|
| 品牌/激活 | `#6D5CF6` | `#F5F3FF` | `#DDD6FE` | `#1F1B4D` | 激活标签、重点数据 |
| 成功 | `#22C55E` | `#ECFDF3` | `#BBF7D0` | `#14532D` | 审批通过、已生效 |
| 警示 | `#F59E0B` | `#FFF7ED` | `#FED7AA` | `#7C2D12` | 风险提醒、待确认 |
| 错误 | `#EF4444` | `#FEF2F2` | `#FECACA` | `#7F1D1D` | 校验失败、异常告警 |
| 信息 | `#3B82F6` | `#EFF6FF` | `#BFDBFE` | `#1E3A8A` | 提示通知、引导说明 |

### 1.4 中性色

| Token | 值 | CSS 变量 | 用途 |
|-------|-----|----------|------|
| `$color-text-primary` | `#1A1A1A` | `--mug-color-text-primary` | 标题、重要文字 |
| `$color-text-regular` | `#333333` | `--mug-color-text-regular` | 正文内容 |
| `$color-text-secondary` | `#666666` | `--mug-color-text-secondary` | 辅助说明 |
| `$color-text-placeholder` | `#999999` | `--mug-color-text-placeholder` | 占位符、禁用文字 |
| `$color-text-disabled` | `#C0C4CC` | `--mug-color-text-disabled` | 禁用态文字 |
| `$color-bg-page` | `#F5F6FA` | `--mug-color-bg-page` | 页面底色 |
| `$color-bg-card` | `#FFFFFF` | `--mug-color-bg-card` | 卡片底色 |
| `$color-bg-hover` | `#F5F5F5` | `--mug-color-bg-hover` | 点击态 |
| `$color-bg-mask` | `rgba(0,0,0,0.45)` | `--mug-color-bg-mask` | 遮罩层 |
| `$color-border` | `#EBEDF0` | `--mug-color-border` | 分割线、边框 |
| `$color-border-light` | `#F2F3F5` | `--mug-color-border-light` | 浅色分割线 |

### 1.5 字体排版

| Token | 字号 | 行高 | 用途 |
|-------|------|------|------|
| `$font-size-xs` | `10px` | `14px` | 辅助标注 |
| `$font-size-sm` | `12px` | `18px` | 次要描述、标签 |
| `$font-size-base` | `14px` | `22px` | 正文、表单项 |
| `$font-size-md` | `16px` | `24px` | 卡片标题 |
| `$font-size-lg` | `18px` | `26px` | 页面标题 |
| `$font-size-xl` | `20px` | `28px` | 大标题 |
| `$font-size-hero` | `26px` | `34px` | "我的"页面大标题 |

| Token | 值 | 用途 |
|-------|-----|------|
| `$font-weight-regular` | `400` | 正文 |
| `$font-weight-medium` | `500` | 卡片标题、label |
| `$font-weight-bold` | `600` | 页面标题 |
| `$font-weight-heavy` | `700` | 区块大标题 |
| `$font-weight-black` | `800` | "我的"页面主标题 |

### 1.6 间距与圆角

| Token | 值 | 用途 |
|-------|-----|------|
| `$spacing-xxs` | `4px` | 紧凑间距 |
| `$spacing-xs` | `8px` | 图标与文字间距 |
| `$spacing-sm` | `12px` | 列表项间距 |
| `$spacing-base` | `16px` | 卡片内距、容器 padding |
| `$spacing-md` | `20px` | 模块间距 |
| `$spacing-lg` | `24px` | 区块间距 |
| `$spacing-xl` | `32px` | 大区块间距 |
| `$spacing-xxl` | `40px` | 页面顶部间距 |
| `$radius-md` | `8px` | 标准卡片、弹窗 |
| `$radius-xxl` | `18px` | "我的"页面业务面板 |

### 1.7 阴影

| Token | 值 | 用途 |
|-------|-----|------|
| `$shadow-sm` | `0 1px 4px rgba(0,0,0,0.04)` | 微弱浮起 |
| `$shadow-base` | `0 2px 8px rgba(0,0,0,0.06)` | 标准卡片 |
| `$shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | 底部操作栏、浮动按钮 |
| `$shadow-lg` | `0 8px 24px rgba(0,0,0,0.10)` | 弹窗、抽屉 |
| `$shadow-xl` | `0 12px 36px rgba(0,0,0,0.12)` | 全屏遮罩上层 |

### 1.8 层级

| Token | 值 | 用途 |
|-------|-----|------|
| `$z-index-base` | `1` | 普通内容 |
| `$z-index-sticky` | `100` | 吸顶元素 |
| `$z-index-fixed` | `200` | 固定定位（Tabbar、底部按钮） |
| `$z-index-modal` | `1000` | 弹窗、抽屉 |
| `$z-index-toast` | `2000` | Toast、Notification |
| `$z-index-loading` | `3000` | 全屏 Loading |

### 1.9 动效

| Token | 值 | 用途 |
|-------|-----|------|
| `$duration-fast` | `150ms` | 按钮反馈、开关切换 |
| `$duration-normal` | `250ms` | 页面过渡、卡片展开 |
| `$duration-slow` | `400ms` | 全屏动画、复杂过渡 |
| `$easing-standard` | `cubic-bezier(0.4,0,0.2,1)` | 通用过渡 |
| `$easing-decelerate` | `cubic-bezier(0,0,0.2,1)` | 进入动画 |
| `$easing-accelerate` | `cubic-bezier(0.4,0,1,1)` | 退出动画 |
| `$easing-spring` | `cubic-bezier(0.175,0.885,0.32,1.275)` | 弹性动画（Tabbar 选中） |

---

## 2. 布局规范

### 2.1 页面容器
- 页面底色固定为 `$color-bg-page` (`#F5F6FA`)。
- 内容区域使用 `safe-area` (`px-16px`)。

### 2.2 卡片布局
- 背景：`#FFFFFF`。
- 圆角：标准页 `8px`，"我的"页 `18px`。
- 边框：**默认无边框**。
- 阴影：`0 2px 8px rgba(0,0,0,0.06)`（仅用于 `card-shadow`）。

### 2.3 筛选器 (Filter Pill)
- 激活态：`bg-#2563EB text-white`。
- 非激活态：`bg-#F3F4F6 text-#475569`。

### 2.4 微信小程序平台约束

微信小程序的胶囊按钮（右上角）会占用导航栏区域，一级页面使用自定义导航栏时**必须**适配。

#### 胶囊区布局示意

```
┌─────────────────────────────────────────┐
│ 状态栏 (statusBarHeight)                 │
├──────────────────────────────┬──────────┤
│                              │ ┌──────┐ │
│   自定义导航内容              │ │ 胶囊  │ │
│   (标题/搜索/问候语)          │ │ 按钮  │ │
│                              │ └──────┘ │
├──────────────────────────────┴──────────┤
│ 页面内容区域                              │
└─────────────────────────────────────────┘
```

#### 安全高度计算

```typescript
// 获取胶囊按钮位置
const menuButton = wx.getMenuButtonBoundingClientRect()
// 状态栏高度
const { statusBarHeight } = wx.getSystemInfoSync()

// 自定义导航栏高度（推荐固定计算方式）
const navBarHeight = (menuButton.top - statusBarHeight) * 2 + menuButton.height
// 导航栏总高度 = 状态栏 + 导航栏
const totalNavHeight = statusBarHeight + navBarHeight
```

#### 适配规则

| 规则 | 说明 |
|------|------|
| **右侧安全区** | 导航栏内容右边距 ≥ 胶囊宽度 + `12px` |
| **高度对齐** | 自定义导航栏标题/图标垂直居中于胶囊区域 |
| **贯穿式头部** | 一级页面头部背景从状态栏顶部延伸到内容区，自定义导航栏叠加其上，背景不被截断 |
| **H5 降级** | H5 环境无胶囊，导航栏高度固定 `44px`，顶部取 `var(--status-bar-height, 0px)` |

#### UnoCSS Shortcut 建议

```typescript
// 已有的 safe-area 处理底部
'safe-area': 'px-16px pb-[env(safe-area-inset-bottom)]'
// 建议新增：导航栏安全右间距
'nav-safe-right': 'pr-[calc(var(--mug-capsule-width,87px)+12px)]'
```

---

## 3. 主题扩展

详见 `core/theming.md`。

- 预设主题：商务蓝 / 活力橙 / 清新绿
- 自定义主题：复制 `theme-presets/*.json` 后按 `theme-contract.ts` 修改
- 运行时切换：通过覆盖 CSS Custom Properties

---

## 4. 页面层级差异

详见 `core/page-hierarchy.md`。

- **一级页面（Tabbar）**：允许品牌化渐变头部、插图、特效、大圆角
- **二级页面**：标准导航栏、纯内容消费、标准卡片布局

---

## 5. 表单设计规范

### 5.1 表单布局

使用 `wd-cell-group` 作为表单容器，`wd-cell` 作为字段行。

```
┌─────────────────────────────────────────┐
│ 基本信息                          [必填] │  ← PageSection 标题
├─────────────────────────────────────────┤
│ * 合同名称              请输入合同名称   │  ← wd-cell + wd-input
│─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│  ← hairline 分割线
│ * 合同类型                      请选择 ▸│  ← wd-cell + wd-picker
│─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│
│   备注说明              请输入备注信息   │  ← 非必填，无星号
├─────────────────────────────────────────┤
│                                         │
│ 签署信息                                 │  ← 第二个 PageSection
├─────────────────────────────────────────┤
│ * 签署日期              请选择日期     ▸│
│─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│
│ * 签署方                请选择签署方   ▸│
└─────────────────────────────────────────┘
         ...（更多字段）...
┌─────────────────────────────────────────┐
│          [ 保存草稿 ]    [ 提 交 ]       │  ← 底部固定操作栏
└─────────────────────────────────────────┘
```

### 5.2 字段规范

| 维度 | 规范 |
|------|------|
| **字段高度** | 正常模式 `88rpx`，紧凑模式 `72rpx` |
| **标签（label）** | 左对齐，`$font-size-base`，`$color-text-regular`，宽度建议 `180rpx` |
| **输入区** | 右对齐，`$font-size-base`，`$color-text-primary` |
| **占位符** | `$color-text-placeholder` |
| **必填标记** | label 前红色星号 `*`，使用 `$color-danger` |
| **分割线** | 组内使用 `hairline` 分割线（`$color-border-light`），组间使用 `$spacing-lg` 留白 |
| **分组** | 相关字段用 `PageSection` 包裹，组标题用 `$font-size-md` + `$font-weight-medium` |

### 5.3 校验规则

| 维度 | 规范 |
|------|------|
| **触发时机** | 字段失焦（blur）时校验，提交时全量校验 |
| **错误提示** | 字段下方显示，`$color-danger` + `$font-size-sm`（12px） |
| **错误态** | 字段右侧或底部边框变为 `$color-danger` |
| **成功态** | 不做视觉反馈（克制原则，减少干扰） |
| **提交按钮** | 未通过校验时使用 `$color-primary-disabled`，禁止点击 |

### 5.4 表单类型适配

| 字段类型 | 推荐组件 | 说明 |
|----------|----------|------|
| 文本输入 | `wd-input` | 单行文本 |
| 多行文本 | `wd-textarea` | 自动增高，最大 `200rpx` |
| 选择器 | `wd-picker` / `wd-select-picker` | 点击后弹出选择面板 |
| 日期选择 | `wd-datetime-picker` | 年-月-日 / 年-月-日 时:分 |
| 开关 | `wd-switch` | 布尔值切换 |
| 上传 | `wd-upload` | 图片/文件上传，带预览 |
| 评分 | `wd-rate` | 星级评分 |

---

## 6. 列表设计规范

### 6.1 列表页结构

```
┌─────────────────────────────────────────┐
│ 导航栏：标题             [筛选] [+新建] │  ← 标准导航栏
├─────────────────────────────────────────┤
│ 🔍 搜索合同名称/编号                     │  ← wd-search，吸顶
├─────────────────────────────────────────┤
│ [全部] [待审批] [已通过] [已驳回]        │  ← Filter Pill，横向滚动
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ 采购合同-2024001                     │ │  ← 主标题 $font-size-base
│ │ 张三 · 采购部 · 2024-03-15          │ │  ← 副信息 $font-size-sm
│ │ [待审批]              [审批] [查看] │ │  ← StatusTag + 操作按钮
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ 销售合同-2024002                     │ │
│ │ 李四 · 销售部 · 2024-03-14          │ │
│ │ [已通过]                     [查看] │ │
│ └─────────────────────────────────────┘ │
│              ...                        │
│         ── 加载更多 ──                   │  ← wd-loadmore
└─────────────────────────────────────────┘
```

### 6.2 列表项规范

| 维度 | 规范 |
|------|------|
| **列表项高度** | 标准 `120rpx` / 紧凑 `96rpx` / 富内容 `auto`（最小 `140rpx`） |
| **列表项容器** | `PageCard`，圆角 `$radius-md`，背景 `$color-bg-card` |
| **列表项间距** | `$spacing-sm`（12px） |
| **主标题** | `$font-size-base`（14px），`$color-text-primary`，单行截断 |
| **副信息** | `$font-size-sm`（12px），`$color-text-secondary`，用 `·` 分隔 |
| **状态标签** | 使用 `StatusTag` 组件，靠左对齐 |
| **分割线** | 列表项之间不使用分割线，通过间距区分（克制原则） |

### 6.3 搜索与筛选

| 维度 | 规范 |
|------|------|
| **搜索栏** | `wd-search`，页面顶部吸顶（`$z-index-sticky`），圆角 `$radius-md` |
| **筛选标签** | Filter Pill 样式：激活 `bg-#2563EB text-white`，未激活 `bg-#F3F4F6 text-#475569` |
| **筛选位置** | 搜索栏下方，支持横向滚动 |
| **高级筛选** | 3 个以上筛选维度时，使用右上角"筛选"图标 + 抽屉面板 |

### 6.4 列表操作按钮

这是列表页面中**最常见也最容易出问题的部分**。按钮数量不同，处理方式不同：

#### 1 个按钮

```
│ 合同名称-2024001                        │
│ 张三 · 采购部 · 2024-03-15              │
│ [待审批]                        [审批]  │
```
- 右侧内联文字按钮，使用 `$color-primary`，无底色无边框
- 字号 `$font-size-sm`（12px）

#### 2 个按钮

```
│ 合同名称-2024001                        │
│ 张三 · 采购部 · 2024-03-15              │
│ [待审批]                 [查看] [审批]  │
```
- 右侧并排，主操作（右侧）用 `$color-primary`，次操作（左侧）用 `$color-text-secondary`
- 按钮间距 `$spacing-xs`（8px）

#### 3+ 个按钮 — 模式 A：内联 + 更多菜单

```
│ 合同名称-2024001                        │
│ 张三 · 采购部 · 2024-03-15              │
│ [待审批]                 [审批]  [ ··· ]│
                                    ┌─────┐
                                    │ 查看 │
                                    │ 编辑 │
                                    │ 删除 │ ← $color-danger
                                    └─────┘
```
- 展示最高频 1 个操作按钮 + `···` 更多菜单（`wd-popover` 或 `wd-action-sheet`）
- **适用场景**：操作频率差异大（1 个高频 + 多个低频）

#### 3+ 个按钮 — 模式 B：左滑操作面板

```
│ 合同名称-2024001            ← 左滑       │
│ 张三 · 采购部                             │
│ [待审批]          │ [查看] [编辑] [删除] │
                     └── SwipeCell 展开 ──┘
```
- 使用 `wd-swipe-cell`，左滑展开全部操作按钮
- **适用场景**：所有操作频率接近、或有危险操作需要"藏"起来

#### Agent 选择规则

| 条件 | 选择 |
|------|------|
| 操作中有一个明显高频（如"审批"） | 模式 A |
| 操作频率相近 | 模式 B |
| 有危险操作（删除）需要降低误触概率 | 模式 B |
| 列表项本身信息密度高，右侧空间紧张 | 模式 B |

#### 通用规则

| 维度 | 规范 |
|------|------|
| **按钮尺寸** | mini size，高度 `56rpx`，字号 `$font-size-sm`（12px） |
| **按钮间距** | `$spacing-xs`（8px） |
| **主操作色** | `$color-primary` |
| **次操作色** | `$color-text-secondary`（文字按钮）或 `$color-border`（边框按钮） |
| **危险操作** | 始终使用 `$color-danger`，且需 `wd-message-box` 二次确认 |
| **禁用态** | `$color-text-disabled`，禁止点击 |

### 6.5 列表状态处理

| 状态 | 处理方式 |
|------|----------|
| **首次加载** | 使用 `wd-skeleton` 骨架屏，模拟 3 个列表项 |
| **空数据** | `EmptyState` 组件，type=`empty-data` |
| **搜索无结果** | `EmptyState` 组件，type=`no-search-results` |
| **加载失败** | `EmptyState` 组件，type=`load-failed`，带"重试"按钮 |
| **下拉刷新** | uni-app 原生 `onPullDownRefresh` |
| **上拉加载** | `wd-loadmore`，三态：loading / finished / error |

---

## 7. 详情页设计规范

### 7.1 详情页结构

```
┌─────────────────────────────────────────┐
│ ←  合同详情                     [编辑]  │  ← 标准导航栏
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ 采购合同-2024001       [已生效] ✓  │ │  ← 标题 + StatusTag
│ │ 创建时间：2024-03-15 10:30         │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ 基本信息                                 │  ← PageSection
│ ┌─────────────────────────────────────┐ │
│ │ 合同名称        采购服务合同-年度    │ │  ← label-value 对
│ │─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│ │
│ │ 合同类型        采购合同             │ │
│ │─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│ │
│ │ 合同金额        ¥ 125,000.00       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ 签署信息                                 │  ← PageSection
│ ┌─────────────────────────────────────┐ │
│ │ 甲方            XX科技有限公司       │ │
│ │─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│ │
│ │ 乙方            YY供应链公司         │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ 审批记录                                 │  ← PageSection
│ ┌─────────────────────────────────────┐ │
│ │ ● 张三 审批通过   2024-03-16 09:00 │ │  ← 时间线样式
│ │ │                                   │ │
│ │ ● 李四 提交审批   2024-03-15 10:30 │ │
│ └─────────────────────────────────────┘ │
│                                         │
│                 (底部留白 120rpx)         │
├─────────────────────────────────────────┤
│          [ 驳 回 ]      [ 通 过 ]        │  ← 底部固定操作栏
└─────────────────────────────────────────┘
```

### 7.2 信息展示规范

| 维度 | 规范 |
|------|------|
| **信息分组** | 使用 `PageSection`（标题）+ `PageCard`（容器）分组 |
| **组标题** | `$font-size-md`（16px），`$font-weight-medium`（500） |
| **label** | `$color-text-secondary`（#666），`$font-size-base`（14px），左对齐 |
| **value** | `$color-text-primary`（#1A1A1A），`$font-size-base`（14px），右对齐或左对齐 |
| **金额值** | `$font-weight-bold`（600），可适当放大到 `$font-size-md` |
| **状态标签** | 使用 `StatusTag` 组件，紧跟标题后方或独立行 |
| **时间线** | 审批记录、操作日志等使用 `wd-steps` 竖向模式 |
| **分割线** | 组内字段间使用 `hairline`（`$color-border-light`），组间使用留白 |

### 7.3 详情页底部操作栏

| 按钮数量 | 布局 |
|----------|------|
| **1 个** | 全宽主按钮（`$color-primary`） |
| **2 个** | 左次右主，各占约 50%，间距 `$spacing-sm` |
| **3+ 个** | 主按钮全宽 + 上方次按钮行；或最多展示 2 个 + "更多"按钮 |

底部操作栏通用样式：
- 固定定位 `position: fixed; bottom: 0`
- 背景 `$color-bg-card`
- 阴影 `$shadow-md`（向上投影）
- 底部安全区 `safe-area-bottom`
- z-index `$z-index-fixed`
- 内距 `$spacing-base`（16px）
- 页面内容底部需预留 `120rpx` 留白防止遮挡

---

## 8. 通用交互模式

### 8.1 底部操作栏

所有需要固定底部操作按钮的页面（表单提交、详情操作等）统一使用：

```scss
.bottom-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-base;
  padding-bottom: calc(#{$spacing-base} + env(safe-area-inset-bottom));
  background: $color-bg-card;
  box-shadow: $shadow-md;
  z-index: $z-index-fixed;
}
```

### 8.2 提示与确认

| 场景 | 组件 | 说明 |
|------|------|------|
| 操作成功 | `wd-toast` type=success | "提交成功"、"保存成功" |
| 操作失败 | `wd-toast` type=error | "提交失败，请重试" |
| 警告提示 | `wd-toast` type=warning | "网络异常" |
| 危险确认 | `wd-message-box` | 删除、驳回等不可逆操作必须二次确认 |
| 信息确认 | `wd-message-box` | "确定提交审批？" |

### 8.3 加载态

| 场景 | 处理方式 |
|------|----------|
| 页面首次加载 | 骨架屏 `wd-skeleton`，模拟真实布局 |
| 列表加载更多 | `wd-loadmore` 组件 |
| 按钮操作中 | 按钮进入 loading 态，禁止重复点击 |
| 全屏加载 | `wd-loading` 全屏遮罩（仅用于页面切换/重大操作） |

### 8.4 页面过渡

- 使用 uni-app 原生页面切换动画（`navigateTo` 默认右滑入）
- 不自定义页面过渡动画（克制原则）
- 弹窗/抽屉使用 `$duration-normal`（250ms）+ `$easing-decelerate`

---

## 9. 自检清单

### 基础检查
- [ ] 页面底色是否为 `$color-bg-page`？
- [ ] 标准卡片圆角是否为 `$radius-md`？
- [ ] 卡片是否误加了边框？
- [ ] "我的"页面大标题是否使用 `$font-size-hero` / `$font-weight-black`？
- [ ] 激活态筛选器是否为蓝底白字？
- [ ] 颜色是否全部通过 Token 引用（无硬编码色值）？
- [ ] 阴影是否使用规范中定义的层级？
- [ ] 动效时长是否使用 Token 而非自定义值？
- [ ] 一级页面是否使用了差异化头部？
- [ ] 主题切换后页面是否正常显示？

### 表单检查
- [ ] 表单字段是否使用 `wd-cell-group` + `wd-cell` 布局？
- [ ] 必填字段是否标注红色星号 `*`？
- [ ] 校验错误提示是否在字段下方、使用 `$color-danger`？
- [ ] 提交按钮是否在底部固定操作栏内？
- [ ] 字段分组是否使用 `PageSection` 包裹？

### 列表检查
- [ ] 搜索栏是否吸顶？
- [ ] 筛选器是否使用 Filter Pill 样式？
- [ ] 列表项间距是否为 `$spacing-sm`？
- [ ] 操作按钮数量 ≤ 2 时是否内联展示？
- [ ] 操作按钮 3+ 时是否使用了更多菜单或左滑面板？
- [ ] 危险操作是否使用 `$color-danger` 且有二次确认？
- [ ] 空状态是否使用 `EmptyState` 组件？
- [ ] 首次加载是否使用骨架屏？

### 详情检查
- [ ] 信息是否按业务分组（使用 `PageSection`）？
- [ ] 状态是否使用 `StatusTag` 组件？
- [ ] 底部操作栏是否固定定位并处理了安全区？
- [ ] 页面内容底部是否预留了操作栏高度的留白？

### 微信小程序检查
- [ ] 一级页面自定义导航栏是否适配了胶囊区域？
- [ ] 导航栏内容右侧是否留出胶囊安全距离？
- [ ] 贯穿式头部背景是否从状态栏延伸？
