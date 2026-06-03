# 空状态占位图映射

本 skill 自带 5 张可直接复用的占位图，统一放在 `assets/placeholders/` 下。

## 文件映射

| 场景 | 文件名 | 推荐文案 | 推荐动作 |
|------|--------|----------|----------|
| 空数据 | `empty-data.png` | 暂无内容 | 刷新试试 |
| 加载失败 | `load-failed.png` | 加载失败 | 重新加载 |
| 网络异常 | `network-error.png` | 网络异常 | 检查网络 |
| 无搜索结果 | `no-search-results.png` | 没有找到结果 | 更换关键词 |
| 服务繁忙 | `server-busy.png` | 服务繁忙 | 稍后再试 |

## 使用规则

### 默认选择

- 列表初始为空：`empty-data.png`
- 请求报错但允许重试：`load-failed.png`
- 设备离线、弱网、接口超时偏网络原因：`network-error.png`
- 搜索、筛选后结果为空：`no-search-results.png`
- 服务端限流、系统繁忙、排队中：`server-busy.png`

### 组件接入建议

如果项目有通用空状态组件，建议 API 设计接近下面这种形式：

```ts
type EmptyStateType =
  | 'empty-data'
  | 'load-failed'
  | 'network-error'
  | 'no-search-results'
  | 'server-busy'
```

组件内部再统一映射图片、标题、副标题和按钮文案。

starter 已提供对应实现：

- `assets/starter/constants/empty-state.ts`
- `assets/starter/components/EmptyState.vue`

推荐先复用 starter 的类型与预设，再根据项目需要调整组件样式。

## 资产路径

```text
assets/placeholders/empty-data.png
assets/placeholders/load-failed.png
assets/placeholders/network-error.png
assets/placeholders/no-search-results.png
assets/placeholders/server-busy.png
```

## 命名原则

- 使用业务语义命名，不使用随机文件名
- 使用 kebab-case
- 文件名直接对应组件的状态枚举，降低接入成本
