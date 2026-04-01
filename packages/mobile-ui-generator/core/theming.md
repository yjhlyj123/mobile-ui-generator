# 主题扩展指南

> 本文件说明如何基于 mobile-ui-generator 的 Token 体系扩展或自定义主题配色。

## 架构概述

主题系统采用**三轨制**：

```
theme-presets/*.json    →   base-tokens.scss    →   semantic-tokens.scss
     (主题配置)              (SCSS 基础变量)        (CSS Custom Properties)
```

- **theme-presets/*.json**：主题配置文件，遵循 `theme-contract.ts` 类型定义
- **base-tokens.scss**：SCSS 基础变量，供编译时使用
- **semantic-tokens.scss**：CSS Custom Properties，供运行时主题切换

## 预设主题

| 主题 | ID | 适用场景 |
|------|----|----------|
| 商务蓝 | `blue` | B 端企业应用、OA、审批系统 |
| 活力橙 | `orange` | C 端消费类、电商、生活服务 |
| 清新绿 | `green` | 健康、教育、环保类应用 |

## 创建自定义主题

### 步骤 1：复制预设模板

```bash
cp core/tokens/theme-presets/blue.json core/tokens/theme-presets/my-theme.json
```

### 步骤 2：修改配置

编辑 `my-theme.json`，按 `theme-contract.ts` 中的 `ThemeConfig` 类型修改各项色值：

```json
{
  "id": "my-theme",
  "name": "我的主题",
  "description": "适用于 XX 场景的自定义主题",
  "brand": {
    "primary": "#你的主色",
    "primaryLight": "#浅色衍生",
    "primaryDark": "#深色衍生",
    "primaryDisabled": "rgba(R, G, B, 0.4)"
  }
}
```

**配色建议**：
- `primaryLight` 建议为主色的 10%-15% 不透明度铺底色
- `primaryDark` 建议比主色暗 10%-15%
- 功能色（success/warning/danger）建议保持通用语义，不做大幅修改
- 渐变（gradients.headerBg）需与品牌色协调

### 步骤 3：在项目中应用

在项目的 `theme.json` 中指定激活主题：

```json
{
  "activeTheme": "my-theme",
  "themes": ["blue", "orange", "green", "my-theme"]
}
```

## 运行时切换

通过覆盖 `:root` 下的 CSS Custom Properties 实现：

```typescript
function applyTheme(theme: ThemeConfig) {
  const root = document.documentElement
  root.style.setProperty('--mug-color-primary', theme.brand.primary)
  root.style.setProperty('--mug-color-primary-light', theme.brand.primaryLight)
  root.style.setProperty('--mug-color-primary-dark', theme.brand.primaryDark)
  // ... 其余变量
}
```

## uni-app 中使用

在 `App.vue` 或全局样式中引入语义 Token：

```scss
@use 'core/tokens/semantic-tokens';
```

在页面中直接使用 CSS 变量：

```scss
.my-card {
  background: var(--mug-color-bg-card);
  border-radius: var(--mug-radius-md);
  box-shadow: var(--mug-shadow-base);
}

.my-button {
  background: var(--mug-color-primary);
  transition: background var(--mug-duration-fast) var(--mug-easing-standard);
}
```

## 注意事项

1. **禁止硬编码色值**：所有颜色必须通过 Token 引用
2. **渐变一致性**：一级页面的头部渐变需使用 `gradients.headerBg`
3. **阴影语义**：卡片用 `shadow-base`，弹窗用 `shadow-lg`，底部操作栏用 `shadow-md`
4. **类型安全**：新增主题必须满足 `ThemeConfig` 接口的全部字段
