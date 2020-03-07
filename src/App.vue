<template>
	<div id="app">
		<Main></Main>
	</div>
</template>
<script>
	import Main from 'views/index.vue'
	export default {
		components: {
			Main
		}
	}
</script>
<style lang="less">
	.form-box .el-form-item__content {
		margin-left: 0.5rem !important;
	}

	#app {
		height: 100%;
		background-color: #f5f5f5;
	}
	.el-date-editor .el-range-separator {
		width: 10% !important;
	}
	.project-card {
		margin: 15px 15px;
		border-radius: 5px;
		background: #fff;
		font-size: 14px;
	}

	.card-top {
		font-size: 15px;
		display: flex;
		justify-content: space-between;
		padding: 15px 10px;
		align-items: center;
	}

	.card-top-left {
		color: #000;
	}

	.card-top-right {
		color: #636363;
	}

	.card-bottom {
		color: #b1b1b1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0px 10px 10px;
		align-items: flex-start;
	}

	.card-bottom-left {
		margin-bottom: 10px;
	}

	.card-top-right {
		font-size: 15px;
	}

	.card-left-type,
	.card-right-type {
		letter-spacing: 1px;
	}

	.card-top-right span:nth-child(2) {
		margin-right: 10px;
	}

	.up-time-title,
	.setting-time-title {
		letter-spacing: 1px;
	}

	.search_input {
		position: relative;
		font-size: 0.373333rem;
		display: inline-block;
		width: 100%;
		border-radius: 5px;
		border: 1px solid #ddd;
		padding: 0 10px;
	}
	.el-upload {
		position: relative;
	}
	.avatar-uploader input {
		position: absolute;
		width: 100%;
		height : 100%;
		top:0;
		opacity: 0;
	}
	.address_box .el-dialog {
		min-height : 325px;
	}
	.address_box .el-form-item {
		margin-top : 50px;
	}
	
	.el-loading-spinner {
		font-size : 40px;
		color : #aaa;
	}
	.el-loading-spinner .el-loading-text {
		color : #fff !important;
		font-size : 18px !important;
	}
	.el-loading-spinner i {
		color : #fff !important;
	}
	.small-rate .rate-container .rate .el-progress__text {
		transform: translate(0,-50%)  scale(0.8) !important;
	}
	.el-date-picker .el-picker-panel__body {
		margin-left: 0 !important
	}
	.finishi-time .el-form-item__content {
		margin-left:0 !important;
	}
</style>
