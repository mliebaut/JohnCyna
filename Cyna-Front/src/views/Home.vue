<template>
    <div class="mt-5">
      <!-- Carousel -->
      <div id="carouselExampleDark" class="carousel carousel-dark slide pt-5">
        <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner h-100">
        <div class="carousel-item row active h-100">
          <div class="banner h-100">
            <div class="container h-100">
              <div class="row h-100">
                <div class="col-sm-5 text-start">
                  <h1>Cyna protège votre entreprise contre les cyberattaques</h1>
                  <p>Pure player en cybersécurité pour les PME & ETI. </p>
                  <button class="btn btn-primary">Learn More</button>
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
                  <button class="btn btn-primary">Learn More</button>
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
                  <button class="btn btn-primary">Learn More</button>
                </div>
                <div class="col-sm-7">
                  <img class="img-fluid" src="https://via.placeholder.com/800x400?text=Product%203" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div class="banderole">
        <h4 class="container">Votre sécurité est notre métier,
          construisez vos projets en toute sérénité.</h4>
      </div>
  
      <!-- Categories -->
      <h2 class="mb-4">Categories</h2>
      <div class="row container gap-5 m-auto">
        <div class="col">
          <div class="card text-center">
            <img src="https://via.placeholder.com/100x100?text=Category%201" class="card-img-top" alt="Category 1">
            <div class="card-body">
              <h5 class="card-title">Categorie 1</h5>
              <p class="card-text">Description de la catégorie</p>
              <a href="#" class="btn btn-primary">Voir catégorie</a>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card text-center">
            <img src="https://via.placeholder.com/100x100?text=Category%202" class="card-img-top" alt="Category 2">
            <div class="card-body">
              <h5 class="card-title">Categorie 2</h5>
              <p class="card-text">Description de la catégorie</p>
              <a href="#" class="btn btn-primary">Voir catégorie</a>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card text-center">
            <img src="https://via.placeholder.com/100x100?text=Category%3F" class="card-img-top" alt="Category 3">
            <div class="card-body">
              <h5 class="card-title">Categorie 3</h5>
              <p class="card-text">Description de la catégorie</p>
              <a href="#" class="btn btn-primary">Voir catégorie</a>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Top Products -->
      <h2 class="mt-5 mb-4">Top Products</h2>
      <div class="row container gap-5 m-auto">
        <div class="col" v-for="(product, index) in topProducts" :key="index">
          <div class="card text-center">
            <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="Product {{ index + 1 }}">
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
          { name: 'Product 1', price: 29.99 },
          { name: 'Product 2', price: 49.99 },
          { name: 'Product 3', price: 79.99 },
        ],
      };
    },
  };
  </script>
  
  <style scoped>

    #carouselExampleDark{
      height: 48em;
      background-image: url(../../public/background-hero.png);
      background-size: cover;
      background-repeat: no-repeat;
    }

    .row {
      align-items: center;
    }

    .carousel-item h1{
      font-size: 60px;
    }

    .carousel-item p{
      font-size: 30px;
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
      height: 30em;
      display: flex;
      justify-content: center; 
      align-items: center;
    }

    .banderole h4{
      font-size: 50px;
      justify-content: center; 
      align-items: center;
      display: flex;
    }
  </style>