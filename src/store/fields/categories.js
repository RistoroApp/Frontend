export default {
  state: {
    categories: []
  },
  mutations: {
    SET_CATEGORIES: (state, data) => {
      state.categories = data;
    }
  },
  actions: {
    setCategories: ({ commit }, data) => {
      commit("SET_CATEGORIES", data);
    },
    updateItem: ({ state, commit }, data) => {
      let category = state.categories.findIndex(
        cat => cat._id === data.category
      );
      let item = state.categories[category].items.findIndex(
        item => item._id === data.item
      );
      let newState = [...state.categories];
      newState[category].items[item].avatar = data.d;
      commit("SET_CATEGORIES", newState);
    }
  },
  getters: {
    categoryItems: state => name => {
      let category = state.categories.find(cat => cat.slug_name === name);
      return category.items;
    }
  }
};
