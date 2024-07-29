<template>
	<div>
		<Transition name="fade">
			<div
				class="preview-image"
				v-if="show">
				<div class="preview-image__mask"></div>
				<div class="preview-image__content">
					<img
						:src="prefix + url"
						:style="style" />
					<div class="preview-image__content-tools">
						<div class="tools-btn__rotate-l">
							<el-icon
								:size="32"
								@click="changeImg('0')">
								<UndoOutlined />
							</el-icon>
						</div>
						<div class="tools-btn__rotate-r">
							<el-icon
								:size="32"
								@click="changeImg('1')">
								<RedoOutlined />
							</el-icon>
						</div>
						<div class="tools-btn__zoom-in">
							<el-icon
								:size="32"
								@click="changeImg('2')">
								<ZoomInOutlined />
							</el-icon>
						</div>
						<div class="tools-btn__zoom-out">
							<el-icon
								:size="32"
								@click="changeImg('3')">
								<ZoomOutOutlined />
							</el-icon>
						</div>
					</div>
					<div
						class="close"
						@click="close()">
						<el-icon>
							<Close />
						</el-icon>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const { url, show } = defineProps({
	url: {
		required: true,
		type: String,
		default: 'src/assets/images/404.png',
	},
	show: {
		type: Boolean,
		default: false,
	},
});
const emits = defineEmits(['update:show']);

const prefix = computed(() => {
	if (url.indexOf('404.png') != -1) {
		return '';
	}
	return import.meta.env.VITE_PREFIX_STATIC;
});

let rotate = 0;
let scale = 1;
const style = ref();
const changeImg = (type: string) => {
	if (type == '0') {
		rotate -= 90;
	} else if (type == '1') {
		rotate += 90;
	} else if (type == '2') {
		scale += 0.1;
	} else if (type == '3') {
		scale -= 0.1;
	}
	if (scale < 0) return;
	style.value = {
		transform: `rotate(${rotate}deg) scale(${scale})`,
	};
};

window.addEventListener('wheel', ({ deltaY }) => {
	if (deltaY > 0) {
		scale -= 0.2;
	} else {
		scale += 0.2;
	}
	if (scale < 0) return;
	style.value = {
		transform: `rotate(${rotate}deg) scale(${scale})`,
	};
});

const close = () => {
	rotate = 0;
	scale = 1;
	emits('update:show');
};
</script>

<style lang="scss" scoped>
.preview-image {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	z-index: 9999;
	overflow: hidden;

	&__mask {
		position: absolute;
		inset: 0;
		width: inherit;
		height: inherit;
		background-color: rgba($color: #000000, $alpha: 0.8);
		overflow: hidden;
	}

	&__content {
		width: 400px;
		height: 300px;
		z-index: 1024;

		img {
			width: 100%;
			height: 100%;
			transition: transform 0.3s;
			user-select: none;
		}

		&-tools {
			position: absolute;
			bottom: 100px;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			padding: 14px 0;
			background-color: rgba($color: #ffffff, $alpha: 0.5);
			margin-top: 34px;
			border-radius: 40px;

			& > div {
				display: flex;
				align-items: center;
				margin: 0 20px;
			}
		}

		.close {
			position: absolute;
			bottom: 40px;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			align-items: center;
			justify-content: center;
			width: 32px;
			height: 32px;
			background-color: rgba($color: #ffffff, $alpha: 0.5);
			border-radius: 50%;
		}

		.el-icon {
			color: #ffffff;
			cursor: pointer;
		}
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.fade-enter-to,
.fade-enter-from {
	opacity: 1;
}
</style>
