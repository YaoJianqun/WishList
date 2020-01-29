import { _saveTask, _saveTaskData, _delTaskById, _queryTaskData } from '@/common/dataOperate/service/TaskDataService'

let addOrUpdateTaskData = function (task) {
	return _queryTaskData().then((taskData) => {
		return _saveTask.bind(taskData)(task).then(()=>{console.log('addOrUpdateTaskData success')});;
	})
}

let saveTaskData = function (taskData) {
	return _saveTaskData(taskData);
}

let deleteTaskById = function (taskId) {
	return _queryTaskData().then((taskData) => {
		return _delTaskById.bind(taskData)(taskId);
	})
}

let queryTaskData = function () {
	return _queryTaskData();
}

export { addOrUpdateTaskData, saveTaskData, deleteTaskById, queryTaskData };
