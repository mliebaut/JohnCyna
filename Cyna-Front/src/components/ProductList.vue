<script setup lang="ts">
import { useProductStore } from "@/store/productStore";

const store = useProductStore();
</script>

<template>
  <b-container>
    <b-row>
      <b-col v-for="product in store.filteredProducts" :key="product.id" cols="12" md="4">
        <b-card :title="product.title">
          <b-card-text>{{ product.description }}</b-card-text>
          <b-badge variant="primary">{{ product.price }} €</b-badge>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
