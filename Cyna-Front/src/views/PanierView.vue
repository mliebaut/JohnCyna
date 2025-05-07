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
          <button class="btn btn-primary btn-sm" @click="item.quantity--" :disabled="item.quantity === 1" >-</button>
          <span class="mx-2">{{ item.quantity }}</span>
          <button class="btn btn-primary btn-sm" @click="item.quantity++" >+</button>
        </div>
      </div>
  
      <RouterLink class="btn btn-primary fs-4 px-4" to="/checkout">Payer panier</RouterLink>
   
      <div class="mt-4">
        <h4>Total : {{ total }} €</h4>
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
  