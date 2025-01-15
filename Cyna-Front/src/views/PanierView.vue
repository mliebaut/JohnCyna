<template>
    <div id="app" class="container mt-5">
      <h1 class="mb-4">Mon Panier</h1>
  
      
      <div v-for="(item, index) in cart" :key="index" class="d-flex justify-content-between align-items-center border-bottom py-2">
        <div>
          <h5>{{ item.name }}</h5>
          <p>{{ item.price }} €</p>
        </div>
        <div>
          <button class="btn btn-danger btn-sm me-2" @click="removeFromCart(index)">Supprimer</button>
          <button class="btn btn-primary btn-sm" @click="item.quantity++">+</button>
          <span class="mx-2">{{ item.quantity }}</span>
          <button class="btn btn-primary btn-sm" @click="item.quantity--" :disabled="item.quantity === 1">-</button>
        </div>
      </div>
  
   
      <div class="mt-4">
        <h4>Total : {{ total }} €</h4>
      </div>
  
    
      <div class="mt-4">
        <h5>Ajouter un produit :</h5>
        <input type="text" v-model="newProduct.name" placeholder="Nom" class="form-control mb-2">
        <input type="number" v-model="newProduct.price" placeholder="Prix" class="form-control mb-2">
        <button class="btn btn-success" @click="addToCart">Ajouter au panier</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        cart: [
          { name: 'Produit 1', price: 10, quantity: 1 },
          { name: 'Produit 2', price: 20, quantity: 1 }
        ],
        newProduct: { name: '', price: null }
      };
    },
    computed: {
      total() {
        return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      }
    },
    methods: {
      addToCart() {
        if (this.newProduct.name && this.newProduct.price) {
          this.cart.push({ ...this.newProduct, quantity: 1 });
          this.newProduct = { name: '', price: null };
        }
      },
      removeFromCart(index) {
        this.cart.splice(index, 1);
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  button {
    margin: 5px;
  }
  </style>
  