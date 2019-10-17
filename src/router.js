import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/index.vue'),
      children : [
        {
          path: '/administration',
          name: 'administration',
          component: () => import('@/views/administration.vue')
        },
        {
          path: '/administration/office',
          name: 'office',
          component: () => import('@/views/office.vue'),
        },
        {
          path: '/commercial',
          name: 'commercial',
          component: () => import('@/views/commercial.vue'),
        },
        {
          path: '/execute',
          name: 'execute',
          component: () => import('@/views/execute.vue'),
        },
        {
          path: '/scheduling',
          name: 'scheduling',
          component: () => import('@/views/scheduling.vue'),
        },
        {
          path: '/administration/outschedule',
          name: 'outschedule',
          component: () => import('@/views/outSchedule.vue'),
        },
		{
		  path: '/administration/member_table',
		  name: 'outschedule',
		  component: () => import('@/views/member_table.vue'),
		}
      ],
        redirect : ()=>{
          var role = localStorage.getItem('role')
          if(uncompileStr(role) == '行政') {
            return { name: 'administration', query: null }
          }else if(uncompileStr(role) == '商务') {
            return { name: 'commercial', query: null }
          }else if(uncompileStr(role) == '执行') {
            return { name: 'execute', query: null }
          }else {
            return { name: 'login', query: null }
          }
        }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue'),
    }
  ]
})

function uncompileStr(code){
  code = unescape(code);
  var c=String.fromCharCode(code.charCodeAt(0)-code.length);
  for(var i=1;i<code.length;i++){
    c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
  }
  return c;
}



