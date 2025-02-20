import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LoginPage from "../views/Login.vue";

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: Home
    },
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;