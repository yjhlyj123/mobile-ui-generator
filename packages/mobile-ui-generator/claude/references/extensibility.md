# 扩展性指南

> 本文件说明如何扩展 mobile-ui-generator 的各项能力。

---

## 1. 新增页面类型修饰符

当前修饰符：`form`、`list`、`detail`

### 步骤

1. 编辑 `core/command-contract.yaml`，在 `tokens.specialty` 中添加：

```json
"mytype": {
  "label": "自定义专项",
  "focus": "描述该专项聚焦的内容"
}
```

2. 在 `combination_rules.accepted_commands` 中添加所有合法组合：

```json
"/mug:mytype",
"/mug:s:mytype",
"/mug:x:mytype",
"/mug:d:mytype"
```

3. 运行 `npm run render:docs` 同步各端文档

4. 运行 `npm run validate:contract` 校验

---

## 2. 新增主题预设

1. 在 `core/tokens/theme-presets/` 下创建 `my-theme.json`
2. 必须满足 `theme-contract.ts` 的 `ThemeConfig` 接口
3. 必须包含全部字段（brand、functional、status、neutral、shadows、radius、motion、gradients）
4. 在 `theming.md` 中注册说明

---

## 3. 新增 Tabbar 风格

1. 在 `core/tabbar-styles.md` 中添加新的风格章节
2. 包含：设计理念、布局 ASCII 示意、关键特征、适用场景
3. 在 `design-guidance.md` 的匹配矩阵中添加该风格的推荐映射

---

## 4. 新增端适配器

以新增 `gemini` 端为例：

1. 在 `packages/mobile-ui-generator/` 下创建 `gemini/` 目录

2. 创建端文档文件（如 `SKILL.md`）

3. 在 `scripts/render-command-docs.cjs` 中添加渲染目标：
   - 参照 `command-contract-lib.cjs` 中的 `buildRenderedDocs` 函数

4. 创建 `scripts/install-gemini.sh` 安装脚本

5. 在 `bin/mobile-ui-generator.cjs` 中的 `run()` 函数添加 `gemini` 分支

6. 在 `scripts/check-suite.sh` 的 `required_files` 中添加新文件

7. 运行 `npm run check` 验证

---

## 5. 新增命令

1. 在 `command-contract.yaml` 的 `public_commands` 中添加

2. 在对应的 `tokens` 或独立的 `utility_commands` 部分定义命令配置

3. 如果命令影响状态机流转，需在 `state_flows` 中添加或修改流程

4. 添加对应的 example JSON 到 `core/examples/`

5. 运行 `npm run render:docs && npm run validate:contract`

---

## 6. 新增黄金示例

1. 在 `core/examples/` 下创建 `example-name.json`

2. 遵循现有示例的结构：

```json
{
  "id": "example-name",
  "input": { "command": "/mug:x:form" },
  "context": { "描述测试场景" },
  "expected": {
    "normalized_command": "/mug:x:form",
    "flow": "complex",
    "specialty": "form",
    "pencil_policy": "try",
    "must_pause": true,
    "handling": {},
    "state_flow": ["detect_mode", "collect_required_inputs", "..."]
  }
}
```

3. 运行 `npm run validate:contract` 确保示例通过校验
