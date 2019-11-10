import { _setData, _queryData } from '@/common/dataOperate/dao/DataOperateDao'

const key = 'wishData';

let _saveWish = function (wish) {
	if (this.wishIdArray && this.wishIdArray.indexOf(wish.id) < 0) {
		this.wishIdArray.push(wish.id);
	}
	this.wishObj[wish.id] = wish;
	return _setData(key, this);
}

let _addCompletedCoin = function (wishId, happyCoin) {
	let completedCoin = this.wishObj[wishId].completedCoin;
	let happy_coin = this.wishObj[wishId].happy_coin;
	
	let surplusCoin = completedCoin + happyCoin - happy_coin;
	
	if (surplusCoin >= 0) {
		this.wishObj[wishId].isCompleted = true;
		this.wishObj[wishId].completedCoin = happyCoin;
	} else {
		this.wishObj[wishId].completedCoin = completedCoin + happyCoin;
	}
	
	if (surplusCoin < 0) surplusCoin = 0;
	
	return _setData(key, this).then(() => {
		let tempSurplusCoin = surplusCoin;
		surplusCoin = null;
		debugger;
		return tempSurplusCoin;
	});
}

let _subCompletedCoin = function (wishId, happyCoin) {
	
	let completedCoin = this.wishObj[wishId].completedCoin;
	
	this.wishObj[wishId].completedCoin = completedCoin - happyCoin;

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

/*let _queryWishById = function (wishId) {
	return _queryData(key).then((wishData) => {
		if (wishData.wishIdArray.indexOf(wishId) === -1) return {};
		return wishData.wishObj[wishId];
	});
}*/

export { _saveWish, _saveWishData, _addCompletedCoin, _subCompletedCoin, _delWishById, _queryWishData };