import { setTaskCompleted } from '@/common/controller/CompletedController'

let addOrUpdateCompletedData = function (task) {
	
	let taskCompleted = {
		taskId: task.id,
		wishId: task.wishId,
		happy_coin: task.happy_coin,
		completed_count: task.completed_count
	};
	
	let temp_taskCompleted = new TaskCompleted(taskCompleted);
	
	let completedData = uni.getStorageSync('completedData');
	setWish.bind(completedData)(temp_taskCompleted);
	uni.setStorage({
		key: 'completedData',
		data: completedData,
		success: function () {
			console.log('addOrUpdate completedData success');
		}
	})
}

export { addOrUpdateCompletedData };
