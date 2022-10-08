import { createRouter, createWebHistory } from 'vue-router';

import { hasPermissionTo } from '../plugins/permissions.js';
import { useUserStore } from '../stores/user.js';

import HomeView from '../views/HomeView.vue';
import TestsView from '../views/TestsView.vue';
import TestView from '../views/TestView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tests',
      name: 'tests',
      component: TestsView,
      meta: {
        permissions: 'tests.list',
      },
    },
    {
      path: '/tests/new',
      name: 'newTest',
      // Route level code-splitting. This generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NewTestView.vue'),
      meta: {
        permissions: 'tests.create',
      },
    },
    {
      path: '/tests/:testId',
      name: 'test',
      component: TestView,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const isLoginPage = to.name === 'login';

  if (isLoginPage) {
    next();
  } else {
    const userStore = useUserStore();
    const isLoggedIn =
      userStore.isLoggedIn || (await userStore.refreshSession());

    if (!isLoggedIn) {
      // Save user landing page to redirect them after login
      sessionStorage.setItem('landing', to.fullPath);
      next('/login');
    } else {
      if (to.meta.permissions && !hasPermissionTo(to.meta.permissions)) {
        next('/');
      } else {
        // TODO Unwanted redirects ?
        const landingPath = sessionStorage.getItem('landing');
        sessionStorage.removeItem('landing');

        next(landingPath);
      }
    }
  }
});

export default router;
