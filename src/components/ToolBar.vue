<template>
	<div class="tool-bar">
		<slot>
			<el-form
				:model="modelValue"
				ref="queryForm"
				inline>
				<el-form-item
					v-for="item in formItem"
					:key="item.prop"
					:label="item.label"
					:prop="item.prop">
					<el-input
						v-if="item.type == 'input'"
						:maxlength="item.maxlength"
						clearable
						v-model="modelValue[item.prop]"
						:placeholder="item.placeholder"
						@keyup.native.enter="handleSearch()"></el-input>
					<el-select
						style="width: 192px"
						v-else-if="item.type == 'select'"
						v-model="modelValue[item.prop]"
						clearable
						:placeholder="item.placeholder">
						<el-option
							v-for="option in item.options"
							:label="option.label"
							:value="option.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="handleSearch()">
						查询
					</el-button>
					<el-button @click="handleReset()">重置</el-button>
				</el-form-item>
			</el-form>
		</slot>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FormInstance } from 'element-plus';

const { modelValue, formItem, query } = defineProps({
	modelValue: {
		type: Object,
		default: {},
	},
	formItem: {
		type: Array<FormItem>,
		default: [],
	},
	query: {
		type: Function,
		default: () => {},
	},
});

const emits = defineEmits(['update:modelValue']);

const queryForm = ref<FormInstance>();
const handleSearch = () => {
	query();
};
const handleReset = () => {
	queryForm.value?.resetFields();
	query();
};
</script>

<style lang="scss" scoped>
.el-input {
	width: 192px;
}
</style>
