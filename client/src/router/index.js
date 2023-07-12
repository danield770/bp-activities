import { createRouter, createWebHistory } from 'vue-router';
import Activities from '../views/Activities.vue';
import ActivitiesZoom from '../views/ActivitiesZoom.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'activities',
      component: Activities,
    },
    {
      path: '/v2',
      name: 'activitiesV2',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ActivitiesV2.vue'),
    },
    {
      path: '/activities/v1/:key',
      name: 'zoom',
      component: Activities,
      //   props: true,
      //   components: {
      //     default: Activities,
      //     a: ActivitiesZoom,
      //   }, //,, //() => import('../views/ActivitiesZoom.vue'),
    },
    {
      path: '/activities/v2/:key',
      name: 'zoomV2',
      component: () => import('../views/ActivitiesZoomV2.vue'),
    },
  ],
});

export default router;
