<template>
  <v-container class="main-container">
    <header class="mx-n3 mt-n6 mb-6" style="position: relative">
      <div class="logo-container">
        <img :src="logoUrl" id="logo" />
      </div>
      <div class="menu-container">
        <h1 class="display-3 font-weight-light white--text">Menu</h1>
      </div>
      <div class="moto-container">
        <h1 class="display-1 font-weight-thin text-center">
          {{ slogan }}
        </h1>
      </div>
      <v-row justify="center" class="text-center">
        <v-col class="text-center">
          <img src="@/assets/ArrowDown.png" class="arrow-img" />
        </v-col>
      </v-row>
    </header>
    <v-row>
      <v-col v-for="category in categories" :key="category._id" cols="12">
        <v-card
          link
          @click="navCategory(category.slug_name, category._id)"
          height="100"
          class="item"
          :color="colorSel(category._id)"
        >
          <v-row align="center" justify="center">
            <v-col class="text-center">
              <v-card-title>
                <h2
                  class="display-1 font-weight-light font-italic text-center mx-auto white--text"
                >
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
import media from "../api/menu/media";

export default {
  name: "Home",
  data() {
    return {
      error: "",
      logoUrl: ""
    };
  },
  computed: {
    categories() {
      let cat = this.$store.state.categories;
      return cat.sort((a, b) => a.order - b.order);
    },
    slogan() {
      return this.$store.state.settings.find(el => el.name === "Slogan").value;
    }
  },
  methods: {
    async navCategory(slug_name) {
      await this.$router.push({ name: "category", params: { slug_name } });
    },
    colorSel(id) {
      if (id === this.categories[0]._id) {
        return "#E8765B";
      } else {
        return "#ACA897";
      }
    }
  },
  async created() {
    let logo = this.$store.state.settings.find(el => el.name === "Logo");
    console.log(logo);
    logo = await media.getLogo(logo.value);
    console.log(logo);
    this.logoUrl = sessionStorage.getItem("api-url") + logo.full;
  }
};
</script>
<style scoped>
.main-container {
  margin-bottom: 100px;
}
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
header {
  height: 100vh;
}

#logo {
  display: block;
  object-fit: contain;
  height: calc(30vh - 10px);
}

.logo-container,
.menu-container,
.moto-container {
  object-fit: contain;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
  position: relative;
}
.logo-container {
  height: 30vh;
  border-bottom: 10px solid #bcbcbc;
  z-index: 30;
}

.logo-container #logo {
  max-width: 70%;
}

.menu-container {
  height: 35vh;
  background-color: #e8765b;
  border-bottom: 10px solid #9f6a6a;
  z-index: 20;
}

.moto-container {
  z-index: 10;
  height: 20vh;
}

.arrow-img {
  max-width: 50%;
  margin: -15px auto auto;
  position: relative;
  z-index: 50;
}

.headerImage {
  width: 100%;
}
</style>
