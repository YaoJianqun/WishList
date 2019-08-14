import getUUID from '@/common/util/UUID';

class Task {
	constructor (obj) {
		this.id = UUID.uuid(16, 16);
		this.name = obj.name ? obj.name : '';
		this.icon = obj.icon ? obj.icon : '';
		this.color = obj.color ? obj.color : 'success';
		this.target_count = obj.target_count ? obj.target_count : 0;
		this.completed_count = obj.completed_count ? obj.completed_count : 0;
		this.unit = obj.unit ? obj.unit : '次';
		this.frequency = obj.frequency ? obj.frequency : 'day';
		this.ration = obj.ration ? obj.ration : [];
		this.type = obj.type ? obj.type : 'none';
		this.repeat_count = obj.repeat_count ? obj.repeat_count : 0;
	}
}

export default Task;
