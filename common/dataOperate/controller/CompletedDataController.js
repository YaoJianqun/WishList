import { _saveTaskCompleted, _delTaskCompleted, _queryCompletedData } from '@/common/dataOperate/service/CompletedDataService'

import TaskCompleted from '@/common/model/TaskCompleted'

let addOrUpdateTaskCompleted = function (task) {
	let taskCompleted = {
		taskId: task.id,
		wishId: task.wishId,
		happy_coin: task.happy_coin,
		completed_count: task.completed_count
	};
	let temp_taskCompleted = new TaskCompleted(taskCompleted);
	return _queryCompletedData().then((completedData) => {
		return _saveTaskCompleted.bind(completedData)(temp_taskCompleted);
	});
}

let deleteTaskCompleted = function (task) {
	return _queryCompletedData().then((completedData) => {
		return _delTaskCompleted.bind(completedData)(task);
	});
}

let queryCompletedData = function () {
	return _queryCompletedData();
}

export { addOrUpdateTaskCompleted, deleteTaskCompleted, queryCompletedData };
