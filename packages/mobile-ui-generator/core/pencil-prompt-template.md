# Mobile UI Generator Core Pencil Prompt Template

## Standard Template

```md
# 页面信息
- 页面类型：
- 页面层级：一级页面（Tabbar） / 二级页面 / 三级页面
- 业务目标：
- 目标用户：
- 业务场景：

# 主题配置
- 当前主题：（如：商务蓝 / 活力橙 / 清新绿 / 自定义）
- 品牌色：
- 渐变方向：（如：`gradients.headerBg`）

# 核心模块
- 模块 1：
- 模块 2：
- 模块 3：

# 优先级
- 首屏必须表达：
- 次级信息：
- 可省略信息：

# 风格约束
- 遵循 `design-spec.md` 设计规范
- 遵循 `page-hierarchy.md` 页面层级差异
- 颜色通过 CSS Custom Properties 引用
- 信息克制，弱装饰
- 不要营销式头图（二级页面）
- 不要冗余描述文案

# 技术与落地约束
- uni-app
- Vue 3
- UnoCSS
- wot-design-uni
- CSS Custom Properties (`--mug-*`)

# 参考信息
- 参考稿 / `.pen` / 截图：
- 需要保留的元素：
- 需要避免的元素：

# 输出要求
- 给出页面结构
- 给出区块层级
- 给出首屏重点
- 给出自定义导航建议（如需要）
- 给出状态与卡片的视觉方向
```

---

## Tabbar Page Template (一级页面专用)

Use this template when the page is a primary Tabbar page.

```md
# Tabbar 页面信息
- 页面名称：（如：首页 / 工作台 / 我的）
- 业务目标：
- 目标角色：

# 选定的 Tabbar 风格
- 风格：（沉浸式头部 / 卡片金刚区 / 数据看板式 / 图文并茂式）
- 参考：`tabbar-styles.md` 中的方案描述

# 头部区域
- 背景处理：渐变 + 几何装饰（风格A） / 渐变 + 微弱纹理（风格B）
- 渐变色值：`gradients.headerBg`
- 背景装饰：（描述具体装饰元素，参见 `page-hierarchy.md` § 3.1）
- 头部内容：问候语 / 搜索框 / 通知入口
- 头部高度：约 ___rpx
- 微信胶囊适配：右侧留出胶囊安全距离

# 金刚区（如适用）
- 列数：4 / 5
- 图标风格：渐变圆形底 / 纯色底 / 线性图标
- 入口数量：___

# 统计/概览（如适用）
- 卡片数量：___
- 数据类型：待办 / 金额 / 进度 / 趋势

# 内容分区
- 分区 1：
- 分区 2：
- 分区 3：

# 设计约束
- 使用一级页面规范（大圆角 `$radius-xxl`）
- 头部渐变必须使用主题配置的 `gradients.headerBg`
- 金刚区/统计卡片允许微动效

# 输出要求
- 给出完整的首屏布局层级
- 给出头部与内容的交界处理方式
- 给出 Tabbar 选中态样式建议
```

---

## Refactor Mode Template (use when refactoring from a reference page)

Use this template **three times**, once per direction. Replace `[方向名]` and fill each section independently.

```md
# 重构方向：[方向名]

## 方向策略
- 核心差异（与参考页的区别）：
- 布局策略：
- 信息层级重心：

## 从参考页提取的内容（仅业务内容，不含视觉）
- 模块列表：
- 数据字段：
- 业务状态：
- 操作入口：

## 本方向的设计指令
- 首屏重点：
- 区块划分：
- 状态呈现方式：
- 操作位置与权重：

## 明确禁止复现参考页的以下元素
- （列出参考页中不应被照搬的布局、卡片形态、颜色用法、信息分组等）

## 风格约束
- 遵循 `design-spec.md` 设计规范
- 遵循 `page-hierarchy.md` 页面层级差异
- 信息克制，弱装饰

## 技术与落地约束
- uni-app
- Vue 3
- UnoCSS
- wot-design-uni

## 输出要求
- 给出页面结构
- 给出区块层级
- 给出首屏重点
- 给出与其他方向的关键视觉差异说明
```

---

## UI Direction Comparison Template

Use after presenting 3 directions, to help the user compare and choose.

```md
## 方案对比总结

| 维度 | 方案 A：[名称] | 方案 B：[名称] | 方案 C：[名称] |
|------|----------------|----------------|----------------|
| 核心假设 | 用户最想 ___ | 用户最想 ___ | 用户最想 ___ |
| 首屏主角 | ___ | ___ | ___ |
| 用户动线 | 先看 → 再做 | 先做 → 再看 | 边看边做 |
| 信息密度 | 高 / 中 / 低 | 高 / 中 / 低 | 高 / 中 / 低 |
| 操作效率 | ___ | ___ | ___ |

### 选择建议

- **选方案 A**：如果 ___（用具体的业务场景描述）
- **选方案 B**：如果 ___
- **选方案 C**：如果 ___

> 请选择一个方案编号（A/B/C），或描述你的偏好方向。
> 也可以混搭："用方案 A 的头部 + 方案 B 的内容区"。
> 选定后我会先用 Pencil 生成视觉设计稿给你预览，你确认设计满意后再进入代码实现。
```

