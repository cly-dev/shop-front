import { message } from "./../untils/common";
/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 20:15:33
 * @Description:
 */
import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import useStore from "@/pinia/user";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "/",
    component: () => import("../views/Page/index.vue"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/Home/index.vue"),
      },
      {
        path: "product/:seoUrl",
        name: "product",
        component: () => import("../views/Product/index.vue"),
      },
      {
        path: "category/:seoUrl",
        name: "category",
        component: () => import("../views/Category/index.vue"),
      },{
        path:'collection/:seoUrl',
        name:'collection',
        component:()=>import("../views/Collection/index.vue")
      },{
        path:'search',
        name:'search',
        component:()=>import("../views/Search/index.vue")
      },{
        path:'cart',
        name:'cart',
        component:()=>import("../views/Cart/index.vue")
      },
      {
        path: "/",
        redirect: {
          path: "home",
        },
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login/index.vue"),
    meta: {
      auth: "login",
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register/index.vue"),
    meta: {
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(
  (
    to: RouteLocationNormalized,
    form: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    console.log(to);
    console.log(form);
    console.log("路由更新前");
    const userData = useStore();
    if (to.meta.auth === "login" && userData.userData) {
      message("请先退出登录", "warning");
      next(form.fullPath);
    }
    next();
  }
);
router.afterEach((to: any, from: any) => {
  console.log(to);
  console.log(from);
  console.log("路由更新后");
  console.log("-=-----------------");
});

export default router;
