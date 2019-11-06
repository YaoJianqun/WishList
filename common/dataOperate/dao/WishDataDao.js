let _setWishData = function (wishData) {
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
}

let _queryWishDataList = function () {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: 'wishData',
			success: (result) => {
				resolve(result.data);
			}
		})
	})
}


export {_setWishData, _queryWishDataList};