import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		task: null,
		wish: null,
		userInfo: {},
		taskData: {},
		wishData: {},
		completedData: {}
	},
	actions: {
		changeTask (ctx, task) {
			ctx.commit('changeTask', task);
		},
		changeWish (ctx, wish) {
			ctx.commit('changeWish', wish);
		},
		changeTaskData (ctx, taskData) {
			ctx.commit('changeTaskData', taskData);
		},
		changeWishData (ctx, wishData) {
			ctx.commit('changeWishData', wishData);
		},
		changeCompletedData (ctx, completedData) {
			ctx.commit('changeCompletedData', completedData);
		},
		changeUserInfo (ctx, userInfo) {
			ctx.commit('changeUserInfo', userInfo);
		}
	},
	mutations: {
		changeTask (state, task) {
			state.task = task;
		},
		changeWish (state, wish) {
			state.wish = wish;
		},
		changeTaskData (state, taskData) {
			state.taskData = taskData;
		},
		changeWishData (state, wishData) {
			state.wishData = wishData;
		},
		changeCompletedData (state, completedData) {
			state.completedData = completedData;
		},
		changeUserInfo (state, userInfo) {
			state.userInfo = userInfo;
		}
	}
})