import { _saveCompleted, _delCompleted, _queryCompletedData, _saveCompletedData } from '@/common/dataOperate/service/CompletedDataService'

import TaskCompleted from '@/common/model/TaskCompleted'

let addOrUpdateCompleted = function (task) {
	let taskCompleted = {
		taskId: task.id,
		//wishId: task.wishId,
		happy_coin: task.happy_coin,
		completed_count: task.completed_count
	};
	let temp_completed = new TaskCompleted(taskCompleted);
	
	return _queryCompletedData().then((completedData) => {
		return _saveCompleted.bind(completedData)(temp_completed);
	});
}

let changeHappyCoinPool = function (state, happyCoin) {
	return _queryCompletedData().then((completedData) => {
		happyCoin = parseInt(happyCoin);
		if (state === 'add')
			completedData.happyCoinPool += happyCoin;
		else if (state === 'sub')
			completedData.happyCoinPool -= happyCoin;
		else
			return;
		return _saveCompletedData(completedData);
	});
}

let deleteCompleted = function (task) {
	return _queryCompletedData().then((completedData) => {
		return _delCompleted.bind(completedData)(task);
	});
}

let queryCompletedData = function () {
	return _queryCompletedData();
}

export { addOrUpdateCompleted, deleteCompleted, queryCompletedData, changeHappyCoinPool };
