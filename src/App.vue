<template>
  <v-app>
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
import ToolBar from "./components/ToolBar";

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
      let categories = await menu.getAllCategories();
      await this.$store.dispatch("setCategories", categories);

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
