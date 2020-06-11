import api from "./apiClient";

export default {
  getAllSettings: () =>
    new Promise((resolve, reject) => {
      api
        .get("/settings/")
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    })
};
