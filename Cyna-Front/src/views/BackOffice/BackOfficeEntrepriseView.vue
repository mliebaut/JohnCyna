<script setup lang="ts">
import {getAllEntreprise} from "@/functions/functions.ts";
import {onMounted, ref} from "vue";
import BackOfficeNav from "@/components/BackOfficeNav.vue";

const myEntreprises = ref()
onMounted(async () => {
  myEntreprises.value = await getAllEntreprise()
})

function editEntreprises(id: number) {
  console.log(id)
  // Popup
}

function deleteEntreprises(id: number) {
  console.log(id)

}

</script>

<template>
  <main>
    <br>
    <BackOfficeNav></BackOfficeNav>
    <h3>
      Back Office Entreprise
    </h3>
    <div class="container mb-5 d-flex justify-content-center">

      <table class="table table-striped table-sm">
        <thead>
        <tr>
          <th>ID Entreprise</th>
          <th>nom</th>
          <th>phone</th>
          <th>site web</th>
          <th>Role</th>
         
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in myEntreprises" scope="row">
          <td>
            {{ item.id }}
          </td>
          
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.phone }}
          </td>
          <td>
            {{ item.website }}
          </td>
         
          <td>
            <button class="btn btn-success" @click="editEntreprises(item.id)">
              Edit
            </button>
            <button class="btn btn-danger" @click="deleteEntreprises(item.id)">
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped>

</style>