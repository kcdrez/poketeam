import Vue from 'vue';
// import Vuex from 'vuex';
// import VueRouter from 'vue-router';
// import App from './App.vue';
import './styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import store from './vuex-state/store';
import router from './router/router';
import navbar from './components/navbar.vue';

Vue.component('navbar', navbar);

// Vue.use(Vuex);
// Vue.use(VueRouter);

const app = new Vue({
	el: '#app',
  template: `<div>
    <router-view></router-view>
  </div>`,
  store,
  router,
  created() {
    store.dispatch('initialize');
  }
})