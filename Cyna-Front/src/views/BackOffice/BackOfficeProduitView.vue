<script setup lang="ts">
import {
  createProduct,
  deleteProduct,
  findProductById, getAllCategories,
  getAllProducts,
  updateProduct,
} from "@/functions/functions.ts";
import {onMounted, ref} from "vue";
import BackOfficeNav from "@/components/BackOfficeNav.vue";

const myProducts = ref()
const closeButton = ref()

const productEditModal = ref()
const productEditModalOpen = ref(false)

const productCreationModal = ref()
const productCreateModalOpen = ref(false)

const selectedProduct = ref()
const createdProduct = ref({
  ean: null,
  GUID: null,
  name: null,
  description: null,
  inStock: null,
  categories: null
})
const modifiedProduct = ref({
  id: null,
  ean: null,
  GUID: null,
  name: null,
  description: null,
  inStock: null,
  categories: [],
})
const categoriesList = ref()

onMounted(async () => {
  myProducts.value = await getAllProducts(1)
  // TODO : Faire une fonction qui prends une liste de roles visible par l'utilisateur connecté. Genre, les moderateurs peuvent pas faire des admins.
  categoriesList.value = await getAllCategories();
  productEditModal.value = document.querySelector("#productDivEditModal")
  productCreationModal.value = document.querySelector("#productCreationModal")
  closeButton.value = document.querySelector("#closeButton")
})

// ----------------------------------------------------------------

// Bouton sauvegarder
async function save(action: string): Promise<void> {
  switch (action) {
    case "create":
      closeCreateModal()
      await sendCreatedProduct()
      await getUpdatedProducts()
      break;
    case "edit":
      closeEditModal()
      await sendUpdatedProduct()
      await getUpdatedProducts()
      break;
  }
}

async function getUpdatedProducts(): Promise<void> {
  myProducts.value = await getAllProducts(1)
}

/*PRODUCT EDIT*/
function openEditModal() {
  productEditModalOpen.value = true
}

function closeEditModal() {
  productEditModalOpen.value = false;
}

async function editProduct(productId: number) {
  selectedProduct.value = await findProductById(productId, 1)
  //On ajoute les valeurs manuellement pour eviter du passage par référence à cause de vue. - Thomas
  modifiedProduct.value.id = selectedProduct.value.id;
  modifiedProduct.value.ean = selectedProduct.value.ean;
  modifiedProduct.value.GUID = selectedProduct.value.GUID;
  modifiedProduct.value.name = selectedProduct.value.name;
  modifiedProduct.value.description = selectedProduct.value.description;
  modifiedProduct.value.inStock = selectedProduct.value.inStock;
  modifiedProduct.value.categories = selectedProduct.value.categories;
  openEditModal()
}

async function sendUpdatedProduct(): Promise<void> {
  await updateProduct(modifiedProduct.value)
}

// /*PRODUCT DELETE*/
function sendDeleteRequest(id: number) {
  deleteProduct(id)
}

/*PRODUCT CREATE*/
function newProduct(): void {
  openCreateModal()
}

function openCreateModal(): void {
  productCreateModalOpen.value = true
}

function closeCreateModal(): void {
  productCreateModalOpen.value = false;
}

async function sendCreatedProduct(): Promise<void> {
  await createProduct(createdProduct.value)
}

