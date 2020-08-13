import Vue from 'vue';
import autocomplete from '@trevoreyre/autocomplete-vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './styles/main.scss';
import '@trevoreyre/autocomplete-vue/dist/style.css';
import store from './vuex-state/store';
import router from './router/router';
import navbar from './components/navbar.vue';

Vue.component('navbar', navbar);
Vue.use(autocomplete);

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