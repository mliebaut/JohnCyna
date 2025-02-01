import { createRouter, createWebHistory } from 'vue-router'

// import AboutView from './AboutView.vue'
//import HomeView from '../components/HelloWorld.vue'
import HomeView from "../views/Home.vue";
import CategoryViewView from '../views/CategoryView.vue';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView 
    },
    {
        path: '/category/:title',
        name: 'Category',
        component: CategoryViewView
    },
    {
        path: '/about',
        name: 'About',
        component: () => import("../views/AboutView.vue") 
    },
    {
        path: '/contactOld',
        name: 'ContactOld',
        component: () => import("../views/ContactOldView.vue") 
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
        path:'/inscription',
        name:'Inscription',
        component: () => import("../views/InscriptionView.vue")
    },
    {
        path:'/connexion',
        name:'connexion',
        component: () => import("../views/ConnexionView.vue")
    },

    {
        path:'/produit',
        name:'produit',
        component: () => import("../views/ProduitView.vue")
    },
    {
        path: '/panier',
        name: 'Panier',
        component: () => import("../views/PanierView.vue") 
    },
    {
        path: '/debug',
        name: 'Debug',
        component: () => import("../views/DebugView.vue")
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