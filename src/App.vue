<template>
  <v-app id="app" class="overflow-y-hidden">
    <v-content v-if="!loading">
      <router-view />
    </v-content>
    <v-footer color="white" class="pa-0 elevation-2" app>
      <ToolBar />
    </v-footer>
  </v-app>
</template>

<script>
import menu from "./api/menu/menu";
import api from "./api/apiClient";
import axios from "axios";
import ToolBar from "./components/ToolBar";
import settings from "./api/settings";

export default {
  name: "RistoroApp",
  components: { ToolBar },
  data() {
    return {
      loading: true
    };
  },
  async created() {
    this.loading = true;

    try {
      if (!sessionStorage.getItem("api-url")) {
        console.log(process.env.VUE_APP_APIURL);
        let res = await axios.get(
          `${process.env.VUE_APP_APIURL}/services/getApi`,
          {
            data: {
              origin: window.location.origin
            }
          }
        );
        console.log(res);
        sessionStorage.setItem("api-url", res.data.api);
        api.defaults.baseURL = res.data.api;
      }

      let categories = await menu.getAllCategories();
      let settings_data = await settings.getAllSettings();

      let index = settings_data.findIndex(el => el.name === "Tema");
      let resTheme = await axios.get(
        `${process.env.VUE_APP_APIURL}/theme/getTheme/${settings_data[index].value}`
      );

      settings_data[index].value = resTheme.data;

      await this.$store.dispatch("setCategories", categories);
      await this.$store.dispatch("setAllSettings", settings_data);

      let name = settings_data.find(el => el.name === "Nome Ristorante");
      window.document.title = name.value;

      if (this.$route.name === "category") {
        let category = categories.find(
          cat => cat.slug_name === this.$route.params.slug_name
        );
        await this.$store.dispatch("setCurretCatId", category._id);
      }

      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
<style>
#app {
  max-width: 600px;
  margin: auto auto;
  overflow-x: hidden;
}
</style>
