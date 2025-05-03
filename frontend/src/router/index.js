import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/auth/LoginView.vue';
import ProfileView from '../views/auth/ProfileView.vue';
import StudentListView from '../views/students/StudentListView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/admin/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/students',
      name: 'students',
      component: StudentListView,
      meta: { requiresAuth: true }
    }
  ]
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user');
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !user) {
    next('/login');
  } else if (to.path === '/login' && user) {
    next('/admin/profile');
  } else {
    next();
  }
});

export default router;