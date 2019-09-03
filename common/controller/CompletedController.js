let setTaskCompleted = function (taskCompleted) {
	let taskCompletedState = true;
	let wishCompletedState = true;
	
	if (!this.taskCompletedData[taskCompleted.taskId]) this.taskCompletedData[taskCompleted.taskId] = [];
	if (!this.wishCompletedData[taskCompleted.wishId]) this.wishCompletedData[taskCompleted.wishId] = [];
	
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

let delTaskCompleted = function (task) {
	let taskCompletedIndex = -1;
	let wishCompletedIndex = -1;
	let nowDate = new Date(new Date().toLocaleDateString()).getTime();
	
	for (let index in this.taskCompletedData[task.id]) {
		if (this.taskCompletedData[task.id][index].completedTime === nowDate) {
			taskCompletedIndex = index;
		}
	}
	for (let index in this.wishCompletedData[task.wishId]) {
		if (this.wishCompletedData[task.wishId][index].completedTime === nowDate) {
			wishCompletedIndex = index;
		}
	}
	if (taskCompletedIndex > -1) this.taskCompletedData[task.id].splice(taskCompletedIndex, 1);
	if (wishCompletedIndex > -1) this.wishCompletedData[task.wishId].splice(wishCompletedIndex, 1);
}

export { setTaskCompleted, delTaskCompleted };

/*export delTask;

export function importTask (taskData) {
	taskData.setTask = setTask;
	taskData.delTask = delTask;
}*/