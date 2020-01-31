import { _saveUser, _queryUserInfo } from '@/common/dataOperate/service/UserInfoService'

let addOrUpdateUser = function (user) {
	return _saveUser(user);
}

let queryUserInfo = function () {
	return _queryUserInfo();
}

export { addOrUpdateUser, queryUserInfo };
