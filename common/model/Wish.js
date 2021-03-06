import getUUID from '@/common/util/UUID';

class Wish {
	constructor (obj) {
		if (!obj) obj = {};
		//愿望ID
		this.id = getUUID(18, 16);
		//愿望名称
		this.name = obj.name ? obj.name : '';
		//愿望所需快乐币
		this.happy_coin = obj.happy_coin ? obj.happy_coin : 0;
		//已完成快乐币
		this.completedCoin = obj.completedCoin ? obj.completedCoin : 0;
		//愿望图片
		this.image = obj.image ? obj.image : '';
		//愿望颜色
		this.color = obj.color ? obj.color : 'warning';
		//愿望类型
		this.type = obj.type ? obj.type : 'commodity';
		//是否兑换
		this.redeem = obj.redeem ? obj.redeem : false;
		//是否完成
		this.isCompleted = obj.isCompleted ? obj.isCompleted : false;
		//是否删除
		this.isDel = obj.isDel ? obj.isDel : false;
	}
}

export default Wish;
