import axios from 'axios';
import { Message } from 'element-ui';
import router from './router'

//请求拦截
axios.interceptors.request.use(config => {
    if (localStorage.getItem("wxToken")) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem("wxToken");
    }
    return config
}, error => {
    return Promise.reject(error)
})



//响应拦截
axios.interceptors.response.use(response => {
    return response
}, error => {
    console.log(error.response);
    const { status } = error.response;
    if (status == 401) {
        localStorage.removeItem("wxToken")
        router.push('/login')
    }
    Message.error(error.response.data.error);
    return Promise.reject(error)
})

export default axios