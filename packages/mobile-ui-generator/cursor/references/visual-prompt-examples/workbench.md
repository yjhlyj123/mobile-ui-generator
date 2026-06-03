# C 级范例 · 工作台（Tabbar 一级页面）

> 本文件是「合同审批工作台」的 **C 级视觉指令型 Pencil prompt 满分范例**。
> 写新工作台 prompt 时，仿照本文件的颗粒度——每个区块都锁死 尺寸 / 背景 / 字号字重色彩 / 焦点 / 间距节奏，全程 Token 双标注。

---

## 输入（用户的一句话需求）

> 「做一个合同审批工作台首页，审批人能快速处理待办。」

## 四步走查（依据 `design-arsenal.md §4`）

1. **人格基调**：合同审批 = B 端政企 → **克制专业** → blue 主题 + Tabbar 风格 A（沉浸式头部）+ 极简几何装饰。
2. **布局原型**：审批人最关心待办 → **原型 1 大卡主导**，待办列表大卡占屏 ~60%。
3. **逐区块视觉指令**：见下方完整 prompt。
4. **节奏校验**：首屏唯一重心（待办大卡）✓ 焦点（金额/超时数）✓ 间距疏密交替 ✓ Token 双标注 ✓ 真实数据 ✓。

---

## 完整 C 级 Pencil Prompt

```md
# 页面：合同审批工作台（一级 Tabbar 页面）
# 人格基调：克制专业 | 主题：blue | 布局原型：大卡主导
# 整体节奏：头部(沉浸渐变) → 待办大卡(主角·占屏~60%) → 数据条(扁平) → 快捷入口(弱化)
# 页底色 $color-bg-page(#F5F6FA)，80%+ 面积灰白，品牌色仅点睛

## 区块 1 · 贯穿式头部（高度约 320rpx，含状态栏）
- 背景：linear-gradient(135deg, $color-primary(#0E74FF) → $color-primary-dark(#0B5ED9))，
  右下角几何装饰圆 rgba(255,255,255,0.08) 240rpx + rgba(255,255,255,0.05) 120rpx
- 微信胶囊适配：右侧内容留出胶囊宽度 + 12px 安全区
- 主标题「待我审批」$font-size-xl(20px) + $font-weight-black(800) + 白色
- 副信息「5 件待处理 · 2 件超时」$font-size-sm(12px) + 白色 70%
  （“2 件超时”用 $status-warning 浅底小角标强调）
- 右上铃铛图标 白色 + 红点角标「3」（$status-error-main #EF4444 底 + 白字）
- 头部内边距 $spacing-base(16px)，主副标题行距 $spacing-xs(8px)

## 区块 2 · 待办大卡（首屏视觉重心，占屏约 60%）
- 与头部交界：上浮叠加，卡片顶部压在渐变区下沿
- 容器：$color-bg-card(#FFFFFF) + $radius-xxl(18px)（一级页面大圆角）+ $shadow-md
- 卡内边距 $spacing-base(16px)，与头部间距 $spacing-md(20px)
- 卡头行：「待我审批」$font-size-md(16px)+$font-weight-bold(600)+$color-text-primary，
  右侧「全部 5 件 ›」$font-size-sm(12px)+$color-text-secondary
- 待办项 ×3（列表项间距 $spacing-sm(12px)，靠间距分隔不用分割线）：
  每条结构 =
    · 左竖色条 4rpx 宽 $status-warning-main(#F59E0B)（待审橙）
    · 主标题「采购合同-2024089」$font-size-md(16px)+$font-weight-medium(500)+$color-text-primary
    · 副信息「王磊·采购部·2h前」$font-size-sm(12px)+$color-text-secondary
    · 右侧金额「¥125,000」$font-size-lg(18px)+$font-weight-bold(600)+$color-primary（行内焦点）
    · 底行按钮：「通过」实心 $color-primary 白字 / 「驳回」描边 $color-border + $color-text-regular
  真实数据示例：
    采购合同-2024089 / 王磊·采购部 / ¥125,000 / 2h前
    用章申请-0457 / 李娜·法务部 / 公章 / 5h前（超时·左竖条改 $status-error-main）
    报销单-308821 / 陈昊·市场部 / ¥3,200 / 昨天

## 区块 3 · 数据概览条（次要，扁平无卡）
- 与待办大卡间距 $spacing-xl(32px)（拉开模块）
- 横向 3 等分，纯文字无卡片底、无阴影
- 每项：数值 $font-size-hero(26px)+$font-weight-heavy(700)+$color-text-primary，
  下方标签 $font-size-sm(12px)+$color-text-secondary
- 数据：本月已审 42 / 平均时长 3.2h / 超时 2（“超时 2”数值用 $status-error-main 提示）

## 区块 4 · 快捷入口（弱化处理）
- 与数据条间距 $spacing-lg(24px)
- 4 列线性图标 + 文字，图标统一 $color-text-secondary，文字 $font-size-sm(12px)
- 入口：发起审批 / 我发起的 / 抄送我的 / 审批模板
- 不使用彩色圆形图标底（避免彩虹图标）

## 全局约束
- 遵循 design-spec.md 一级页面规范 + page-hierarchy.md 贯穿式头部
- 渐变仅头部，区块 2-4 均白底/灰底
- 间距节奏：头部→大卡 20px，大卡→数据条 32px，数据条→入口 24px（疏密交替）
```

---

## 关键决策注释（为什么这么设计）

- **为什么待办大卡占 60%**：审批人打开工作台的核心任务是「处理待办」，主角区必须够大、够直给，符合原型 1。数据概览是「顺便看一眼」，所以下沉、扁平化。
- **为什么金额用 `$font-size-lg(18)+bold+品牌色`**：金额是审批决策的关键信息，做成行内焦点；但不到 `$font-size-hero`，因为它是「项内焦点」不是「屏级焦点」，要给数据概览的 hero 数字让位。
- **为什么超时项左竖条变红**：用 `$status-error-main` 而非橙，让「超时」在一列待办里一眼跳出，符合 §1.2 焦点原则。
- **为什么快捷入口不用彩色图标**：克制专业人格禁彩虹图标（§3 人格 1 反面），统一中性色线性图标维持秩序感。
- **间距节奏**：模块间 32/24px 交替、卡内 12/8px，制造呼吸，避免全页均匀的 AI 感（§1.3）。
