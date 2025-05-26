<template>
  <div class="container-fluid p-3">
    <h1 class="text-center mb-4">Catalogue de Produits</h1>
    
    <div class="row">
      <!-- Filtres -->
      <div class="col-md-3">
        <ProductFilter 
          :categories="categories"
          :filters="filters"
          @update:filters="filters = $event"
          @reset="resetFilters"
        />
      </div>
      
      <!-- Résultats -->
      <div class="col-md-9">
        <ProductSorter
          :sort-by="sortBy"
          :sort-order="sortOrder"
          :result-count="filteredProducts.length"
          @update:sort-by="sortBy = $event"
          @update:sort-order="sortOrder = $event"
        />
        
        <div v-if="filteredProducts.length" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          <div v-for="product in filteredProducts" :key="product.id" class="col">
            <ProductCard :product="product" />
          </div>
        </div>
        <div v-else class="alert alert-info">
          Aucun produit ne correspond à vos critères.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductFilter from '../components/ProductFilter.vue'
import ProductSorter from '../components/ProductSorter.vue'
import ProductCard from '../components/ProductCard.vue'
import { productList } from '../data/products.js'

export default {
  name: 'ProductCatalog',
  components: {
    ProductFilter,
    ProductSorter,
    ProductCard
  },
  data() {
    return {
      products: [],
      filters: {
        title: '',
        minPrice: '',
        maxPrice: '',
        category: '',
        inStock: false
      },
      sortBy: 'title',
      sortOrder: 'asc',
      categories: ['Électronique', 'Périphériques', 'Vêtements', 'Maison', 'Sports', 'Livres']
    }
  },
  computed: {
    filteredProducts() {
      let result = [...this.products];
      
      // Filtres
      if (this.filters.title) {
        result = result.filter(p => p.title.toLowerCase().includes(this.filters.title.toLowerCase()));
      }
      
      if (this.filters.minPrice) {
        result = result.filter(p => p.price >= Number(this.filters.minPrice));
      }
      
      if (this.filters.maxPrice) {
        result = result.filter(p => p.price <= Number(this.filters.maxPrice));
      }
      
      if (this.filters.category) {
        result = result.filter(p => p.category === this.filters.category);
      }
      
      if (this.filters.inStock) {
        result = result.filter(p => p.inStock);
      }
      
      // Tri
      result.sort((a, b) => {
        let comparison = 0;
        
        if (this.sortBy === 'price') {
          comparison = a.price - b.price;
        } else if (this.sortBy === 'dateAdded') {
          comparison = new Date(a.dateAdded) - new Date(b.dateAdded);
        } else {
          comparison = a.title.localeCompare(b.title);
        }
        
        return this.sortOrder === 'asc' ? comparison : -comparison;
      });
      
      return result;
    }
  },
  methods: {
    resetFilters() {
      this.filters = {
        title: '',
        minPrice: '',
        maxPrice: '',
        category: '',
        inStock: false
      };
    },
    
    loadProducts() {
      this.products = productList;
    }
  },
  mounted() {
    this.loadProducts();
  }
}
</script>