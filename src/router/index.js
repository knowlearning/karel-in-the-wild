import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Player from '../views/Player.vue'
import KarelPlayer from '../views/KarelPlayer.vue'
import KarelBuilder from '../views/KarelBuilder.vue'
import WorldFromJson from '../views/WorldFromJson.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/karel-player',
    name: 'KarelPlayer',
    component: KarelPlayer
  },
  {
    path: '/karel-builder',
    name: 'KarelBuilder',
    component: KarelBuilder
  },
  {
    path: '/world-from-json',
    name: 'WorldFromJson',
    component: WorldFromJson
  },
  {
    path: '/:id',
    component: Player,
    props: route => ({ id: route.params.id })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
