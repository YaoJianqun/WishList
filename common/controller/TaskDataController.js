import { setTask } from '@/common/controller/TaskController'

let addOrUpdateTaskData = function (task) {
	console.log('----------')
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

export { addOrUpdateTaskData };
