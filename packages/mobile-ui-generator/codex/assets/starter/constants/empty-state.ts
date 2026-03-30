export type EmptyStateType =
  | 'empty-data'
  | 'load-failed'
  | 'network-error'
  | 'no-search-results'
  | 'server-busy';

export interface EmptyStatePreset {
  assetName: string;
  title: string;
  description: string;
  actionText: string;
}

export const EMPTY_STATE_PRESETS: Record<EmptyStateType, EmptyStatePreset> = {
  'empty-data': {
    assetName: 'empty-data.png',
    title: '暂无内容',
    description: '当前没有可展示的数据',
    actionText: '刷新试试',
  },
  'load-failed': {
    assetName: 'load-failed.png',
    title: '加载失败',
    description: '数据暂时没有加载出来，请稍后重试。',
    actionText: '重新加载',
  },
  'network-error': {
    assetName: 'network-error.png',
    title: '网络异常',
    description: '请检查当前网络连接后再重试。',
    actionText: '检查网络',
  },
  'no-search-results': {
    assetName: 'no-search-results.png',
    title: '没有找到结果',
    description: '换个关键词试试，可能会更接近你要找的内容。',
    actionText: '重新搜索',
  },
  'server-busy': {
    assetName: 'server-busy.png',
    title: '服务繁忙',
    description: '系统正在处理中，请稍后再试。',
    actionText: '稍后再试',
  },
};
