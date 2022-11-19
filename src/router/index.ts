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
const MySpace = () => import("../views/MySpace.vue");
const Search = () => import("../views/Search.vue");
const Prev2 = () => import("../views/Prev2.vue");
const Prev1 = () => import("../views/Prev1.vue");
const routes = [
    {
        path: "/",
        redirect: "/Me"
    },
    {
        path: "/Search/:searchin",
        name: "Search",
        component: Search,
    },
    {
        path: "/Prev2",
        name: "Prev2",
        component: Prev2,
    },
    {
        path: "/Prev1",
        name: "Prev1",
        component: Prev1,
    },
    {
        path: "/Register",
        name: "Register",
        component: Register,
    },
    {
        path: "/Blogs",
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
    path: "/Page/:auid",
    name: "Page",
    component: Page,
  },

    {
        path: "/Me",
        name: "MySpace",
        component: MySpace,
    },



];

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'active',
    routes
})

export default router