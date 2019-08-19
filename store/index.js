import Vue from 'vue'
import Vuex from 'vuex'

import Task from '@/common/model/Task'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		task: null,
		taskData: []
	},
	actions: {
		changeTask (ctx, task) {
			ctx.commit('changeTask', task);
		},
		changeTaskData (ctx, taskData) {
			ctx.commit('changeTaskData', taskData);
		}
	},
	mutations: {
		changeTask (state, task) {
			state.task = task;
		},
		changeTaskData (state, taskData) {
			state.taskData = taskData;
		}
	}
})