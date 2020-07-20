<template>
  <v-container v-if="show">
    <v-row>
      <v-col cols="auto" v-if="page !== 'Menu'">
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
          :disabled="!orders.length"
          @click="go_order"
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
          :disabled="orderSent || !orders.length"
          @click="openPopup"
        >
          <h4 class="title font-weight-light white--text text-center">
            Chiama Cameriere
          </h4>
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="popup" width="50%" class="">
      <v-container style="background-color: white">
        <h1 class="title">Inserisci il numero del tavolo</h1>
        <v-text-field
          type="number"
          v-model="table"
          color="white"
        ></v-text-field>
        <v-btn @click="call" width="100%">
          Chiama
        </v-btn>
      </v-container>
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
      order: null,
      show: true
    };
  },
  computed: {
    orders() {
      return this.$store.state.order;
    },
    orderSent() {
      return this.$store.state.orderSent;
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
    go_order() {
      this.$router.push({ name: "order" });
    },
    async call() {
      try {
        this.order = await menu.call(this.table);
        await this.$store.dispatch("sendOrder");
        this.popup = false;
      } catch (e) {
        console.log(e);
      }
    },
    openPopup() {
      if (this.page === "order") {
        this.popup = true;
      }
    },
    handleScroll() {
      if (this.page === "Menu") {
        this.show = window.pageYOffset > 80;
      } else {
        this.show = true;
      }
    }
  },
  created() {
    if (this.$route.path === "/") {
      this.show = false;
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  watch: {
    $route(to) {
      if (to.name === "Menu") {
        this.show = false;
      }
    }
  }
};
</script>

<style scoped></style>
