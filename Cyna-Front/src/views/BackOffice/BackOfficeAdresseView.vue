<script setup lang="ts">
import {getAllAddresses} from "@/functions/functions.ts";
import {onMounted, ref} from "vue";
import BackOfficeNav from "@/components/BackOfficeNav.vue";

const myAdresses = ref()
onMounted(async () => {
  myAdresses.value = await getAllAddresses()
})

function editAdresses(id: number) {
  console.log(id)
  // Popup
}

function deleteAdresses(id: number) {
  console.log(id)

}

</script>

<template>
  <main>
    <br>
    <BackOfficeNav></BackOfficeNav>
    <h3>
      Back Office Adresse
    </h3>
    <div class="container mb-5 d-flex justify-content-center">

      <table class="table table-striped table-sm">
        <thead>
        <tr>
          <th>ID Adresse</th>
          <th>Nom de la rue </th>
          <th>numero de la rue </th>
          <th>code postal</th>
          <th>nom de la ville</th>
          <th>Pays</th>
          <th>Information Extra</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in myAdresses" scope="row">
          <td>
            {{ item.id }}
          </td>
          <td>
            {{ item.streetName }}
          </td>
          <td>
            {{ item.streetNumber }}
          </td>
          <td>
            {{ item.postalCode }}
          </td>
          <td>
            {{ item.cityName }}
          </td>
          <td>
            {{ item.country }}
          </td>
          <td>
            {{ item.extraInformation }}
          </td>
          <td>
            <button class="btn btn-success" @click="editAdresses(item.id)">
              Edit
            </button>
            <button class="btn btn-danger" @click="deleteAdresses(item.id)">
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