import Vue from 'vue';

import './plugins/vue-fontawesome';
import './plugins/vue-notification';
import './plugins/vue-web-cam';
import './plugins/vue-loading-overlay';
import './plugins/vue-axios';

import 'bootstrap/dist/js/bootstrap.bundle';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
