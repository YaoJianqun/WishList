import getUUID from '@/common/util/UUID';

class Task {
	constructor (obj) {
		if (!obj) obj = {};
		//任务ID
		this.id = getUUID(18, 16);
		//任务名称
		this.name = obj.name ? obj.name : '';
		//任务快乐币价值
		this.happy_coin = obj.happy_coin ? obj.happy_coin : 0;
		//任务宣言
		this.declaration = obj.declaration ? obj.declaration : '';
		//任务图标
		this.icon = obj.icon ? obj.icon : 'iconcutlery';
		//任务颜色
		this.color = obj.color ? obj.color : 'warning';
		//任务目标数量
		this.target_count = obj.target_count ? obj.target_count : 0;
		//任务完成数量
		this.completed_count = obj.completed_count ? obj.completed_count : 0;
		//任务单位
		this.unit = obj.unit ? obj.unit : '次';
		//频率
		this.frequency = obj.frequency ? obj.frequency : 'day';
		//任务定量执行时间
		this.ration = obj.ration ? obj.ration : [];
		//标准类型
		this.type = obj.type ? obj.type : 'task';
		//任务重复次数
		this.repeat_count = obj.repeat_count ? obj.repeat_count : 1;
		//任务提醒
		this.remind = obj.remind ? obj.remind : [];
	}
}

export default Task;
