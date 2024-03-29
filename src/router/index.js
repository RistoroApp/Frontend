import Vue from "vue";
import VueRouter from "vue-router";
import Menu from "../views/Menu.vue";
import Piatti from "../views/Piatti";
import Dettagli from "../views/Dettagli";
import Order from "../views/Order";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Menu",
    component: Menu
  },
  {
    path: "/piatti/:slug_name",
    name: "category",
    component: Piatti
  },
  {
    path: "/dettagli/:slug_name",
    name: "detail",
    component: Dettagli
  },
  {
    path: "/order",
    name: "order",
    component: Order
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
