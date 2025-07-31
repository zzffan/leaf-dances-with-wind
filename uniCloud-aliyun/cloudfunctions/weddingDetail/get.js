const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    // 查询婚礼详情
    const weddingDetails = await db.collection('wedding_details').get();
	
	console.log(weddingDetails, 'weddingDetails')
    
    // if (weddingDetails.result.data.length === 0) {
    //   return {
    //     code: 404,
    //     message: '婚礼详情未找到',
    //     data: null
    //   };
    // }

    // 返回第一条记录
    return {
      code: 200,
      message: '成功获取婚礼详情',
      data: weddingDetails.result
    };
  } catch (error) {
    return {
      code: 500,
      message: '服务器错误',
      data: null
    };
  }
};