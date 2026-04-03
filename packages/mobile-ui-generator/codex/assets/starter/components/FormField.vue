<script setup lang="ts">
/**
 * FormField — 表单字段容器
 * 封装 §5.5 对齐规范：左对齐 label、必填星号、右对齐错误提示
 */
interface Props {
  label: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
}

withDefaults(defineProps<Props>(), {
  required: false,
  error: false,
  errorMessage: '',
});
</script>

<template>
  <view class="form-field">
    <wd-cell :title="label" :required="required" :error="error">
      <slot />
    </wd-cell>
    <view v-if="error && errorMessage" class="form-field__error">
      {{ errorMessage }}
    </view>
  </view>
</template>

<style scoped lang="scss">
@use '../styles/tokens.scss' as *;
@use '../styles/mixins.scss' as *;

.form-field {
  @include form-field-align;
}

.form-field__error {
  padding: $spacing-xxs $spacing-base;
  font-size: $font-size-xs;
  color: $color-danger;
  text-align: right;
}
</style>
