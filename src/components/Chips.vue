<template>
  <v-row v-if="Array.isArray(tags) && tags.length" no-gutters>
    <v-col>
      <v-tooltip
        bottom
        v-for="al in tags"
        :key="al._id"
        :disabled="!al.description"
        open-on-click
        :color="getColor(al).background"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-chip
            small
            :color="getColor(al).background"
            :text-color="getColor(al).text"
            v-on="on"
            v-bind="attrs"
            class="mx-2"
            style="border-radius: 5px"
          >
            <span style="color: white">{{ al.name }}</span>
          </v-chip>
        </template>
        <span v-if="al.description">{{ al.description }}</span>
      </v-tooltip>
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
    };
  },
  methods: {
    getColor(el) {
      if (el.color) {
        return this.$store.getters.get_color(el.color);
      } else {
        return this.$store.getters.random_color;
      }
    }
  }
};
</script>

<style scoped></style>
