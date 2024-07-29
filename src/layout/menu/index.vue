<template>
	<div class="menu">
		<el-menu
			router
			:default-active="defaultActive"
			active-text-color="var(--el-color-primary)"
			:collapse="!collapse">
			<MenuItem
				v-for="item in menus"
				:item="item" />
		</el-menu>
	</div>
</template>

<script setup lang="ts">
import MenuItem from './item.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { permissionsStore } from '@/store';

const permissions = permissionsStore();
const menus = ref<Array<Menu>>(permissions.menus);

const route = useRoute();
const defaultActive = ref<string>((route.meta?.activeMenu as string) || (route.name as string));
watch(route, val => {
	defaultActive.value = (val.meta?.activeMenu as string) || (val.name as string);
});

const collapse = defineModel<boolean>('collapse');
watch(collapse, val => {
	console.log(11, val);
})
</script>

<style scoped lang="scss">
.menu {
	height: calc(100% - 60px);
	padding: 0 14px;
	user-select: none;

	overflow-y: auto;
	@include scrollBar();

	.el-menu {
		border-right: unset;
	}

	.el-sub-menu {
		margin: 5px 0;

		&:deep(.el-sub-menu__title) {
			border-radius: 8px;
		}
	}

	&:deep(.el-menu-item) {
		border-radius: 8px;
		margin: 5px 0;

		&.is-active {
			background-color: var(--el-menu-hover-bg-color);
		}
	}
}
</style>
