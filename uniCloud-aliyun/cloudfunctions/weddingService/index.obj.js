const db = uniCloud.database();

module.exports = {
	// 查询婚礼详情
	getWeddingDetails: async function() {
		try {
			const weddingDetails = await db.collection('wedding_details').get();

			if (weddingDetails.data.length === 0) {
				return {
					code: 404,
					message: '婚礼详情未找到',
					data: null
				};
			}

			return {
				code: 200,
				message: '成功获取婚礼详情',
				data: weddingDetails.data[0]
			};
		} catch (error) {
			console.error('获取婚礼详情失败', error);
			return {
				code: 500,
				message: '服务器错误',
				data: null
			};
		}
	},

	// 更新婚礼详情（可选）
	updateWeddingDetails: async function(data) {
		try {
			const {
				_id,
				...updateData
			} = data;
			if (!_id) {
				return {
					code: 400,
					message: '缺少_id参数'
				};
			}
			await db.collection('wedding_details').doc(_id).update(updateData);
			return {
				code: 200,
				message: '更新成功'
			};
		} catch (error) {
			console.error('更新婚礼详情失败', error);
			return {
				code: 500,
				message: '更新失败'
			};
		}
	},
	
	// 查询相册标签
	getPhotoTags: async function() {
		try {
			const photoTagList = await db.collection('photo_tags').get();
	
			if (photoTagList.data.length === 0) {
				return {
					code: 404,
					message: '相册标签未找到',
					data: null
				};
			}
	
			return {
				code: 200,
				message: '成功获取相册标签',
				data: photoTagList.data
			};
		} catch (error) {
			console.error('获取婚礼详情失败', error);
			return {
				code: 500,
				message: '服务器错误',
				data: null
			};
		}
	},
	
	// 查询媒体资源
	getMedia: async function() {
		try {
			const extStorageManager = uniCloud.getExtStorageManager({
				provider: "qiniu",
				domain: "zzffan.cn", // 域名地址
			});
			
			const mediaList = await db.collection('our_media').get();
			
			if (mediaList.data.length === 0) {
				return {
					code: 404,
					message: '媒体资源未找到',
					data: null
				};
			}
			
			const list = mediaList.data || [];
			
			// 2. 分组
			const hasOrder = [];
			const noOrder = [];
		
			list.forEach(item => {
			  // 判断是否有 order 字段且为有效数字
			  if (item.order !== null && item.order !== undefined && typeof item.order === 'number') {
				hasOrder.push(item);
			  } else {
				noOrder.push(item);
			  }
			});
		
			// 3. 对有 order 的数据按 order 升序排序
			hasOrder.sort((a, b) => a.order - b.order);
		
			// 4. 合并：有 order 的在前，无 order 的在后（保持原序）
			const sortedList = [...hasOrder, ...noOrder];
			
			let dataList = extStorageManager.getTempFileURL({
				fileList: sortedList.map(data => {
					return data.fileId;
				}), // 文件地址列表
			});
			
			dataList.fileList.forEach(data => {
				sortedList.forEach(item => {
					data.type = item.type;
					data.tag = item.tag;
					data.order = item.order;
					data.tempFileURL = data.tempFileURL.split('?')[0] + '?imageslim/zlevel/3';
				})
			})
			
			return {
				code: 200,
				message: '成功获取媒体资源',
				data: dataList
			};
		} catch (error) {
			console.error('获取媒体资源失败', error);
			return {
				code: 500,
				message: '服务器错误',
				data: null
			};
		}
	}
};