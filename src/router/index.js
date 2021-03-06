import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import("../views/Home.vue"),
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/organizer',
            component: () => import("../views/Organizer.vue"),
            meta: {
                requiresAuth: true
            }
        },
        { path: '/login', component: () => import("../views/Login.vue") },
    ]
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
}


router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            next("/login")
        }
    } else {
        next();
    }
})

export default router; 