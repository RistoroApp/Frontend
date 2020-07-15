<template>
  <v-card
    link
    @click="nav(item.slug_name)"
    style="border-radius: 20px"
    class="py-2 item"
    elevation="4"
  >
    <v-row align="center" justify="center" no-gutters class="pa-4">
      <v-col cols="auto" class="text-center px-2">
        <v-progress-circular indeterminate v-if="imageLoading" />
        <v-img
          class="image elevation-5 mx-auto"
          :src="backend + item.image.thumbnail"
          max-height="70"
          max-width="70"
        />
      </v-col>
      <v-col>
        <h2 class="title font-weight-regular px-4">
          {{ item.name }} {{ item.freezed ? "*" : "" }}
        </h2>
      </v-col>
      <v-col cols="2">
        <p class="font-italic font-weight-light ma-0 subtitle-1">
          {{ item.price.toFixed(2) }} €
        </p>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      style="background-color: #F2F2F2"
      v-if="tags(item)"
      class="mb-n2 mt-2 py-2"
      no-gutters
    >
      <v-col cols="auto">
        <Chips :tags="item.tags" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import menu from "../api/menu/menu";
import Chips from "./Chips";

export default {
  name: "Item",
  components: { Chips },
  props: ["item"],
  data() {
    return {
      imageLoading: true,
      image: false
    };
  },
  methods: {
    nav(slug_name) {
      this.$router.push({ name: "detail", params: { slug_name } });
    },
    tags(item) {
      return Array.isArray(item.tags) && item.tags.length;
    }
  },
  computed: {
    backend() {
      return sessionStorage.getItem("api-url");
    }
  },
  async mounted() {
    console.log(this.item.image);
    if (this.item.avatar && !this.item.avatar.startsWith("blob")) {
      try {
        await menu.getItemAvatar(this.item);
        this.image = true;
        this.imageLoading = false;
      } catch (e) {
        this.image = false;
      }
    } else {
      this.imageLoading = false;
      this.image = true;
    }
  }
};
</script>

<style scoped>
.image {
  border-radius: 50%;
}
</style>
