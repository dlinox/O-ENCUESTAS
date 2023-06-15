import { createRouter, createWebHistory } from "vue-router";

import HomeCliente from "../views/clients/index.vue"

const routes = [
  {
    path: "/",
    component: HomeCliente,
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
    path: "/encuesta/:id/:pic?",
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
    path: "/survey/:id/:topic?",
    component: () => import("../views/clients/survey.vue")
  },

  {
    path: "/structure",
    component: () => import("../views/structure.vue")
  },

  {
    path: "/admin",
    component: () => import("../views/admin/dashboard.vue"),
    childrens: [

    ]
  }


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
