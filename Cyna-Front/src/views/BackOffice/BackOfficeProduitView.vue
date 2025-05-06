<script setup lang="ts">
import {
  // createProduct,
  // deleteProduct,
  findProductById,
  getAllProducts,
  updateProduct,
} from "@/functions/functions.ts";
import {onMounted, ref} from "vue";
import BackOfficeNav from "@/components/BackOfficeNav.vue";

const myProducts = ref()
const productEditModal = ref()
const productEditModalOpen = ref(false)
// const userCreationModal = ref()
// const userCreateModalOpen = ref(false)
const closeButton = ref()
const selectedProduct = ref()
// const createdProduct = ref({
//   id: null,
//   ean: null,
//   GUID: null,
//   name: null,
//   description: null,
//   inStock: null,
//   createdAt: null,
//   updatedAt: null
// })
const modifiedProduct = ref({
  id: null,
  ean: null,
  GUID: null,
  name: null,
  description: null,
  inStock: null,
  createdAt: null,
  updatedAt: null
})

onMounted(async () => {
  myProducts.value = await getAllProducts()
  // TODO : Faire une fonction qui prends une liste de roles visible par l'utilisateur connecté. Genre, les moderateurs peuvent pas faire des admins.
  productEditModal.value = document.querySelector("#productDivEditModal")
  // userCreationModal.value = document.querySelector("#userCreationModal")
  closeButton.value = document.querySelector("#closeButton")
})

// ----------------------------------------------------------------

// Bouton sauvegarder
async function save(action: string): Promise<void> {
  console.log(action)
  switch (action) {
    // case "create":
    //   closeCreateModal()
    //   await sendCreatedUser()
    //   await getUpdatedProducts()
    //   break;
    case "edit":
      closeEditModal()
      await sendUpdatedProduct()
      await getUpdatedProducts()
      break;
  }
}

async function getUpdatedProducts(): Promise<void> {
  console.log("getUpdatedProducts()");
  myProducts.value = await getAllProducts()
}

/*PRODUCT EDIT*/
function openEditModal() {
  console.log("openEditModal")
  productEditModalOpen.value = true
}

function closeEditModal() {
  console.log("closeEditModal")
  productEditModalOpen.value = false;
}

async function sendUpdatedProduct(): Promise<void> {
  console.log(modifiedProduct.value)
  await updateProduct(modifiedProduct.value)
}

async function editProduct(productId: number) {
  console.log("editProduct ", productId)
  selectedProduct.value = await findProductById(productId)
  console.log(selectedProduct.value)
  //On ajoute les valeurs manuellement pour eviter du passage par référence à cause de vue. - Thomas
  modifiedProduct.value.id = selectedProduct.value.id;
  modifiedProduct.value.ean = selectedProduct.value.ean;
  modifiedProduct.value.GUID = selectedProduct.value.GUID;
  modifiedProduct.value.name = selectedProduct.value.name;
  modifiedProduct.value.description = selectedProduct.value.description;
  modifiedProduct.value.inStock = selectedProduct.value.inStock;
  openEditModal()
}

// /*PRODUCT DELETE*/
// function sendDeleteRequest(id: number) {
//   console.log(id)
//   deleteProduct(id)
// }
//
// /*PRODUCT CREATE*/
// function newUser(): void {
//   openCreateModal()
// }
//
// function openCreateModal(): void {
//   userCreateModalOpen.value = true
// }
//
// function closeCreateModal(): void {
//   userCreateModalOpen.value = false;
// }
//
// async function sendCreatedUser(): Promise<void> {
//   await createProduct(createdProduct.value)
// }
</script>

<template>
  <main>
    <br>
    <BackOfficeNav></BackOfficeNav>
    <h3>
      Back Office Products
    </h3>
    <div class="container mb-5">

      <div class="d-flex">
<!--        <button class="btn btn-success" @click="newUser()">-->
<!--          Nouveau-->
<!--        </button>-->
      </div>
      <table class="table table-striped table-sm">
        <thead>
        <tr>
          <th>ID Produit</th>
          <th>EAN</th>
          <th>GUID</th>
          <th>Nom</th>
          <th>Description</th>
          <th>En Stock</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in myProducts">
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
<!--            <button class="btn btn-danger" @click="sendDeleteRequest(item.id)">-->
<!--              Delete-->
<!--            </button>-->
          </td>
        </tr>
        </tbody>
      </table>
      <!-- The Modal -->
      <div id="productDivEditModal" class="modal" v-if="productEditModalOpen">
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close btn btn-close" @click="closeEditModal"></span>
          <h3>Edition Produit</h3>
          <div class="d-flex-column p-1 m-1">
            <div class="d-flex justify-content-between text-start">
              ID: {{ selectedProduct.id }}
              <div></div>
            </div>
            <div class="d-flex justify-content-between text-start">
              EAN : {{ selectedProduct.ean }}
              <input v-model="modifiedProduct.ean">
            </div>
            <div class="d-flex justify-content-between text-start">
              GUID: {{ selectedProduct.GUID }}
              <input type="text" v-model="modifiedProduct.GUID">
            </div>
            <div class="d-flex justify-content-between text-start">
              name : {{ selectedProduct.name }}
              <input type="text" v-model="modifiedProduct.name">
            </div>
            <div class="d-flex justify-content-between text-start">
              Description : {{ selectedProduct.description }}
              <input type="text" v-model="modifiedProduct.description">
            </div>
            <div class="d-flex justify-content-between text-start">
              In Stock : {{ selectedProduct.inStock }}
              <input type="text" v-model="modifiedProduct.inStock">
            </div>
            <hr>
            <div class="d-flex justify-content-between text-start">
              <div>
                Created :
                {{ selectedProduct.createdAt }}
              </div>
              <div>
              </div>
            </div>
            <div class="d-flex justify-content-between text-start">
              <div>
                Updated :
                {{ selectedProduct.updatedAt }}
              </div>
              <div>
              </div>
            </div>
            <hr>
            <div class="d-flex justify-content-between ">
              <button type="button" class="btn btn-success" @click="save('edit')">Sauvegarder</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de creation utilisateur      -->
<!--      <div id="userCreationModal" class="modal" v-if="userCreateModalOpen">-->
<!--        &lt;!&ndash; Modal content &ndash;&gt;-->
<!--        <div class="modal-content">-->
<!--          <span class="close btn btn-close" @click="closeCreateModal"></span>-->
<!--          <h3>Creation d'utilisateur</h3>-->
<!--          <div class="d-flex-column p-1 m-1">-->
<!--            <div class="d-flex justify-content-between text-start">-->
<!--              Email :-->
<!--              <input v-model="createdProduct.email">-->
<!--            </div>-->
<!--            <div class="d-flex justify-content-between text-start">-->
<!--              <div>-->
<!--                FirstName:-->
<!--              </div>-->
<!--              <input type="text" v-model="createdProduct.firstName">-->
<!--            </div>-->
<!--            <div class="d-flex justify-content-between text-start">-->
<!--              LastName :-->
<!--              <input type="text" v-model="createdProduct.lastName">-->
<!--            </div>-->
<!--            <div class="d-flex justify-content-between text-start">-->
<!--              Password :-->
<!--              <input v-model="createdProduct.password">-->
<!--            </div>-->
<!--            <hr>-->
<!--            <div class="d-flex justify-content-between">-->
<!--              <button type="button" class="btn btn-success" @click="save('create')">Sauvegarder</button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->


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