# C 级范例 · 列表页（二级页面）

> 「合同审批列表」的 C 级视觉指令型 Pencil prompt 范例。二级页面标准布局，列表密集型原型。

---

## 输入

> 「合同审批列表，能搜索、按状态筛选，每条能快速通过/驳回。」

## 四步走查

1. **人格基调**：B 端政企 → 克制专业 → blue 主题。
2. **布局原型**：**原型 6 列表密集型** —— 搜索筛选吸顶 + 高密度列表项。
3. **逐区块视觉指令**：见下方。数据展示方式按字段名自动推断（`design-spec.md §6.7`）。
4. **节奏校验**：吸顶搜索 ✓ 列表项有主次层次 ✓ 状态用四层色 ✓ 焦点在金额/状态 ✓。

---

## 完整 C 级 Pencil Prompt

```md
# 页面：合同审批列表（二级页面 · 列表）
# 人格：克制专业 | 主题：blue | 布局原型：列表密集型
# 节奏：导航栏 → 搜索+筛选(吸顶) → 列表项流 → 加载更多
# 页底色 $color-bg-page(#F5F6FA)，列表项白卡

## 区块 1 · 标准导航栏
- 左返回 + 标题「合同审批」$font-size-lg(18px)+$font-weight-bold(600)+$color-text-primary，白底

## 区块 2 · 搜索 + 筛选（吸顶 z-index $z-index-sticky 100）
- 搜索框：圆角 $radius-md(8px) + $color-bg-page 底，占位「搜索合同名称/编号」$color-text-placeholder
- 下方 Filter Pill 行：[全部] [待审批] [已通过] [已驳回]
  选中态 $color-primary-light(#E8F1FF) 底 + $color-primary 文字，未选 $color-bg-card + $color-text-secondary
- 搜索与列表间距 $spacing-sm(12px)

## 区块 3 · 列表项（密集型，项间距 $spacing-sm(12px)）
- 单项容器 $color-bg-card(#FFFFFF) + $radius-md(8px) + $shadow-base，内边距 $spacing-base(16px)
- 单项结构（两行）：
  第一行：主标题「采购合同-2024089」$font-size-md(16px)+$font-weight-medium(500)+$color-text-primary
         右侧 StatusTag「待审批」= $status-warning-bg 底 + $status-warning-border 描边 + $status-warning-text 文字 + $radius-sm(4px)
  第二行：副信息「王磊·采购部·2h前」$font-size-sm(12px)+$color-text-secondary（用 · 分隔组合）
         右侧金额「¥125,000」$font-size-md(16px)+$font-weight-bold(600)+$color-primary（行内焦点）
- 操作模式 A（内联）：项底部右侧「通过」实心小按钮 + 「驳回」描边小按钮（高频操作内联）
- 真实数据 ×3：
  采购合同-2024089 / 王磊·采购部 / ¥125,000 / 待审批
  服务合同-2024076 / 李娜·法务部 / ¥48,000 / 已通过（StatusTag 用 success 四层色）
  框架协议-2024058 / 陈昊·市场部 / ¥260,000 / 已驳回（StatusTag 用 error 四层色）

## 区块 4 · 状态处理
- 空数据：EmptyState type=empty-data「暂无待审合同」+ 说明下一步
- 搜索无结果：EmptyState type=no-search-results
- 加载更多：wd-loadmore；首次加载用列表骨架屏（模拟 5 项）

## 全局约束
- 遵循 design-spec.md §6 列表规范 + §6.4 操作按钮规范
- 列表项靠间距 + 阴影区分，不用整屏分割线
- 数据格式化：金额 formatAmount()、时间 formatRelativeTime()，空值统一 --
```

---

## 关键决策注释

- **为什么选内联操作模式 A**：「通过/驳回」是高频操作（每条都要做），内联按钮比左滑更直给；低频操作才收进「更多」。依据 `design-spec.md §6.4`。
- **为什么状态用 StatusTag 四层色**：待审/通过/驳回是核心业务态，用四层状态色（浅底+描边+文字）保证一眼可辨，不自造颜色。
- **为什么金额是行内焦点**：审批列表里金额影响审批判断，用 `$font-weight-bold(600)+$color-primary` 让它在副信息行跳出。
- **为什么搜索筛选吸顶**：列表密集型的核心是检索效率，搜索筛选必须常驻（`$z-index-sticky`）。
