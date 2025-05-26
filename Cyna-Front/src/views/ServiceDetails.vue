<template>
    <div class="service-detail-container">

      <div class="info-section">
        <h1>{{ product.name }}</h1>
        <div class="image-section">
            <img src="https://picsum.photos/200/300" :alt="product.name" />
        </div>
        <p class="description">{{ product.description }}</p>
  
        <p class="stock" :class="{ available: product.inStock, unavailable: !product.inStock }">
          {{ product.inStock ? 'En stock' : 'Indisponible' }}
        </p>
  
        <p class="ean">EAN : {{ product.ean }}</p>
        <p class="guid">GUID : {{ product.GUID }}</p>
  
        <button @click="addToCart(product)" class="add-button" :disabled="!product.inStock">
          {{ product.inStock ? 'Ajouter au panier' : 'Indisponible' }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'

  //const imageUrl = '/images/cyna.jpg'
  
  // Données en dur
  const product = reactive({
    id: 1,
    ean: '1234567890123',
    GUID: 'cyna-edr-uuid-001',
    name: 'Cyna EDR Entreprise',
    description: 'Solution EDR pour protéger l’environnement informatique d’une PME ou ETI.',
    inStock: 1 
  })
  
  function addToCart(product) {
    alert(`Ajouté au panier : ${product.name}`)
  }
  </script>
  
  <style scoped>
  .service-detail-container {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    flex-wrap: wrap;
  }
  
  .image-section img {
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .info-section {
    flex: 1;
  }
  
  .description {
    margin: 1rem 0;
    font-size: 1.1rem;
    line-height: 1.5;
  }
  
  .stock {
    margin: 0.5rem 0;
    font-weight: bold;
  }
  
  .stock.available {
    color: green;
  }
  
  .stock.unavailable {
    color: red;
  }
  
  .ean,
  .guid {
    font-size: 0.9rem;
    color: #666;
  }
  
  .add-button {
    background-color: #0070f3;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
  }
  
  .add-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  