<template>
  <div class="card mb-3">
    <div class="card-header bg-primary text-white">
      <h5 class="m-0">Filtres</h5>
    </div>
    <div class="card-body">
      <div class="mb-2">
        <label class="form-label">Titre</label>
        <input 
          v-model="localFilters.title" 
          class="form-control" 
          placeholder="Recherche par titre"
          @input="updateFilters"
        >
      </div>
      
      <div class="mb-2">
        <label class="form-label">Prix (€)</label>
        <div class="d-flex gap-2">
          <input 
            type="number" 
            v-model="localFilters.minPrice" 
            class="form-control" 
            placeholder="Min"
            @input="updateFilters"
          >
          <input 
            type="number" 
            v-model="localFilters.maxPrice" 
            class="form-control" 
            placeholder="Max"
            @input="updateFilters"
          >
        </div>
      </div>
      
      <div class="mb-2">
        <label class="form-label">Catégorie</label>
        <select 
          v-model="localFilters.category" 
          class="form-select"
          @change="updateFilters"
        >
          <option value="">Toutes</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      
      <div class="mb-2">
        <div class="form-check">
          <input 
            type="checkbox" 
            id="inStock" 
            v-model="localFilters.inStock" 
            class="form-check-input"
            @change="updateFilters"
          >
          <label for="inStock" class="form-check-label">En stock uniquement</label>
        </div>
      </div>
      
      <button @click="$emit('reset')" class="btn btn-secondary w-100">Réinitialiser</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductFilter',
  props: {
    categories: {
      type: Array,
      required: true
    },
    filters: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localFilters: { ...this.filters }
    }
  },
  watch: {
    filters: {
      handler(newVal) {
        this.localFilters = { ...newVal };
      },
      deep: true
    }
  },
  methods: {
    updateFilters() {
      this.$emit('update:filters', { ...this.localFilters });
    }
  }
}
</script>

<style scoped>
.gap-2 {
  gap: 0.5rem;
}
</style>