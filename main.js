import Vue from 'vue'
import App from './App'

import store from '@/store/index'
import uniPopup from "@/components/uni-popup/uni-popup.vue"

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.component('uniPopup', uniPopup)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
