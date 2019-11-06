import { setTaskCompleted, delTaskCompleted } from '@/common/dataOperate/service/CompletedDataService'
import TaskCompleted from '@/common/model/TaskCompleted'

let addOrUpdateCompletedData = function (task) {
	let taskCompleted = {
		taskId: task.id,
		wishId: task.wishId,
		happy_coin: task.happy_coin,
		completed_count: task.completed_count
	};
	let temp_taskCompleted = new TaskCompleted(taskCompleted);
	
	let completedData = uni.getStorageSync('completedData');
	setTaskCompleted.bind(completedData)(temp_taskCompleted);
	uni.setStorage({
		key: 'completedData',
		data: completedData,
		success: function () {
			console.log('addOrUpdate completedData success');
		}
	})
}

let deleteCompletedData = function (task) {
	let completedData = uni.getStorageSync('completedData');
	delTaskCompleted.bind(completedData)(task);
	uni.setStorage({
		key: 'completedData',
		data: completedData,
		success: function () {
			console.log('remove completedData success');
		}
	})
}

export { addOrUpdateCompletedData, deleteCompletedData };
