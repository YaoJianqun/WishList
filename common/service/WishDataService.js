let setWish = function (wish) {
	debugger;
	if (this.wishIdArray && this.wishIdArray.indexOf(wish.id) < 0) {
		this.wishIdArray.push(wish.id);
	}
	this.wishObj[wish.id] = wish;
}

let delWish = function (wish_id) {
	let wish_index = this.wishIdArray.indexOf(wish_id);
	if (wish_index > -1) {
		this.wishIdArray.splice(wish_index, 1);
		delete this[wish_id];
	}
}

let importWish = function (wishData) {
	wishData.setWish = setWish;
	wishData.delWish = delWish;
	return wishData;
}

export {setWish, delWish, importWish};