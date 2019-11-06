let _setData = function (key, data) {
	return new Promise((resolve, reject) => {
		uni.setStorage({
			key: key,
			data: data,
			success: function () {
				resolve();
			},
			fail: function (e) {
				reject(e);
			}
		})
	})
}

let _queryData = function (key) {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: key,
			success: (result) => {
				resolve(result.data);
			},
			fail: function (e) {
				reject(e);
			}
		})
	})
}


export {_setData, _queryData};