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
				<view :class="['detail-value', {'navigate': item.canNavigate}]" >
					{{item.value}}
				</view>
			</view>
		</view>
		
		<!-- 欢迎语 -->
		<view class="invitation">
			<view class="invitation-text" v-for="text,idx in invitationText">
				{{text}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import Countdown from '@/components/Countdown';

	const bride = ref('');
	const groom = ref('');
	const formatDate = ref('');
	const date = ref('');
	const weddingDetails = ref({});
	const invitationText = ref([]);

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

	onMounted(() => {
		fetchWeddingDetails();
	});
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>