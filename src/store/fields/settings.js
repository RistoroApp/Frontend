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
  },
  getters: {
    get_color: state => id => {
      let theme = state.settings.find(el => el.name === "Tema");
      console.log(theme);
      return theme.value.colors.tags.find(el => el._id === id);
    }
  }
};
