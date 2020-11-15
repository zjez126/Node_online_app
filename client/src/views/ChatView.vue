<template>
<div class="chat">
    <Header v-if="targetUser" :isLeft="true" :title="targetUser.name" btn_icon="ellipsis-h" />

    <div class="container">
        <!--聊天内容-->

        <div v-if="targetUser && user">
            <div class="content_wrap" v-for="(item,index) in messageList" :key="index">
                <!--别人的内容-->
                <div class="left_msg" v-if="item.source == 'other'">
                    <img :src="targetUser.avatar" alt="">
                    <span>{{item.msg}}</span>
                </div>
                <!--我的内容-->
                <div class="right_msg" v-if="item.source == 'self'">
                    <span>{{item.msg}}</span>
                    <img :src="user.avatar" alt="">
                </div>
            </div>
        </div>

    </div>
    <div class="footer_wrap">
        <input type="text" v-model="msgValue">
        <button :disabled="msgValue == ''" @click="sendMessage">发送</button>
    </div>
</div>
</template>

<script>
import Header from "../components/Header";
import WSocket from '../socket.js'
export default {
    name: 'chat',
    data() {
        return {
            targetUser: null,
            msgValue: '',
            messageList: []
        }
    },
    methods: {
        sendMessage() {
            // console.log(this.msgValue);
            // 需要发送的消息对象
            const msgObj = {
                target: this.targetUser._id,
                current: this.user.id,
                msg: this.msgValue
            };

            WSocket.send(msgObj);

            // 本地客户端显示
            this.messageList.push({
                msg: this.msgValue,
                source: "self"
            });
            console.log(this.messageList)
            // 保存消息
            this.saveMsg();

            // 清空input
            this.msgValue = "";
        },
        saveMsg() {
            //保存消息
            // 保存消息
            let message = {
                target: {
                    avatar: this.targetUser.avatar,
                    name: this.targetUser.name,
                    _id: this.targetUser._id
                },
                count: 0,
                message: this.messageList,
                user_id: this.user.id
            };
            this.$axios
                .post("/api/msg/addmsg", message)
                .then(res => (this.msgValue = ""));
        },
        getMessage() {
            this.$axios.get(`/api/msg/${this.user.id}`).then(res => {
                console.log(res.data)
                let result = res.data.data.filter(data => {
                    return data.target._id == this.targetUser._id
                })
                console.log(result)
                if (result.length > 0) {
                    this.messageList = result[0].message
                }
            })
        }

    },
    components: {
        Header
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    //服务端推送消息给客户端
    mounted() {
        WSocket.init({
            user: this.user
        }, message => {
            //收到消息后，将消息存储到数据中
            this.messageList.push({
                msg: message.msg,
                source: 'other'
            });
            //保存消息
            this.saveMsg();
        }, error => {
            console.log(error)
        })
    },
    beforeRouteEnter(to, from, next) {
        console.log(to.params)
        next(vm => {
            vm.targetUser = to.params.user;
            vm.getMessage();
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
    height: calc(100% - 100px);
    box-sizing: border-box;
    background-color: #f1f1f1;
    margin-top: 50px;
    padding: 8px;
    overflow-y: scroll;
}

.footer_wrap {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    border-top: 1px solid #d9d9d9;
    position: absolute;
    bottom: 0;
    padding: 8px;
    background-color: #fafafa;
}

.footer_wrap input {
    width: 70%;
    height: 30px;
    outline: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
}

.footer_wrap button {
    width: 20%;
    height: 34px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin-left: 8px;
    outline: none;
    background-color: #f1f1f1;
}

.footer_wrap button[disabled] {
    background-color: #d9d9d9;
    cursor: not-allowed;
    pointer-events: none;
}

.left_msg {
    justify-content: flex-start;
}

.right_msg {
    justify-content: flex-end;
}

.left_msg,
.right_msg {
    width: 100%;
    display: flex;
    margin: 5px 0;
}

.content_wrap img {
    width: 3rem;
    height: 3rem;
}

.content_wrap span {
    display: inline-block;
    max-width: 65%;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin: 0 5px;
    padding: 8px;
    box-sizing: border-box;
    word-break: break-all;
}

.left_msg span {
    background-color: #fff;
}

.right_msg span {
    background-color: #0fce0d;
}
</style>
