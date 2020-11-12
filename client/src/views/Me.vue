<template>
<div class="mine">
    <Header title="我" />
    <div class="container">
        <InfoCell :userInfo="user" />
        <div class="btn_wrapper">
            <Button @click="loginOut">退出登录</Button>
        </div>
    </div>
</div>
</template>

<script>
import Header from "../components/Header";
import InfoCell from "../components/infoCell";
import Button from "../components/YButton";

export default {
    name: "me",
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    methods: {
        loginOut() {
            localStorage.removeItem("wxToken");
            this.$router.push("/login");
        }
    },
    components: {
        Header,
        InfoCell,
        Button
    }
};
</script>

<style scoped>
.mine {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.container {
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 50px;
    box-sizing: border-box;
    padding: 16px 0;
    background-color: #f1f1f1;
}

.btn_wrapper {
    box-sizing: border-box;
    padding: 20px;
}
</style>
