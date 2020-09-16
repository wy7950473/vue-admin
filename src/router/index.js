import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // redirect: "login"
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
  },
  {
    path: "/console",
    name: "Console",
    component: () => import("../views/Console/index")
  }
];

const router = new VueRouter({
  routes
});

export default router;
