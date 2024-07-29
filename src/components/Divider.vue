<template>
	<div
		class="divider"
		:class="classPos">
		<slot>
      <span class="sub-title">{{ text }}</span>
    </slot>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { text, position } = defineProps({
	text: {
		type: String,
		default: '文本',
	},
	position: {
		type: String,
		default: 'center',
	},
});
const classPos = computed(() => {
	return position;
});
</script>

<style scoped lang="scss">
.divider {
	display: flex;
	align-items: center;
	justify-content: center;

  .sub-title {
    display: block;
    padding: 0 10px;
    white-space: nowrap;
  }
  
  &.left::after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: var(--el-border-color);
  }

  &.center {
    &::before, &::after {
      content: '';
      width: 100%;
      height: 1px;
      background-color: var(--el-border-color);
    }
  }
}
</style>
