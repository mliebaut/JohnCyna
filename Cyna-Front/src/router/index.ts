import { createRouter, createWebHistory } from 'vue-router'

// import AboutView from './AboutView.vue'
//import HomeView from '../components/HelloWorld.vue'
import HomeView from "../views/Home.vue";
import CategoryViewView from '../views/CategoryView.vue';
import Checkout from "@/components/Checkout.vue";
import Success from "@/components/Checkout/Success.vue";
import Cancel from "@/components/Checkout/Cancel.vue";
import AjoutPanierView from '../views/AjoutPanierView.vue';

import HomeView1 from '../views/HomeView1.vue';
import Sidebar from '../components/Sidebar.vue';
import DashboardLayout from '../views/DashboardLayout.vue';
import PersonalInfo from '../components/account/PersonalInfo.vue';
import Addresses from '../components/account/Addresses.vue';
import PaymentMethods from '../components/account/PaymentMethods.vue';
import Subscriptions from '../components/account/Subscriptions.vue';
import Security from '../components/account/Security.vue';
import ProductCatalog from '../views/ProductCatalog.vue';

const routes = [
  {
    path: '/',
    redirect: '/catalogue'
  },
  {
    path: '/catalogue',
    name: 'catalogue',
    component: ProductCatalog
  },
    {
        path: '/ajout-panier',
        name: 'ajout-panier',
        component: AjoutPanierView
    },

    {
        path: '/Sidebar',
        name: 'Sidebar',
        component: Sidebar
    },
    
      {
        path: '/account',
        component: DashboardLayout,
        children: [
          {
            path: 'personal-info',
            name: 'PersonalInfo',
            component: PersonalInfo,
            meta: {
              title: 'Informations personnelles'
            }
          },
          {
            path: 'subscriptions',
            name: 'Subscriptions',
            component: Subscriptions,
            meta: {
              title: 'Abonnements'
            }
          },
          {
            path: 'addresses',
            name: 'Addresses',
            component: Addresses,
            meta: {
              title: 'Adresses'
            }
          },
          {
            path: 'payment-methods',
            name: 'PaymentMethods',
            component: PaymentMethods,
            meta: {
              title: 'Méthodes de paiement'
            }
          },
          {
            path: 'security',
            name: 'Security',
            component: Security,
            meta: {
              title: 'Sécurité'
            }
          }
        ]
      },
      {
        path: '/',
        name: 'Home',
        component: HomeView1
      },
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
        path:'/inscription',
        name:'Inscription',
        component: () => import("../views/InscriptionView.vue")
    },
    {
        path:'/connexion',
        name:'Connexion',
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
    },
    {
        path: "/historique",
        name: "Historique",
        component: () => import("../views/OrderHistory.vue") 
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
      },
})

export default router