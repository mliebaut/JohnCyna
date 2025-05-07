<template>
  <div>
    <h3>Plage de debug</h3>
    <hr>
    <div class="container-fluid" id="plage-debug">
      <div class="row m-2">
        <div id="left_column" class="col-8 d-flex flex-column justify-content-start text-start">
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
          {{ ping_output }}
        </div>
        <div>
        </div>
      </div>

    </div>
    <hr>
    <h3>Router</h3>
    <div class="d-flex flex-column justify-content-start">
      <router-link to="/">/</router-link>
      <router-link to="/about">about</router-link>
      <router-link to="/contactOld">contactOld</router-link>
      <router-link to="/contact">contact</router-link>
      <router-link to="/mentions-legales">mentions-legales</router-link>
      <router-link to="/inscription">inscription</router-link>
      <router-link to="/connexion">connexion</router-link>
      <router-link to="/produit">produit</router-link>
      <router-link to="/panier">panier</router-link>
      <router-link to="/cgu">cgu</router-link>
      <router-link to="/checkout">checkout</router-link>
      <router-link to="/success">success</router-link>
      <router-link to="/cancel">cancel</router-link>
      <router-link to="/historique">historique</router-link>
      <router-link to="/account">account</router-link>
      <router-link to="/account1">account1</router-link>
      <router-link to="/backoffice">backoffice</router-link>
      <router-link to="/backoffice/user">backoffice/user</router-link>
      <router-link to="/backoffice/dashboard">backoffice/dashboard</router-link>
      <router-link to="/backoffice/produits">backoffice/produits</router-link>
      <router-link to="/backoffice/entreprises">backoffice/entreprises</router-link>
      <router-link to="/backoffice/adresses">backoffice/adresses</router-link>
      <router-link to="/debug">about</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {find_user_by_id, ping_server} from "../functions/functions.ts";

const userID = ref(0)
const ping_output = ref("")

async function local_ping() {
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