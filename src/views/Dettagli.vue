<template>
  <v-container class="fill-height">
    <v-progress-circular v-if="loading" indeterminate />
    <v-card
      class="fill-height"
      width="100%"
      v-if="!loading"
      style="border-radius: 20px; position: relative"
    >
      <v-row no-gutters>
        <v-col cols="12">
          <v-img
            :src="picture"
            style="border-radius: 20px"
            class="elevation-1"
            cover
          />
        </v-col>
        <Chips :tags="item.tags" class="ma-4 mt-7" />
      </v-row>
      <v-row class="mx-4 mt-7" no-gutters align="center">
        <v-col>
          <h2 class="ma-0 headline font-weight-light">{{ item.name }}</h2>
        </v-col>
        <v-col cols="auto">
          <p class="font-italic font-weight-light ma-0 title">
            {{ item.price.toFixed(2) }} €
          </p>
        </v-col>
      </v-row>

      <v-card-text v-if="!alDialog" class="pb-12 mb-2">{{
        item.description
      }}</v-card-text>
      <v-card-text v-if="alDialog" class="pb-12 mb-2">
        <span
          v-for="allergen in item.allergens"
          :key="allergen._id"
          class="mb-2"
        >
          {{ allergen.name }}: {{ allergen.description }}
        </span>
      </v-card-text>

      <v-card-actions
        class="ma-0 pa-0"
        style="position: absolute; bottom: 0; width: 100%"
      >
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
              >Aggiungi all'ordine</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-dialog> </v-dialog>
  </v-container>
</template>

<script>
import menu from "../api/menu/menu";
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
      this.picture = await menu.getItemPicture(this.item.image);
      this.loading = false;
    } catch (e) {
      this.error = e;
      console.log(e);
    }
  }
};
</script>

<style scoped></style>
