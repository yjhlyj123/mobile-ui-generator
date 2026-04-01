<script setup lang="ts">
interface Props {
  emphasis?: boolean;
}

withDefaults(defineProps<Props>(), {
  emphasis: false,
});
</script>

<template>
  <view :class="emphasis ? 'card-emphasis' : 'card'">
    <slot />
  </view>
</template>
