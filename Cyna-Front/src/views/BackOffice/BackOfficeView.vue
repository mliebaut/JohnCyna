<script setup lang="ts">
import BackOfficeNav from "@/components/BackOfficeNav.vue";
</script>

<template>
  <!-- <BackOfficeNav /> -->

  <main style="padding: 2rem; font-family: sans-serif; background-color: #f8f9fa; min-height: 100vh;">
    <h2 style="margin-bottom: 2rem; text-align: center;">🎛️ Interface Back Office</h2>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
      <RouterLink
        to="/backoffice/user"
        class="card-link"
      >
        👤 Gestion des utilisateurs
      </RouterLink>

      <RouterLink
        to="/backoffice/produits"
        class="card-link"
      >
        📦 Gestion des produits
      </RouterLink>

      <RouterLink
        to="/backoffice/entreprises"
        class="card-link"
      >
        🏢 Gestion des entreprises
      </RouterLink>

      <RouterLink
        to="/backoffice/adresses"
        class="card-link"
      >
        📍 Gestion des adresses
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.card-link {
  display: block;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  text-decoration: none;
  color: #333;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-link:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  background-color: #f0f8ff;
}
</style>
