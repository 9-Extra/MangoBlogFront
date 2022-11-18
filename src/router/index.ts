// createWebHashHistory 是hash模式就是访问链接带有#
// createWebHistory  是history模式
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
 
// 引入文件，动态路由
const Register = () => import("../views/Register.vue");
const Login = () => import("../views/Login.vue");
const Home = () => import("../views/home.vue");
const About = () => import("../views/about.vue");
const NotFound = () => import("../views/NotFound.vue");
const BlogSend = () => import("../views/BlogSend.vue");
const Blogs = () => import("../views/Blogs.vue");
const Page = () => import("../views/Page.vue");
// 这里要注意一点，如下面这种写的话会报错，ts
// {
//    path: "/",
//    name: "Home",
//    component: () => import("../views/Home.vue")
//  },
 
 
const routes = [
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },

  {
    path: "/",
    name: "Blogs",
    component: Blogs,
  },
  {
    path: "/BlogSend",
    name: "BlogSend",
    component: BlogSend,
  },
  {
    path: "/About",
    name: "About",
    component: About,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/:pathMatch(.*)*", // 代替vue2的通配符path: "*",
    name: "NotFound",
    component: NotFound,
  },
];
 
const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'active',
    routes
})
 
export default router