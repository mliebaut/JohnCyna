<template>
  <head>
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, width=device-width">
  </head>

  <div v-if="product" class="container mt-5">
    <div class="article">
      <div id="carouselExampleDark" class="carousel carousel-dark slide">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div v-for="(image, index) in urls" :key="index" class="carousel-item row" :class="{ active: index == 0}">
            <div class="carousel-item">
              <img class="d-block w-100" :src="(`${image}`)" alt="">
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
    </div>
      <div class="description">
        <h2>{{ product.name }}</h2>
        <p>
          {{ product.description }}
        </p>
      </div>
      <div class="achats">
        <p class="stars">
          <svg viewBox="0 0 576 512">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
          </svg>
          <svg viewBox="0 0 576 512">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
          </svg>
          <svg viewBox="0 0 576 512">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
          </svg>
          <svg viewBox="0 0 576 512">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
          </svg>
          <svg viewBox="0 0 536 512">
            <path d="M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z" />
          </svg>
        </p>
        <p>
          1 899.95€
        </p>
        <p v-if="product">
          {{ product.inStock > 0 ? `En stock` : 'Rupture de stock' }}
        </p>
        <button :disabled="product && product.inStock === 0" @click="addCart()">
          Ajouter au panier
        </button>
      </div>
    </div>
    <div class="tech">
      <h2>Fiche technique</h2>
      <div class="grid">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 29">
          <path d="M9 6h11a3 3 0 013 3v11a3 3 0 01-3 3H9a3 3 0 01-3-3V9a3 3 0 013-3zm0 .9A2.1 2.1 0 006.9 9v11c0 1.16.94 2.1 2.1 2.1h11a2.1 2.1 0 002.1-2.1V9A2.1 2.1 0 0020 6.9H9zM8 25.5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zM8 .5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zM12 25.5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zM12 .5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zM16 25.5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zM16 .5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zM20 25.5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zM20 .5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zM3.5 8h-3a.5.5 0 000 1h3a.5.5 0 000-1zM28.5 8h-3a.5.5 0 000 1h3a.5.5 0 000-1zM3.5 12h-3a.5.5 0 000 1h3a.5.5 0 000-1zM28.5 12h-3a.5.5 0 000 1h3a.5.5 0 000-1zM3.5 16h-3a.5.5 0 000 1h3a.5.5 0 000-1zM28.5 16h-3a.5.5 0 000 1h3a.5.5 0 000-1zM3.5 20h-3a.5.5 0 000 1h3a.5.5 0 000-1zM28.5 20h-3a.5.5 0 000 1h3a.5.5 0 000-1z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 18">
          <path d="M0 .85C0 .38.38 0 .85 0h27.3c.47 0 .85.38.85.85v12.8c0 .47-.38.85-.85.85H.85a.85.85 0 01-.85-.85V.85zm.85 0v12.8h27.3V.85H.85z" />
          <path d="M2.56 3.41c0-.47.38-.85.85-.85h2.56c.47 0 .85.38.85.85v7.68c0 .47-.38.85-.85.85H3.41a.85.85 0 01-.85-.85V3.4zm.85 0v7.68h2.56V3.4H3.41zM9.38 3.41c0-.47.38-.85.86-.85h2.55c.48 0 .86.38.86.85v7.68c0 .47-.38.85-.86.85h-2.55a.85.85 0 01-.86-.85V3.4zm.86 0v7.68h2.55V3.4h-2.55zM15.35 3.41c0-.47.38-.85.86-.85h2.55c.48 0 .86.38.86.85v7.68c0 .47-.38.85-.86.85h-2.55a.85.85 0 01-.86-.85V3.4zm.86 0v7.68h2.55V3.4h-2.55zM22.18 3.41c0-.47.38-.85.85-.85h2.56c.47 0 .85.38.85.85v7.68c0 .47-.38.85-.85.85h-2.56a.85.85 0 01-.85-.85V3.4zm.85 0v7.68h2.56V3.4h-2.56zM17.49 14.5h-.86v1.7h.86v-1.7z" />
          <path d="M5.54 16.2h.86v-1.7h-.86v1.7zm3.42-1.7v1.7h.85v-1.7h-.85zm5.11 1.7h-.85v-1.7h.85v1.7zm11.1-1.7h-.86v1.7h.85v-1.7zm-5.13 0h.86v1.7h-.86v-1.7z" clip-rule="evenodd" />
          <path d="M28.15 14.5h-.86v1.7H2.56v-1.7H1.7v1.7c0 .48.38.86.85.86h24.73c.48 0 .86-.38.86-.85V14.5z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 21">
          <path d="M18.36 20.03h7.18a2.55 2.55 0 002.56-2.55V3.46A2.55 2.55 0 0025.54.9H3.46A2.55 2.55 0 00.9 3.46v5a.45.45 0 01-.9 0v-5C0 1.55 1.55 0 3.46 0h22.08C27.45 0 29 1.55 29 3.46v14.02c0 1.9-1.55 3.45-3.46 3.45h-7.18a.45.45 0 010-.9z" />
          <path d="M2.5 10.02h12.03c1.35 0 2.45 1.1 2.45 2.45v6.01c0 1.36-1.1 2.45-2.45 2.45H2.5a2.45 2.45 0 01-2.46-2.45v-6.01c0-1.35 1.1-2.45 2.46-2.45zm0 .9c-.85 0-1.55.7-1.55 1.55v6.01c0 .86.7 1.55 1.56 1.55h12.02c.85 0 1.55-.7 1.55-1.55v-6.01c0-.86-.7-1.55-1.55-1.55H2.5zM18.19 9.06a.5.5 0 10.69.73l5.5-5.2v2.28a.45.45 0 10.91 0V3h-4.06a.45.45 0 000 .9h2.43L18.2 9.07z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 29">
          <path fill-rule="evenodd" d="M14.03 2.8c1.04 0 1.87.84 1.87 1.88v22.45c0 1.03-.83 1.87-1.87 1.87H1.87A1.87 1.87 0 010 27.13V4.68C0 3.64.84 2.8 1.87 2.8h1.87v-.94C3.74.84 4.58 0 5.61 0h4.68c1.03 0 1.87.84 1.87 1.87v.94h1.87zM.93 4.69c0-.52.42-.94.94-.94h12.16c.52 0 .94.42.94.94v22.45c0 .52-.42.93-.94.93H1.87a.94.94 0 01-.93-.93V4.68zm3.75-2.8c0-.53.42-.94.93-.94h4.68c.52 0 .94.41.94.93v.94H4.68v-.94z" />
          <path fill-rule="evenodd" d="M13.56 25.26c0 .77-.62 1.4-1.4 1.4H3.74a1.4 1.4 0 01-1.4-1.4V15.9c0-.77.63-1.4 1.4-1.4h8.42c.78 0 1.4.63 1.4 1.4v9.36zm-9.82.47a.47.47 0 01-.47-.47v-2.34h9.36v2.34c0 .26-.21.47-.47.47H3.74zm-.47-3.75v-2.8h9.36v2.8H3.27zm9.36-6.08v2.34H3.27V15.9c0-.26.21-.46.47-.46h8.42c.26 0 .47.2.47.46z" />
        </svg>
        <p>Processeur</p>
        <p>Mémoire vive</p>
        <p>Écran</p>
        <p>Autonomie</p>

        <p>Apple M1</p>
        <p>16 Go</p>
        <p>13.3 pouces</p>
        <p>10h</p>
      </div>
    </div>
      <div class="tech">
        <h2>Recommandations  Produits</h2>

        <img src="https://placehold.co/300x250" style="margin-right: 10px;">
        <img src="https://placehold.co/300x250" style="margin-right: 10px;">
        <img src="https://placehold.co/300x250">

      <p></p>