---

## Form Page Template (表单页面专用)

Use this template when the page specialty is `form`.

```md
# 表单页面信息
- 页面名称：（如：新建合同 / 提交审批 / 编辑资料）
- 业务目标：
- 目标角色：

# 表单字段清单
| 字段名 | 类型 | 必填 | 组件 | 校验规则 | 联动说明 |
|--------|------|------|------|----------|----------|
| ___ | 文本/数字/选择/日期/开关/上传 | 是/否 | wd-input/wd-picker/... | ___ | ___ |

# 字段分组
- 分组 1 名称：包含字段 ___
- 分组 2 名称：包含字段 ___
- 分组 3 名称：包含字段 ___

# 表单模式
- 字段高度：正常（88rpx） / 紧凑（72rpx）
- 标签宽度：（默认 180rpx）

# 提交操作
- 按钮数量：1（提交） / 2（保存草稿 + 提交）
- 按钮位置：底部固定操作栏
- 提交前校验：全量校验

# 设计约束
- 遵循 `design-spec.md` § 5 表单设计规范
- 使用 `wd-cell-group` + `wd-cell` 布局
- 必填字段标注红色星号
- 校验错误在字段下方显示

# 输出要求
- 给出字段分组和排列顺序
- 给出校验交互方式
- 给出提交按钮布局
- 给出联动字段的显示/隐藏逻辑
```

---

## List Page Template (列表页面专用)

Use this template when the page specialty is `list`.

```md
# 列表页面信息
- 页面名称：（如：合同列表 / 审批记录 / 用章申请）
- 业务目标：
- 目标角色：

# 列表项结构
| 信息 | 字段 | 位置 | 样式 |
|------|------|------|------|
| 主标题 | ___ | 左上 | $font-size-base, $color-text-primary |
| 副信息 | ___ | 左下 | $font-size-sm, $color-text-secondary |
| 状态 | ___ | 左下 | StatusTag 组件 |
| 时间 | ___ | 副信息中 | ___ |

# 列表项密度
- 标准（120rpx） / 紧凑（96rpx） / 富内容（auto，最小 140rpx）

# 搜索与筛选
- 搜索字段：（如：名称、编号）
- 筛选维度：（如：状态 [全部/待审批/已通过/已驳回]）
- 筛选方式：Filter Pill / 抽屉面板

# 操作按钮
- 按钮列表：（如：查看、审批、编辑、删除）
- 按钮数量：___
- 高频操作：___
- 危险操作：___
- 推荐模式：模式 A（内联+更多） / 模式 B（左滑 SwipeCell）

# 状态处理
- 空数据：EmptyState type=empty-data
- 搜索无结果：EmptyState type=no-search-results
- 加载失败：EmptyState type=load-failed
- 骨架屏：wd-skeleton，模拟 ___ 个列表项
- 加载更多：wd-loadmore

# 设计约束
- 遵循 `design-spec.md` § 6 列表设计规范
- 遵循 `design-spec.md` § 6.4 操作按钮规范
- 搜索栏吸顶
- 列表项间通过间距区分，不使用分割线

# 输出要求
- 给出列表项的信息布局
- 给出搜索和筛选的位置与交互
- 给出操作按钮的模式选择及原因
- 给出各种状态的处理方式
```

---

## Detail Page Template (详情页面专用)

Use this template when the page specialty is `detail`.

```md
# 详情页面信息
- 页面名称：（如：合同详情 / 审批详情 / 用章记录）
- 业务目标：
- 目标角色：

# 页面头部
- 标题：___
- 状态：___ （使用 StatusTag 组件）
- 创建时间 / 关键元信息：___

# 信息分组
| 分组名 | 包含字段 | 展示方式 |
|--------|----------|----------|
| 基本信息 | 字段1、字段2、字段3 | label-value 对 |
| 签署信息 | 字段4、字段5 | label-value 对 |
| 审批记录 | 审批人、时间、结果 | 时间线（wd-steps 竖向） |
| 附件 | 文件列表 | 文件卡片 |

# 关键字段高亮
- 金额字段：使用 $font-weight-bold + $font-size-md
- 状态字段：使用 StatusTag + 四层状态色

# 底部操作栏
- 按钮数量：___
- 按钮列表：（如：驳回、通过）
- 主操作：___（$color-primary）
- 次操作：___
- 危险操作：___（$color-danger，需二次确认）

# 设计约束
- 遵循 `design-spec.md` § 7 详情页设计规范
- 使用 PageSection + PageCard 分组
- 底部操作栏固定定位 + safe-area-bottom
- 页面内容底部预留 120rpx 留白

# 输出要求
- 给出信息分组和排列优先级
- 给出状态展示位置和样式
- 给出底部操作栏的按钮布局
- 给出时间线/审批记录的展示方式
```
