import Vue from "vue";
import Vuex from "vuex";
// import VuexPersistence from "vuex-persist";

import categories from "./fields/categories";
import current from "./fields/current";
import order from "./fields/order";
import settings from "./fields/settings";

// const vueLocal = new VuexPersistence({
//   storage: window.localStorage
// });

Vue.use(Vuex);

export default new Vuex.Store(
  Object.assign({}, current, order, categories, {
    state: {
      ...categories.state,
      ...current.state,
      ...order.state,
      ...settings.state
    },
    mutations: {
      ...categories.mutations,
      ...current.mutations,
      ...order.mutations,
      ...settings.mutations
    },
    actions: {
      ...categories.actions,
      ...current.actions,
      ...order.actions,
      ...settings.actions
    },
    getters: {
      ...categories.getters,
      ...current.getters,
      ...order.getters
    },

    modules: {}
    // plugins: [vueLocal.plugin]
  })
);
