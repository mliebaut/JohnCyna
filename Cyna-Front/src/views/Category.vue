<template>
    <!-- Banner -->
    <div class="banner-category" :style="{backgroundImage:`url(${ $route.query.image })`}">
        <h1 class="container">{{ $route.params.title }}</h1>
    </div>
    <div class="description container my-4">
        <p class="fw-medium fs-3">{{ $route.query.description }}</p>
    </div>

    <!-- Les Produits -->
    <h2 class="mt-5 mb-5 fs-1">Les produits</h2>
      <div class="row container-lg justify-content-md-center row-gap-5 m-auto">
        <div class="col-xs-1 col-md-5 col-lg-4" v-for="product in products">
          <div class="card text-center m-auto">
            <img :src="(`${product.image}`)" height="300" class="card-img-top" alt="Product {{ index + 1 }}">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="m-0">Prix: {{ product.price }} €</p>
              <div class="out-stock">
                <p v-if="product.stock <= 0" class="fw-medium">Stock épuisé</p>
              </div>
              <a href="#" class="btn btn-primary">Voir le produit</a>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        products: [
          { name: 'Produit 1', price: 29.99, image: '/product1.jpg', stock: 1},
          { name: 'Produit 2', price: 49.99, image: '/product2.jpg', stock: 0},
          { name: 'Produit 3', price: 79.99, image: '/product3.jpg', stock: 1},
          { name: 'Produit 4', price: 29.99, image: '/product1.jpg', stock: 1},
          { name: 'Produit 5', price: 49.99, image: '/product2.jpg', stock: 1},
          { name: 'Produit 6', price: 79.99, image: '/product3.jpg', stock: 1},
        ],
      };
    },
  };
  </script>

<style>
    .banner-category{
      height: 20em;
      display: flex;
      justify-content: center; 
      align-items: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .banner-category h1{
      justify-content: center; 
      align-items: center;
      display: flex;
      color: white;
      text-shadow: #000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px;
    }

    .out-stock{
      height: 30px;
    }
</style>