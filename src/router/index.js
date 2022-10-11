import { createRouter, createWebHistory } from 'vue-router';

import { hasPermissionTo } from '../plugins/permissions.js';
import { useUserStore } from '../stores/user.js';

import HomeView from '../views/HomeView.vue';
import TestsView from '../views/TestsView.vue';
import TestView from '../views/TestView.vue';
import GroupsView from '../views/GroupsView.vue';
import NewGroupView from '../views/NewGroupView.vue';
import GroupView from '../views/groups/GroupView.vue';
import GroupDataView from '../views/groups/GroupDataView.vue';
import StudentsView from '../views/groups/students/StudentsView.vue';
import StudentsListView from '../views/groups/students/StudentsListView.vue';
import StudentView from '../views/groups/students/StudentView.vue';
import NewStudentView from '../views/groups/students/NewStudentView.vue';
import AssignmentsView from '../views/groups/assignments/AssignmentsView.vue';
import AssignmentsListView from '../views/groups/assignments/AssignmentsListView.vue';
import AssignmentView from '../views/groups/assignments/AssignmentView.vue';
import AssignmentDataView from '../views/groups/assignments/AssignmentDataView.vue';
import NewAssignmentView from '../views/groups/assignments/NewAssignmentView.vue';
import AssignmentTestView from '../views/groups/assignments/AssignmentTestView.vue';
import ResultsView from '../views/ResultsView.vue';
import ResultView from '../views/ResultView.vue';
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
      path: '/groups',
      name: 'groups',
      component: GroupsView,
      meta: {
        permissions: 'groups.list',
      },
    },
    {
      path: '/groups/new',
      name: 'newGroup',
      component: NewGroupView,
      meta: {
        permissions: 'groups.create',
      },
    },
    {
      path: '/groups/:groupId',
      component: GroupView,
      props: true,
      children: [
        {
          path: '',
          name: 'group',
          component: GroupDataView,
          props: true,
          meta: {
            tabName: 'group',
          },
        },
        {
          path: 'students',
          component: StudentsView,
          meta: {
            tabName: 'students',
          },
          children: [
            {
              path: '',
              name: 'students',
              component: StudentsListView,
              props: true,
              meta: {
                permissions: 'students.list',
              },
            },
            {
              path: 'new',
              name: 'newStudent',
              component: NewStudentView,
              props: true,
              meta: {
                permissions: 'students.create',
              },
            },
            {
              path: ':userId',
              name: 'student',
              component: StudentView,
              props: true,
              meta: {
                /* TODO */
                permissions: 'students.create',
              },
            },
          ],
        },
        {
          path: 'assignments',
          component: AssignmentsView,
          meta: {
            tabName: 'assignments',
          },
          children: [
            {
              path: '',
              name: 'assignments',
              component: AssignmentsListView,
              props: true,
              meta: {
                permissions: 'assignments.list',
              },
            },
            {
              path: 'new',
              name: 'newAssignment',
              component: NewAssignmentView,
              props: true,
              meta: {
                permissions: 'assignments.create',
              },
            },
            {
              path: ':assignmentId',
              component: AssignmentView,
              props: true,
              children: [
                {
                  path: '',
                  name: 'assignment',
                  component: AssignmentDataView,
                  props: true,
                },
                {
                  path: 'test',
                  name: 'assignmentTest',
                  component: AssignmentTestView,
                  props: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView,
      meta: {
        permissions: 'results.list',
      },
    },
    {
      path: '/results/:resultId',
      name: 'result',
      component: ResultView,
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
