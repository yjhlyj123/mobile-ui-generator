# 极简上手指南

> 3 分钟完成安装和第一次使用。

---

## 第一步：安装

根据你使用的 AI 编程工具，选择一条命令执行：

```bash
# Codex 用户
npx mobile-ui-generator install codex

# Cursor 用户
npx mobile-ui-generator install cursor --dest ./

# Claude Code 用户
npx mobile-ui-generator install claude --dest ./
```

---

## 第二步：验证安装

在 AI 对话中输入：

```
/mug:help
```

如果能看到命令列表，说明安装成功 ✅

---

## 第三步：开始使用

### 做一个简单页面

```
/mug:s 帮我做一个用户列表页面，包含搜索和筛选
```

### 做一个复杂首页（AI 会先给 3 个方案让你选）

```
/mug:x 做一个工作台首页，需要：待办审批、数据统计、快捷操作入口
```

### 做一套 Tabbar 页面（AI 会推荐风格）

```
/mug:tabbar 做一套 4 Tab 的应用：首页、工作台、消息、我的
```

### 先设计再编码（需安装 Pencil）

```
/mug:d 做一个合同管理的数据看板，有图表和多种状态
```

---

## 第四步：安装 Pencil（可选，复杂/设计模式需要）

```bash
npx mobile-ui-generator install-pencil-mcp
```

安装后在 AI 编程工具中确认 Pencil 已连接即可。

---

## 切换主题

```
/mug:theme
```

可预览和切换预设主题：商务蓝 / 活力橙 / 清新绿。

---

## 自检页面

```
/mug:check
```

自动对照设计规范检查当前页面，输出问题清单。

---

## 更多信息

- 完整命令说明：[README.md](./README.md)
- 设计规范：`packages/mobile-ui-generator/core/design-spec.md`
- 主题扩展：`packages/mobile-ui-generator/core/theming.md`
- 页面层级：`packages/mobile-ui-generator/core/page-hierarchy.md`
