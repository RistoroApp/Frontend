<template>
  <v-container class="detail-container">
    <v-progress-circular v-if="loading" indeterminate />
    <div
      class="elevation-2"
      id="container"
      v-if="!loading"
      style="border-radius: 20px; position: relative; display: grid"
    >
      <img
        :src="backend + item.image.full"
        alt="image"
        style="border-radius: 20px; height: 300px; width: 100%; display: block; object-fit: cover "
        class="elevation-1"
      />

      <div>
        <Chips :tags="item.tags" class="mx-4 mt-4" />
        <v-row class="mx-4 mt-4" no-gutters align="center">
          <v-col>
            <h2 class="ma-0 headline font-weight-regular">
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

      <div v-if="!alDialog" class="body-1 pa-4" id="text">
        {{ item.description }} <br />
        <span class="font-weight-bold">
          {{
            item.freezed ? "* Questo piatto contiene ingredienti surgelati" : ""
          }}
        </span>
      </div>
      <v-card-text v-if="alDialog" class="pb-12 mb-2 body-1">
        <p v-for="allergen in item.allergens" :key="allergen._id" class="mb-2">
          <span class="font-weight-bold">{{ allergen.name }}</span
          >: {{ allergen.description }}
        </p>
      </v-card-text>

      <v-card-actions class="ma-0 pa-0">
        <v-row no-gutters>
          <v-col cols="6">
            <v-btn
              class="ma-0 elevation-0"
              style="width: 100%; border-radius: 0 0 0 20px; height: 50px"
              @click="allergens"
              >{{ alDialog ? "Chiudi" : "Mostra" }} Allergeni</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn
              class="ma-0 elevation-0"
              style="width: 100%; border-radius: 0 0 20px 0; height: 50px"
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
  grid-template-rows: 300px auto 1fr 50px;
  row-gap: 10px;
}
#text {
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
}
</style>
