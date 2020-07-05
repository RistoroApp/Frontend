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
            <v-btn
                  class="fill-height"
                  elevation="0"
                  color="transparent"
                  @click="$store.dispatch('deleteOrder', item)"
            >
              <v-icon small color="red">fas fa-trash</v-icon>
            </v-btn>
          </v-card-subtitle>
        </v-col>
        <v-col cols="auto" class="fill-height px-4">
          <span class="font-italic">€ {{ item.price.toFixed(2) }}</span>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="my-6" flat v-if="order.length">
      <v-row align="center" no-gutters>
        <v-col>
          <v-card-title>
            Coperto
          </v-card-title>
        </v-col>
        <v-col cols="auto" class="px-4"> € {{ coperto.value }} </v-col>
      </v-row>
    </v-card>
    <v-card class="my-6" outlined v-if="order.length">
      <v-row align="center" no-gutters>
        <v-col>
          <v-card-title>
            Totale
          </v-card-title>
        </v-col>
        <v-col cols="auto" class="px-4"> € {{ totale }}</v-col>
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
    },
    coperto() {
      return this.$store.getters.getCoperto;
    },
    totale() {
      let total = 0;
      for (let o of this.order) {
        let o_cost = o.price * o.quantity;
        total += o_cost;
      }
      total += parseFloat(this.coperto.value);

      return total.toFixed(2);
    }
  },
  methods: {}
};
</script>

<style scoped></style>
