export const mobileUiShortcuts = {
  // ===== 文字层级 =====
  'text-hero':    'text-26px font-800 color-#1A1A1A leading-34px',
  'text-title':   'text-18px font-600 color-#1A1A1A leading-26px',
  'text-subtitle':'text-16px font-500 color-#1A1A1A leading-24px',
  'text-body':    'text-14px font-400 color-#333333 leading-22px',
  'text-caption': 'text-12px font-400 color-#666666 leading-18px',
  'text-hint':    'text-12px font-400 color-#999999 leading-18px',

  // ===== 布局 =====
  'page-container': 'min-h-screen bg-#F5F6FA',
  'safe-area':      'px-16px',
  'card':           'bg-white rounded-8px p-16px',
  'card-shadow':    'bg-white rounded-8px p-16px shadow-[0_2px_8px_rgba(0,0,0,0.06)]',
  'section-gap':    'mt-12px',

  // ===== 分割线 =====
  'divider':       'h-1px bg-#EBEDF0',
  'divider-light': 'h-1px bg-#F2F3F5',
  'divider-brand': 'h-1px bg-#EEF4FF',

  // ===== Flex =====
  'flex-between': 'flex justify-between items-center',
  'flex-center':  'flex justify-center items-center',
  'flex-start':   'flex justify-start items-center',
  'flex-col':     'flex flex-col',

  // ===== Tag 变体 =====
  'tag-solid':   'rounded-full px-12px py-7px bg-#4F46E5 text-white text-12px font-500',
  'tag-light':   'rounded-full px-12px py-7px bg-#EEF2FF text-#4338CA text-12px font-500',
  'tag-outline': 'rounded-full px-12px py-7px border border-#C7D2FE bg-white text-#4F46E5 text-12px font-500',
  'tag-s': 'px-10px py-6px text-11px',
  'tag-m': 'px-12px py-7px text-12px',
  'tag-l': 'px-14px py-8px text-13px',

  // ===== 状态浅底色 =====
  'surface-primary': 'bg-#EEF4FF border border-#C7D7FE text-#1D4ED8',
  'surface-success': 'bg-#ECFDF3 border border-#B7E5C8 text-#15803D',
  'surface-warning': 'bg-#FFFAEB border border-#F7D58D text-#B45309',
  'surface-danger':  'bg-#FEF2F2 border border-#F3C3C3 text-#B91C1C',
  'surface-info':    'bg-#EFF8FF border border-#BFDBFE text-#0369A1',

  // ===== 筛选 Pill =====
  'filter-active':   'rounded-full px-14px py-6px bg-#2563EB text-white text-13px font-500',
  'filter-inactive': 'rounded-full px-14px py-6px bg-#F3F4F6 text-#475569 text-13px font-500',
  'filter-more':     'rounded-full px-14px py-6px bg-#EEF2FF text-#4F46E5 text-13px font-500',

  // ===== 占位图按钮 =====
  'btn-placeholder': 'rounded-full bg-#F2F7FF border border-#B8D7FF text-#0E74FF px-16px py-6px text-13px',

  // ===== 渐变 =====
  'gradient-brand':      'bg-gradient-to-br from-#4F46E5 to-#7C3AED',
  'gradient-header':     'bg-gradient-to-b from-#2B6BFF to-#4F8DFF',
  'gradient-header-oa':  'bg-gradient-to-b from-#2F6BFF to-#5B8CFF',
  'gradient-activity':   'bg-gradient-to-br from-#2563EB to-#60A5FA',
  'gradient-equity':     'bg-gradient-to-br from-#059669 to-#34D399',
  'gradient-todo':       'bg-gradient-to-br from-#D97706 to-#F59E0B',
  'gradient-risk':       'bg-gradient-to-br from-#DC2626 to-#F97316',

  // ===== "我的"页面专用 =====
  'my-icon-box':       'w-34px h-34px bg-#EAF2FF rounded-12px flex-center',
  'my-icon-box-lg':    'w-44px h-44px bg-#EAF2FF rounded-14px flex-center',
  'my-avatar':         'w-64px h-64px rounded-full bg-#B8D5FF',
  'my-cert-tag':       'rounded-full px-10px py-4px bg-#E8F0FF text-#245BDB text-11px font-500',
  'my-enterprise-pill':'rounded-full px-12px py-6px bg-#3E78FF text-white text-12px font-500',
  'my-list-item':      'flex-between h-56px',
} as const;

export type MobileUiShortcutName = keyof typeof mobileUiShortcuts;
