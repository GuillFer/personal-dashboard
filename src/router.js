import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import NotFound from './views/404.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("./views/About.vue"),
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () =>
      import("./views/Favorites.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () =>
      import("./views/Test.vue"),
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
