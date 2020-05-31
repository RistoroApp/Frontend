import Vue from "vue";
import Vuex from "vuex";
// import VuexPersistence from "vuex-persist";
//
// const vueLocal = new VuexPersistence({
//   storage: window.localStorage
// });

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    categories: [],
    currentCategoryId: "",
    currentItemId: "",
    order: []
  },
  mutations: {
    SET_CURRENT_CAT_ID: (state, data) => {
      state.currentCategoryId = data;
    },
    SET_CURRENT_ITEM_ID: (state, data) => {
      state.currentItemId = data;
    },
    SET_CATEGORIES: (state, data) => {
      state.categories = data;
    },
    SET_LOADING: (state, data) => {
      state.loading = data;
    },
    ADD_ORDER: (state, data) => {
      state.order = data;
    },
    EDIT_ORDER: (state, data) => {
      state.order = data;
    }
  },
  actions: {
    setCurretCatId: ({ commit }, data) => {
      commit("SET_CURRENT_CAT_ID", data);
    },
    setCurrentItemId: ({ commit }, data) => {
      commit("SET_CURRENT_ITEM_ID", data);
    },
    setCategories: ({ commit }, data) => {
      commit("SET_CATEGORIES", data);
    },
    setLoading: ({ commit }, data) => {
      commit("SET_LOADING", data);
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
    },
    addOrder: ({ state, commit }, data) => {
      let orders = [...state.order];

      let itemI = state.order.findIndex(el => el._id === data._id);
      console.log(itemI);
      let item;

      if (itemI >= 0) {
        let item = { ...state.order[itemI] };
        if (item.quantity) {
          item.quantity++;
        } else {
          item.quantity = 1;
        }
        orders[itemI] = item;
      } else {
        item = { ...data };
        item.quantity = 1;
        orders.push(item);
      }

      commit("ADD_ORDER", orders);
    },
    increaseOrder: ({ state, commit }, data) => {
      let index = state.order.findIndex(el => el._id === data._id);
      let newState = [ ...state.order ];

      newState[index].quantity++;

      commit("EDIT_ORDER", newState);
    },
    decreaseOrder: ({ state, commit }, data) => {
      let index = state.order.findIndex(el => el._id === data._id);
      let newState = [ ...state.order ];

      newState[index].quantity--;

      commit("EDIT_ORDER", newState);
    },
    deleteOrder: ({ state, commit }, data) => {
      let newOrder = state.order.find(el => el._id !== data._id);
      if (!newOrder) {
        newOrder = [];
      }
      commit("EDIT_ORDER", newOrder);
    }
  },
  getters: {
    categoryItems: state => name => {
      let category = state.categories.find(cat => cat.slug_name === name);
      return category.items;
    },
    currentCateogry: state => name => {
      let category = state.categories.find(cat => cat.slug_name === name);
      return category;
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
  },
  modules: {}
  // plugins: [vueLocal.plugin]
});
