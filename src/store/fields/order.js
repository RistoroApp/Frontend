export default {
  state: {
    order: [],
    orderSent: false
  },
  mutations: {
    ADD_ORDER: (state, data) => {
      state.orderSent = false;
      state.order = data;
    },
    EDIT_ORDER: (state, data) => {
      state.orderSent = false;
      state.order = data;
    },
    SEND_ORDER: state => {
      state.orderSent = true;
    }
  },
  actions: {
    sendOrder: ({ commit }) => {
      commit("SEND_ORDER");
    },
    addOrder: ({ state, commit }, data) => {
      let orders = [...state.order];

      let itemI = state.order.findIndex(el => el._id === data._id);
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
      let newState = [...state.order];

      newState[index].quantity++;

      commit("EDIT_ORDER", newState);
    },
    decreaseOrder: ({ state, commit }, data) => {
      let index = state.order.findIndex(el => el._id === data._id);
      let newState = [...state.order];

      newState[index].quantity--;

      commit("EDIT_ORDER", newState);
    },
    deleteOrder: ({ state, commit }, data) => {
      let newOrder = state.order.filter(el => el._id !== data._id);
      if (!newOrder) {
        newOrder = [];
      }
      commit("EDIT_ORDER", newOrder);
    }
  },
  getters: {
    getCoperto: state => {
      return state.settings.find(el => el.name === "Coperto");
    }
  }
};
