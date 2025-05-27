<template>
  <div id="app" class="container mt-5">
    <h1 class="mb-4">Mon Panier</h1>
    <div>
      <div>
<!--        <div>Debug : </div>-->
<!--        {{myProducts}}-->
      </div>
    </div>
    <div v-if="myProducts.length" v-for="(item, index) in myProducts" :key="index"
         class="d-flex justify-content-between align-items-center border-bottom py-2">
      <div>
        <h5>{{ item.name }}</h5>
        <p>{{ item.prix }} €</p>
      </div>
      <div>
        <button class="btn btn-danger btn-sm me-2" @click="removeFromCart(item.id);calculateTotalPrice()">Supprimer</button>
        <button class="btn btn-primary btn-sm" @click="item.amountInCart--;calculateTotalPrice()" :disabled="item.amountInCart === 1">-</button>
        <span class="mx-2">{{ item.amountInCart }}</span>
        <button class="btn btn-primary btn-sm" @click="item.amountInCart++;calculateTotalPrice()">+</button>
      </div>
    </div>
    <div v-else>
      Pas encore d'articles dans le panier... N'hésitez pas!
    </div>
    <br>
    <RouterLink class="btn btn-primary fs-4 px-4" to="/checkout">Payer panier</RouterLink>
<!--    <button @click="emptyCart()">Debug - vider Panier</button>-->

    <div class="mt-4">
      <h4>Total : {{ totalPrice }} €</h4>
    </div>

  </div>
</template>
<script setup>
// import { ref, watch, onMounted, computed } from 'vue'
// import { useRoute } from 'vue-router';
import {useCartStore} from "../stores/Cart"
import {onMounted, ref} from "vue";

const cartStore = useCartStore();
const totalPrice = ref()
const myProducts = ref(cartStore.products)
// console.log(myProducts)

onMounted( () => {
  calculateTotalPrice()
})

function removeFromCart(productId){
  cartStore.removeFromCart(productId)
  myProducts.value = cartStore.products
}

function emptyCart(){
  cartStore.clearCart()
}

function calculateTotalPrice(){
  // console.log(myProducts.value)
  // console.log(myProducts.value)
  // let myPrices = myProducts.value.reduce((accumulator, item) => accumulator + (item.prix * item.amountIncart), 0)
  // console.log(myPrices)
  totalPrice.value = cartStore.products.reduce((acc, item) => acc + item.prix * item.amountInCart, 0)
  totalPrice.value = totalPrice.value.toFixed(2)
}
// const button = document.querySelector('.product__button');
// const route = useRoute();
// let params = route.params.id;
// export default {
//   name: 'App',
//   data() {
//     return {
//       cart: [
//         { name: 'Produit 1', price: 10, quantity: 1 },
//         { name: 'Produit 2', price: 20, quantity: 1 }
//       ],
//       newProduct: { name: '', price: null }
//     };
//   },
//   computed: {
//     total() {
//       return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     }
//   },
//   methods: {
//     addToCart() {
//       if (this.newProduct.name && this.newProduct.price) {
//         this.cart.push({ ...this.newProduct, quantity: 1 });
//         this.newProduct = { name: '', price: null };
//       }
//     },
//     removeFromCart(index) {
//       this.cart.splice(index, 1);
//     }
//   }
// };
</script>

<style scoped>
.container {
  max-width: 800px;
}

button {
  margin: 5px;
}
</style>
  