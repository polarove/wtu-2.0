import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import entries from '@/composables/entries'
import { AIsLogin } from '@api/account'
import { isNotBlank } from '@util/StrUtil'

const routes = [
    {
        path: '/',
        name: 'index',
        meta: { forehead: 'Warframe Team Up' },
        component: () => import('@page/team/index.vue'),
        redirect: `/${entries.origin}`,
        children: [
            {
                path: `/${entries.origin}`,
                name: entries.origin,
                meta: { forehead: '起源星系' },
                component: () => import('@page/team/origin/index.vue'),
            },
            {
                path: `/${entries.durivi}`,
                name: entries.durivi,
                meta: { forehead: '双衍王境' },
                component: () => import('@page/team/durivi/index.vue'),
            },
            {
                path: `/${entries.empyrean}`,
                name: entries.empyrean,
                meta: { forehead: '九重天' },
                component: () => import('@page/team/empyrean/index.vue'),
            },
        ],
    },
    {
        path: '/account',
        name: 'account',
        meta: { forehead: '账号中心' },
        component: () => import('@page/account/index.vue'),
        redirect: '/login',
        children: [
            {
                path: '/account/login',
                name: 'login',
                meta: { forehead: 'Tenno登录' },
                component: () => import('@page/account/login/index.vue'),
            },
            {
                path: '/account/recover',
                name: 'recover',
                meta: { forehead: '找回账号' },
                component: () => import('@page/account/recover/index.vue'),
            },
            {
                path: '/account/verify',
                name: 'verify',
                meta: { forehead: '成分查询' },
                component: () => import('@page/account/verify/index.vue'),
            },
        ],
    },
    {
        path: '/profile',
        name: 'profile',
        meta: { forehead: '个人空间' },
        component: () => import('@page/profile/index.vue'),
        redirect: '/profile/home',
        children: [
            {
                path: '/profile/home',
                name: 'home',
                meta: { forehead: '个人空间' },
                component: () => import('@page/profile/home/index.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// @ts-ignore
router.beforeEach((to, from, next) => {
    nProgress.start()
    document.title = to.meta.forehead
        ? (to.meta.forehead as any)
        : (to.meta.title as any)
    next()
})

router.afterEach(() => {
    nProgress.done()
})

export default router
