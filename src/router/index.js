import { createRouter, createWebHistory } from "vue-router";

import authGuard from '@/utils/authGuard.js';

import HomeCliente from "../views/clients/index.vue"
import Loading from "../views/loading.vue"

const routes = [

  {
    path: "/loading",
    component: Loading,

  },

  {
    path: "/admin",
    component: () => import("../views/admin/index.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/admin/dashboard.vue"),
      },
      {
        path: "surveys", //form
        component: () => import("../views/admin/survey/index.vue"),
        children: [
          {
            path: "",
            component: () => import("../views/admin/survey/list.vue"),
          },
          {
            path: "create",
            component: () => import("../views/admin/survey/create.vue"),
          },
          {
            path: "edit/:id?", //id: id survery
            component: () => import("../views/admin/survey/edit.vue"),
          },
          {
            path: "result/:id?", //id: id survery
            component: () => import("../views/admin/survey/results.vue"),
          },
        ],
      },
    ],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/",
    name: 'home',
    component: HomeCliente,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/login.vue"),
    meta: {
      requiresAuth: false
    }
  },


  {
    path: "/survey/:id/:topic?/:section?",
    component: () => import("../views/clients/survey.vue"),
    meta: {
      authGuard: true,
    }
  },

  {
    path: "/welcome",
    component: () => import("../views/clients/welcome.vue"),
  },

  {
    path: "/encuesta/:id",
    component: () => import("../views/clients/survey.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_MODE === 'production' ? import.meta.env.VITE_APP_BASE_URL : '/'),
  base: import.meta.env.VITE_APP_MODE === 'production' ? import.meta.env.VITE_APP_BASE_URL : '',
  routes,
});

router.beforeEach(authGuard);


export default router;
