import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/clients/index.vue"),
  },
  {
    path: "/welcome",
    component: () => import("../views/clients/welcome.vue"),
  },
  {
    path: "/autocomplete",
    component: () => import("../views/AutocompleLab.vue"),
  },

  {
    path: "/form",
    component: () => import("../views/formComponents.vue"),
  },
  {
    path: "/encuesta/:id", //?por seccion
    component: () => import("../views/clients/survey.vue"),
  },
  {
    path: "/headless-components",
    component: () => import("../views/headless-components.vue")
  },
  {
    path: "/demo-data",
    component: () => import("../views/DemoData.vue")
  },
  {
    path: "/survey/:id",
    component: () => import("../views/clients/survey.vue")
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
