// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	// 通用预处理器
	_before: function() {
		// 获取客户端token
		const token = this.getUniIdToken();
		if (!token) {
			// 登录状态无效
		}
		console.log(token, 'token');

		// 获取当前调用的方法名
		const methodName = this.getMethodName();
		console.log(methodName, 'methodName');

		// 获取当前参数列表
		const params = this.getParams();
		console.log(params, 'params');

		// 获取当前请求id
		const requestId = this.getUniCloudRequestId();

		// 获取url化时的http信息
		const httpInfo = this.getHttpInfo();
	},
	/**
	 * 新增exhibition
	 * @param {object} params 参数描述
	 * @returns {object} 返回值描述
	 */
	add(params) {
		// 参数校验，如无参数则不需要
		if (!Object.keys(params).length) {
			return {
				errCode: 'PARAM_IS_NULL',
				errMsg: '参数不能为空'
			}
		}
		// 业务逻辑

		// 返回结果
		return {
			errCode: 0,
			result: {
				a: 1
			}
		}
	},
	// 后置处理
	_after(error, result) {
		if (error) {
			// 获取当前请求id
			const requestId = this.getUniCloudRequestId();
			// TODO log(requestId, error) 出错时记录日志，log方法需自行实现
			throw error // 如果方法抛出错误，也直接抛出不处理
		}
		// 示例
		// result.timeCost = Date.now() - this.startTime
		return result
	}
}