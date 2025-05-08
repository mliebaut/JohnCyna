<template>
    <div class="search-page d-flex">
      <!-- Sidebar (filtres) -->
      <aside class="filters p-4 shadow">
        <h4 class="mb-3">Filtres</h4>
        <div class="mb-3">
          <label class="form-label">Catégorie</label>
          <select v-model="filters.category" class="form-select">
            <option value="">Toutes</option>
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="infra">Infrastructure</option>
          </select>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Mot-clé</label>
          <input type="text" v-model="filters.keyword" class="form-control" placeholder="Ex : sécurité" />
        </div>
  
        <button class="btn btn-primary w-100" @click="applyFilters">Rechercher</button>
      </aside>
  
      <!-- Résultats -->
      <main class="results flex-fill p-4">
        <h2 class="mb-4">Résultats</h2>
        <div v-if="filteredResults.length">
          <div v-for="item in filteredResults" :key="item.id" class="card mb-3 p-3">
            <h5>{{ item.title }}</h5>
            <p class="text-muted">{{ item.category }}</p>
            <p>{{ item.description }}</p>
          </div>
        </div>
        <div v-else>
          <p>Aucun résultat trouvé.</p>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const filters = ref({
    category: '',
    keyword: ''
  });
  
  const items = ref([
    { id: 1, title: 'Audit de sécurité', category: 'infra', description: 'Analyse complète du réseau.' },
    { id: 2, title: 'Site vitrine', category: 'web', description: 'Développement avec Vue.js.' },
    { id: 3, title: 'App mobile RH', category: 'mobile', description: 'Application pour la gestion du personnel.' }
  ]);
  
  const filteredResults = computed(() => {
    return items.value.filter(item => {
      const matchCategory = !filters.value.category || item.category === filters.value.category;
      const matchKeyword = !filters.value.keyword || item.description.toLowerCase().includes(filters.value.keyword.toLowerCase());
      return matchCategory && matchKeyword;
    });
  });
  
  function applyFilters() {
    // Rien à faire ici, les filtres sont réactifs
  }
  </script>
  
  <style scoped>
  .search-page {
    display: flex;
    min-height: 100vh;
    background-color: #f8f9fa;
  }
  
  .filters {
    width: 250px;
    background-color: #fff;
    border-right: 1px solid #ddd;
  }
  
  .results {
    background-color: #fff;
  }
  </style>
  