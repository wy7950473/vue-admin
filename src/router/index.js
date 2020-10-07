import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "index",
    hidden:true,
    meta:{
      name:"主页"
    }
  },
  {
    path: "/index",
    name: "Index",
    redirect:'/login',
    hidden:true,
    meta:{
      name:"登录注册"
    },
    component: () => import("../views/index"),
    children:[
      {
        path: "/login",
        name: "Login",
        meta:{
          name:"登录"
        },
        component: Login
      },
      {
        path: "/register",
        name: "Register",
        meta:{
          name:"注册"
        },
        component: () => import("../views/Login/register")
      }
    ]
  },
  {
    path: "/console",
    name: "Console",
    redirect:"consoleIndex",
    meta:{
      name:"控制台",
      icon:"console"
    },
    component: () => import("../views/Layout/index"),
    children:[
      {
        path:"/consoleIndex",
        name:"ConsoleIndex",
        meta:{
          name:"首页"
        },
        component: () => import("../views/Console/index")
      }
    ]
  },
  {
    path:"/info",
    name:"Info",
    component: () => import("../views/Layout/index"),
    meta:{
      name:"信息管理",
      icon:"info"
    },
    children: [
      {
        path:"/infoIndex",
        name:"InfoIndex",
        meta:{
          name:"信息列表"
        },
        component: () => import("../views/Info/index")
      },
      {
        path:"/infoCategory",
        name:"InfoCategory",
        meta:{
          name:"信息分类"
        },
        component: () => import("../views/Info/category")
      },
      {
        path:"/infoDetailed",
        name:"InfoDetailed",
        hidden:true,
        meta:{
            name:"信息详情"
        },
        component: () => import("../views/Info/detailed")
      }
    ]
  },
  {
    path:"/user",
    name:"User",
    meta:{
      name:"用户管理",
      icon:"user"
    },
    component: () => import("../views/Layout/index"),
    children: [
      {
        path:"/userIndex",
        name:"UserIndex",
        meta:{
          name:"用户列表"
        },
        component: () => import("../views/User/index")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
