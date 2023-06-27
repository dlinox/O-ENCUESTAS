import { createRouter, createWebHistory } from "vue-router";
import HomeCliente from "../views/clients/index.vue"
import Loading from "../views/loading.vue"

const routes = [
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
    // meta: {
    //   authGuard: true
    // }
  },

  {
    path: "/", //listado de encuestas
    component: HomeCliente,
    meta: {
      authGuard: true,
    }
  },

  {
    path: "/loading", //listado de encuestas
    component: Loading,
    meta: {
      authGuard: true,
    }
  },

  {
    path: "/survey/:id",
    component: () => import("../views/clients/survey.vue"),
    meta: {
      authGuard: true,
    }
  },

  //labs
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
    path: "/structure",
    component: () => import("../views/structure.vue")
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_MODE === 'production' ? import.meta.env.VITE_APP_BASE_URL : '/'),
  base: import.meta.env.VITE_APP_MODE === 'production' ? import.meta.env.VITE_APP_BASE_URL : '',
  routes,
});

router.beforeEach(async (to, from) => {
  //const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  //if (!answer) return false
});

export default router;
