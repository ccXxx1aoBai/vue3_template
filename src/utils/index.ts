import { RouteRecordRaw } from 'vue-router';

const module = import.meta.glob(`@/**/*.vue`);
export const replaceFirstSlash = (str: string): string => {
	if (str.startsWith('/')) {
		return str.replace(/^\//, '');
	}
	return str;
};

export const formatRoute = (data: Array<Menu>): Array<RouteRecordRaw> => {
	const routes: Array<RouteRecordRaw> = [];
	data.forEach(
		({ id, type, path, component, name, isLink, hidden, icon, enabled, parentId, params, redirect, children }) => {
			const route = {
				path: parentId == 0 ? `/${replaceFirstSlash(path)}` : replaceFirstSlash(path),
				name: replaceFirstSlash(path),
				component: type == 0 ? () => import('@/layout/index.vue') : module[`/src/pages/${component}.vue`],
				children: [],
				redirect,
				meta: {
					id,
					title: name,
					icon,
					isLink,
					params,
					hidden,
					enabled,
					parentId,
				},
			} as RouteRecordRaw;
			if (children && children.length > 0) {
				route.children = formatRoute(children);
			}
			routes.push(route);
		}
	);
	return routes;
};

export const formatMenu = (data: Array<Menu>): Array<Menu> => {
	const menus = data.map(menu => {
		menu.children = data.filter(r => r.parentId == menu.id);
		return menu;
	});
	return menus.filter(r => r.parentId == 0) as Array<Menu>;
};