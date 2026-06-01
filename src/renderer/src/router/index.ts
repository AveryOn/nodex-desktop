import AuthPage from '~/renderer/src/pages/auth/AuthPage.vue'
import DairyPage from '~/renderer/src/pages/domain/DairyPage.vue'
import DashboardPage from '~/renderer/src/pages/domain/DashboardPage.vue'
import IndexPage from '~/renderer/src/pages/domain/IndexPage.vue'
import ProfilePage from '~/renderer/src/pages/domain/ProfilePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

export enum RoutePath {
  auth = '/auth',
  index = '/',
  dairy = '/dairy',
  profile = '/profile',
  dashboard = '/dashboard'
}

export enum RouteName {
  auth = 'auth',
  index = 'index',
  dairy = 'dairy',
  dashboard = 'dashboard',
  profile = 'profile'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: RoutePath.auth,
      name: RouteName.auth,
      component: AuthPage
    },
    {
      path: RoutePath.index,
      name: RouteName.index,
      component: IndexPage,
      redirect: { name: RouteName.dairy },
      children: [
        {
          path: RoutePath.dairy,
          name: RouteName.dairy,
          component: DairyPage
        },
        {
          path: RoutePath.profile,
          name: RouteName.profile,
          component: ProfilePage
        },
        {
          path: RoutePath.dashboard,
          name: RouteName.dashboard,
          component: DashboardPage
        }
      ]
    }
  ]
})

export default router
