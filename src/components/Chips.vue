<template>
  <v-row v-if="Array.isArray(tags) && tags.length" no-gutters>
    <v-col>
      <v-chip
        small
        v-for="al in tags"
        :key="al._id"
        color="#E8B25B"
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
  props: ["tags"]
};
</script>

<style scoped></style>
