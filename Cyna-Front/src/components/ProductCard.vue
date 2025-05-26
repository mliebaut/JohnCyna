<template>
  <div class="card h-100">
    <!-- Image du produit -->
    <img 
      :src="product.image" 
      :alt="product.title"
      class="card-img-top product-image"
    >
    <div class="card-body">
      <h5>{{ product.title }}</h5>
      <p class="small text-muted">{{ product.description }}</p>
      <div class="d-flex justify-content-between mb-2">
        <span class="fs-5 fw-bold">{{ product.price }} €</span>
        <span :class="product.inStock ? 'badge bg-success' : 'badge bg-danger'">
          {{ product.inStock ? 'En stock' : 'Rupture' }}
        </span>
      </div>
      <div>
        <span class="badge bg-secondary">{{ product.category }}</span>
      </div>
      <hr>
      <div v-if="product.specs">
        <p class="mb-1 fw-semibold">Caractéristiques:</p>
        <ul class="list-unstyled small specs-list">
          <li v-for="(value, key) in product.specs" :key="key" class="mb-1">
            <strong>{{ formatSpecName(key) }}:</strong> {{ value }}
          </li>
        </ul>
      </div>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary w-100">Voir détails</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    // Formater les noms de spécifications pour l'affichage
    formatSpecName(key) {
      // Convertir snake_case en format lisible
      const formatted = key.replace(/_/g, ' ');
      // Mettre en majuscule la première lettre
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }
  }
}
</script>

<style scoped>
.product-image {
  height: 200px;
  object-fit: cover;
  object-position: center;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* Style pour les spécifications */
.specs-list li {
  padding: 2px 0;
}

/* Pour que les spécifications alternent en couleur */
.specs-list li:nth-child(odd) {
  background-color: rgba(0,0,0,0.02);
}
</style>