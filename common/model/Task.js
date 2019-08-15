import getUUID from '@/common/util/UUID';

class Task {
	constructor (obj) {
		if (!obj) obj = {};
		
		this.id = getUUID(18, 16);
		this.name = obj.name ? obj.name : '';
		this.happy_coin = obj.happy_coin ? obj.happy_coin : 0;
		this.declaration = obj.declaration ? obj.declaration : '';
		this.icon = obj.icon ? obj.icon : '';
		this.color = obj.color ? obj.color : 'warning';
		this.target_count = obj.target_count ? obj.target_count : 0;
		this.completed_count = obj.completed_count ? obj.completed_count : 0;
		this.unit = obj.unit ? obj.unit : '次';
		this.frequency = obj.frequency ? obj.frequency : 'day';
		this.ration = obj.ration ? obj.ration : [];
		this.type = obj.type ? obj.type : 'task';
		this.repeat_count = obj.repeat_count ? obj.repeat_count : 1;
	}
}

export default Task;
