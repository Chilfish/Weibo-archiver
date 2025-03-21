import type { RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent, h } from 'vue'
import {
  createRouter,
  createWebHistory,

} from 'vue-router'

function useDefaultRoute(name = '') {
  const page = name || 'index'
  return {
    path: `/${name}`,
    name: page,
    component: h(defineAsyncComponent(() => import(`../pages/${page}.vue`))),
  } as RouteRecordRaw
}

const routes: RouteRecordRaw[] = [
  '',
  'post',
  'album',
  'example',
  'search',
].map(useDefaultRoute)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
