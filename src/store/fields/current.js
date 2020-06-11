export default {
  state: {
    currentCategoryId: "",
    currentItemId: ""
  },
  mutations: {
    SET_CURRENT_CAT_ID: (state, data) => {
      state.currentCategoryId = data;
    },
    SET_CURRENT_ITEM_ID: (state, data) => {
      state.currentItemId = data;
    }
  },
  actions: {
    setCurretCatId: ({ commit }, data) => {
      commit("SET_CURRENT_CAT_ID", data);
    },
    setCurrentItemId: ({ commit }, data) => {
      commit("SET_CURRENT_ITEM_ID", data);
    }
  },
  getters: {
    currentCateogry: state => name => {
      return state.categories.find(cat => cat.slug_name === name);
    },
    currentItem: state => name => {
      for (let category of state.categories) {
        for (let i of category.items) {
          if (i.slug_name === name) {
            return i;
          }
        }
      }
    }
  }
};
