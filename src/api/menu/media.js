import api from "../apiClient";

export default {
  getLogo: id =>
    new Promise((resolve, reject) => {
      api
        .get(`/media/generics/${id}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
};
