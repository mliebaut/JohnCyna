<script setup lang="ts">


import {find_user_by_id} from "@/functions/functions.ts";
import {onMounted, ref} from "vue";

const myUserInfo = ref()
onMounted(async () => {
  // await getMyUserInfo()
})

async function getMyUserInfo() {
  myUserInfo.value = await find_user_by_id(user_id.value);
}

const user_id = ref()
</script>

<template>
  <div class="container">
    <h3>Mon Compte</h3>
    <div v-if="user_id">

      <div>
        Nom :
        {{ myUserInfo.firstName }}
      </div>
      <div>
        Prénom :
        {{ myUserInfo.lastName }}
      </div>
      <div>
        Email :
        {{ myUserInfo.email }}
      </div>
      <div>
        Entreprises :
      </div>
      <div>
        Adresse :
      </div>
    </div>
    <hr>
    <h3>Modification de mot de passe</h3>
    <h3>Modification coordonées</h3>
    <hr>
    <div>
      <hr>
      <p>
        Debug - Input the user ID
      </p>
      <div>
        <div>
          User ID :
          <input v-model="user_id" type="number">
        </div>
      </div>
      <button @click="getMyUserInfo">Get user info</button>
    </div>
  </div>
</template>

<style scoped>

</style>