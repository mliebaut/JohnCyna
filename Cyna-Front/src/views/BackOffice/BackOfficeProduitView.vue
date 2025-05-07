<script setup lang="ts">
import {getAllProducts} from "@/functions/functions.ts";
import {onMounted, ref} from "vue";
import BackOfficeNav from "@/components/BackOfficeNav.vue";

const myProduits = ref()
onMounted(async () => {
  myProduits.value = await getAllProducts()
})

function editProduct(id: number) {
  console.log(id)
  // Popup
}


function deleteProduct(id: number) {
  console.log(id)

}

</script>

<template>
  <main>
    <br>
    <BackOfficeNav></BackOfficeNav>

    <h3>
      Back Office Produit
    </h3>
    <div class="container mb-5 d-flex justify-content-center">

      <table class="table table-striped table-sm table-bordered">
        <thead>
        <tr>
          <th>ID Produit</th>
          <th>EAN</th>
          <th>GUID Produit</th>
          <th>Nom</th>
          <th>Description</th>
          <th>En Stock</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in myProduits" scope="row">
          <td>
            {{ item.id }}
          </td>
          <td>
            {{ item.ean }}
          </td>
          <td>
            {{ item.GUID }}
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.description }}
          </td>
          <td>
            {{ item.inStock }}
          </td>
          <td>
            {{ item.createdAt }}
          </td>
          <td>
            {{ item.updatedAt }}
          </td>
          <td>
            <button class="btn btn-success" @click="editProduct(item.id)">
              Edit
            </button>
            <button class="btn btn-danger" @click="deleteProduct(item.id)">
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