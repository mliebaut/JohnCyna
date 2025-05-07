
<template>
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Ajouter au Panier</h1>
  
      <div class="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
        <div class="flex flex-col md:flex-row gap-8">
    
          <div class="md:w-1/2 flex justify-center">
            <img 
              src="/image.jpg" 
              :alt="produit.nom"
              class="w-full h-auto max-h-96 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
  
       
          <div class="md:w-1/2">
            <h2 class="text-2xl font-semibold mb-4 text-gray-900">{{ produit.nom }}</h2>
  
           
            <div class="mb-6">
              <div class="flex items-center gap-3">
                <span class="text-3xl font-bold text-blue-600">{{ produit.prix }}€</span>
                <span v-if="produit.prixOriginal" class="text-lg text-gray-400 line-through">
                  {{ produit.prixOriginal }}€
                </span>
              </div>
              <div v-if="produit.prixOriginal" class="text-green-500 text-sm mt-1">
                Économisez {{ (produit.prixOriginal - produit.prix).toFixed(2) }}€
              </div>
            </div>
  
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Quantité</label>
              <div class="flex items-center gap-3">
                <button @click="diminuerQuantite" class="btn-circle" :disabled="quantite <= 1">-</button>
                <input type="number" v-model.number="quantite" min="1" :max="produit.stock" class="input-quantite" />
                <button @click="augmenterQuantite" class="btn-circle" :disabled="quantite >= produit.stock">+</button>
              </div>
            </div>
  
            <!-- Stock -->
            <div class="mb-6">
              <div v-if="produit.stock > 0" class="text-green-500">✅ En stock ({{ produit.stock }} disponibles)</div>
              <div v-else class="text-red-500">❌ Rupture de stock</div>
            </div>
  
            <!-- Total et bouton -->
            <div class="space-y-4">
              <div class="text-lg font-medium">Total: <span class="text-blue-600 font-bold">{{ (produit.prix * quantite).toFixed(2) }}€</span></div>
              <button @click="ajouterAuPanier" class="btn-primary" :disabled="!produit.stock">🛒 Ajouter au panier</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-md">
    🛒 Ajouter au panier
  </button>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useCartStore } from '../store/cart.js';
  
  const cartStore = useCartStore();
  
  const produit = {
    id: 1,
    nom: "Produit Premium",
    prix: 29.99,
    prixOriginal: 39.99,
    stock: 10
  };
  
  const quantite = ref(1);
  
  const diminuerQuantite = () => {
    if (quantite.value > 1) quantite.value--;
  };
  
  const augmenterQuantite = () => {
    if (quantite.value < produit.stock) quantite.value++;
  };
  
  const ajouterAuPanier = () => {
    cartStore.ajouterProduit({
      id: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      quantite: quantite.value
    });
    alert('Produit ajouté au panier !');
  };
  </script>
  
 