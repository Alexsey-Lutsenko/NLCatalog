import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main.page",
    component: () => import("../pages/MainPage.vue"),
    meta: {
      layout: "main",
    },
  },
  {
    path: "/category/:slug/:subcategorySlug?/",
    name: "category.page",
    component: () => import("../pages/CategoryPage.vue"),
    meta: {
      layout: "main",
    },
  },
  {
    path: "/:notFound(.*)",
    name: "404.page",
    component: () => import("../pages/404Page.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach(async (to, from, next) => {
  next();
});

export default router;
