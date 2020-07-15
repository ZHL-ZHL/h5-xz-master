// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import 'lib-flexible/flexible.js';

import './assets/font/iconfont.css'
import './assets/font2/iconfont.css'
import './assets/css/style.css'
Vue.config.productionTip = false

import Vant from 'vant';
import 'vant/lib/index.css';
import {currency} from './tools'
Vue.filter('cy',currency)
Vue.use(Vant);

import http from './http'
Vue.prototype.$http = http

import login from './mixin/login'
Vue.mixin(login)
Vue.filter('dd', function (tplData) { 
  let dateMM = tplData ? new Date(tplData) : new Date();
  return `${dateMM.getFullYear()}/${dateMM.getMonth() + 1}/${dateMM.getDate()}`;
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
