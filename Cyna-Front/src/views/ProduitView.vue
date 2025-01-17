<template>
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>Détail Produit</title>
  </head>
  <body>

  <div class="container">
    <div class="product-header">
      <div class="product-image">
        <img alt="Produit" src="https://via.placeholder.com/600">
      </div>
      <div class="product-info">
        <h1>Produit Magnifique</h1>
        <p>Découvrez ce produit exceptionnel qui répondra à tous vos besoins.</p>
        <div id="base-price" class="price">Prix unitaire : {{ base_price }} €</div>
      </div>
    </div>

    <div class="options">
      <div class="quantity">
        <label for="quantity">Quantité :</label>
        <input v-model="quantityInput" id="quantity" min="1" style="width: 60px;" type="number" value="1">
      </div>
      <div class="purchase-type">
        <label for="type">Type d'achat :</label>
        <select v-model="typeSelect" id="type">
          <option value="achat">Acheter</option>
          <option value="location">Louer</option>
        </select>
      </div>
      <div id="total-price" class="total-price">Prix total : {{ totalPriceElement }} €</div>
      <button id="add-to-cart">Ajouter au panier</button>
    </div>
  </div>
  </body>
</template>
<script setup lang="ts">
import {ref} from "vue";

// const quantityInput = document.getElementById('quantity');
// const typeSelect = document.getElementById('type');
// const totalPriceElement = document.getElementById('total-price');
// const basePriceElement = document.getElementById('base-price');

const quantityInput = ref(0)
const typeSelect = ref()
const totalPriceElement = ref(0)
const base_price = ref(0)

const basePrice = 100; // Prix unitaire pour l'achat
const locationPriceMultiplier = 0.5; // 50% du prix unitaire pour la location

function updatePrice() {
  const quantity = quantityInput.value;
  const type = typeSelect.value;

  let pricePerUnit = basePrice;
  if (type === 'location') {
    pricePerUnit *= locationPriceMultiplier;
  }

  const totalPrice = pricePerUnit * quantity;
  totalPriceElement.value = parseFloat(totalPrice.toFixed(2));
}

</script>
<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.product-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.product-image {
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.product-image img {
  width: 100%;
  height: auto;
  display: block;
}

.product-info {
  flex: 2;
}

.product-info h1 {
  margin: 0;
  font-size: 2rem;
  color: #333333;
}

.price {
  font-size: 1.5rem;
  color: #28a745;
  margin: 10px 0;
}

.options {
  margin-top: 20px;
}

.options label {
  font-weight: bold;
  margin-right: 10px;
}

.quantity,
.purchase-type {
  margin-bottom: 15px;
}

.total-price {
  font-size: 1.2rem;
  color: #ff5722;
  font-weight: bold;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
