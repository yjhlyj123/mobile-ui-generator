<script setup lang="ts">
import { computed } from 'vue';

import { EMPTY_STATE_PRESETS, type EmptyStateType } from '../constants/empty-state';

interface Props {
  type?: EmptyStateType;
  image?: string;
  title?: string;
  description?: string;
  actionText?: string;
  assetBasePath?: string;
  showAction?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'empty-data',
  image: '',
  title: '',
  description: '',
  actionText: '',
  assetBasePath: '/static/empty-state',
  showAction: true,
});

const emit = defineEmits<{
  (e: 'action-click'): void;
}>();

const preset = computed(() => EMPTY_STATE_PRESETS[props.type]);

const imageSrc = computed(() => {
  if (props.image) {
    return props.image;
  }

  const basePath = props.assetBasePath.replace(/\/$/, '');

  return `${basePath}/${preset.value.assetName}`;
});

const resolvedTitle = computed(() => props.title || preset.value.title);
const resolvedDescription = computed(() => props.description || preset.value.description);
const resolvedActionText = computed(() => props.actionText || preset.value.actionText);

function handleActionClick() {
  emit('action-click');
}
</script>

<template>
  <view class="empty-state">
    <image class="empty-state__image" :src="imageSrc" mode="widthFix" />
    <text class="empty-state__title">{{ resolvedTitle }}</text>
    <text class="empty-state__description">{{ resolvedDescription }}</text>
    <slot name="action">
      <wd-button
        v-if="showAction && resolvedActionText"
        class="empty-state__action"
        type="primary"
        plain
        round
        @click="handleActionClick"
      >
        {{ resolvedActionText }}
      </wd-button>
    </slot>
  </view>
</template>

<style scoped lang="scss">
@use '../styles/tokens.scss' as *;

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-xxl $spacing-xl;
  text-align: center;
}

.empty-state__image {
  width: 200px;
  max-width: 100%;
  margin-bottom: $spacing-lg;
}

.empty-state__title {
  color: $color-text-primary;
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  line-height: 26px;
}

.empty-state__description {
  margin-top: $spacing-xs;
  color: $color-text-secondary;
  font-size: $font-size-sm;
  line-height: 18px;
}

.empty-state__action {
  margin-top: $spacing-lg;
  min-width: 120px;
}
</style>
