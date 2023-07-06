import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import sourceData from '@/data.json'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/home', redirect: { name: 'Home' } },
    {
        path: '/destination/:id/:slug',
        name: 'destination.show',
        component: () => import("@/views/DestinationShow.vue"),
        props: route => ({ id: parseInt(route.params.id) }),
        beforeEnter(to, from) {
            const exists = sourceData.destinations.find(destination => destination.id === parseInt(to.params.id))

            if (!exists) {
                return {
                    name: 'NotFound',
                    params: {
                        pathMatch: to.path.split('/').slice(1),
                    },
                    query: to.query,
                    hash: to.hash,
                }
            }
        }
    },
    {
        path: '/protected',
        name: 'protected',
        components: {
            default: () => import('@/views/Protected.vue'),
            LeftSideBar: () => import('@/components/LeftSideBar.vue')
        },
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/invoices',
        name: 'invoices',
        components: {
            default: () => import('@/views/Invoices.vue'),
            LeftSideBar: () => import('@/components/LeftSideBar.vue')
        },
        meta: {
            requiresAuth: true,
        }
    },
    { path: '/login', name: 'login', component: () => import('@/views/Login.vue') },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || new Promise((resolve) => {
            setTimeout(() => resolve({ top: 0 }), 300)
        })
    }
});

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !window.user) {
        return { name: 'login', query: { redirect: to.fullPath } }
    }
});
export default router;