function addRemoveCategory(option: object) {
  console.log(modifiedProduct.value)
  console.log(option)
  if(modifiedProduct.value.categories.find(element => element['id'] == option.id)) {
    console.log("Found category")
    modifiedProduct.value.categories = modifiedProduct.value.categories.filter(element => element.id != option.id)
    console.log(modifiedProduct.value.categories)
  } else {
    console.log("Didn't find category")
    modifiedProduct.value.categories.push(option)
  }
}
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
        <button class="btn btn-success" @click="newProduct()">
          Nouveau
        </button>
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
            <button class="btn btn-danger" @click="sendDeleteRequest(item.id)">
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- Modal Edition -->
      <div id="productDivEditModal" class="modal" v-if="productEditModalOpen">
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close btn btn-close" @click="closeEditModal"></span>
          <h3>Edition Produit</h3>
          <div class="d-flex-column p-1 m-1">
            <div class="d-flex flex-column justify-content-between ps-2 text-start">
              ID: {{ selectedProduct.id }}
              <div></div>
            </div>
            <div class="d-flex flex-column justify-content-between ps-2 text-start">
              EAN :
              <div>
                {{ selectedProduct.ean }}
              </div>
              <input v-model="modifiedProduct.ean">
            </div>
            <div class="d-flex flex-column justify-content-between ps-2 text-start">
              GUID: {{ selectedProduct.GUID }}
              <input type="text" v-model="modifiedProduct.GUID">
            </div>
            <div class="d-flex flex-column justify-content-between ps-2 text-start">
              name : {{ selectedProduct.name }}
              <input type="text" v-model="modifiedProduct.name">
            </div>
            <div class="d-flex flex-column flex-column justify-content-between ps-2 text-start">
              <div>
                Description :
              </div>
              <div>
                {{ selectedProduct.description }}
              </div>
              <input type="text" v-model="modifiedProduct.description">
            </div>
            <div class="d-flex flex-column justify-content-between ps-2 text-start">
              In Stock : {{ selectedProduct.inStock }}
              <input type="text" v-model="modifiedProduct.inStock">
            </div>
            <div class="d-flex flex-column justify-content-between ps-2 text-start">
              Categories :
              <div>
<!--                {{ selectedProduct.categories }}-->
              </div>
              <div v-for="cat in modifiedProduct.categories">
                {{ cat.id }} - {{cat.name}}
              </div>
              <select v-model="selectedProduct.categories">
                <option v-for="option in categoriesList" @click="addRemoveCategory(option)">
                  {{ option.id }} - {{ option.name }}
                </option>
              </select>
            </div>
            <hr>
            <div class="d-flex flex-column justify-content-between ps-2 text-start">
              <div>
                Created :
                {{ selectedProduct.createdAt }}
              </div>
              <div>
              </div>
            </div>
            <div class="d-flex flex-column justify-content-between ps-2 text-start">
              <div>
                Updated :
                {{ selectedProduct.updatedAt }}
              </div>
              <div>
              </div>
            </div>
            <hr>
            <div class="d-flex justify-content-between ps-2 ">
              <button type="button" class="btn btn-success" @click="save('edit')">Sauvegarder</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de creation      -->
      <div id="productCreationModal" class="modal" v-if="productCreateModalOpen">
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close btn btn-close" @click="closeCreateModal"></span>
          <h3>Creation produit</h3>
          <div class="d-flex-column p-1 m-1">
            <div class="d-flex justify-content-between ps-2 text-start">
              Nom :
              <input v-model="createdProduct.name">
            </div>
            <div class="d-flex justify-content-between ps-2 text-start">
              Description :
              <input type="text" v-model="createdProduct.description">
            </div>
            <div class="d-flex justify-content-between ps-2 text-start">
              EAN :
              <input type="text" v-model="createdProduct.ean">
            </div>
            <div class="d-flex justify-content-between ps-2 text-start">
              GUID :
              <input v-model="createdProduct.GUID">
            </div>
            <div class="d-flex justify-content-between ps-2 text-start">
              En Stock :
              <input v-model="createdProduct.inStock">
            </div>
            <br>
            <div class="d-flex flex-column justify-content-between text-start">
              <div>
              Categories :

              </div>
              <select v-model="createdProduct.categories">
                <option v-for="option in categoriesList" :value="option.value">
                  {{ option.id }} - {{ option.name }}
                </option>
              </select>
            </div>
            <hr>
            <div class="d-flex justify-content-between ps-2">
              <button type="button" class="btn btn-success" @click="save('create')">Sauvegarder</button>
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