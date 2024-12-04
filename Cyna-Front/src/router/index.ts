import { createMemoryHistory, createRouter } from 'vue-router'

// import AboutView from './AboutView.vue'
import HomeView from '../components/HelloWorld.vue'

const routes = [
    { path: '/', component: HomeView },
    {
        path: '/about',
        // name: 'About',
        component: () => import("../views/AboutView.vue") }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router