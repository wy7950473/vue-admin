import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Login/register")
  }
];

const router = new VueRouter({
  routes
});

export default router;
