import Vuex from "vuex";

export default new Vuex.Store({
  namespaced: true,
  state() {
    return {
      cityId: localStorage.getItem("cityId") || 1,
    };
  },

  getters: {
    getCityId(state) {
      return state.cityId;
    },
  },

  mutations: {
    setCityId(state, payload) {
      state.cityId = payload;
    },
  },

  actions: {},
});
