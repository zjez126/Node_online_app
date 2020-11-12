import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const types = {
    SET_USER: "SET_USER" //用户信息
}

const state = {
    user: {}
}
const getters = {
    user: state => state.user
};

const mutations = {
    [types.SET_USER](state, user) {
        if (user) {
            state.user = user;
        } else {
            state.user = {};
        }
    }
}
const actions = {
    setUser: ({ commit }, user) => {
        commit(types.SET_USER, user)
    }
}


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})