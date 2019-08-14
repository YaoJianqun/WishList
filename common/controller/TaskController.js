let TaskController = [];

TaskController.prototype.setTask (task) {
	this.push(task.id);
	this[task.id] = task;
}

TaskController.prototype.delTask (task_id) {
	let task_index = this.indexOf(task_id);
	if (task_index > -1) {
		this.splice(task_index, 1);
		delete this[task_id];
	}
}

export default TaskController;