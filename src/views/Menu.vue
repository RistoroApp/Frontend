<template>
  <v-container>
    <header class="mx-n3 mt-n6 mb-6" style="position: relative">
      <img :src="headerImage" class="headerImage" />
      <div class="menu_div">
        <h1 class="display-3 font-weight-thin">Menu</h1>
      </div>
    </header>
    <v-row>
      <v-col v-for="category in categories" :key="category._id" cols="12">
        <v-card
          link
          @click="navCategory(category.slug_name, category._id)"
          img="/background-img.png"
          height="100"
        >
          <v-row align="center" justify="center">
            <v-col class="text-center">
              <v-card-title>
                <h2 class="display-1 font-weight-thin text-center mx-auto">
                  {{ category.name }}
                </h2>
              </v-card-title>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      error: ""
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    headerImage() {
      return require("../assets/menu-background.png");
    }
  },
  methods: {
    async navCategory(slug_name) {
      await this.$router.push({ name: "category", params: { slug_name } });
    }
  }
};
</script>

<style scoped>
.menu_div {
  position: absolute;
  padding: 20px 0;
  bottom: 20px;
  right: 0;
  background-color: white;
  width: 70%;
  text-align: center;
  border-radius: 30px 0 0 30px;
  box-shadow: 10px 10px 10px #f2f2f2;
}
.headerImage {
  width: 100%;
}
</style>
