import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/encuesta",
    component: () => import("../views/clients/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
