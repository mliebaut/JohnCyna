<script setup lang="ts">
import BackOfficeNav from "@/components/BackOfficeNav.vue";
</script>

<template>
<!--  <BackOfficeNav></BackOfficeNav>-->
  <main>
    <h3>
      Back Office
    </h3>
    <div>
      <RouterLink to="/backoffice/user">Gestion des utilisateurs</RouterLink>
    </div>
    <div>
      <RouterLink to="/backoffice/produit">Gestion des produits</RouterLink>
    </div>
    <div>
      <RouterLink to="/backoffice/entreprises">Gestion des entreprises</RouterLink>
    </div>
    <div>
      <RouterLink to="/backoffice/produit">Gestion des adresses</RouterLink>
    </div>
  </main>
</template>

<style scoped>

</style>