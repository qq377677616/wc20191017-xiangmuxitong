import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/main.css';
import '@/assets/font/iconfont.css';
Vue.use(Vant);
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-beauty/package/style/vue-beauty.min.css'
import 'lib-flexible/flexible.js'
import axios from 'axios'
import FastClick from 'fastclick'

FastClick.attach(document.body);
axios.defaults.timeout = 5000;
axios.defaults.baseURL ='http://game.flyh5.cn/game/wc_project/public/api/Wcpro';
Vue.prototype.$axios = axios
Vue.use(ElementUI);
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
import vueBeauty from 'vue-beauty'
Vue.use(vueBeauty)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