<p><button>Voir Produit</button></p>
  <div v-if="product && product.inStock === 0" class="alert alert-warning mt-3">
    Ce service est en rupture de stock. Veuillez nous contacter pour plus d'informations.
  </div>
  </div>
  </div>

</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';
import { find_product_by_id } from "../functions/product.ts";
import { useCartStore } from "../stores/Cart"

const cartStore = useCartStore();
const button = document.querySelector('.product__button');
const route = useRoute();
let params = route.params.id;
// console.log(params)

// const product = ref<null | { name: string; description: string ;price: number; images: any[] }>(null);
const product = ref();

const urls = computed(() => {
  if (product.value && product.value.images) {
    return product.value.images.map((images: any) => images.url);
  }
  return [];
});

// if (product.value && product.value.images) {
//   console.log("Oui")
// }

onMounted(async () => {
  console.log(params)
  product.value = await find_product_by_id(parseInt(params));
});

// watch(() => route.params.id, async (newValue) => {
//   product.value = await find_product_by_id(parseInt(newValue[0]));
// });


// onMounted(async () => {
//   try {
//     const response = await fetch('http://127.0.0.1:3001/product/' + params)
//     if (!response.ok) throw new Error('Erreur serveur')
//     product.value = await response.json()
//   } catch (error) {
//     console.error('Erreur lors du chargement du produit:', error)
//   }
// })

