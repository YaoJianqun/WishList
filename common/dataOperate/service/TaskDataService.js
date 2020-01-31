import { _setData, _queryData } from '@/common/dataOperate/dao/DataOperateDao';

const key = 'taskData';

let _saveTask = function (task) {
	if (this.taskIdArray && this.taskIdArray.indexOf(task.id) < 0) {
		this.taskIdArray.push(task.id);
	}
	this.taskObj[task.id] = task;
	return _setData(key, this);
}

let _saveTaskData = function (taskData) {
	return _setData(key, taskData);
}

let _delTaskById = function (task_id) {
	let task_index = this.taskIdArray.indexOf(task_id);
	if (task_index > -1) {
		this.taskIdArray.splice(task_index, 1);
		delete this[task_id];
	}
	return _setData(key, this);
}

let _queryTaskData = function () {
	return _queryData(key)
}

export {_saveTask, _saveTaskData, _delTaskById, _queryTaskData};
