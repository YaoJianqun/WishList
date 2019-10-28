import { setWish, delWish } from '@/common/service/WishDataService'

let addOrUpdateWishData = function (wish) {
	debugger;
	let wishData = uni.getStorageSync('wishData');
	setWish.bind(wishData)(wish);
	uni.setStorage({
		key: 'wishData',
		data: wishData,
		success: function () {
			console.log('addOrUpdate wishData success');
		}
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
