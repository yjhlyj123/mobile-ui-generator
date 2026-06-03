# C 级范例 · 表单页（二级页面）

> 「新建采购合同」表单的 C 级视觉指令型 Pencil prompt 范例。二级页面遵循标准布局：标准导航栏、`$radius-md(8px)`、无装饰、`$shadow-base`。

---

## 输入

> 「新建采购合同的表单页，填基本信息、金额、签署方，提交走审批。」

## 四步走查

1. **人格基调**：B 端政企 → 克制专业 → blue 主题。表单为二级页面，无渐变头部。
2. **布局原型**：**原型 8 表单分组** —— 字段按语义分 3 组卡片，底部固定提交。
3. **逐区块视觉指令**：见下方。字段校验类型按字段名自动推断（`design-spec.md §5.7`）。
4. **节奏校验**：分组卡之间拉开间距 ✓ 必填星号 ✓ 焦点在提交按钮 ✓ Token 双标注 ✓。

---

## 完整 C 级 Pencil Prompt

```md
# 页面：新建采购合同（二级页面 · 表单）
# 人格：克制专业 | 主题：blue | 布局原型：表单分组
# 节奏：导航栏 → 分组卡×3(间距拉开) → 底部固定提交栏
# 页底色 $color-bg-page(#F5F6FA)，分组卡白底

## 区块 1 · 标准导航栏
- 左返回箭头 + 居中标题「新建采购合同」$font-size-lg(18px)+$font-weight-bold(600)+$color-text-primary
- 白底，无渐变无装饰（二级页面规范）

## 区块 2 · 分组卡「基本信息」
- 容器 $color-bg-card(#FFFFFF) + $radius-md(8px) + $shadow-base，与导航栏间距 $spacing-base(16px)
- 组标题「基本信息」$font-size-base(14px)+$font-weight-medium(500)+$color-text-secondary，组内边距 $spacing-base(16px)
- 字段行（wd-cell 结构，行高约 96rpx，字段间用 $color-border-light 极浅分隔）：
  · 合同名称（必填，红星 $color-danger）label $font-size-base(14px)+$color-text-regular，
    占位「请输入合同名称」$color-text-placeholder
  · 合同编号（自动生成，只读）值「CG-2026-0312」$color-text-secondary
  · 合同类型（必填·选择）右侧「采购合同 ›」+ picker 箭头
  · 供应商（必填·选择）「请选择供应商」$color-text-placeholder

## 区块 3 · 分组卡「合同金额」
- 与上组间距 $spacing-md(20px)
- 字段：
  · 合同金额（必填·数字键盘 type=digit）右对齐输入，
    前缀「¥」，值 $font-size-md(16px)+$font-weight-bold(600)+$color-text-primary
  · 付款方式（选择）分期 / 一次性
  · 税率（选填·digit）占位「如 13」后缀「%」

## 区块 4 · 分组卡「签署信息」
- 与上组间距 $spacing-md(20px)
- 字段：签署截止日期（日期选择）/ 签署方式（电子签/纸质，单选）/ 备注（多行文本，选填）

## 区块 5 · 底部固定操作栏
- 固定定位 + safe-area-bottom，白底 + $shadow-md 向上投影
- 双按钮：「存草稿」描边 $color-border 占 35% / 「提交审批」实心 $color-primary 白字 占 65%（焦点）
- 按钮高 $spacing-xl(32px)*类比约 88rpx，文字 $font-size-md(16px)
- 页面内容底部预留 $spacing-xxl(40px)*类比约 120rpx 留白，避免被操作栏遮挡

## 全局约束
- 遵循 design-spec.md §5 表单规范，使用 wd-cell-group + wd-cell
- 校验自动推断：金额→digit键盘+非负校验；日期→不早于今日；必填项空值拦截
- 必填字段 label 前红色星号，校验错误在字段下方 $color-danger $font-size-sm(12px) 显示
```

---

## 关键决策注释

- **为什么分 3 组**：字段 > 6 个，按 `design-spec.md §5.9` 自动分组，语义聚合（基本/金额/签署）降低填写认知负荷。
- **为什么金额字段加粗**：金额是合同核心字段，输入值用 `$font-weight-bold(600)` 强调，但用 `$font-size-md` 不抢提交按钮焦点。
- **为什么提交按钮占 65%**：底部双按钮中「提交审批」是主操作，靠面积 + 实心品牌色成为屏级焦点；「存草稿」次操作用描边弱化。
- **校验自动推断**：用户只给字段名，AI 按 §5.7 映射表自动配键盘类型和校验规则，无需逐一指定。
