export default {
  state: {
    settings: []
  },
  mutations: {
    SET_ALL_SETTINGS: (state, data) => {
      state.settings = data;
    }
  },
  actions: {
    setAllSettings: ({ commit }, data) => {
      commit("SET_ALL_SETTINGS", data);
    }
  }
};
