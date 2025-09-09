<template>
	<view class="player-container" :style="{ top: player.position.top + 'px', right: '0rpx' }"
		@touchstart="onTouchStart" @touchmove.stop.prevent="onTouchMove" @touchend="onTouchEnd">

		<!-- 播放按钮 -->
		<view class="player-btn" @click="player.togglePlay">
			<uni-icons v-show="player.isPlaying" fontFamily="iconfont" size="26">{{'\uEAEA'}}</uni-icons>
			<uni-icons v-show="!player.isPlaying" fontFamily="iconfont" size="26">{{'\uE6D1'}}</uni-icons>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted
	} from 'vue'
	import {
		usePlayerStore
	} from '@/stores/player.js'

	const player = usePlayerStore()

	let startY = 0
	let windowHeight = 0
	const size = 70
	const stroke = 4
	const radius = (size - stroke) / 2
	const center = size / 2
	const circumference = 2 * Math.PI * radius
	const offset = computed(() => circumference * (1 - player.progress))

	onMounted(() => {
		player.init()
		windowHeight = uni.getSystemInfoSync().windowHeight
	})

	// 拖拽逻辑（上下移动 + 位置写入全局 store）
	const onTouchStart = (e) => {
		startY = e.touches[0].clientY - player.position.top
	}
	const onTouchMove = (e) => {
		player.setPosition(e.touches[0].clientY - startY)
	}
	const onTouchEnd = () => {
		if (player.position.top < 0) player.setPosition(0)
		if (player.position.top > windowHeight - size) {
			player.setPosition(windowHeight - size)
		}
	}
</script>

<style scoped>
	.player-container {
		position: fixed;
		z-index: 9999;
		width: 90rpx;
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50% 0 0 50%;
		background-color: #fff;
	}

	/* 进度环 */
	.progress-ring {
		transform: rotate(-90deg);
		position: absolute;
		top: 0;
		left: 0;
	}

	.progress-ring__bg {
		fill: transparent;
		stroke: #eee;
	}

	.progress-ring__progress {
		fill: transparent;
		stroke: #42b983;
		transition: stroke-dashoffset 0.3s;
	}

	/* 播放按钮 */
	.player-btn {
		width: 54rpx;
		height: 54rpx;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>