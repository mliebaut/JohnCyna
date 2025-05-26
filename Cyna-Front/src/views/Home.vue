<template>
  <!-- Carousel -->
  <div id="carouselExampleDark" class="carousel carousel-dark slide pt-5">
    <div class="carousel-indicators ">
     <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
     <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
     <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner h-100">     
      <div v-for="(carousel, index) in carouselData" :key="index" class="carousel-item row h-100" :class="{ active: index == 0}">
        <div class="banner h-100">
          <div class="container-sm h-100">
            <div class="row h-100">
              <div class="col-md-5">
                <h1>{{ t(carousel.titleKey) }}</h1>
                <p>{{ t(carousel.descriptionKey) }}</p>
                <button class="btn btn-primary fs-4 px-4">{{ t(carousel.buttonKey) }}</button>
              </div>
               <div class="col-md-7">
                <img class="img-fluid" :src="(`${carousel.image}`)" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
        <button class="carousel-control-prev w-auto" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Précédent</span>
        </button>
        <button class="carousel-control-next w-auto" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Suivant</span>
        </button>
      </div>

      <!-- Banderole -->
      <div class="banderole">
        <h4 class="container">{{ t('banderole') }}</h4>
      </div>
  
      <!-- Categories -->
      <h2 class="mb-4 fs-1">{{ t('categoriesTitle') }}</h2>
      <div class="category row justify-content-md-center container m-auto row-gap-5">
        <div class="col-xs-1 col-md-5 col-xl-4" v-for="category in categories" :key="category.title">
          <div class="card text-center m-auto" :style="{backgroundImage:`url(${category.image})`}">
            <div class="card-body d-flex flex-column justify-content-center align-items-center ">
              <h3 class="card-title">{{ category.title }}</h3>
                <p class="card-text fs-5 fw-medium">{{ category.description }}</p>
                <router-link class="btn btn-primary" :to="{ path: `/category/${category.title}`, query: { description: `${category.description}`, image: `${category.image}` }}">{{ t('viewCategory') }}</router-link>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Meilleurs Produits -->
      <h2 class="mt-5 mb-4 fs-1">{{ t('topProductsTitle') }}</h2>
      <div class="row container justify-content-md-center row-gap-5 m-auto">
        <div class="col-xs-1 col-md-5 col-xl-4" v-for="(product, rank) in topProducts" :key="rank">
          <svg v-if="product.rank === 1" width="100" height="100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path fill="#FFD43B" d="M400.192,344.853c36.117-36.608,58.475-86.805,58.475-142.187C458.667,90.923,367.744,0,256,0 C144.256,0,53.333,90.923,53.333,202.667c0,55.381,22.357,105.579,58.475,142.208L54.592,451.733 c-1.771,3.307-1.664,7.296,0.256,10.517c1.92,3.2,5.397,5.184,9.152,5.184h56.491l32,40.533c2.027,2.56,5.12,4.032,8.363,4.032 c0.32,0,0.64,0,0.96-0.043c3.584-0.32,6.763-2.432,8.448-5.632l54.997-103.595c10.069,1.557,20.267,2.603,30.741,2.603 s20.672-1.045,30.741-2.581l54.997,103.595c1.685,3.179,4.864,5.312,8.448,5.632c0.32,0.021,0.64,0.021,0.96,0.021 c3.243,0,6.336-1.472,8.384-4.053l32-40.533H448c3.755,0,7.211-1.963,9.152-5.184c1.92-3.221,2.027-7.211,0.256-10.517 L400.192,344.853z M159.104,481.899l-25.067-31.765c-2.027-2.56-5.12-4.053-8.384-4.053H81.792l46.293-86.4 c21.824,17.813,47.488,30.997,75.456,38.528L159.104,481.899z M256,384c-99.989,0-181.333-81.344-181.333-181.333 S156.011,21.333,256,21.333s181.333,81.344,181.333,181.333S355.989,384,256,384z M386.347,446.08 c-3.264,0-6.357,1.493-8.384,4.053l-25.067,31.765l-44.437-83.691c27.968-7.509,53.632-20.693,75.456-38.528l46.293,86.4H386.347 z"/><path fill="#FFD43B" d="M256,42.667c-88.235,0-160,71.765-160,160s71.765,160,160,160s160-71.765,160-160S344.235,42.667,256,42.667z M256,341.333c-76.459,0-138.667-62.208-138.667-138.667S179.541,64,256,64s138.667,62.208,138.667,138.667 S332.459,341.333,256,341.333z"/><path fill="#FFD43B" d="M256,128h-21.333c-5.888,0-10.667,4.779-10.667,10.667s4.779,10.667,10.667,10.667h10.667v117.333 c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667v-128C266.667,132.779,261.888,128,256,128z"/></svg>
          <svg v-else-if="product.rank === 2" width="100" height="100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path fill="#C0C0C0" d="M309.328,178.56c0-13.653-5.653-26.432-15.893-36.011c-20.075-18.795-54.784-18.795-74.88,0 c-10.24,9.579-15.893,22.357-15.893,36.011c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667 c0-7.68,3.221-14.933,9.109-20.416c12.203-11.349,33.579-11.349,45.781,0c5.888,5.483,9.109,12.736,9.109,20.416 c0,10.283-6.421,19.648-21.461,31.317c-17.472,13.568-34.581,27.627-51.669,41.707l-8.32,6.848 c-3.477,2.859-4.8,7.595-3.264,11.84c1.536,4.245,5.547,7.061,10.048,7.061h85.333c5.888,0,10.667-4.779,10.667-10.667 S304.549,256,298.661,256h-55.552c12.053-9.877,24.192-19.712,36.523-29.269C293.456,216,309.328,200.853,309.328,178.56z"/><path fill="#C0C0C0" d="M457.424,451.712l-57.237-106.837c36.096-36.608,58.475-86.827,58.475-142.208C458.661,90.923,367.738,0,255.994,0 S53.328,90.923,53.328,202.667c0,55.381,22.379,105.6,58.496,142.208L54.586,451.712c-1.749,3.307-1.664,7.296,0.277,10.517 c1.92,3.2,5.397,5.184,9.152,5.184h56.469l32,40.533c2.027,2.581,5.12,4.053,8.363,4.053c0.32,0,0.64,0,0.96-0.043 c3.584-0.32,6.763-2.432,8.448-5.632l54.997-103.573c10.069,1.536,20.267,2.581,30.741,2.581c10.475,0,20.672-1.045,30.72-2.581 l54.997,103.573c1.685,3.179,4.885,5.312,8.448,5.632c0.341,0.043,0.661,0.043,0.981,0.043c3.243,0,6.336-1.472,8.384-4.053 l32-40.533h56.469c3.755,0,7.232-1.963,9.152-5.184C459.088,459.008,459.173,455.019,457.424,451.712z M159.098,481.899 l-25.088-31.765c-2.027-2.56-5.099-4.053-8.384-4.053h-43.84l46.293-86.4c21.824,17.813,47.488,30.997,75.456,38.528 L159.098,481.899z M255.994,384c-99.989,0-181.333-81.344-181.333-181.333S156.005,21.333,255.994,21.333 s181.333,81.344,181.333,181.333S355.984,384,255.994,384z M386.341,446.08c-3.264,0-6.357,1.493-8.384,4.053l-25.088,31.765 l-44.437-83.691c27.968-7.509,53.632-20.693,75.456-38.528l46.293,86.4H386.341z"/><path fill="#C0C0C0" d="M255.994,42.667c-88.235,0-160,71.765-160,160s71.765,160,160,160s160-71.765,160-160S344.229,42.667,255.994,42.667z M255.994,341.333c-76.459,0-138.667-62.208-138.667-138.667S179.536,64,255.994,64s138.667,62.208,138.667,138.667 S332.453,341.333,255.994,341.333z"/></svg>
          <svg v-else-if="product.rank === 3" width="100" height="100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path fill="#a65c07" d="M277.328,128h-64c-5.888,0-10.667,4.779-10.667,10.667s4.779,10.667,10.667,10.667h64 c5.867,0,10.667,4.779,10.667,10.667v32h-53.333c-5.888,0-10.667,4.779-10.667,10.667s4.779,10.667,10.667,10.667h53.333v32 c0,5.888-4.8,10.667-10.667,10.667h-64c-5.888,0-10.667,4.779-10.667,10.667s4.779,10.667,10.667,10.667h64 c17.643,0,32-14.357,32-32V160C309.328,142.357,294.97,128,277.328,128z"/><path fill="#a65c07" d="M457.424,451.712l-57.237-106.837c36.096-36.608,58.475-86.827,58.475-142.208C458.661,90.923,367.738,0,255.994,0 S53.328,90.923,53.328,202.667c0,55.381,22.379,105.6,58.496,142.208L54.586,451.712c-1.749,3.307-1.664,7.296,0.277,10.517 c1.92,3.2,5.397,5.184,9.152,5.184h56.469l32,40.533c2.027,2.581,5.12,4.053,8.363,4.053c0.32,0,0.64,0,0.96-0.043 c3.584-0.32,6.763-2.432,8.448-5.632l54.997-103.573c10.069,1.536,20.267,2.581,30.741,2.581c10.475,0,20.672-1.045,30.72-2.581 l54.997,103.573c1.685,3.179,4.885,5.312,8.448,5.632c0.341,0.043,0.661,0.043,0.981,0.043c3.243,0,6.336-1.472,8.384-4.053 l32-40.533h56.469c3.755,0,7.232-1.963,9.152-5.184C459.088,459.008,459.173,455.019,457.424,451.712z M159.098,481.899 l-25.088-31.765c-2.027-2.56-5.099-4.053-8.384-4.053h-43.84l46.293-86.4c21.824,17.813,47.488,30.997,75.456,38.528 L159.098,481.899z M255.994,384c-99.989,0-181.333-81.344-181.333-181.333S156.005,21.333,255.994,21.333 s181.333,81.344,181.333,181.333S355.984,384,255.994,384z M386.341,446.08c-3.264,0-6.357,1.493-8.384,4.053l-25.088,31.765 l-44.437-83.691c27.968-7.509,53.632-20.693,75.456-38.528l46.293,86.4H386.341z"/><path fill="#a65c07" d="M255.994,42.667c-88.235,0-160,71.765-160,160s71.765,160,160,160s160-71.765,160-160S344.229,42.667,255.994,42.667z M255.994,341.333c-76.459,0-138.667-62.208-138.667-138.667S179.536,64,255.994,64s138.667,62.208,138.667,138.667 S332.453,341.333,255.994,341.333z"/></svg>
          <div class="card text-center m-auto mt-3">
            <img :src="(`${product.image}`)" height="300" class="card-img-top" alt="Product {{ index + 1 }}">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">Prix: {{ product.price }} €</p>
              <a href="#" class="btn btn-primary">{{ t('viewProduct') }}</a>
            </div>
          </div>
        </div>
    </div>
  </template>
  <script>
  import carousel from '../json/carousel.json'
  import topProduct from '../json/topProduct.json'
  import categorie from '../json/categorie.json'
  import { useI18n } from 'vue-i18n'

  export default {
    setup() {
      const { t } = useI18n()

      const carouselData = carousel

      const topProducts = [
        { name: 'Produit 1', price: 29.99, rank: 1, image: '/product1.jpg' },
        { name: 'Produit 2', price: 49.99, rank: 2, image: '/product2.jpg' },
        { name: 'Produit 3', price: 79.99, rank: 3, image: '/product3.jpg' },
      ]

      const categories = [
        {
          title: 'Prévention',
          description: t('categories.prevention.description'),
          image: '/Categorie1.jpg'
        },
        {
          title: 'Protection',
          description: t('categories.protection.description'),
          image: '/Categorie2.jpg'
        },
        {
          title: 'Réponse',
          description: t('categories.reponse.description'),
          image: '/Categorie3.jpg'
        },
        {
          title: 'Anticipation',
          description: t('categories.anticipation.description'),
          image: '/Categorie2.jpg'
        }
      ]

      return {
        /* carouselData: carousel,
        topProducts: topProduct,
        categories: categorie,
      };
    },
  }; */
        t,
        carouselData,
        topProducts,
        categories
      }
    }
  }
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
      font-size: 32px;
    }

    .carousel-item p{
      font-size: 26px;
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

    @media (min-width: 1024px) {
      
      .carousel-item{
        text-align: start;
      }
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