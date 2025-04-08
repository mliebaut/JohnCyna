<script setup lang="ts">
import {getAllUsers} from "../../functions/functions.ts";
import {onMounted, ref} from "vue";
import BackOfficeNav from "@/components/BackOfficeNav.vue";

const myUsers = ref()
onMounted(async () => {
  myUsers.value = await getAllUsers()
})

function editUser(id: number) {
  console.log(id)
  // Popup
}

function deleteUser(id: number) {
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
          <th>ID Utilisateur</th>
          <th>Email</th>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Role</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in myUsers" scope="row">
          <td>
            {{ item.id }}
          </td>
          <td>
            {{ item.email }}
          </td>
          <td>
            {{ item.firstName }}
          </td>
          <td>
            {{ item.lastName }}
          </td>
          <td>
            {{ item.role }}
          </td>
          <td>
            {{ item.createdAt }}
          </td>
          <td>
            {{ item.updatedAt }}
          </td>
          <td>
            <button class="btn btn-success" @click="editUser(item.id)">
              Edit
            </button>
            <button class="btn btn-danger" @click="deleteUser(item.id)">
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