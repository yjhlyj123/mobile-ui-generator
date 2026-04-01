<script setup lang="ts">
interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: '',
});
</script>

<template>
  <view class="section-gap">
    <view v-if="$slots.title || title" class="section-header">
      <slot name="title">
        <text class="section-title">{{ title }}</text>
      </slot>
      <slot name="extra" />
    </view>
    <slot />
  </view>
</template>
