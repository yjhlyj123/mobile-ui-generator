# mobile-ui-generator Agent Notes

> AUTO-GENERATED from `packages/mobile-ui-generator/core/command-contract.yaml`. Run `npm run render:docs` after editing the contract.

- 所有命令解析、缺失输入处理、状态机与验收要求，都以 `packages/mobile-ui-generator/core/command-contract.yaml` 为准。
- complex/design_first/refactor 在 Pencil 可用时，必须先给出至少 3 个 UI 方案；用户未选方向前，禁止继续结构化 prompt 或直接实现。
- 设计先行模式必须先完成 Pencil 安装或验证。
- 如果 Pencil 未连通，只允许排查问题、汇报阻塞原因并终止当前开发；禁止继续输出页面实现代码。
- 重构模式必须先给出 3 个方向；用户未选方向前，禁止直接实现。
- 代码实现阶段必须以 Pencil 设计稿为蓝图，逐区块对照还原，偏差须标注。
- 代码交付后用户要求调整时：Agent 必须先判断并告知用户属于哪一类。
- 多页面开发时必须读取 `.mug-project.json` 以保持风格一致。
- 每次交付都要汇报：是否走了 Pencil、若 Pencil 未连通，失败原因是什么、若 Pencil 未连通，是否已终止当前开发、关键假设有哪些、输出了哪些实现物、**设计还原度**：逐区块对照 Pencil 设计稿的还原情况，偏差项及原因。
