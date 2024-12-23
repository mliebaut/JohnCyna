<template>
    <div class="mt-5">
      <!-- Carousel -->
      <div id="carouselExampleDark" class="carousel carousel-dark slide pt-5">
        <div class="carousel-indicators ">
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner container h-100">
        <div class="carousel-item row active h-100">
          <div class="banner h-100">
            <div class="container h-100">
              <div class="row h-100">
                <div class="col-sm-5 text-start">
                  <h1>Cyna protège votre entreprise contre les cyberattaques</h1>
                  <p>Pure player en cybersécurité pour les PME & ETI. </p>
                  <button class="btn btn-primary fs-3 px-4">Learn More</button>
                </div>
                <div class="col-sm-7">
                  <img class="img-fluid" src="https://via.placeholder.com/800x400?text=Product%201" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item row h-100">
          <div class="banner h-100">
            <div class="container h-100">
              <div class="row h-100">
                <div class="col-sm-5 text-start">
                  <h1>Cyna protège votre entreprise contre les cyberattaques</h1>
                  <p>Pure player en cybersécurité pour les PME & ETI. </p>
                  <button class="btn btn-primary fs-3 px-4">Learn More</button>
                </div>
                <div class="col-sm-7">
                  <img class="img-fluid" src="https://via.placeholder.com/800x400?text=Product%202" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item row h-100">
          <div class="banner h-100">
            <div class="container h-100">
              <div class="row h-100">
                <div class="col-sm-5 text-start">
                  <h1>Cyna protège votre entreprise contre les cyberattaques</h1>
                  <p>Pure player en cybersécurité pour les PME & ETI. </p>
                  <button class="btn btn-primary fs-3 px-4">Learn More</button>
                </div>
                <div class="col-sm-7">
                  <img class="img-fluid" src="https://via.placeholder.com/800x400?text=Product%203" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <button class="carousel-control-prev w-auto" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Précédant</span>
        </button>
        <button class="carousel-control-next w-auto" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Suivant</span>
        </button>
      </div>

      <!-- Banderole -->
      <div class="banderole">
        <h4 class="container">Votre sécurité est notre métier,
          construisez vos projets en toute sérénité.</h4>
      </div>
  
      <!-- Categories -->
      <h2 class="mb-4">Catégories</h2>
      <div class="category row justify-content-md-center container m-auto row-gap-5">
        <div class="col-xs-1 col-md-4" v-for="category in categories" :key="category.title">
          <div class="card text-center m-auto" :style="{backgroundImage:`url(${category.image})`}">
            <div class="card-body d-flex flex-column justify-content-center align-items-center ">
              <h3 class="card-title">{{ category.title }}</h3>
                <p class="card-text fs-5 fw-medium">{{ category.description }}</p>
                <a href="#" class="btn btn-primary">Voir catégorie</a>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Meilleurs Produits -->
      <h2 class="mt-5 mb-4">Les Top Produits du moment</h2>
      <div class="row container justify-content-md-center row-gap-5 m-auto">
        <div class="col-xs-1 col-md-4" v-for="(product, rank) in topProducts" :key="rank">
          <svg v-if="product.rank === 1" width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#FFD43B" d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0L133.9 0c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0L487.4 0C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"/></svg>
          <svg v-else-if="product.rank === 2" width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#dedede" d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0L133.9 0c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0L487.4 0C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"/></svg>
          <svg v-else-if="product.rank === 3" width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#a65c07" d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0L133.9 0c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0L487.4 0C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"/></svg>
          <div class="card text-center m-auto mt-3">
            <img :src="(`${product.image}`)" height="300" class="card-img-top" alt="Product {{ index + 1 }}">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">Prix: {{ product.price }} €</p>
              <a href="#" class="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        topProducts: [
          { name: 'Produit 1', price: 29.99, rank: 1, image: '/product1.jpg'},
          { name: 'Produit 2', price: 49.99, rank: 2, image: '/product2.jpg'},
          { name: 'Produit 3', price: 79.99, rank: 3, image: '/product3.jpg'},
        ],
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
  
  <style scoped>

    #carouselExampleDark{
      height: 48em;
      background-image: url(/background-hero.png);
      background-size: cover;
      background-repeat: no-repeat;
    }

    .row {
      align-items: center;
    }

    .carousel-item h1{
      font-size: 42px;
    }

    .carousel-item p{
      font-size: 30px;
    }

    .category .card{
      height: 400px;
      color: white;
      text-shadow: #000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px;
    }

    .category .card-content {
      transition-duration: 0.5s;
      transition-timing-function: ease-in-out;  
    }
        
    .category .card-content:hover {
      display: block;
    }

    .category .card p{
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      max-height: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card{
      max-width: 400px;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .btn-primary{
      --bs-btn-color: #fff;
      --bs-btn-bg: #7200ff;
      --bs-btn-border-color: #7200ff;
      --bs-btn-hover-color: #fff;
      --bs-btn-hover-bg: #7200ff;
      --bs-btn-hover-border-color: #4d00aa;
      --bs-btn-focus-shadow-rgb: 49, 132, 253;
      --bs-btn-active-color: #fff;
      --bs-btn-active-bg: #4d00aa;
      --bs-btn-active-border-color: #4d00aa;
      --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      --bs-btn-disabled-color: #fff;
      --bs-btn-disabled-bg: #7c10ff;
      --bs-btn-disabled-border-color: #7708ff;
    }
    .banderole{
      height: 20em;
      display: flex;
      justify-content: center; 
      align-items: center;
    }

    .banderole h4{
      font-size: 30px;
      justify-content: center; 
      align-items: center;
      display: flex;
    }

    @media (min-width: 768px) {
      .carousel-item h1{
        font-size: 60px;
      }
      .banderole{
      height: 30em;
      display: flex;
      justify-content: center; 
      align-items: center;
      }
      .banderole h4{
        font-size: 50px;
      }
    }
  </style>