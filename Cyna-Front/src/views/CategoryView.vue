<template>
    <!-- Banner -->
    <div v-if="categorieQuery">
      <div class="banner-category" :style="{backgroundImage:`url(${ categorieQuery.image })`}">
          <h1 class="container">{{ categorieQuery.title }}</h1>
      </div>
      <div class="description container my-4">
          <p class="fw-medium fs-3">{{ categorieQuery.description }}</p>
      </div>
    </div>

    <!-- Les Produits -->
    <h2 class="mt-5 mb-5 fs-1">Les produits</h2>
      <div class="row container justify-content-md-center row-gap-5 m-auto">
        <div class="col-xs-1 col-md-5 col-xl-4" v-for="product in products">
          <div class="card text-center m-auto">
            <img :src="(`${product.image}`)" height="300" class="card-img-top" alt="Product {{ index + 1 }}">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">Prix: {{ product.price }} €</p>
              <a href="#" class="btn btn-primary">Voir le produit</a>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import categorie from '../json/categorie.json'
import { useRoute } from 'vue-router';

const route = useRoute();
const categories = ref(categorie)
let params = route.params.title;

const products =  [
        { name: 'Produit 1', price: 29.99, image: '/product1.jpg'},
        { name: 'Produit 2', price: 49.99, image: '/product2.jpg'},
        { name: 'Produit 3', price: 79.99, image: '/product3.jpg'},
        { name: 'Produit 4', price: 29.99, image: '/product1.jpg'},
        { name: 'Produit 5', price: 49.99, image: '/product2.jpg'},
        { name: 'Produit 6', price: 79.99, image: '/product3.jpg'},
      ]
let categorieQuery = computed(() => categories.value.find(p => p.title === params));

watch(() => route.params.title, (newValue) => {
  categorieQuery = computed(() => categories.value.find(p => p.title === newValue));
});
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
      text-shadow: #000 0 0 1px,   #000 0 0 1px,   #000 0 0 1px;
    }
</style>