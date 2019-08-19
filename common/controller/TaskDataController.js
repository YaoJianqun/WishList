import { setTask } from '@/common/controller/TaskController'

function getTaskData () {
	
	let taskData = {};
	
	uni.getStorageSync({
		key: 'taskData',
		success (res) {
			taskData = res.data;
		},
		fail () {
			console.log('init taskBase fail')
		}
	})
	
	return taskData;
}

let addTaskData = function (task) {
	
	let taskData = getTaskData();
	setTask.bind(taskData)(task);
	
	uni.setStorage({
		key: 'taskData',
		data: JSON.stringify(taskData),
		success: function () {
			console.log('init taskData success');
		}
	})
}

export { addTaskData };

