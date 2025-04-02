<script setup lang="ts">
import StockAlertView from './StockAlertView.vue';

const services = [
  { id: 1, name: 'Service A', stock: 0 },
  { id: 2, name: 'Service B', stock: 5 },
  { id: 3, name: 'Service C', stock: 2 },
  { id: 4, name: 'Service D', stock: 0 }
];

const outOfStockServices = services.filter(service => service.stock === 0);
</script>

<template>
  <div>
    <h1>Gestion des stocks - Cyna</h1>
    <StockAlertView :outOfStockServices="outOfStockServices" />
    <div v-for="service in services" :key="service.id">
      <h2>{{ service.name }}</h2>
      <p>Stock: {{ service.stock }}</p>
    </div>
  </div>
</template>

<style scoped>
div {
  margin-bottom: 20px;
}
</style>