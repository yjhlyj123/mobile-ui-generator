<script setup lang="ts">
/**
 * ListItem — 标准型列表项
 * 封装 §6.2 列表项规范 + §6.7 智能推断布局
 */
import StatusTag from './StatusTag.vue';

interface Action {
  label: string;
  type?: 'primary' | 'danger' | 'default';
}

interface Props {
  title: string;
  meta?: string[];
  status?: string;
  statusVariant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  actions?: Action[];
}

const props = withDefaults(defineProps<Props>(), {
  meta: () => [],
  status: '',
  statusVariant: 'info',
  actions: () => [],
});

const emit = defineEmits<{
  (e: 'action', label: string): void;
  (e: 'click'): void;
}>();
</script>

<template>
  <view class="list-item" @click="emit('click')">
    <view class="list-item__header">
      <text class="list-item__title">{{ title }}</text>
      <slot name="amount" />
    </view>
    <text v-if="meta.length" class="list-item__meta">
      {{ meta.join(' · ') }}
    </text>
    <slot name="extra" />
    <view v-if="status || actions.length" class="list-item__footer">
      <StatusTag v-if="status" :variant="statusVariant" dot>
        {{ status }}
      </StatusTag>
      <view v-else />
      <view v-if="actions.length" class="list-item__actions">
        <wd-button
          v-for="action in actions"
          :key="action.label"
          size="mini"
          :type="action.type === 'primary' ? 'primary' : action.type === 'danger' ? 'error' : 'default'"
          :plain="action.type !== 'primary'"
          @click.stop="emit('action', action.label)"
        >
          {{ action.label }}
        </wd-button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
@use '../styles/tokens.scss' as *;
@use '../styles/mixins.scss' as *;

.list-item {
  padding: $spacing-base;
}

.list-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-item__title {
  font-size: $font-size-base;
  color: $color-text-primary;
  font-weight: $font-weight-medium;
  flex: 1;
  margin-right: $spacing-sm;
  @include text-ellipsis;
}

.list-item__meta {
  display: block;
  font-size: $font-size-sm;
  color: $color-text-secondary;
  margin-top: $spacing-xs;
}

.list-item__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: $spacing-sm;
}

.list-item__actions {
  display: flex;
  gap: $spacing-xs;
}
</style>
