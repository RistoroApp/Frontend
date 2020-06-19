import api from "../apiClient";
import store from "../../store/index";

export default {
  getAllCategories: () =>
    new Promise((resolve, reject) => {
      api
        .get("/menu/category")
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  getAllItemsFromCat: catId =>
    new Promise((resolve, reject) => {
      api
        .get(`/menu/category/${catId}`)
        .then(res => resolve(res.data.items))
        .catch(e => reject(e));
    }),
  getItemById: id =>
    new Promise((resolve, reject) => {
      api
        .get(`/menu/item/${id}`)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  getItemAvatar: item =>
    new Promise((resolve, reject) => {
      api
        .get(`/menu/item/image/${item.avatar}`, {
          timeout: 0,
          responseType: "blob"
        })
        .then(async res => {
          let picture = URL.createObjectURL(new Blob([res.data]));
          await store.dispatch("updateItem", {
            category: item.category,
            item: item._id,
            d: picture
          });
          resolve("Ok");
        })
        .catch(e => {
          reject(e);
        });
    }),
  getItemPicture: picture =>
    new Promise((resolve, reject) => {
      api
        .get(`/menu/item/image/${picture}`, {
          timeout: 0,
          responseType: "blob"
        })
        .then(async res => {
          let picture = URL.createObjectURL(new Blob([res.data]));
          resolve(picture);
        })
        .catch(e => {
          reject(e);
        });
    }),
  call: table =>
    new Promise((resolve, reject) => {
      api
        .post(`/menu/order`, { table })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
};
