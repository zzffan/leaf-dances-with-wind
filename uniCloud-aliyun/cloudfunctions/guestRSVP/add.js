'use strict'
exports.main = async (event, context) => {
	const db = uniCloud.database()
	const res = await db.collection('guest_rsvp').add({
		name: event.name,
		phone: event.phone,
		isComing: event.isComing,
		companions: event.companions,
		message: event.message,
		createdAt: new Date()
	})
	return {
		code: 0,
		msg: 'RSVP 成功',
		data: res
	}
}