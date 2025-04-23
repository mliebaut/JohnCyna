<script setup lang="ts">
import {find_user_by_id, getAllUsers} from "@/functions/functions.ts";
import {onMounted, ref} from "vue";
import BackOfficeNav from "@/components/BackOfficeNav.vue";

const myUsers = ref()
const myModal = ref()
const closeButton = ref()
const selectedUser = ref()
const modalOpen = ref(false)
onMounted(async () => {
  myUsers.value = await getAllUsers()
  myModal.value = document.querySelector("#myModal")
  closeButton.value = document.querySelector("#closeButton")
})

async function editUser(id: number) {
  selectedUser.value = await find_user_by_id(id)
  openModal()
}

function deleteUser(id: number) {
  console.log(id)
}

function openModal() {
  modalOpen.value = true
}
function closeModal() {
  modalOpen.value = false;
}


</script>

<template>
  <main @click="closeModal">
    <br>
    <BackOfficeNav></BackOfficeNav>
    <h3>
      Back Office Utilisateurs
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
      <!-- The Modal -->
      <div id="myModal" class="modal" v-if="modalOpen">
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <p>Edition d'utilisateur</p>
          <div>ID: {{ selectedUser.id }}</div>
          <div>
            Email : {{  selectedUser.email }}
          </div>
          <div>
            FirstName: {{  selectedUser.firstName }}
          </div>
          <div>
            LastName : {{  selectedUser.lastName }}
          </div>
          <div>
            Role : {{  selectedUser.role }}
          </div>
          <div>
            Created : {{  selectedUser.createdAt }}
          </div>
          <div>
            Updated : {{  selectedUser.updatedAt }}

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

/* https://www.w3schools.com/howto/howto_css_modals.asp */
/* The Modal (background) */
.modal {
  display: block;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}


</style>