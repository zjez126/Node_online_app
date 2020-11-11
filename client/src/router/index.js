import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'index',
        component: () =>
            import ('../views/Index.vue')
    }, {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/Register.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router