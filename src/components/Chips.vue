<template>
  <v-row v-if="Array.isArray(tags) && tags.length" no-gutters>
    <v-col>
      <v-chip
        small
        v-for="al in tags"
        :key="al._id"
        :color="getColor(al).background"
        :text-color="getColor(al).text"
        style="border-radius: 5px"
      >
        <span style="color: white">{{ al.name }}</span>
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Chips",
  props: ["tags"],
  data() {
    return {
      key: "1"
    }
  },
  methods: {
    getColor(el) {
      return this.$store.getters.get_color(el.color);
    }
  },
};
</script>

<style scoped></style>
