import { setWish, delWish } from '@/common/service/WishDataService'

let addOrUpdateWishData = function (wish) {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: 'wishData',
			success: (result) => {
				resolve(result.data);
			}
		})
	}).then((wishData) => {
		setWish.bind(wishData)(wish);
		return new Promise((resolve, reject) => {
			uni.setStorage({
				key: 'wishData',
				data: wishData,
				success: function () {
					console.log('addOrUpdate wishData success');
					resolve();
				}
			})
		})
	})
	
}


let deleteWishData = function (wishId) {
	let wishData = uni.getStorageSync('wishData');
	delWish.bind(wishData)(wishId);
	uni.setStorage({
		key: 'wishData',
		data: wishData,
		success: function () {
			console.log('delete wishData success');
		}
	})
}

export { addOrUpdateWishData, deleteWishData };
