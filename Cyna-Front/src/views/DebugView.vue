<template>
  <div>
    <h3>Plage de debug</h3>
    <hr>
    <div class="container-fluid" id="plage-debug">
      <div class="row m-2">

      <div id="left_column" class="col-8 d-flex flex-column justify-content-start text-start" >
        <div>
          <button @click="local_ping()">Ping server</button>
        </div>
        <div>
          Find all Users
          <div></div>
        </div>
        <div>
          Find all products
          <div></div>
        </div>
        <div>
          Find user by id
          <input v-model="userID" type="number" step="1">
          <button @click="find_user_by_id(userID)" class="btn btn-primary">Find</button>
        </div>

      </div>
      <div id="right_column" class="col d-flex flex-column">
        {{ping_output}}

      </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {ping_server} from "../functions/functions.ts";
import {find_user_by_id} from "../functions/functions.ts";

const userID = ref(0)
const ping_output = ref("")

async function local_ping(){
  let response = await ping_server();
  ping_output.value = response.toString();
}

ping_server()
</script>

<style scoped>
#left_column {
  background-color: #9a47ff;
}

#right_column {
  background-color: #161B33;
}

#plage-debug {
  color: white;
}
</style>