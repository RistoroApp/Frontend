<template>
  <v-container class="detail-container">
    <v-progress-circular v-if="loading" indeterminate />
    <div
      class="elevation-2"
      id="container"
      v-if="!loading"
      style="border-radius: 20px; position: relative; display: grid"
    >
      <!--  Display image   -->

      <img
        :src="backend + item.image.full"
        alt="image"
        style="border-radius: 20px; height: 300px; width: 100%; display: block; object-fit: cover "
        class="elevation-1"
        v-if="item.image"
      />

      <!--  Display tags, name and price   -->

      <div style="grid-row: 2" class="px-5">
        <Chips :tags="item.tags" class="mt-4" />
        <v-row class="my-4" no-gutters align="center">
          <v-col>
            <h2 class="ma-0 display-1 font-weight-light">
              {{ item.name }} {{ item.freezed ? "*" : "" }}
            </h2>
          </v-col>
          <v-col cols="auto">
            <p class="font-italic font-weight-light ma-0 title">
              {{ item.price.toFixed(2) }} €
            </p>
          </v-col>
        </v-row>
      </div>

      <!--  Display body and Allergens   -->

      <div v-if="!alDialog" class="body-1 px-5" id="text" style="grid-row: 3">
        <p class="body-1">{{ item.description }}</p>
        <p class="font-weight-bold-2">
          {{
            item.freezed ? "* Questo piatto contiene ingredienti surgelati" : ""
          }}
        </p>
        <h3 class="heading mb-2 mt-9" v-if="item.allergens.length > 0">Allergeni</h3>
        <p>
          <Chips :tags="item.allergens" allergen />
        </p>
      </div>

      <!--  Display order button   -->

      <v-card-actions class="ma-0 pa-0" style="grid-row: 4">
        <v-row no-gutters>
          <v-col cols="12">
            <v-btn
              class="ma-0 elevation-0"
              style="width: 100%; border-radius: 0 0 20px 20px; height: 50px"
              color="green lighten-2"
              @click="$store.dispatch('addOrder', item)"
              dark
            >
              Aggiungi all'ordine
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </div>
  </v-container>
</template>

<script>
import Chips from "../components/Chips";
export default {
  name: "Dettagli",
  components: { Chips },
  data() {
    return {
      item: {},
      picture: null,
      error: "",
      loading: false,
      alDialog: false
    };
  },
  computed: {
    backend() {
      return sessionStorage.getItem("api-url");
    }
  },
  methods: {
    allergens() {
      this.alDialog = !this.alDialog;
    }
  },
  async created() {
    try {
      this.loading = true;
      this.item = await this.$store.getters.currentItem(
        this.$route.params.slug_name
      );
      this.loading = false;

      let container = document.getElementsByClassName("detail-container")[0];
      container.style.height = `${window.innerHeight - 100}px`;
    } catch (e) {
      this.error = e;
      console.log(e);
    }
  }
};
</script>

<style scoped>
#container {
  height: calc(100vh - 130px);
  grid-template-rows: auto auto 1fr 50px;
  row-gap: 10px;
}
#text {
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
}
</style>
