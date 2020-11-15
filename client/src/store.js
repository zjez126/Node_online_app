import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const types = {
    SET_USER: "SET_USER", //用户信息
    SET_TARGET_USER: "SET_TARGET_USER"
}

const state = {
    //需要维护的状态
    user: {}, //存储用户信息
    targetUser: {}

}
const getters = {
    user: state => state.user,
    targetUser: state => state.targetUser
};

const mutations = {
    [types.SET_USER](state, user) {
        if (user) {
            state.user = user;
        } else {
            state.user = {};
        }
    },
    [types.SET_TARGET_USER](state, targetUser) {
        if (targetUser) {
            state.targetUser = targetUser;
        } else {
            state.targetUser = {};
        }
    }
}
const actions = {
    setUser: ({ commit }, user) => {
        commit(types.SET_USER, user)
    },
    setTargetUser: ({ commit }, targetUser) => {
        commit(types.SET_TARGET_USER, targetUser)
    }
}


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})