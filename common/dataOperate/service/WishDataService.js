import { _queryWishDataList, _setWishData } from '@/common/dataOperate/dao/WishDataDao'

let _saveWish = function (wish) {
	if (this.wishIdArray && this.wishIdArray.indexOf(wish.id) < 0) {
		this.wishIdArray.push(wish.id);
	}
	this.wishObj[wish.id] = wish;
	return _setWishData(this);
}

let _saveWishData = function (wishData) {
	return _setWishData(wishData);
}

let _delWishById = function (wish_id) {
	let wish_index = this.wishIdArray.indexOf(wish_id);
	if (wish_index > -1) {
		this.wishIdArray.splice(wish_index, 1);
		delete this[wish_id];
	}
	return _setWishData(this);
}

let _queryWishData = function () {
	return _queryWishDataList();
}

export { _saveWish, _saveWishData, _delWishById, _queryWishData };