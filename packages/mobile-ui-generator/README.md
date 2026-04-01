# mobile-ui-generator

本 package 包含一个共享的移动端 UI 生成器，分发给多个 agent 运行时使用。

## 命令契约来源

- 单一事实源：`core/command-contract.yaml`
- 文档生成：`npm run render:docs`
- 契约校验：`npm run validate:contract`

## 目录结构

- `core`
  共享设计方向、工作流、命令契约和 Pencil prompt 指南
- `codex`
  Codex skill 适配器
- `claude`
  Claude Code 适配器
- `cursor`
  Cursor 适配器

## 共享行为

- 简单页面直接生成
- 复杂页面或设计先行页面在使用 Pencil 前，必须先给出至少 3 个差异化 UI 方案并等待用户选择
- 用户选定方向后，再整理结构化 Pencil prompt 并进入实现
- 重构模式：用户提供参考页面时激活，始终给出 3 个差异化方向后再实现
- 最终实现必须始终符合企业 B 端约束、信息克制和项目级技术规则

## 复杂页面信号

- 工作台首页
- 数据看板
- 审批流编排页
- 多分区复合首页
- 带自定义导航的业务首页
- 引用了 Pencil 草稿或 `.pen` 风格的页面
- 信息层级或交互流程明显复杂的页面

## 规范来源

`core/` 是规范的唯一可信来源。
其中命令解析、状态机、缺失输入处理和验收汇报统一由 `core/command-contract.yaml` 定义；各端说明文档必须由脚本生成，而不是手写分叉。
