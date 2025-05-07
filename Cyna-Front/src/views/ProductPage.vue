<script setup lang="ts">
import SearchFilters from "@/components/SearchFilters.vue";
import ProductList from "@/components/ProductList.vue";
</script>

<template>
  <b-container>
    <h1>Catalogue des Produits</h1>
    <SearchFilters />
    <ProductList />
  </b-container>
</template>
