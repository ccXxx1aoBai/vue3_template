<template>
	<div class="routes-tag">
		<div
			class="tag-item"
			:class="{ active: active == item.path }"
			v-for="item in tags"
			@click="selected(item)">
			<span>{{ item.name }}</span>
			<a-space
				v-if="!item.fixed"
				:size="12"
				@click.stop="closeTag(item)">
				<Close />
			</a-space>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useRoute, RouteLocationNormalizedLoaded, useRouter } from 'vue-router';

const tags = reactive([
	{
		name: '首页',
		path: '/',
		fixed: true,
	},
]);

const active = ref<string>('/');
const router = useRouter();
const selected = (item: any) => {
	active.value = item.path;
	router.replace(item.path);
};
const closeTag = (item: any) => {
	const index = tags.findIndex((r: any) => r.path === item.path);
	tags.splice(index, 1);
	if(active.value == item.path) {
		router.replace(tags[index - 1]?.path || tags[0].path)
	}
};

const route = useRoute();
watch(route, (val) => {
  addTag(val);
});

const addTag = (val: RouteLocationNormalizedLoaded) => {
	const index = tags.findIndex((r: any) => r.path === val.path);
  if(index === -1) {
    tags.push({
      path: val.path,
      name: val.meta?.title as '',
      fixed: false,
    })
  }
  active.value = val.path;
};
addTag(route);
</script>

<style lang="scss" scoped>
.routes-tag {
	display: flex;
	align-items: center;
	justify-content: flex-start;

	.tag-item {
		display: flex;
		align-items: center;
		margin-right: 10px;
		padding: 2px 5px;
		border-radius: 1px;
		border: 1px solid #c9c9c9;
		cursor: pointer;

		span {
			font-size: 12px;
		}

		.el-icon {
			margin-left: 4px;
			cursor: pointer;

			&:hover {
				background-color: #c9c9c9;
				border-radius: 50%;
			}
		}

		&.active {
			background-color: $color-primary;
			border-color: transparent;
			color: #ffffff;
		}
	}
}
</style>
