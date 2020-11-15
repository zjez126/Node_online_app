<template>
<div class="information">
    <Header title="详细资料" :isLeft="true" btn_icon="ellipsis-h" />
    <div class="container">
        <InfoCell :userInfo="targetUser" />
        <div class="btn_wrapper">
            <YButton @click="$router.push({name:'chat',params:{user:targetUser}})">发消息</YButton>
        </div>
    </div>
</div>
</template>

<script>
import Header from "../components/Header";
import InfoCell from "../components/infoCell";
import YButton from "../components/YButton";
export default {
    data() {
        return {

        }
    },
    computed: {
        targetUser() {
            return this.$store.getters.targetUser
        }
    },
    components: {
        Header,
        InfoCell,
        YButton
    }
}
</script>

<style scoped>
.information {
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
