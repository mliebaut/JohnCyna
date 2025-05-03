<script setup lang="ts">
import {createUser, deleteUser, find_user_by_id, getAllRoles, getAllUsers, updateUser} from "@/functions/functions.ts";
import {onMounted, ref} from "vue";
import BackOfficeNav from "@/components/BackOfficeNav.vue";

const myUsers = ref()
const userEditModal = ref()
const userEditModalOpen = ref(false)
const userCreationModal = ref()
const userCreateModalOpen = ref(false)
const closeButton = ref()
const selectedUser = ref()
const createdUser = ref({
  id: null,
  email: null,
  lastName: null,
  firstName: null,
  password: null,
  createdAt: null,
  updatedAt: null,
  role: null,
})
const modifiedUser = ref({
  id: null,
  email: null,
  lastName: null,
  firstName: null,
  createdAt: null,
  updatedAt: null,
  role: null,
})
const rolesList = ref()

onMounted(async () => {
  myUsers.value = await getAllUsers()
  // TODO : Faire une fonction qui prends une liste de roles visible par l'utilisateur connecté. Genre, les moderateurs peuvent pas faire des admins.
  rolesList.value = await getAllRoles()
  userEditModal.value = document.querySelector("#userEditModal")
  userCreationModal.value = document.querySelector("#userCreationModal")

  closeButton.value = document.querySelector("#closeButton")
})

// ----------------------------------------------------------------

async function createOrEditUser(action: string): Promise<void> {
  console.log(action)
  switch (action) {
    case "create":
      closeCreateModal()
      await sendCreatedUser()
      await getUpdatedUsers()
      break;
    case "edit":
      closeEditModal()
      await sendUpdatedUser()
      await getUpdatedUsers()
      break;
  }

}

async function getUpdatedUsers(): Promise<void> {
  myUsers.value = await getAllUsers()
}

/*USER EDIT*/
function openEditModal() {
  userEditModalOpen.value = true
}

function closeEditModal() {
  userEditModalOpen.value = false;
}

async function sendUpdatedUser(): Promise<void> {
  await updateUser(modifiedUser.value)
}

async function editUser(id: number) {
  selectedUser.value = await find_user_by_id(id)
  //On ajoute les valeurs manuellement pour eviter du passage par référence à cause de vue. - Thomas
  modifiedUser.value.id = selectedUser.value.id;
  modifiedUser.value.email = selectedUser.value.email;
  modifiedUser.value.lastName = selectedUser.value.lastName;
  modifiedUser.value.firstName = selectedUser.value.firstName;
  modifiedUser.value.role = selectedUser.value.role;
  openEditModal()
}

/*USER DELETE*/
function sendDeleteRequest(id: number) {
  console.log(id)
  deleteUser(id)
}

/*USER CREATE*/
function newUser(): void {
  openCreateModal()
}

function openCreateModal() : void{
  userCreateModalOpen.value = true
}

function closeCreateModal() : void{
  userCreateModalOpen.value = false;
}

async function sendCreatedUser(): Promise<void> {
  await createUser(createdUser.value)
}
</script>

<template>
  <main>
    <br>
    <BackOfficeNav></BackOfficeNav>
    <h3>
      Back Office Utilisateurs
    </h3>
    <div class="container mb-5">

      <div class="d-flex">
        <button class="btn btn-success" @click="newUser()">
          Nouveau
        </button>
      </div>
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
        <tr v-for="item in myUsers">
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
            <button class="btn btn-danger" @click="sendDeleteRequest(item.id)">
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- The Modal -->
      <div id="userEditModal" class="modal" v-if="userEditModalOpen">
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close btn btn-close" @click="closeEditModal"></span>
          <h3>Edition d'utilisateur</h3>
          <div class="d-flex-column p-1 m-1">
            <div class="d-flex justify-content-between text-start">
              ID: {{ selectedUser.id }}
              <div></div>
            </div>
            <div class="d-flex justify-content-between text-start">
              Email : {{ selectedUser.email }}
              <input v-model="modifiedUser.email">
            </div>
            <div class="d-flex justify-content-between text-start">
              <div>
                FirstName: {{ selectedUser.firstName }}
              </div>
              <input type="text" v-model="modifiedUser.firstName">
            </div>
            <div class="d-flex justify-content-between text-start">
              LastName : {{ selectedUser.lastName }}
              <input type="text" v-model="modifiedUser.lastName">
            </div>
            <div class="d-flex justify-content-between text-start">
              Role : {{ selectedUser.role }}
              <!--              <input type="text"  v-model="modifiedUser.email" :placeholder="modifiedUser.email">-->
              <select v-model="modifiedUser.role">
                <option v-for="option in rolesList" :value="option.value">
                  {{ option }}
                </option>
              </select>
            </div>
            <hr>
            <div class="d-flex justify-content-between text-start">
              <div>
                Created :
                {{ selectedUser.createdAt }}
              </div>
              <div>
              </div>
            </div>
            <div class="d-flex justify-content-between text-start">
              <div>
                Updated :
                {{ selectedUser.updatedAt }}
              </div>
              <div>
              </div>
            </div>
            <hr>
            <div class="d-flex justify-content-between ">
              <button type="button" class="btn btn-success" @click="createOrEditUser('edit')">Sauvegarder</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de creation utilisateur      -->
      <div id="userCreationModal" class="modal" v-if="userCreateModalOpen">
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close btn btn-close" @click="closeCreateModal"></span>
          <h3>Creation d'utilisateur</h3>
          <div class="d-flex-column p-1 m-1">
            <div class="d-flex justify-content-between text-start">
              Email :
              <input v-model="createdUser.email">
            </div>
            <div class="d-flex justify-content-between text-start">
              <div>
                FirstName:
              </div>
              <input type="text" v-model="createdUser.firstName">
            </div>
            <div class="d-flex justify-content-between text-start">
              LastName :
              <input type="text" v-model="createdUser.lastName">
            </div>
            <div class="d-flex justify-content-between text-start">
              Password :
              <input v-model="createdUser.password">
            </div>
            <div class="d-flex justify-content-between text-start">
              Role :
              <!--              <input type="text"  v-model="modifiedUser.email" :placeholder="modifiedUser.email">-->
              <select v-model="createdUser.role">
                <option v-for="option in rolesList" :value="option.value">
                  {{ option }}
                </option>
              </select>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
              <button type="button" class="btn btn-success" @click="createOrEditUser('create')">Sauvegarder</button>
            </div>
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
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
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