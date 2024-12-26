import { createRouter, createWebHistory } from 'vue-router'

// import AboutView from './AboutView.vue'
//import HomeView from '../components/HelloWorld.vue'
import HomeView from "../views/Home.vue";
import CategoryView from '../views/Category.vue';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView 
    },
    {
        path: '/category/:title',
        name: 'Category',
        component: CategoryView
    },
    {
        path: '/about',
        name: 'About',
        component: () => import("../views/AboutView.vue") 
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
      },
})

export default router