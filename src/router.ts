import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from './views/HomeView.vue'
import Clue1 from './views/FirstClue.vue'
import Clue2 from './views/SecondClue.vue'
import Clue3 from './views/ThirdClue.vue'
import Clue4 from './views/FourthClue.vue'
import Final from './views/Final.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/clue1', name: 'Clue1', component: Clue1 },
  { path: '/clue2', name: 'Clue2', component: Clue2 },
  { path: '/clue3', name: 'Clue3', component: Clue3 },
  { path: '/clue4', name: 'Clue4', component: Clue4 },
  { path: '/final', name: 'Final', component: Final }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
