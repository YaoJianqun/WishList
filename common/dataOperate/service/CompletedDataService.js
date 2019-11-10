import { _setData, _queryData } from '@/common/dataOperate/dao/DataOperateDao';

const key = 'completedData';

let _saveTaskCompleted = function (taskCompleted) {
	//初始化状态，默认为新增，当找到相同完成任务时为
	let taskCompletedState = true;
	let wishCompletedState = true;
	
	//获取愿望、任务ID
	let taskId = taskCompleted.taskId;
	let wishId = taskCompleted.wishId;
	
	//排除当ID不存在找不到对象报错的情况
	if (!this.taskCompletedData[taskId]) this.taskCompletedData[taskId] = [];
	if (!this.wishCompletedData[wishId]) this.wishCompletedData[wishId] = [];
	
	let taskCompletedArray = this.taskCompletedData[taskId];
	//遍历taskCompleted判断完成事件是否存在相等时间
	for (let i = 0, length = taskCompletedArray.length; i < length; i++)  {
		let item = taskCompletedArray[i];
		//存在记录修改状态,修改完成内容
		if (item.completedTime === taskCompleted.completedTime) {
			item = taskCompleted;
			taskCompletedState = false;
		}
	}
	//如果为新增状态,添加完成内容
	if (taskCompletedState) taskCompletedArray.push(taskCompleted);
	
	let wishCompletedArray = this.wishCompletedData[wishId];
	for (let i = 0, length = wishCompletedArray.length; i < length; i++) {
		if (wishCompletedArray[i].completedTime === taskCompleted.completedTime) {
			wishCompletedArray[i] = taskCompleted;
			wishCompletedState = false;
		}
	}
	if (wishCompletedState) wishCompletedArray.push(taskCompleted);
	return _setData(key, this);
}

let _delTaskCompleted = function (task) {
	let taskCompletedIndex = -1;
	let wishCompletedIndex = -1;
	let nowDate = new Date(new Date().toLocaleDateString()).getTime();
	
	let happyCoin = 0;
	
	for (let index in this.taskCompletedData[task.id]) {
		if (this.taskCompletedData[task.id][index].completedTime === nowDate) {
			taskCompletedIndex = index;
			happyCoin = this.taskCompletedData[task.id][index].happy_coin;
		}
	}
	for (let index in this.wishCompletedData[task.wishId]) {
		if (this.wishCompletedData[task.wishId][index].completedTime === nowDate) {
			wishCompletedIndex = index;
		}
	}
	if (taskCompletedIndex > -1) this.taskCompletedData[task.id].splice(taskCompletedIndex, 1);
	if (wishCompletedIndex > -1) this.wishCompletedData[task.wishId].splice(wishCompletedIndex, 1);
	return _setData(key, this).then(() => {
		return happyCoin;
	});
}

let _queryCompletedData = function () {
	return _queryData(key);
}

let _queryHappyCoinPool = function () {
	return _queryData('happyCoinPool');
}

export { _saveTaskCompleted, _delTaskCompleted, _queryCompletedData };

/*export delTask;

export function importTask (taskData) {
	taskData.setTask = setTask;
	taskData.delTask = delTask;
}*/