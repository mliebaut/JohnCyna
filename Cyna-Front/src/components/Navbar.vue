<template>
<nav class="navbar bg-body-tertiary fixed-top">
  <div class="container">
    <router-link :to="{ name: 'Home'}">
      <img src="/site-logo.png" width="160" alt="Cyna">
    </router-link>
    <div>
      <a class="ms-2" aria-current="page" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" viewBox="0 0 576 512"><path fill="#7200ff" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg></a>
      <a class="ms-2" aria-current="page" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" viewBox="0 0 512 512"><path fill="#7200ff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></a>
      <button class="navbar-toggler ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <router-link :to="{ name: 'Home'}">
          <img src="/site-logo.png" width="140" alt="Cyna">
        </router-link>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav flex-grow-1 pe-3 fs-5">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home'}">Accueil</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Catégories
            </a>
            <ul class="dropdown-menu">
              <li v-for="category in categories" :key="category.title"><router-link class="dropdown-item text-center":to="{ path: `/category/${category.title}`, query: { description: `${category.description}`, image: `${category.image}` }}">{{ category.title }}</router-link></li>
            </ul>
          </li>
          <li class="nav-item">
            <button class="btn btn-primary m-2 w-75 fs-5">Se connecter</button>
          </li>
          <li class="nav-item">
            <button class="btn btn-primary m-2 w-75 fs-5">Créer un compte</button>
          </li>
        </ul>

        <div class="navbar-nav">

        <div class="navbar-nav d-flex align-items-center justify-content-center link-body-emphasis text-decoration-none">
            <ul class="nav-item list-unstyled d-flex">
              <li class="ms-3"><a class="text-body-secondary" href="#"><img src="/facebook.svg" alt="facebook"/></a></li>
        <li class="ms-3"><a class="text-body-secondary" href="#"><img src="/x.svg" alt="x"/></a></li>
        <li class="ms-3"><a class="text-body-secondary" href="#"><img src="/instagram.svg" alt="instagram"/></a></li>
          </ul>
        </div>

        <ul class="navbar-nav justify-content-end">
          <li class="nav-item"><a href="#" class="nav-link text-body-secondary">Mentions légales</a></li>
          <li class="nav-item"><a href="#" class="nav-link text-body-secondary">CGU</a></li>
          <li class="nav-item"><a href="#" class="nav-link text-body-secondary">Contact</a></li>
          <li class="nav-item"><p class="text-body-secondary mt-2">&copy; 2024 Company, Inc</p></li>
        </ul>
        </div>
      </div>
    </div>
  </div>
</nav>
  </template>
  
  <script>
  export default {
    name: 'Home',
    data() {
    return {
      categories: [
        { 
          title: 'Prévention', 
          description: "Mettre en place des mesures et des bonnes pratiques pour éviter les cyberattaques. Cela inclut la formation, l'évaluation des risques et la mise en place de politiques de sécurité adaptées pour anticiper les menaces.",
          image: '/Categorie1.jpg' 
        },
        { 
          title: 'Protection', 
          description: "Sécuriser vos systèmes et données contre les cyberattaques grâce à des solutions avancées, comme les pare-feu, les antivirus, et la gestion des accès, pour garantir une défense solide et continue.",
          image: '/Categorie2.jpg'
         },
        { 
          title: 'Réponse', 
          description: "Réagir rapidement et efficacement en cas d'incident de cybersécurité, avec des processus de gestion de crise, de récupération des données et de coordination avec les autorités pour minimiser l'impact des attaques.",
          image: '/Categorie3.jpg'
        },
        { 
          title: 'Anticipation', 
          description: "Surveiller, analyser et prédire les évolutions des menaces pour ajuster en permanence vos défenses. Grâce à une veille proactive et des technologies avancées, nous identifions les risques potentiels avant qu'ils ne deviennent des menaces réelles.",
          image: '/Categorie2.jpg' 
        },
      ],
    };
  },
  };
  </script>
  
  <style>
    .offcanvas-body{
      display:contents;
    }
    .dropdown-menu {
    --bs-dropdown-color: none !important;
    --bs-dropdown-bg: none !important;
    --bs-dropdown-border-color: none !important;
    --bs-dropdown-link-color: none !important;
    --bs-dropdown-link-hover-color: none !important;
    --bs-dropdown-link-hover-bg: none !important;
    --bs-dropdown-link-active-color: #000 !important;
    --bs-dropdown-link-active-bg: none !important;
    color: none !important;
    background-color: none !important;
    }
    .btn-primary{
      --bs-btn-color: #fff !important;
      --bs-btn-bg: #7200ff !important;
      --bs-btn-border-color: #7200ff !important;
      --bs-btn-hov7200ffer-color: #fff !important;
      --bs-btn-hover-bg: #7200ff !important;
      --bs-btn-hover-border-color: #4d00aa !important;
      --bs-btn-focus-shadow-rgb: 49, 132, 253 !important;
      --bs-btn-active-color: #fff !important;
      --bs-btn-active-bg: #4d00aa !important;
      --bs-btn-active-border-color: #4d00aa !important;
      --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125) !important;
      --bs-btn-disabled-color: #fff !important;
      --bs-btn-disabled-bg: #7c10ff !important;
      --bs-btn-disabled-border-color: #7708ff !important;
    }
  </style>
  