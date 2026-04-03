<script setup lang="ts">
/**
 * DetailField — 详情字段
 * 封装 §7.2 信息展示 + §7.4 智能推断（金额加粗、手机拨号、编号复制、空值兜底）
 */
type FieldType = 'text' | 'amount' | 'phone' | 'email' | 'url' | 'copy';

interface Props {
  label: string;
  value?: string | number | null;
  type?: FieldType;
}

const props = withDefaults(defineProps<Props>(), {
  value: null,
  type: 'text',
});

const displayValue = computed(() => {
  if (props.value == null || props.value === '') return '--';
  return String(props.value);
});

const isInteractive = computed(() =>
  ['phone', 'email', 'url', 'copy'].includes(props.type)
);

function handleAction() {
  if (displayValue.value === '--') return;

  switch (props.type) {
    case 'phone':
      uni.makePhoneCall({ phoneNumber: String(props.value) });
      break;
    case 'email':
      // #ifdef H5
      window.location.href = `mailto:${props.value}`;
      // #endif
      break;
    case 'url':
      uni.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(String(props.value))}` });
      break;
    case 'copy':
      uni.setClipboardData({
        data: String(props.value),
        success: () => uni.showToast({ title: '已复制', icon: 'success', duration: 1500 }),
      });
      break;
  }
}
</script>

<template>
  <view class="detail-field">
    <text class="detail-field__label">{{ label }}</text>
    <view
      class="detail-field__value"
      :class="{
        'detail-field__value--amount': type === 'amount',
        'detail-field__value--interactive': isInteractive,
        'detail-field__value--empty': displayValue === '--',
      }"
      @click="isInteractive && handleAction()"
    >
      <text>{{ displayValue }}</text>
      <text v-if="type === 'phone' && displayValue !== '--'" class="detail-field__icon">📞</text>
      <text v-if="type === 'email' && displayValue !== '--'" class="detail-field__icon">✉</text>
      <text v-if="type === 'url' && displayValue !== '--'" class="detail-field__icon">🔗</text>
      <text v-if="type === 'copy' && displayValue !== '--'" class="detail-field__icon">📋</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
@use '../styles/tokens.scss' as *;
@use '../styles/mixins.scss' as *;

.detail-field {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: $spacing-sm $spacing-base;
  min-height: 44px;
  @include border-hairline($color-border-light);
}

.detail-field__label {
  font-size: $font-size-base;
  color: $color-text-secondary;
  flex-shrink: 0;
  margin-right: $spacing-base;
}

.detail-field__value {
  font-size: $font-size-base;
  color: $color-text-primary;
  text-align: right;
  flex: 1;
  word-break: break-all;

  &--amount {
    font-weight: $font-weight-bold;
    font-size: $font-size-md;
  }

  &--interactive {
    @include detail-field-interactive;
    justify-content: flex-end;
  }

  &--empty {
    color: $color-text-placeholder;
  }
}

.detail-field__icon {
  font-size: $font-size-sm;
  margin-left: $spacing-xxs;
}
</style>
