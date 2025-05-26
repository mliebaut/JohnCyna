<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "404.vue"
})
</script>

<template>
  <div>
    <h1>404</h1>
    <div>La page que vous avez demandé n'est pas disponible.</div>
    <div>
      <RouterLink to="/">Retour accueil</RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>