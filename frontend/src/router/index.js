import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LoginPage from "../views/Login.vue";
import { useUserStore } from "../stores/userStore";

const routes = [
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage
    },
    {
        path: "/register",
        name: "RegisterPage",
        component: () => import("../views/Register.vue")
    },
    {
        path: "/",
        name: "HomePage",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/login"
    }
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = useUserStore().isAuthenticated; 
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'LoginPage' });
    } else {
        next();
    }
});


export default router;