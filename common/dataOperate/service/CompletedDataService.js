import { _setData, _queryData } from '@/common/dataOperate/dao/DataOperateDao';

const key = 'completedData';

let _saveCompleted = function (completed) {
	//初始化状态，默认为新增，当找到相同完成任务时为
	let completedState = true;
	
	//获取愿望、任务ID
	let taskId = completed.taskId;
	//let wishId = completed.wishId;
	
	//排除当ID不存在找不到对象报错的情况
	if (!this.completedObj[taskId]) this.completedObj[taskId] = [];
	
	let completedArray = this.completedObj[taskId];
	//遍历completed判断完成事件是否存在相等时间
	for (let i = 0, length = completedArray.length; i < length; i++)  {
		let item = completedArray[i];
		//存在记录修改状态,修改完成内容
		if (item.completedTime === completed.completedTime) {
			item = completed;
			completedState = false;
		}
	}
	//如果为新增状态,添加完成内容
	if (completedState) {
		completedArray.push(completed);
		debugger;
		this.happyCoinPool += completed.happy_coin;
	};
	return _setData(key, this);
}

let _delCompleted = function (task) {
	let completedIndex = -1;
	let nowDate = new Date(new Date().toLocaleDateString()).getTime();
	
	let happyCoin = 0;
	
	for (let index in this.completedObj[task.id]) {
		if (this.completedObj[task.id][index].completedTime === nowDate) {
			completedIndex = index;
			happyCoin = this.completedObj[task.id][index].happy_coin;
		}
	}
	
	if (completedIndex > -1) {
		this.completedObj[task.id].splice(completedIndex, 1);
		this.happyCoinPool -= task.happy_coin;
	};
	return _setData(key, this);
}

let _queryCompletedData = function () {
	return _queryData(key);
}

export { _saveCompleted, _delCompleted, _queryCompletedData };

/*export delTask;

export function importTask (taskData) {
	taskData.setTask = setTask;
	taskData.delTask = delTask;
}*/