import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/clients/index.vue"),
  },
  {
    path: "/encuesta/:id", //?por seccion
    component: () => import("../views/clients/survey.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
