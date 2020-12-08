import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  { path: '/', name: 'inicio', component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/encuestas', name:'encuestas', component: () => import('pages/encuestas/encuestas.vue')},
      { path: '/nuevaEncuesta', name:'nuevaEncuesta', component: () => import('pages/encuestas/encuesta.vue')},
      { path: '/encuestasAsignadas', name:'encuestasAsignadas', component: () => import('pages/encuestas/encuestasAsignadas.vue')},
      { path: '/encuestaResponder', name:'encuestaResponder', component: () => import('pages/encuestas/encuestaResponder.vue')},
      { path: '/general', name:'encuestaResponder', component: () => import('pages/telcel/general.vue')}
    ]
  },
  { path: '/login', name: 'login', component: () => import('pages/Login.vue')},
  { path: '/error', name: 'error', component: () => import('pages/Error404.vue')},
  { path: '*', component: () => import('pages/Error404.vue')}
];

export default routes;
