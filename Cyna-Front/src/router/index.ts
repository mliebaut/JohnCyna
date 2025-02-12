import { createRouter, createWebHistory } from 'vue-router'

// import AboutView from './AboutView.vue'
//import HomeView from '../components/HelloWorld.vue'
import HomeView from "../views/Home.vue";
import CategoryViewView from '../views/CategoryView.vue';
import Checkout from "@/components/Checkout.vue";
import Success from "@/components/Checkout/Success.vue";
import Cancel from "@/components/Checkout/Cancel.vue";


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
        path: '/contact',
        name: 'Contact',
        component: () => import("../views/ContactView.vue")
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
    },
    {
        path: '/cgu',
        name: 'CGU',
        component: () => import("../views/CguView.vue")
    },
    {   path: "/checkout",
        name: 'checkout', 
        component: () => import("../views/Checkout.vue") 
    },
    {   path: "/success",
        name: 'success', 
        component: () => import("../views/Checkout/Success.vue") 
    },
    {   path: "/cancel", 
        name: 'cancel',
        component: () => import("../views/Checkout/Cancel.vue") 
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