<template>
  <v-container>
    <header>
      <h1 class="display-3 font-weight-thin text-center py-4">Ordina</h1>
    </header>
    <h2 class="subtitle-1 my-2 text-center" v-if="!order.length">
      Non è presente nessun elemento
    </h2>
    <v-card v-for="item in order" :key="item._id" class="my-3">
      <v-row align="center" no-gutters>
        <v-col>
          <v-card-title>
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle class="pa-3"
            >Quantità: {{ item.quantity }}
            <v-btn
              x-small
              class="mx-2"
              :disabled="item.quantity === 1"
              @click="$store.dispatch('decreaseOrder', item)"
            >
              <v-icon x-small>fas fa-minus</v-icon>
            </v-btn>
            <v-btn
              x-small
              class="mx-2"
              @click="$store.dispatch('increaseOrder', item)"
            >
              <v-icon x-small>fas fa-plus</v-icon>
            </v-btn>
          </v-card-subtitle>
        </v-col>
        <v-col cols="auto" class="fill-height">
          <v-card-actions>
            <v-btn
              class="fill-height"
              elevation="0"
              color="transparent"
              @click="$store.dispatch('deleteOrder', item)"
            >
              <v-icon>fas fa-trash</v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Order",
  computed: {
    order() {
      return this.$store.state.order;
    }
  },
  methods: {}
};
</script>

<style scoped></style>
