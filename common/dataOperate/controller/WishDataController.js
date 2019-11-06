import { _saveWish, _saveWishData, _delWishById, _queryWishData } from '@/common/dataOperate/service/WishDataService'

let addOrUpdateWish = function (wish) {
	return _queryWishData().then((wishData) => {
		return _saveWish.bind(wishData)(wish);
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

export { addOrUpdateWish, saveWishData, deleteWishById, queryWishData };
