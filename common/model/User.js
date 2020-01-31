import getUUID from '@/common/util/UUID';

class User {
	constructor (obj) {
		if (!obj) obj = {};
		//ID
		this.id = getUUID(18, 16);
		//名称
		this.name = obj.name ? obj.name : '匿名侠';
		//头像
		this.image = obj.image ? obj.image : '';
	}
}

export default User;
