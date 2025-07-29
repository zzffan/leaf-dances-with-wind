<template>
	<view class="container">
		<!-- 婚礼标题 -->
		<view class="title">一乔 ❤️ 蒿倩</view>
		<view class="subtitle">我们的婚礼</view>
		<view class="subtitle">2025年10月3日</view>

		<!-- 倒计时组件 -->
		<Countdown :wedding-date="'2025-10-03T00:00:00'" />
	</view>
</template>

<script setup>
	import Countdown from '@/components/Countdown';
</script>

<style lang="scss" scoped>
	@import "../../styles/main.scss";

	.container {
		height: 100%;
		background: $background-gradient;
		border-radius: $border-radius;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		padding: 20px;
		margin-bottom: 20px;
	}

	.title {
		color: $primary-color;
		font-size: 24px;
		text-align: center;
		margin-bottom: 10px;
	}

	.subtitle {
		color: $secondary-color;
		font-size: 16px;
		text-align: center;
		margin-bottom: 10px;
	}
</style>