<template>
<div>
    <Header title="微信" btn_icon="plus" />
    <div class="container">
        <Cell v-for="item in chatDataList" :key="item._id" :user="item.target" :count="item.count" @click="$router.push({name:'chat',params:{user:item.target}})" />
    </div>
</div>
</template>

<script>
import Header from '../components/Header';
import Cell from '../components/userCell';
import WSocket from '../socket.js'
export default {
    name: 'chats',
    data() {
        return {
            chatDataList: []
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    mounted() {
        WSocket.init({
            user: this.user
        }, message => {
            // console.log(message);
            this.setMsgCount(message)
        }, error => {
            console.log(error)
        })
    },
    methods: {
        setMsgCount(message) {
            //判断消息列表中是否有该用户
            let chatItem = this.chatDataList.filter(chat => {
                return chat.target._id == message.from
            })
            // console.log(chatItem)
            //如果存在 count+1 并将消息保存

            if (chatItem.length > 0) {
                chatItem[0].count++;
                chatItem[0].message.push({
                    msg: message.msg,
                    source: 'other'
                });
                this.saveMsg(chatItem[0].target, chatItem[0].count, chatItem[0].message)
            } else {
                //如果不存在，那么获取用户消息，并实现消息提醒
                this.getUserInfo(message)
            }
        },
        getUserInfo(message) {
            //根据ID查询用户信息
            this.$axios.get(`/api/user/user/${message.from}`).then(res => {
                // console.log(res.data.data);
                const msg = [];
                msg.push({
                    msg: message.msg,
                    source: 'other'
                });

                //将消息保存在聊天列表中，count 1
                this.chatDataList.push({
                    target: res.data.data,
                    count: 1,
                    message: msg

                })
                this.saveMsg(res.data.data, 1, msg)
            })
        },
        //保存方法
        saveMsg(targetUser, count, msg) {
            const messageObj = {
                target: {
                    avatar: targetUser.avatar,
                    name: targetUser.name,
                    _id: targetUser._id
                },
                count: count,
                message: msg,
                user_id: this.user.id
            }
            this.$axios.post("/api/msg/addmsg", messageObj).then(res => {
                console.log('数据保存成功')
            })
        }
    },
    components: {
        Header,
        Cell
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$axios.get(`/api/msg/${vm.user.id}`).then(res => {
                // console.log(res.data);
                vm.chatDataList = res.data.data
            })
        })
    }
}
</script>

<style scoped>
.chat {
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
</style>
