<template>
  <div>
    <h3>Plage de debug</h3>
    <hr>
    <div class="container-fluid" id="plage-debug">
      <div class="row m-2">
        <div id="left_column" class="col-4 d-flex flex-column justify-content-start text-start">
          <div>
            <button @click="local_ping()" class="btn btn-secondary">Ping server</button>
          </div>
          <div>
            <button @click="local_faker_generate" class="btn btn-primary">
              Faker - Generation de données
            </button>
          </div>
          <div>
            <button class="btn btn-secondary" @click="local_search_users">
              Find all Users
            </button>
          </div>
          <div>
            <button class="btn btn-secondary" @click="local_search_products">
              Find all products
            </button>
          </div>
          <div>
            <button @click="find_user_by_id(userID)" class="btn btn-info">Find user by id</button>
            <input v-model="userID" type="number" step="1">
          </div>

        </div>
        <div id="right_column" class="col d-flex flex-column">
          {{ ping_output }}
          <hr>
          {{fakerOutput}}
          <hr>
          {{userOutput}}
          <hr>
          {{productOutput}}
        </div>
        <div>
        </div>
      </div>

    </div>
    <hr>
    <h3>Router</h3>
    <div class="d-flex flex-column" style="background-color:deepskyblue">
      <router-link to="/">/</router-link>
      <router-link to="/about">about</router-link>
      <router-link to="/contact">contact</router-link>
      <router-link to="/mentions-legales">mentions-legales</router-link>
      <router-link to="/inscription">inscription</router-link>
      <router-link to="/connexion">connexion</router-link>
      <router-link to="/produit/1">produit numéro 1</router-link>
      <router-link to="/panier">Panier</router-link>
      <router-link to="/cgu">CGU</router-link>
      <router-link to="/checkout">Checkout</router-link>
      <router-link to="/success">Success</router-link>
      <router-link to="/cancel">Cancel</router-link>
      <router-link to="/historique">Historique</router-link>
      <router-link to="/catalogue">Catalogue</router-link>

      <hr>
      <router-link to="/account">account</router-link>
      <router-link to="/account/personal-info">Personal Info</router-link>
      <router-link to="/account/subscriptions">Subscriptions</router-link>
      <router-link to="/account/addresses">Addresses</router-link>
      <router-link to="/account/payment-methods">Payment Methods</router-link>
      <router-link to="/account/security">Security</router-link>
      <hr>
      <router-link to="/backoffice">backoffice</router-link>
      <router-link to="/backoffice/user">backoffice/user</router-link>
      <router-link to="/backoffice/dashboard">backoffice/dashboard</router-link>
      <router-link to="/backoffice/produits">backoffice/produits</router-link>
      <router-link to="/backoffice/entreprises">backoffice/entreprises</router-link>
      <router-link to="/backoffice/adresses">backoffice/adresses</router-link>
      <hr>
      <router-link to="/debug">about</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {faker_generate, ping_server} from "@/functions/functions.ts";
import {find_user_by_id, getAllUsers} from "@/functions/user.ts";
import {getAllProducts} from "@/functions/product.ts";

const userID = ref(0)
const ping_output = ref()
const userOutput = ref()
const productOutput = ref()
const fakerOutput = ref()

async function local_ping() {
  ping_output.value = await ping_server();
}

async function local_search_users() {
  userOutput.value = await getAllUsers();
}

async function local_search_products(){
  productOutput.value = await getAllProducts(0);
}
async function local_faker_generate(){
  fakerOutput.value = await faker_generate();
}

</script>

<style scoped>
#left_column {
  background-color: #ae6cff;
}

#right_column {
  background-color: #9bff5f;
}

#plage-debug {
  color:inherit;
}
</style>