import getUUID from '@/common/util/UUID';

class TaskComplete {
	constructor (obj) {
		if (!obj) obj = {};
		//ID
		this.id = getUUID(18, 16);
		//任务ID
		this.taskId = obj.taskId ? obj.taskId : '';
		//挂载愿望ID
		//this.wishId = obj.wishId ? obj.wishId : '';
		//当前完成任务价值快乐币
		this.happy_coin = obj.happy_coin ? obj.happy_coin : 0;
		//任务完成数量
		this.completed_count = obj.completed_count ? obj.completed_count : 0;
		//任务单位
		//this.unit = obj.unit ? obj.unit : '次';
		//任务定量执行时间
		//this.ration = obj.ration ? obj.ration : 0;
		//任务完成时间
		this.completedTime = obj.completedTime ? obj.completedTime : new Date(new Date().toLocaleDateString()).getTime();
	}
}

export default TaskComplete;
