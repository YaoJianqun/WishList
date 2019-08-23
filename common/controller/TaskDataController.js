import { setTask, delTask } from '@/common/controller/TaskController'

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
	taskData = uni.getStorageSync('taskData');
	console.log(taskData)
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
