
<template>
  <div>
    <h3>Plage de debug</h3>
    <hr>
    <div>
      Debug du ping
      <button @click="ping_server()"></button>
    </div>
    <div>
      ID : {{ userID }}
      <input v-model="userID">
    </div>
  </div>
</template>

<script setup lang="ts">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          import {ref} from "vue";
import Serv_Url from "../main.ts";

const userID = ref("")

async function ping_server(){
  const response = await fetch(Serv_Url, {
    method: "POST",
    body: JSON.stringify({ username: "example" }),
    // headers: myHeaders,
    mode:"no-cors"
  });
  console.log(response);
}

</script>

<style scoped>

</style>