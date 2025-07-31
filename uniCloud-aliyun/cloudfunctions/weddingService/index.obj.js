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
	}
};