function addCart(){
  console.log("AddCart")
  cartStore.addProduct(product.value)
}

// function buttonAnimate() {
//   if (button){
//     button.classList.add('product__button--success');
//   }
// }

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap");

html {
  font-family: "Nunito", sans-serif;
  color: rgb(34 34 34);
  background: linear-gradient(rgb(255, 255, 255), rgb(250, 250, 250));
}

footer {
  padding: 30px 10px;
  text-align: center;
}

.container {
  box-shadow: 1px 1px 40px 1px rgb(200 200 200);
  border-radius: 40px;
}

.container > * {
  padding: 20px 15px;
}

.article {
  display: flex;
  flex-wrap: wrap;
}

.article > * {
  padding: 8px 0;
  margin: auto;
  width: clamp(400px, 40%, 100%);
  text-align: center;
}

.dot {
  height: 15px;
  width: 15px;
  background-color: rgb(34 34 34);
  border-radius: 50px;
  display: inline-block;
  margin: 15px;
  cursor: pointer;
  transition: 0.5s;
}
/*
.carousel,
.achats {
  width: clamp(200px, 100%, 400px);
}

.carousel > .img {
  aspect-ratio: 1/1;
  scroll-behavior: smooth;
  overflow: hidden;
  display: flex;
}

.carousel > .img > img {
  transition: 0.5s;
}
*/
.stars > * {
  fill: #5397b4;
  width: 20px;
}
/*
button {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: rgb(34 34 34);
  color: white;
  font-size: 25px;
  transition: 0.5s ease;
}

button:hover {
  transform: scale(1.1);
  transition: 0.5s ease;
}
*/
.tech {
  border-top: 1px solid rgb(200 200 200);
  display: block;
  text-align: center;
}

.tech > .grid > svg {
  height: 80px;
  width: 80px;
  fill: rgb(34 34 34);
}

.tech > .grid {
  display: grid;
  grid-gap: 30px;
  grid: auto auto auto / auto auto auto auto;
  width: clamp(100px, 100%, 700px);
  margin: auto;
  overflow: auto;
}
.tech > .grid > * {
  margin: auto;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: rgb(200, 200, 200);
}

::-webkit-scrollbar-thumb {
  background: rgb(60, 60, 60);
  border-radius: 360px;
}

.description > p {
  line-height: 30px;
  text-align: justify;
}

.description > h2 {
  line-height: 40px;
}

/** Warning pour indiquer la rupture de stock d'un produit **/
.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  padding: 1em;
  border-radius: 8px;
  border: 1px solid #ffeeba;
}

</style>