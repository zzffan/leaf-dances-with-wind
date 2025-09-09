<template>
	<view class="container">
		<!-- 婚礼标题 -->
		<view class="title-container">
			<view class="title">{{groom}} ❤️ {{bride}}</view>
			<view class="subtitle">我们的婚礼</view>
			<view class="subtitle">{{formatDate}}</view>
		</view>

		<!-- 倒计时组件 -->
		<Countdown :wedding-date="date" />

		<!-- 详情 -->
		<view class="detail-container" v-if="Object.keys(weddingDetails).length">
			<view class="detail-item" v-for="item, index of weddingDetails" :key="index">
				<view class="detail-label">
					{{item.label}}
				</view>
				<view 
					:class="['detail-value', {'navigate': item.canNavigate}]" 
					@click="openMap(item.location)"
				>
					{{item.value}}
				</view>
			</view>
		</view>

		<!-- 欢迎语 -->
		<view class="invitation">
			<view class="invitation-text" v-for="text,idx in invitationText" :key="index">
				{{text}}
			</view>
		</view>
		
		<GlobalPlayer />
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app';
	import Countdown from '@/components/Countdown';

	const bride = ref('');
	const groom = ref('');
	const formatDate = ref('');
	const date = ref('');
	const weddingDetails = ref({});
	const invitationText = ref([]);
	const showMapModal = ref(false);

	// 调用云对象获取婚礼详情
	async function fetchWeddingDetails() {
		// 导入云对象
		const weddingService = uniCloud.importObject('weddingService');
		try {
			// 调用云对象的方法
			const result = await weddingService.getWeddingDetails();

			if (result.code === 200) {
				const data = result.data;
				bride.value = data.bride;
				groom.value = data.groom;
				date.value = data.date;
				weddingDetails.value = data.details;
				formatDate.value = data.details.date.value;
				invitationText.value = data.invitationText.split('\n');
			} else {
				console.error('获取婚礼详情失败:', result.message);
			}
		} catch (error) {
			console.error('调用云对象失败:', error);
		}
	}

	function openMap(location) {
		uni.openLocation({
			...location,
			scale: 18
		});
	}

	onShareAppMessage(() => {
		return {
			title: '诚邀您参加我们的婚礼 🤍 期待您的见证与祝福',
			path: '/pages/index/index',
			imageUrl: 'https://zzffan.cn/poster/82ac558674ef326b5f3134764b79bc78 (1).png'
		}
	})

	onShareTimeline(() => {
		return {
			title: '我们结婚啦！诚邀亲朋好友共赴婚礼之约 💍',
			path: '/pages/index/index',
			imageUrl: 'https://zzffan.cn/poster/82ac558674ef326b5f3134764b79bc78 (1).png'
		}
	})

	onMounted(() => {
		fetchWeddingDetails();
	});
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>