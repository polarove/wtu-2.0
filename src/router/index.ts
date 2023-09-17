import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import entries from '@/static/entries'

const routes = [
    {
        path: '/',
        name: 'index',
        title: '主页',
        component: () => import('@page/team/index.vue'),
        redirect: `/${entries.origin}`,
        children: [
            {
                path: `/${entries.origin}`,
                name: entries.origin,
                title: '起源星系',
                component: () => import('@page/team/origin/index.vue'),
            },
            {
                path: `/${entries.durivi}`,
                name: entries.durivi,
                title: '双衍王境',
                component: () => import('@page/team/durivi/index.vue'),
            },
            {
                path: `/${entries.empyrean}`,
                name: entries.empyrean,
                title: '九重天',
                component: () => import('@page/team/empyrean/index.vue'),
            },
        ],
    },
    {
        path: '/account',
        name: 'account',
        title: '账号中心',
        component: () => import('@page/account/index.vue'),
        redirect: '/login',
        children: [
            {
                path: '/account/private',
                name: 'private',
                title: '个人空间',
                component: () => import('@page/account/private/index.vue'),
            },
            {
                path: '/account/login',
                name: 'login',
                title: 'Tenno登录',
                component: () => import('@page/account/login/index.vue'),
            },
            {
                path: '/account/recover',
                name: 'recover',
                title: '找回账号',
                component: () => import('@page/account/recover/index.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(() => {
    nProgress.start()
})

router.afterEach(() => {
    nProgress.done()
})

export default router
