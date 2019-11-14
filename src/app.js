import Vue from 'vue';
import App from './App.vue';
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

new Vue({
	el: '#app',
	render: h => h(App)
})