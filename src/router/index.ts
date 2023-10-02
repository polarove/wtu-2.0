import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import entries from '@/composables/entries'

const routes = [
    {
        path: '/wtu',
        name: 'index',
        meta: { forehead: 'Warframe Team Up' },
        component: () => import('@page/team/index.vue'),
        redirect: `/wtu/team/${entries.origin}`,
        children: [
            {
                path: `/wtu/team/${entries.origin}`,
                name: entries.origin,
                meta: { forehead: '始源星系' },
                component: () => import('@page/team/origin/index.vue'),
            },
            {
                path: `/wtu/team/${entries.durivi}`,
                name: entries.durivi,
                meta: { forehead: '双衍王境' },
                component: () => import('@page/team/durivi/index.vue'),
            },
            {
                path: `/wtu/team/${entries.empyrean}`,
                name: entries.empyrean,
                meta: { forehead: '九重天' },
                component: () => import('@page/team/empyrean/index.vue'),
            },
            {
                path: '/wtu/team/activity',
                name: 'activity',
                meta: { forehead: '活动' },
                redirect: '/wtu/activity/event',
                children: [
                    {
                        path: '/wtu/team/activity/event',
                        name: 'event',
                        meta: { forehead: '事件' },
                        component: () =>
                            import('@page/team/activity/event/index.vue'),
                    },
                    {
                        path: '/wtu/team/activity/alarm',
                        name: 'alarm',
                        meta: { forehead: '警报' },
                        component: () =>
                            import('@page/team/activity/alarm/index.vue'),
                    },
                    {
                        path: '/wtu/team/activity/steelpath',
                        name: 'steelpath',
                        meta: { forehead: '钢铁之路侵袭' },
                        component: () =>
                            import('@page/team/activity/steelpath/index.vue'),
                    },
                    {
                        path: '/wtu/team/activity/invasion',
                        name: 'invasion',
                        meta: { forehead: '侵袭' },
                        component: () =>
                            import('@page/team/activity/invasion/index.vue'),
                    },
                    {
                        path: '/wtu/team/activity/syndicate',
                        name: 'syndicate',
                        meta: { forehead: '集团' },
                        component: () =>
                            import('@page/team/activity/syndicate/index.vue'),
                    },
                    {
                        path: '/wtu/team/activity/fissure',
                        name: 'fissure',
                        meta: { forehead: '虚空裂缝' },
                        component: () =>
                            import('@page/team/activity/fissure/index.vue'),
                    },
                    {
                        path: '/wtu/team/activity/sortie',
                        name: 'sortie',
                        meta: { forehead: '突击' },
                        component: () =>
                            import('@page/team/activity/sortie/index.vue'),
                    },
                    {
                        path: '/wtu/team/activity/hunt',
                        name: 'hunt',
                        meta: { forehead: '执行官猎杀' },
                        component: () =>
                            import('@page/team/activity/hunt/index.vue'),
                    },
                ],
            },
        ],
    },
    {
        path: '/wtu/account',
        name: 'account',
        meta: { forehead: '账号中心' },
        component: () => import('@page/account/index.vue'),
        redirect: '/wtu/account/login',
        children: [
            {
                path: '/wtu/account/login',
                name: 'login',
                meta: { forehead: 'Tenno登录' },
                component: () => import('@page/account/login/index.vue'),
            },
            {
                path: '/wtu/account/recover',
                name: 'recover',
                meta: { forehead: '找回账号' },
                component: () => import('@page/account/recover/index.vue'),
            },
            {
                path: '/wtu/account/verify',
                name: 'verify',
                meta: { forehead: '成分查询' },
                component: () => import('@page/account/verify/index.vue'),
            },
        ],
    },
    {
        path: '/wtu/profile',
        name: 'profile',
        meta: { forehead: '个人空间' },
        component: () => import('@page/profile/index.vue'),
        redirect: '/wtu/profile/team',
        children: [
            {
                path: '/wtu/profile/team',
                name: 'team',
                meta: { forehead: '组队' },
                component: () => import('@page/profile/team/index.vue'),
            },
            {
                path: '/wtu/profile/manage',
                name: 'manage',
                meta: { forehead: '账户' },
                component: () => import('@page/profile/account/index.vue'),
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
