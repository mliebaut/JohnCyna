
<template>
  <div>
    <h3>Plage de debug</h3>
    <hr>
    <div>
      Debug du ping
      <button @click="Funcs.ping_server()"></button>
    </div>
    <div>
      ID : {{ userID }}
      <input v-model="userID">
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Funcs from "../functions/functions.ts";
import {ref} from "vue";

const userId = ref("")

</script>

<style scoped>

</style>