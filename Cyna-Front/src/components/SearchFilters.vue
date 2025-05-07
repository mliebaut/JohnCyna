<script setup lang="ts">
import { ref } from "vue";
import { useProductStore } from "@/store/productStore";

const store = useProductStore();

const title = ref("");
const description = ref("");
const minPrice = ref(0);
const maxPrice = ref(500);

const applyFilters = () => {
  store.setFilters({ title: title.value, description: description.value, minPrice: minPrice.value, maxPrice: maxPrice.value });
};
</script>

<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form-input v-model="title" placeholder="Rechercher par titre" @input="applyFilters"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input v-model="description" placeholder="Rechercher par description" @input="applyFilters"></b-form-input>
      </b-col>
      <b-col>
        <b-form-group label="Prix min">
          <b-form-input type="number" v-model="minPrice" @input="applyFilters"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Prix max">
          <b-form-input type="number" v-model="maxPrice" @input="applyFilters"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
  </b-container>
</template>
