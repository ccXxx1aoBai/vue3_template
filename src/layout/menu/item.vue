<template>
	<el-sub-menu
		v-if="item.children && item.type == 0"
		:index="item.path">
		<template #title>
			<el-icon>
				<component :is="item.icon" />
			</el-icon>
			<span>{{ item.title }}</span>
		</template>
		<Item
			v-for="child in item.children"
			:item="child" />
	</el-sub-menu>
	<el-menu-item
		v-else
		:index="item.path"
		@click="goPage(item)">
		<el-icon>
			<component :is="item.icon" />
		</el-icon>
		<template #title>
			<span>{{ item.title }}</span>
		</template>
	</el-menu-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const { item } = defineProps<{
	item: Menu;
}>();

const router = useRouter();
const goPage = (item: Menu) => {
	if (item.type == 1) {
		item.isLink == 1 ? window.open(item.path, '_blank') : router.push({ name: item.name });
	}
};
</script>

<style scoped lang="scss">
.el-sub-menu {
	&:deep(.el-menu-item) {
		padding-left: 20px !important;
	}

	.el-icon {
		margin-right: 10px;
		font-size: 16px;
	}

	&:deep(.el-sub-menu__title) {
		padding: 14px 12px !important;
	}

	&:hover :deep(.el-sub-menu__title) {
		color: var(--el-color-primary);
	}
}
.el-menu-item {
	display: flex;
	justify-content: flex-start;
	height: auto;
	padding: 14px 12px !important;
	line-height: 22px;

	&:hover {
		color: var(--el-color-primary);
	}

	.el-icon {
		margin-right: 10px;
		font-size: 16px;
	}
}
</style>
