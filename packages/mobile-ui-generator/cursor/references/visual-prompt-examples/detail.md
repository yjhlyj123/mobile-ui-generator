# C 级范例 · 详情页（二级页面）

> 「合同详情」的 C 级视觉指令型 Pencil prompt 范例。二级页面，三层头部 + 信息分组 + 附件 + 审批时间线 + 底部操作栏。

---

## 输入

> 「合同详情页，看合同信息、附件、审批进度，审批人能通过/驳回。」

## 四步走查

1. **人格基调**：B 端政企 → 克制专业 → blue 主题。
2. **布局结构**：详情页头部走三层信息层级（`design-spec.md §7.5`）+ 分组信息 + 时间线。
3. **逐区块视觉指令**：见下方。字段展示/交互按字段名自动推断（`§7.4`）。
4. **节奏校验**：头部三层主次分明 ✓ 金额焦点 ✓ 时间线当前节点高亮 ✓ 底部操作焦点 ✓。

---

## 完整 C 级 Pencil Prompt

```md
# 页面：合同详情（二级页面 · 详情）
# 人格：克制专业 | 主题：blue
# 节奏：导航栏 → 头部三层 → 信息分组×N → 附件 → 审批时间线 → 底部操作栏
# 页底色 $color-bg-page(#F5F6FA)

## 区块 1 · 标准导航栏
- 左返回 + 标题「合同详情」$font-size-lg(18px)+$font-weight-bold(600)+$color-text-primary，白底

## 区块 2 · 头部信息卡（三层信息层级）
- 容器 $color-bg-card(#FFFFFF) + $radius-md(8px) + $shadow-base，内边距 $spacing-base(16px)
- 第一层（标题 + 状态）：
  「采购合同-2024089」$font-size-lg(18px)+$font-weight-bold(600)+$color-text-primary
  紧跟 StatusTag「待审批」= $status-warning 四层色 + $radius-sm(4px)
- 第二层（关键指标·焦点）：
  「¥125,000.00」$font-size-hero(26px)+$font-weight-heavy(700)+$color-primary（屏级焦点）
- 第三层（元信息）：
  「王磊·采购部 · 2026-03-12 提交」$font-size-sm(12px)+$color-text-secondary
- 三层之间行距 $spacing-xs(8px)

## 区块 3 · 信息分组「合同信息」
- 与头部卡间距 $spacing-md(20px)，容器同上（$radius-md + $shadow-base）
- 组标题「合同信息」$font-size-base(14px)+$font-weight-medium(500)+$color-text-secondary
- label-value 对（label $color-text-secondary 左，value $color-text-regular 右）：
  合同类型：采购合同 | 供应商：XX科技有限公司 | 签署方式：电子签
  合同编号：CG-2026-0312（右侧带复制图标，可交互）

## 区块 4 · 附件
- 与上组间距 $spacing-md(20px)
- 组标题「附件（2）」
- 文件卡：图标 + 文件名「采购合同正本.pdf」$font-size-base(14px) + 大小「2.3MB」$font-size-sm(12px)+$color-text-secondary
  $radius-sm(4px) 边框，点击预览

## 区块 5 · 审批时间线（原型 5）
- 与上组间距 $spacing-md(20px)，wd-steps 竖向
- 节点：
  ● 发起申请  王磊  03-12 10:30（已完成 $status-success-main）
  ● 部门审批  李娜  03-12 14:20 已通过（已完成）
  ● 财务审批  当前节点 高亮 $color-primary + 「审批中」
  ○ 总经理审批  待处理 $color-text-placeholder
- 当前节点圆点放大 + 品牌色，已完成用成功色，未到用占位灰

## 区块 6 · 底部操作栏
- 固定 + safe-area-bottom，白底 + $shadow-md 向上投影
- 双按钮：「驳回」描边 $color-danger + 红字 占 40%（危险操作，需二次确认）/
          「通过」实心 $color-primary 白字 占 60%（主操作·焦点）
- 内容底部预留约 120rpx 留白

## 全局约束
- 遵循 design-spec.md §7 详情规范，PageSection + PageCard 分组
- 编号字段带复制、附件按 §7.6、时间线按 §7.5
- 金额 formatAmount() 含两位小数 + 千分位，空值统一 --
```

---

## 关键决策注释

- **为什么金额放第二层做屏级焦点**：详情页用户最关心「这是多少钱的合同」，金额用 `$font-size-hero(26)+heavy(700)` 成为全屏最跳元素，标题反而退为第一层。
- **为什么时间线当前节点高亮品牌色**：审批人需一眼看到「卡在哪一步」，当前节点用 `$color-primary` + 放大圆点，已完成用成功色，未到用占位灰，形成清晰的进度梯度。
- **为什么驳回用红色描边而非实心**：驳回是危险操作，用 `$color-danger` 描边警示但不抢主操作（通过）的实心焦点；点击需二次确认。
- **编号带复制图标**：编号是高频复制字段，按 `§7.4` 自动加可交互复制图标。
