<template>
	<div class="table-page">
		<slot name="search"></slot>
    <slot name="control"></slot>
		<div class="table">
			<slot></slot>
		</div>
		<slot name="footer"></slot>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.table-page {
	padding: 20px;
}
.table {
	margin: 12px 0;
	padding: 12px 12px 20px;
	box-sizing: border-box;
	background-color: #ffffff;
	box-shadow: 0 0px 1px rgba($color: #000000, $alpha: 0.3);
	border-radius: 8px;
}
</style>
