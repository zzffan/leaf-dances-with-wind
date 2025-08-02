<template>
	<view class="container">
		<!-- 标题和副标题 -->
		<view class="header">
			<image src="@/static/image/camera.png" mode="aspectFill" class="icon"></image>
			<view class="subtitle">记录美好生活</view>
		</view>

		<!-- 标签栏 -->
		<view class="tag-container">
			<view v-for="(tag, index) in tags" :key="index" class="tag" :class="{ active: currentTag === tag }"
				@click="handleTagClick(tag)">
				{{ tag }}
			</view>
		</view>

		<!-- 瀑布流图片 -->
		<view class="photo-grid">
			<view v-for="(photo, index) in photoList" :key="photo._id" class="photo-item"
				:style="{ height: photo.height + 'px' }">
				<image :src="photo.url" mode="aspectFill" class="photo-image" @load="onImageLoad(index)"
					@error="onImageError(index)"></image>
				<view class="photo-caption">
					<text class="caption-title">{{ photo.title }}</text>
					<text class="caption-subtitle">{{ photo.subtitle }}</text>
				</view>
			</view>
		</view>


		<!-- 加载状态 -->
		<view v-if="loading" class="loading">加载中...</view>
		<view v-if="!loading && photoList.length === 0" class="empty">暂无图片</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		computed
	} from 'vue';

	const tags = ref([]);
	const photos = ref([]); // 所有图片数据（含 fileID）
	const photoUrls = ref({}); // 缓存 fileID -> URL 映射
	const currentTag = ref('全部');
	const loading = ref(false);

	// 图片高度模拟（可随机或根据宽高比计算）
	const getRandomHeight = () => Math.floor(Math.random() * 100) + 180;

	// 计算最终显示的图片列表（含 URL）
	const photoList = computed(() => {
		const list = currentTag.value === '全部' ?
			photos.value :
			photos.value.filter(p => p.category === currentTag.value);

		return list.map(p => ({
			...p,
			url: photoUrls.value[p.fileID] || p.placeholder || '/static/loading.png',
			height: p.height || getRandomHeight()
		}));
	});

	// 初始化
	onMounted(async () => {
		// await fetchAllData();
	});

	// 获取所有数据
	// async function fetchAllData() {
	// 	loading.value = true;
	// 	try {
	// 		const photoService = uniCloud.importObject('photoService');

	// 		// 获取标签
	// 		const tagRes = await photoService.getTags();
	// 		if (tagRes.code === 200) {
	// 			tags.value = tagRes.data;
	// 		}

	// 		// 获取所有图片
	// 		const photoRes = await photoService.getPhotos();
	// 		if (photoRes.code === 200) {
	// 			photos.value = photoRes.data.photos;

	// 			// 批量获取临时 URL
	// 			const fileIDs = photoRes.data.fileIDs;
	// 			const urlRes = await uniCloud.getTempFileURL({
	// 				fileIDs
	// 			});

	// 			// 构建 fileID -> URL 映射
	// 			urlRes.fileList.forEach(file => {
	// 				if (file.tempFileURL) {
	// 					photoUrls.value[file.fileID] = file.tempFileURL;
	// 				}
	// 			});
	// 		}
	// 	} catch (error) {
	// 		console.error('数据加载失败:', error);
	// 	} finally {
	// 		loading.value = false;
	// 	}
	// }

	// 切换标签
	async function handleTagClick(tag) {
		if (currentTag.value === tag) return;
		currentTag.value = tag;
	}

	// 图片加载完成（可做懒加载优化）
	function onImageLoad(index) {
		// 可记录已加载
	}

	// 图片加载失败
	function onImageError(index) {
		// 可设置默认图
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>