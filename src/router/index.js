import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'signin',
    component: () => import('@/views/SignIn.vue'),
  },
  {
    path: '/camera',
    name: 'camera',
    meta: { requiresAuth: true },
    component: () => import('@/views/Camera.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes,
});

export default router;
