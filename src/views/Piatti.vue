<template>
  <v-container>
    <header>
      <div class="my-6 text-center">
        <h1 class="display-3 font-weight-thin">{{ category.name }}</h1>
      </div>
    </header>
    <v-row>
      <v-col
        v-for="item in items"
        :key="item._id"
        cols="12"
        class="overflow-auto"
      >
        <Item :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Item from "../components/Item";
export default {
  name: "Piatti",
  components: { Item },
  data() {
    return {
      error: ""
    };
  },
  computed: {
    items() {
      return this.category.items;
    },
    category() {
      return this.$store.getters.currentCateogry(this.$route.params.slug_name);
    }
  }
};
</script>

<style scoped></style>
