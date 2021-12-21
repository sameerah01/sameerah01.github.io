import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    search: "",
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items;
    },
    update(state, search) {
      state.search = search;
    },
  },
});
