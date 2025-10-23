import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Detalle from '../views/Detalle.vue';
import Login from '../views/Login.vue';
import SubastaPage from '../views/Subasta.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/detalle/:id', component: Detalle, props: true },
  { path: '/login', component: Login },
  { path: '/subasta', component: SubastaPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;



