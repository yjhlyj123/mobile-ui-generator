/**
 * mobile-ui-generator — 主题配置类型契约
 *
 * 用于 theme.json / theme-presets 的 TypeScript 类型定义。
 * Agent 和脚本可使用此类型校验主题配置的完整性。
 */

/** 品牌色配置 */
export interface BrandColors {
  primary: string
  primaryLight: string
  primaryDark: string
  primaryDisabled: string
}

/** 功能色配置 */
export interface FunctionalColors {
  success: string
  warning: string
  danger: string
  info: string
}

/** 业务状态色（四层体系） */
export interface StatusColorSet {
  main: string
  bg: string
  border: string
  text: string
}

/** 中性色配置 */
export interface NeutralColors {
  textPrimary: string
  textRegular: string
  textSecondary: string
  textPlaceholder: string
  textDisabled: string
  bgPage: string
  bgCard: string
  bgHover: string
  border: string
  borderLight: string
}

/** 阴影配置 */
export interface Shadows {
  sm: string
  base: string
  md: string
  lg: string
  xl: string
}

/** 圆角配置 */
export interface BorderRadius {
  sm: string
  md: string
  lg: string
  xl: string
  xxl: string
  full: string
}

/** 动效配置 */
export interface Motion {
  durationFast: string
  durationNormal: string
  durationSlow: string
  easingStandard: string
  easingDecelerate: string
  easingSpring: string
}

/** 渐变配置（一级页面专用） */
export interface Gradients {
  /** 头部背景渐变 */
  headerBg: string
  /** 卡片强调渐变 */
  cardAccent?: string
  /** Tabbar 选中态渐变 */
  tabbarActive?: string
}

/** 完整主题配置 */
export interface ThemeConfig {
  /** 主题唯一标识 */
  id: string
  /** 主题显示名 */
  name: string
  /** 主题描述 */
  description: string

  brand: BrandColors
  functional: FunctionalColors
  status: {
    brand: StatusColorSet
    success: StatusColorSet
    warning: StatusColorSet
    error: StatusColorSet
    info: StatusColorSet
  }
  neutral: NeutralColors
  shadows: Shadows
  radius: BorderRadius
  motion: Motion
  gradients: Gradients
}

/** theme.json 文件的顶层结构 */
export interface ThemeFile {
  /** 当前激活的主题 ID */
  activeTheme: string
  /** 所有可用主题 */
  themes: ThemeConfig[]
}
