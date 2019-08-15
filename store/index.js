import Vue from 'vue'
import Vuex from 'vuex'

import Task from '@/common/model/Task'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		task: new Task()
	},
	actions: {
		changeTask (ctx, task) {
			ctx.commit('changeTask', task);
		}
	},
	mutations: {
		changeTask (state, task) {
			state.task = task;
		}
	}
})