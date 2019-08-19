let setTask = function (task) {
	if (this.taskIdArray.indexOf(task.id) < 0) {
		this.taskIdArray.push(task.id);
	}
	this.taskObj[task.id] = task;
}

let delTask = function (task_id) {
	let task_index = this.taskIdArray.indexOf(task_id);
	if (task_index > -1) {
		this.taskIdArray.splice(task_index, 1);
		delete this[task_id];
	}
}

let importTask = function (taskData) {
	taskData.setTask = setTask;
	taskData.delTask = delTask;
	return taskData;
}

export {setTask, delTask, importTask};

/*export delTask;

export function importTask (taskData) {
	taskData.setTask = setTask;
	taskData.delTask = delTask;
}*/