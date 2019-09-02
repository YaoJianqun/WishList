let setTaskCompleted = function (taskCompleted) {
	let taskCompletedState = true;
	let wishCompletedState = true;
	for (let index in this.taskCompletedData[taskCompleted.taskId]) {
		if (this.taskCompletedData[taskCompleted.taskId][index].completedTime === taskCompleted.completedTime) {
			this.taskCompletedData[taskCompleted.taskId][index] = taskCompleted;
			taskCompletedState = false;
		}
	}
	if (taskCompletedState) this.taskCompletedData[taskCompleted.taskId].push(taskCompleted);
	for (let index in this.wishCompletedData[taskCompleted.wishId]) {
		if (this.wishCompletedData[taskCompleted.wishId][index].completedTime === taskCompleted.completedTime) {
			this.wishCompletedData[taskCompleted.wishId][index] = taskCompleted;
			wishCompletedState = false;
		}
	}
	if (wishCompletedState) this.wishCompletedData[taskCompleted.wishId].push(taskCompleted);
}

let delTaskCompleted = function (task_id, wish_id) {
	
}

export { setTaskCompleted, delTaskCompleted };

/*export delTask;

export function importTask (taskData) {
	taskData.setTask = setTask;
	taskData.delTask = delTask;
}*/