import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
}
Router.prototype.replace = function replace(location) {
	return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)


/**
 * 重写路由的push方法
 */
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }

export default new Router({
	mode: "hash",
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'main',
			meta: {
				role: '首页'
			},
			component: () => import('@/views/index.vue'),
			redirect: () => {
				var role = localStorage.getItem('role')
				if (uncompileStr(role) == '行政') {
					return {
						name: 'administration',
						query: null
					}
				} else if (uncompileStr(role) == '商务') {
					return {
						name: 'commercial',
						query: null
					}
				} else if (uncompileStr(role) == '执行') {
					return {
						name: 'execute',
						query: null
					}
				} else {
					return {
						name: 'login',
						query: null
					}
				}
			},
			children: [{
					path: 'administration',
					name: 'administration',
					meta: {
						role: '行政'
					},
					component: () => import('@/views/administration.vue')
				},
				{
					path: 'administration/office',
					name: 'office',
					component: () => import('@/views/office.vue')
				},
				{
					path: 'commercial',
					name: 'commercial',
					meta: {
						role: '商务'
					},
					component: () => import('@/views/commercial.vue'),
				},
				{
					path: 'execute',
					name: 'execute',
					meta: {
						role: '执行'
					},
					component: () => import('@/views/execute.vue'),
				},
				{
					path: 'scheduling',
					name: 'scheduling',
					component: () => import('@/views/scheduling.vue'),
				},
				{
					path: 'outschedule',
					name: 'outschedule',
					component: () => import('@/views/outSchedule.vue'),
				},
				{
					path: 'member_table',
					name: 'member_table',
					component: () => import('@/views/member_table.vue'),
				},
				{
					path: 'member',
					name: 'member',
					component: () => import('@/views/member.vue'),
				},
				{
					path: 'analyse',
					name: 'analyse',
					component: () => import('@/views/analyse.vue'),
				},
				{
					path: 'case',
					name: 'case',
					component: () => import('@/views/case.vue'),
				}
			],

		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/login.vue'),
		},
		{
			path: 'forget',
			name: 'forget',
			component: () => import('@/views/forget.vue'),
		}
	]
})



function uncompileStr(code) {
	code = unescape(code);
	var c = String.fromCharCode(code.charCodeAt(0) - code.length);
	for (var i = 1; i < code.length; i++) {
		c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
	}
	return c;
}
