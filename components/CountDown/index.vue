<template>
	<view class="container">
		<!-- 标题和副标题 -->
		<view class="title">距离大喜之日</view>
		<view class="subtitle">每一秒都充满期待</view>
		
		<!-- 倒计时 -->
		<view class="countdown-container">
			<view class="countdown-item pink">
				<view class="countdown-value">{{ countdown.days }}</view>
				<view class="countdown-label">天</view>
			</view>
			<view class="countdown-item blue">
				<view class="countdown-value">{{ countdown.hours }}</view>
				<view class="countdown-label">小时</view>
			</view>
			<view class="countdown-item pink">
				<view class="countdown-value">{{ countdown.minutes }}</view>
				<view class="countdown-label">分钟</view>
			</view>
			<view class="countdown-item blue">
				<view class="countdown-value">{{ countdown.seconds }}</view>
				<view class="countdown-label">秒</view>
			</view>
		</view>		
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import dayjs from 'dayjs';

	// 接收婚礼日期作为 props
	const props = defineProps({
		weddingDate: {
			type: String,
			required: true,
		},
	});

	// 倒计时状态
	const countdown = ref({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	// 更新倒计时
	function updateCountdown() {
		const now = dayjs();
		const target = dayjs(props.weddingDate);
		const diff = target.diff(now, 'second');

		if (diff <= 0) {
			clearInterval(intervalId);
			return;
		}

		countdown.value = {
			days: Math.floor(diff / (60 * 60 * 24)),
			hours: Math.floor((diff % (60 * 60 * 24)) / (60 * 60)),
			minutes: Math.floor((diff % (60 * 60)) / 60),
			seconds: diff % 60,
		};
	}

	// 定时更新倒计时
	let intervalId;

	onMounted(() => {
		updateCountdown();
		intervalId = setInterval(updateCountdown, 1000);
	});
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>