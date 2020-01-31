import { _setData, _queryData } from '@/common/dataOperate/dao/DataOperateDao'

const key = 'wishData';

let _saveWish = function (wish) {
	if (this.wishIdArray && this.wishIdArray.indexOf(wish.id) < 0) {
		this.wishIdArray.push(wish.id);
	}
	this.wishObj[wish.id] = wish;
	return _setData(key, this);
}

let _saveWishData = function (wishData) {
	return _setData(key, wishData);
}

let _delWishById = function (wish_id) {
	let wish_index = this.wishIdArray.indexOf(wish_id);
	if (wish_index > -1) {
		this.wishIdArray.splice(wish_index, 1);
		delete this[wish_id];
	}
	return _setData(key, this);
}

let _queryWishData = function () {
	return _queryData(key);
}

export { _saveWish, _saveWishData, _delWishById, _queryWishData };