# Pencil Prompt 编写模板

> **配合使用**：`design-arsenal.md`（设计弹药库：视觉词汇 / 布局原型 / 风格人格）+ `visual-prompt-examples/`（C 级满分范例）。
> **目标**：产出 **C 级视觉指令型 prompt**（内容 + 视觉层次 + 焦点 + 间距节奏全锁死）。C 级定义见 `design-arsenal.md §0`。
> **铁律**：所有视觉属性 `$token名(数值)` 双标注。布局尺寸（高度/占屏比/装饰）用 rpx 或百分比。

---

## 如何使用本模板（四步，详见 `design-arsenal.md §4`）

1. **定人格基调** → 查 `design-guidance.md` 匹配矩阵 + 读 `.mug-project.json` 的 `personality`。
2. **选布局原型** → 从 `design-arsenal.md §2` 选定首屏重心。
3. **逐区块填视觉指令** → 对每个区块走下方「⭐ C 级 5 问」。
4. **节奏校验** → 对照 `prompt-rules.md` 的 C 级自检清单。

---

## ⭐ 区块展开追问清单（C 级 5 问）—— 每个区块必答

> 模板里每写一个区块，就对它回答这 5 问。**5 问没答全 = 还停留在 A/B 级。**

| # | 必答问题 | 取用 | 示例答法 |
|---|----------|------|----------|
| 1 | **尺寸**：多高 / 占屏多少？内边距哪档？ | `design-arsenal §2`(占比) + `$spacing-*` | 主角卡占屏 ~60%，内边距 `$spacing-base(16px)` |
| 2 | **背景**：底色？圆角哪档？阴影哪档（或无）？ | `$color-bg-*` `$radius-*` `$shadow-*` | `$color-bg-card` + `$radius-md(8px)` + `$shadow-base` |
| 3 | **内部层次**：每个文字元素的 字号档+字重档+色彩？ | `design-arsenal §1.1` | 主标题 `$font-size-md(16px)+$font-weight-medium(500)+$color-text-primary` |
| 4 | **焦点**：本区块视觉焦点是谁？怎么让它跳？ | `design-arsenal §1.2` | 金额 `$font-size-lg(18px)+$font-weight-bold(600)+$color-primary` |
| 5 | **间距节奏**：与上下区块间距哪档？是否疏密交替？ | `design-arsenal §1.3` | 与上区块 `$spacing-xl(32px)`，卡内项间 `$spacing-sm(12px)` |

---

## 模板索引（按页面类型选用，并打开对应范例对照）

| 页面类型 | 用模板 | 对照范例 |
|----------|--------|----------|
| 标准页面 | §1 | — |
| Tabbar 一级页面 | §2 | `visual-prompt-examples/workbench.md` |
| 表单 | §3 | `visual-prompt-examples/form.md` |
| 列表 | §4 | `visual-prompt-examples/list.md` |
| 详情 | §5 | `visual-prompt-examples/detail.md` |
| 重构模式 | §6 | 选定方向后参照对应类型范例 |

---

## §1 标准模板

```md
# 页面：[名称]（[一级 Tabbar / 二级 / 三级] 页面）
# 人格：[查矩阵] | 主题：[blue/orange/green] | 布局原型：[§2 选一]
# 整体节奏：[区块A] → [区块B(主角·占屏%)] → [区块C] （标出视觉重心）
# 页底色 $color-bg-page，80%+ 灰白，品牌色仅点睛

## 区块 1 · [名称]
（按 ⭐5 问展开：尺寸/内距 → 背景(底色+圆角档+阴影档) → 内部元素字号字重色彩 → 焦点 → 与相邻区块间距）

## 区块 2 · [名称]（首屏视觉重心）
（同上，标明占屏比例与屏级焦点）

## 区块 N · ...

## 全局约束
- 遵循 design-spec.md + page-hierarchy.md（[一级/二级]页面规范）
- 内容用真实业务数据（如 ¥125,000 / 张三 / 采购合同-2024089），不用占位文本
```

---

## §2 Tabbar 一级页面模板

> 一级页面强约束：贯穿式品牌头部（非纯色）、大圆角 `$radius-xxl(18px)`、微信胶囊适配、允许 `$shadow-md`。头部风格见 `tabbar-styles.md`（A 沉浸 / B 卡片金刚区 / C 数据看板 / D 图文）。**对照 `visual-prompt-examples/workbench.md`。**

```md
# 页面：[名称]（一级 Tabbar）
# 人格：[查矩阵] | 主题：[blue/...] | Tabbar 风格：[A/B/C/D] | 布局原型：[§2]
# 整体节奏：贯穿头部 → [主角区·占屏%] → [次要区] → [弱化入口]

## 区块 1 · 贯穿式头部（高度约 ___rpx）
- 背景 linear-gradient(135deg, $color-primary → $color-primary-dark) + 几何装饰圆 rgba(255,255,255,0.08)
- 微信胶囊适配：右侧留胶囊宽 + 12px 安全区
- 问候/标题 $font-size-xl(20px)+$font-weight-black(800)+白 | 摘要副信息 $font-size-sm(12px)+白70%
（按 ⭐5 问展开其余元素）

## 区块 2 · [主角区]（首屏视觉重心，占屏约 __%）
- 与头部交界上浮叠加，容器 $color-bg-card + $radius-xxl(18px) + $shadow-md
（按 ⭐5 问展开）

## 区块 3+ · [次要区 / 金刚区]（弱化，按 ⭐5 问展开）

## 全局约束
- 遵循 page-hierarchy.md 一级页面规范；渐变仅头部；金刚区非必须，按入口数量决定
- 禁 AI 套路：不做「问候语 + 2×2 金刚区 + 列表」万能模板
```

