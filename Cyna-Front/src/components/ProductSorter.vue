<template>
  <div class="card mb-3">
    <div class="card-body d-flex justify-content-between align-items-center">
      <div>
        <span>Trier par:</span>
        <select 
          :value="sortBy" 
          @change="$emit('update:sort-by', $event.target.value)" 
          class="form-select d-inline-block w-auto mx-2"
        >
          <option value="title">Titre</option>
          <option value="price">Prix</option>
          <option value="dateAdded">Nouveauté</option>
        </select>
        <select 
          :value="sortOrder" 
          @change="$emit('update:sort-order', $event.target.value)" 
          class="form-select d-inline-block w-auto"
        >
          <option value="asc">Ascendant</option>
          <option value="desc">Descendant</option>
        </select>
      </div>
      <span class="badge bg-info">{{ resultCount }} résultats</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductSorter',
  props: {
    sortBy: {
      type: String,
      required: true
    },
    sortOrder: {
      type: String,
      required: true
    },
    resultCount: {
      type: Number,
      required: true
    }
  }
}
</script>