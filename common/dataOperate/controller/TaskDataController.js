import { setTask, delTask } from '@/common/dataOperate/service/TaskDataService'

let addOrUpdateTaskData = function (task) {
	let taskData = uni.getStorageSync('taskData');
	setTask.bind(taskData)(task);
	uni.setStorage({
		key: 'taskData',
		data: taskData,
		success: function () {
			console.log('addOrUpdate taskData success');
		}
	})
}

let deleteTaskData = function (taskId) {
	let taskData = uni.getStorageSync('taskData');
	delTask.bind(taskData)(taskId);
	uni.setStorage({
		key: 'taskData',
		data: taskData,
		success: function () {
			console.log('delete taskData success');
		}
	})
}

export { addOrUpdateTaskData, deleteTaskData };
