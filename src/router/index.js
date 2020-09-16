import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "index"
  },
  {
    path: "/index",
    name: "Index",
    redirect:'/login',
    component: () => import("../views/index"),
    children:[
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
    ]
  },
  {
    path: "/console",
    name: "Console",
    component: () => import("../views/Layout/index"),
    children:[
      {
        path:"/console",
        name:"ConsoleIndex",
        component: () => import("../views/Console/index")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
