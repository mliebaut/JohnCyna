import { createRouter, createWebHistory } from 'vue-router'

// import AboutView from './AboutView.vue'
import HomeView from '../components/HelloWorld.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView },
    {
        path: '/about',
        name: 'About',
        component: () => import("../views/AboutView.vue") }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router