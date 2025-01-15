import { createRouter, createWebHistory } from 'vue-router'

// import AboutView from './AboutView.vue'
//import HomeView from '../components/HelloWorld.vue'
import HomeView from '../views/Home.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'About',
        component: () => import("../views/AboutView.vue")
    },

    {
        path: '/mentions-legales',
        name: 'Mentions Legales',
        component: () => import("../views/MentionsLegalesView.vue")
    },

    {
        path:'/contact',
        name:'Contact',
        component: () => import("../views/ContactView.vue")

    },

    {
        path:'/Inscription',
        name:'Inscription',
        component: () => import("../views/Inscription.vue")

    },

    {
        path:'/connexion',
        name:'connexion',
        component: () => import("../views/connexion.vue")

    }


]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router