---

## §3 表单模板

> **对照 `visual-prompt-examples/form.md`。** 字段校验/键盘类型按 `design-spec.md §5.7` 自动推断。

```md
# 页面：[名称]（[层级] · 表单）| 人格 | 主题 | 布局原型：表单分组

## 字段清单（AI 据此自动推断校验+键盘）
| 字段 | 类型 | 必填 | 组件 | 推断校验/键盘 | 联动 |
|------|------|------|------|---------------|------|
| ___ | 文本/数字/选择/日期/开关/上传 | 是/否 | wd-input/wd-picker | §5.7 自动 | ___ |

## 区块 · 分组卡「[组名]」（每组按 ⭐5 问展开）
- 容器 $color-bg-card + $radius-md(8px) + $shadow-base，组间距 $spacing-md(20px)
- 组标题 $font-size-base(14px)+$font-weight-medium(500)+$color-text-secondary
- 字段行 wd-cell，必填红星 $color-danger，占位 $color-text-placeholder

## 区块 · 底部固定操作栏
- 固定 + safe-area-bottom + $shadow-md；主操作实心 $color-primary（焦点）/ 次操作描边
- 内容底部预留约 120rpx

## 全局约束：遵循 design-spec.md §5；wd-cell-group+wd-cell；字段>6 自动分组(§5.9)
```

---

## §4 列表模板

> **对照 `visual-prompt-examples/list.md`。** 数据展示/布局变体按 `design-spec.md §6.7 / §6.8` 自动推断。

```md
# 页面：[名称]（[层级] · 列表）| 人格 | 主题 | 布局原型：列表密集型

## 列表项结构（每行映射 + 展示方式）
| 信息 | 字段 | 位置 | 展示方式 | 格式化 |
|------|------|------|----------|--------|
| 主标题 | ___ | 左上 | §6.7 自动 | — |
| 状态 | ___ | 右上 | StatusTag 四层色 | — |
| 金额 | ___ | 右下 | 加粗品牌色(焦点) | formatAmount() |

## 区块 · 搜索+筛选（吸顶 $z-index-sticky）
- 搜索框 $radius-md(8px)+$color-bg-page 底；Filter Pill 选中 $color-primary-light 底+$color-primary 字

## 区块 · 列表项（项间距 $spacing-sm(12px)，按 ⭐5 问展开）
- 容器 $color-bg-card + $radius-md(8px) + $shadow-base，内距 $spacing-base(16px)
- 主标题 $font-size-md(16px)+$font-weight-medium(500) | 副信息 $font-size-sm(12px)+$color-text-secondary（· 分隔）
- 操作模式：A 内联(高频) / B 左滑(低频)，说明选择原因（§6.4）

## 区块 · 状态处理：空数据/搜索无果/加载失败 EmptyState；列表骨架屏；wd-loadmore

## 全局约束：遵循 design-spec.md §6；靠间距+阴影分隔不用整屏分割线；空值统一 --
```

---

## §5 详情模板

> **对照 `visual-prompt-examples/detail.md`。** 头部三层层级见 `design-spec.md §7.5`，字段交互按 `§7.4` 推断。

```md
# 页面：[名称]（[层级] · 详情）| 人格 | 主题

## 区块 · 头部信息卡（三层层级，按 ⭐5 问展开）
- 第一层 标题 $font-size-lg(18px)+$font-weight-bold(600) + StatusTag 四层色（紧跟标题）
- 第二层 关键指标(焦点) 金额 $font-size-hero(26px)+$font-weight-heavy(700)+$color-primary（无数值则省此层）
- 第三层 元信息 $font-size-sm(12px)+$color-text-secondary（创建人·部门·时间）

## 区块 · 信息分组「[组名]」
- 容器 $color-bg-card+$radius-md(8px)+$shadow-base，组间距 $spacing-md(20px)
- label($color-text-secondary) - value($color-text-regular) 对；编号/phone/url 自动加交互图标(§7.4)

## 区块 · 附件（§7.6）/ 审批时间线（wd-steps 竖向，当前节点 $color-primary 高亮放大）

## 区块 · 底部操作栏
- 固定+safe-area-bottom+$shadow-md；主操作实心(焦点)/危险操作 $color-danger 描边(二次确认)

## 全局约束：遵循 design-spec.md §7；PageSection+PageCard 分组；金额含两位小数+千分位
```

---

## §6 重构模式模板

> 用户提供参考页/现有代码时，**对每个重构方向**用一次。只提取业务内容，彻底打破原布局。

```md
# 重构方向：[方向名]（人格 | 主题 | 布局原型：§2 选一，须与其他方向本质不同）

## 从参考页提取（仅业务内容，不含原视觉）
- 模块列表 / 数据字段 / 业务状态 / 操作入口：___

## 本方向设计指令（逐区块按 ⭐5 问展开）
- 首屏重心 / 区块划分 / 状态呈现 / 操作权重

## 明确禁止复现参考页的：
- ___（列出不应照搬的布局、卡片形态、配色、信息分组）

## 全局约束：遵循 design-spec.md + page-hierarchy.md；禁照搬参考页模板化布局
```
