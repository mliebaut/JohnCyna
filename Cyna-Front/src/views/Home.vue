<template>
    <div class="container mt-5">
      <!-- Carousel -->
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://via.placeholder.com/800x400?text=Product%201" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://via.placeholder.com/800x400?text=Product%202" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://via.placeholder.com/800x400?text=Product%203" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div class="container banner">
        <h4>TEXTE</h4>
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
    .banner{
      height: 30vb;
      display: flex;
      justify-content: center; 
      align-items: center;
    }

    .banner h4{
      justify-content: center; 
      align-items: center;
      display: flex;
    }
  </style>