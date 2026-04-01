<script setup lang="ts">
type StatusVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface Props {
  variant?: StatusVariant;
  dot?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info',
  dot: false,
});

const variantClass: Record<StatusVariant, string> = {
  primary: 'surface-primary',
  success: 'surface-success',
  warning: 'surface-warning',
  danger: 'surface-danger',
  info: 'surface-info',
  neutral: 'surface-neutral',
};

const dotColor: Record<StatusVariant, string> = {
  primary: '#1D4ED8',
  success: '#15803D',
  warning: '#B45309',
  danger: '#B91C1C',
  info: '#0369A1',
  neutral: '#667085',
};
</script>

<template>
  <view class="tag-status" :class="variantClass[props.variant]">
    <view
      v-if="dot"
      class="status-tag__dot"
      :style="{ backgroundColor: dotColor[props.variant] }"
    />
    <slot />
  </view>
</template>

<style scoped lang="scss">
@use '../styles/tokens.scss' as *;

.status-tag__dot {
  width: 6px;
  height: 6px;
  margin-right: $spacing-xs;
  border-radius: $radius-round;
  flex-shrink: 0;
}
</style>
