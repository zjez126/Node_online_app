<template>
<div class="circle">
    <Header title="朋友圈" :isLeft="true" btn_icon="camera" @rightclick="$router.push('/publish')" />
    <div class="container">
        <Scroll @pulldown="loadData" ref="refresh" @pullup="loadMore">
            <div class="head_wrapper">
                <div class="user_head">
                    <span>{{user.name}}</span>
                    <div class="user_img">
                        <img :src="user.avatar" class="head_img">
                    </div>
                </div>
            </div>
            <div class="content_wrapper">
                <CellView v-for="(item,index) in momentList" :key="index" :momentsObj="item" />
            </div>
        </Scroll>
    </div>
</div>
</template>

<script>
import Header from '../components/Header'
import CellView from '../components/CellView'
import Scroll from '../components/Scroll'
import jwt_decode from 'jwt-decode'
export default {
    name: 'moments',
    data() {
        return {
            momentList: [],
            page: 2, //加载更多从page 2 开始
            size: 3, //每次请求3条数据
            loading: false
        }
    },
    computed: {
        user() {
            const token = localStorage.getItem("wxToken");
            const decode = jwt_decode(token);
            return decode
        }
    },
    methods: {
        async getMonentList() {
            if (this.loading) return;
            this.loading = true;
            await this.$axios.get("/api/profile/latest").then(res => {
                this.loading = false;
                // console.log(res.data.data)
                this.momentList = [...res.data.data];

                //注册事件，解决重置问题
                this.$refs.refresh.$emit("refresh")
            })
        },
        loadData() {
            this.page = 2;
            this.getMonentList();
        },
        loadMore() {
            if (this.loading) return;
            this.loading = true;
            this.$axios.get(`/api/profile/${this.page}/${this.size}`).then(res => {
                this.loading = false;
                // console.log(res.data)
                const result = [...res.data.data];
                //遍历数组
                if (result.length > 0) {
                    result.forEach(item => {
                        this.momentList.push(item)
                    })
                    this.page++;
                } else {
                    //数组为空，没有更多数据，page不再自增
                    this.$refs.refresh.$emit("loadedDone")
                }
            })
        }
    },
    created() {
        this.getMonentList();
    },
    components: {
        Header,
        CellView,
        Scroll
    }
}
</script>

<style scoped>
.circle {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

.container {
    width: 100%;
    height: calc(100% - 50px);
    padding-top: 50px;
    overflow: auto;
}

.head_wrapper {
    width: 100%;
    position: relative;
    height: 200px;
    background: url(../assets/cricle_bg.png) no-repeat;
    background-size: 100% 100%;
}

.head_wrapper .user_head {
    position: absolute;
    bottom: -30px;
    right: 16px;
}

.user_img {
    width: 60px;
    height: 60px;
    padding: 3px;
    border: 1px solid #c5c5c5;
    box-sizing: border-box;
}

.user_head img {
    width: 100%;
    height: 100%;
}

.user_head span {
    line-height: 30px;
    position: absolute;
    right: 76px;
    width: 200px;
    text-align: right;
    color: white;
}

.content_wrapper {
    padding-top: 20px;
}
</style>
