import { _saveWish, _saveWishData, _addCompletedCoin, _subCompletedCoin, _delWishById, _queryWishData } from '@/common/dataOperate/service/WishDataService'

let addOrUpdateWish = function (wish) {
	return _queryWishData().then((wishData) => {
		return _saveWish.bind(wishData)(wish);
	})
}

let changeWishCompletedCoin = function (wishId, happyCoin) {
	return _queryWishData().then((wishData) => {
		if (happyCoin > 0)
			return _addCompletedCoin.bind(wishData)(wishId, happyCoin);
		else 
			return _subCompletedCoin.bind(wishData)(wishId, happyCoin);
	})
}

let saveWishData = function (wishData) {
	return _saveWishData(wishData);
}


let deleteWishById = function (wishId) {
	return _queryWishData().then((wishData) => {
		return _delWishById.bind(wishData)(wishId);
	})
}

let queryWishData = function () {
	return _queryWishData();
}

export { addOrUpdateWish, changeWishCompletedCoin, saveWishData, deleteWishById, queryWishData };
