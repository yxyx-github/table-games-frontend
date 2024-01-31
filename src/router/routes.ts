import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('pages/IndexPage.vue')
            },
            {
                path: 'session/current',
                name: 'session.current',
                component: () => import('pages/CurrentSessionPage.vue')
            },
            {
                path: 'session/create',
                name: 'session.create',
                component: () => import('pages/CreateSessionPage.vue')
            },
            {
                path: 'session/join',
                name: 'session.join',
                component: () => import('pages/JoinSessionPage.vue')
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
]

export default routes
