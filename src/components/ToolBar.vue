<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <v-btn
          color="#E8B25B"
          width="50"
          height="50"
          rounded
          @click="back_route"
        >
          <v-icon color="white">fas fa-backward</v-icon>
        </v-btn>
      </v-col>
      <v-col v-if="page !== 'order'">
        <v-btn
          height="50"
          width="100%"
          color="green"
          style="border-radius: 20px;"
          class="pa-0"
          :to="{ name: 'order' }"
          :disabled="!orders.length"
        >
          <v-row no-gutters align="center">
            <v-col>
              <h4 class="title font-weight-light white--text text-center">
                Ordina
              </h4>
            </v-col>
            <v-col cols="4" v-if="orders.length">
              <div
                style="background-color: white; border-radius: 20px; height: 50px; display: flex"
                class="fill-height align-center text-center"
              >
                <p class="caption ma-0 pa-0 mx-auto">
                  {{ orders.length }} Piatti <br />
                  € {{ cost.toFixed(2) }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-btn>
      </v-col>
      <v-col v-if="page === 'order'">
        <v-btn
          height="50"
          width="100%"
          color="green"
          style="border-radius: 20px;"
          class="pa-0"
          @click="popup = true"
        >
          <h4 class="title font-weight-light white--text text-center">
            Chiama Cameriere
          </h4>
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="popup">
      <v-text-field type="number" v-model="table"></v-text-field>
      <v-btn @click="call">
        Chiama
      </v-btn>
    </v-dialog>
  </v-container>
</template>

<script>
import menu from "../api/menu/menu";
export default {
  name: "ToolBar",
  data() {
    return {
      popup: false,
      table: 0,
      order: null
    };
  },
  computed: {
    orders() {
      return this.$store.state.order;
    },
    cost() {
      let result = 0;
      for (let item of this.orders) {
        if (item) {
          result += item.price * item.quantity;
        }
      }
      return result;
    },
    page() {
      return this.$route.name;
    }
  },
  methods: {
    back_route() {
      this.$router.go(-1);
    },
    async call() {
      try {
        this.order = await menu.call(this.table);
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {}
};
</script>

<style scoped></style>
