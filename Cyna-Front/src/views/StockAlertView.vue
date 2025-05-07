<script setup lang="ts">
defineProps<{
  outOfStockServices: Array<{ id: number; name: string; stock: number }>;
}>();
</script>

<template>
  <div v-if="outOfStockServices.length > 0" class="stock-alert">
    <h3>Alertes de rupture de stock</h3>
    <ul>
      <li v-for="service in outOfStockServices" :key="service.id">
        {{ service.name }} est en rupture de stock.
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Aucune alerte de rupture de stock pour le moment.</p>
  </div>
</template>

<style scoped>
.stock-alert {
  padding: 10px;
  background-color: #ffebee;
  border: 1px solid #ffcdd2;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>