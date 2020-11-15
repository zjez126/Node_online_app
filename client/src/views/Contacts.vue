<template>
<div class="address_book">
    <Header title="通讯录" btn_icon="user-plus" />
    <div class="container">
        <!-- 搜索框 -->
        <div class="search_warp">
            <div class="sear_content">
                <i class="fa fa-search"></i>
                <input type="text" placeholder="搜索" v-model="search_value" />
            </div>
            <!-- 中间 -->
            <div class="content_warp">
                <Cell @click="cellClick(item)" v-for="item in friendList" :key="item._id" :user="item" />
            </div>
            <div class="count_wrap">
                <span>{{friendList.length}}位联系人</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Header from "../components/Header";
import Cell from "../components/userCell";
export default {
    name: "contacts",
    data() {
        return {
            friendList: [],
            search_value: "",
            allFriendList: [],
        };
    },
    methods: {
        //获取所有通讯录信息
        async getFriendList() {
            await this.$axios.get("/api/user/all").then((res) => {
                // console.log(res.data)
                this.friendList = res.data.data;
                this.allFriendList = res.data.data;
            });
        },
        cellClick(item) {
            console.log(item)
            this.$store.dispatch("setTargetUser", item)
            this.$router.push('/information')
        }
    },
    watch: {
        search_value() {
            this.friendList = this.allFriendList.filter(value => {
                return value.name.indexOf(this.search_value) != -1;
            })
        }
    },
    created() {
        this.getFriendList();
    },

    components: {
        Header,
        Cell,
    },
};
</script>

<style scoped>
.address_book {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.container {
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 50px;
    overflow: auto;
}

.search_wrap {
    background-color: #f1f1f1;
    padding: 8px;
    box-sizing: border-box;
    width: 100%;
}

.sear_content {
    height: 40px;
    background: #fff;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 16px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
}

.sear_content i {
    color: #888;
    margin-right: 10px;
}

.sear_content input {
    height: 36px;
    width: 90%;
    outline: none;
    border: none;
    font-size: 14px;
}

.count_wrap {
    min-height: 50px;
    background-color: #fff;
    box-sizing: border-box;
    color: #888;
    font-size: 16px;
    width: 100%;
    line-height: 50px;
    text-align: center;
}
</style>
