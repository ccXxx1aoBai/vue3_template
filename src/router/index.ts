import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import JSCookie from 'js-cookie';
import Layout from '@/layout/index.vue';
import { permissionsStore, userStore } from '@/store';
import { formatMenu, formatRoute } from '@/utils';

NProgress.configure({ showSpinner: false });

const routes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/pages/login/index.vue'),
	},
	{
		path: '/',
		name: 'Layout',
		component: Layout,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

const whitePerm = ['/login'];

router.beforeEach(async (to, from, next) => {
	const user = userStore();
	const permissions = permissionsStore();
	document.title = to.meta?.title || import.meta.env.VITE_APPLICATION_NAME;
	if (to.name == 'login' || whitePerm.includes(to.path)) {
		next();
	} else {
		if ((JSCookie.get('token') ?? '') == '') {
			next('/login');
		} else {
			if (permissions.routes.length == 0) {
				const routeList = await user.getUserInfo();
				permissions.setRoutes(routeList);
				permissions.setMenu(routeList);
				const routeArray = formatRoute(formatMenu(routeList));
				routeArray.forEach((route: RouteRecordRaw) => {
					router.addRoute(route);
				});
				next({ ...to, replace: true });
			} else {
				next();
			}
		}
	}
	NProgress.start();
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
