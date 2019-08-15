let setTask = function (task) {
	this.push(task.id);
	this[task.id] = task;
}

let delTask = function (task_id) {
	let task_index = this.indexOf(task_id);
	if (task_index > -1) {
		this.splice(task_index, 1);
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