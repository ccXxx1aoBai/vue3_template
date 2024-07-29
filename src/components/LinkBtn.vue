<template>
	<div class="link-btn">
		<p>{{ label }}</p>
		<slot name="icon">
			<el-icon :size="12">
				<RightOutlined />
			</el-icon>
		</slot>
	</div>
</template>

<script setup lang="ts">

const { label } = defineProps({
	label: {
		type: String,
		default: '',
	},
});
</script>

<style lang="scss" scoped>
.link-btn {
	display: flex;
	align-items: center;
	color: rgba($color: #202020, $alpha: 0.6);
	font-size: 14px;
	font-weight: 400;
	cursor: pointer;

	p {
		margin-right: 8px;
	}
}
</style>
