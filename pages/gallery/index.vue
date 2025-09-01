<template>
	<view class="container">
		<!-- 标题和副标题 -->
		<view class="header">
			<image src="@/static/image/camera.png" mode="aspectFill" class="icon"></image>
			<view class="subtitle">记录美好生活</view>
		</view>

		<!-- 标签栏 -->
		<view class="tag-container">
			<view v-for="(tag, index) in tags" :key="index" class="tag" :class="{ active: currentTag === tag.value }"
				@click="handleTagClick(tag.value)">
				{{ tag.label }}
			</view>
		</view>

		<!-- 瀑布流图片 -->
		<view class="photo-grid">
			<view v-for="(item, index) in photoList" :key="item._id" class="photo-item">
				<image v-if="item.type === 'img'" :src="item.tempFileURL" mode="widthFix" class="photo-image"
					@load="onImageLoad(index)" @error="onImageError(index)"></image>

				<!-- 视频 -->
				<video v-if="item.type === 'video'" :src="item.tempFileURL" class="feed-video" :controls="true" />
			</view>
		</view>


		<!-- 加载状态 -->
		<view v-if="loading" class="loading">加载中...</view>
		<view v-if="!loading && media.length === 0" class="empty">暂无媒体资源</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		computed
	} from 'vue';
	import {
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app';

	const tags = ref([]);
	const media = ref([]); // 所有媒体数据（含 fileID）
	const currentTag = ref('all');
	const loading = ref(false);

	// 图片高度模拟（可随机或根据宽高比计算）
	const getRandomHeight = () => Math.floor(Math.random() * 100) + 180;

	// 计算最终显示的图片列表（含 URL）
	const photoList = computed(() => {
		const list = currentTag.value === 'all' ?
			media.value :
			media.value.filter(p => p.tag === currentTag.value);

		return list;
	});

	// 初始化
	onMounted(async () => {
		fetchPhotoTagList();
		fetchImageData();
	});

	// 获取相册tags
	async function fetchPhotoTagList() {
		loading.value = true;
		try {
			const weddingService = uniCloud.importObject('weddingService');

			const photoTagListResult = await weddingService.getPhotoTags();

			if (photoTagListResult.code === 200) {
				const data = photoTagListResult.data;
				tags.value = data;
			} else {
				console.error('获取获取相册tags失败:', photoTagListResult.message);
			}
		} catch (error) {
			console.error('调用云对象失败:', error);
		} finally {
			loading.value = false;
		}
	}

	// 获取所有数据
	async function fetchImageData() {
		loading.value = true;
		try {
			const weddingService = uniCloud.importObject('weddingService');

			// 获取所有图片
			const mediaRes = await weddingService.getMedia();
			if (mediaRes.code === 200) {
				
				media.value = mediaRes.data.fileList;
				
				console.log(media.value, 'media.value')
			}
		} catch (error) {
			console.error('数据加载失败:', error);
		} finally {
			loading.value = false;
		}
	}

	// 切换标签
	async function handleTagClick(tag) {
		if (currentTag.value === tag) return;
		currentTag.value = tag;
	}

	// 图片加载完成（可做懒加载优化）
	function onImageLoad(index) {
		//
	}

	// 图片加载失败
	function onImageError(index) {
		// 可设置默认图
	}
	
	onShareAppMessage(() => {
		return {
			title: '我们的婚纱照，快来围观～',
			path: '/pages/gallery/index'
		}
	})
	
	onShareTimeline(() => {
		return {
			title: '我们的婚纱照，快来围观～',
			path: '/pages/gallery/index'
		}
	})
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>