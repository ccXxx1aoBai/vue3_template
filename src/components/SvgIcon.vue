<template>
	<img
		:src="url"
		:style="style"
		v-if="isImg" />
	<svg
		v-else
		class="svg-icon"
		:style="{color: color, fontSize: `${(size + '').replace('px', '')}px`}">
		<use :xlink:href="`#icon-${name}`" />
	</svg>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
const { name, style, color, size } = defineProps({
	name: {
		type: String,
		require: '',
	},
	style: {
		type: [String, Object],
		default: {},
	},
	color: {
		type: String,
		default: ''
	},
	size: {
		type: [Number, String],
		default: 16
	}
});

const url = ref<string>('')
const isImg = computed(() => {
	if(name?.match(/png|jpg/)) {
		url.value = `${import.meta.env.VITE_ICON_URL}/${name}`
		return true
	}
	return false
});
</script>

<style lang="scss" scoped>
.svg-icon {
	position: relative;
	width: 1em;
	flex: 0 0 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
	font-size: 16px;

	&::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		pointer-events: none;
		cursor: pointer;
		z-index: 1;
	}
}
</style>
