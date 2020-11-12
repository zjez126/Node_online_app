import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './http'
import store from './store'
Vue.config.productionTip = false
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$message = Message

Vue.prototype.$axios = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')