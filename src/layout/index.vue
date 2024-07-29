<template>
	<div class="page">
		<el-container>
			<el-aside :width="collapse ? '201px' : '95px'">
				<div class="logo">
					<img
						src="/src/assets/images/logo.png"
						width="36"
						height="35" />
					<Transition name="fade">
						<p v-if="collapse">{{ applicationTitle }}</p>
					</Transition>
				</div>
				<Menu v-model:collapse="collapse" />
			</el-aside>
			<el-container>
				<el-header>
					<div
						class="collapse"
						@click="collapse = !collapse">
						<el-icon>
							<MenuFoldOutlined v-if="collapse" />
							<MenuUnfoldOutlined v-else />
						</el-icon>
					</div>
					<div class="breadcrumb">
						<el-breadcrumb>
							<el-breadcrumb-item to="/">首页</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div class="user">
						<el-dropdown :teleported="false">
							<div class="user-info">
								<el-avatar :size="36"></el-avatar>
								<p>用户名</p>
								<el-icon>
									<CaretDownOutlined />
								</el-icon>
							</div>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item command="0">个人信息</el-dropdown-item>
									<el-dropdown-item command="1">退出登录</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
				</el-header>
				<el-main>
					<router-view v-slot="{ Component }">
						<Transition
							name="slide-fade"
							mode="out-in">
							<component
								:is="Component"
								v-if="Component"
								:key="key" />
						</Transition>
					</router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Menu from './menu/index.vue';

const collapse = ref<boolean>(true);

const route = useRoute();
const key = computed(() => {
	return route.path;
});
const applicationTitle = computed(() => {
	return import.meta.env.VITE_APPLICATION_NAME;
})
</script>

<style scoped lang="scss">
.el-aside {
	height: 100vh;
	background-color: #ffffff;
	border-right: 1px solid #f1f1f1;
	transition: width 0.3s;
}
.el-header {
	display: flex;
	align-items: center;
	background-color: #ffffff;
	box-shadow: 0 4px 10px rgba(78, 89, 105, 0.03);
}
.el-main {
	height: calc(100vh - 50px);
	background-color: $page-bg-color;
	overflow-y: auto;
	user-select: none;

	@include scrollBar();
}

.logo {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 60px;
	padding: 0 29px;
	white-space: nowrap;
	overflow: hidden;

	img {
		flex: 0 0 36px;
	}

	p {
		margin-left: 10px;
		font-size: 24px;
		font-weight: 700;
	}
}

.collapse {
	display: flex;
	align-items: center;
	font-size: 22px;
	cursor: pointer;
}

.breadcrumb {
	margin-left: 24px;

	&:deep(.el-breadcrumb__item) {
		.el-breadcrumb__inner {
			font-size: 16px;
			cursor: pointer;
		}
	}
}

.user {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex: 1;
	margin-right: 20px;

	.el-dropdown:hover {
		&:deep(.el-icon) {
			transform: rotate(-180deg);
		}
	}

	.user-info {
		display: flex;
		align-items: center;
		cursor: pointer;

		p {
			margin-left: 10px;
			font-size: 18px;
		}

		.el-icon {
			margin-left: 5px;
			transition: all 0.3s;
		}
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
	width: 0;
	opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
	width: 96px;
	opacity: 1;
}

.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
	opacity: 0;
	transform: translateX(-30px);
}

.slide-fade-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>
