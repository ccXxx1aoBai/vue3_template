<template>
	<div class="pagination">
		<el-pagination
			:layout="layout"
			:total="total"
			v-model:current-page="current"
			v-model:page-size="size"
			:page-sizes="sizes"
			:background="background"
			@change="dataChange"></el-pagination>
	</div>
</template>

<script setup lang="ts">

const { layout, total, sizes, background } = defineProps({
	layout: {
		type: String,
		default: 'total, sizes, prev, pager, next, jumper',
	},
	total: {
		required: true,
		type: Number,
		default: 0,
	},
	sizes: {
		type: Array<number>,
		default: [10, 20, 30, 50, 100, 200],
	},
	background: {
		type: Boolean,
		default: true,
	},
	defaultSize: {
		type: Number,
		default: 10,
	},
});
const emits = defineEmits(['pagination']);

const current = defineModel('current');
const size = defineModel('size');
const dataChange = (currentPage: number, pageSize: number) => {
	emits('pagination', currentPage, pageSize);
};
</script>

<style lang="scss" scoped>
.pagination {
	position: absolute;
	bottom: 32px;
	right: 32px;
	display: flex;
	justify-content: flex-end;
	background-color: transparent;
	padding: 0 32px;
	box-sizing: border-box;
}
</style>
