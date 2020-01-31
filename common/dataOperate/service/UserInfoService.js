import { _setData, _queryData } from '@/common/dataOperate/dao/DataOperateDao'

const key = 'userInfo';

let _saveUser = function (user) {
	return _setData(key, user);
}

let _queryUserInfo = function () {
	return _queryData(key);
}

export { _saveUser, _queryUserInfo };