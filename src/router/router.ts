import { createRouter, createWebHistory } from 'vue-router';
import Goals from '../pages/Goals.vue';
import Projects from '../pages/Projects.vue';

const routes = [
  {
    path: '/',
    component: Projects,
  },
  {
    path: '/goals',
    component: Goals,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory('/'),
});

export default router;
