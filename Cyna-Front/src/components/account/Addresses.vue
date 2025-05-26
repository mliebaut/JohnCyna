<template>
    <div class="addresses">
      <h1 class="mb-4">Adresses</h1>
      <p class="text-muted mb-4">Gérez vos adresses de facturation et de livraison.</p>
  
      <b-alert 
        v-model="showSuccessMessage" 
        variant="success" 
        dismissible
      >
        {{ successMessage }}
      </b-alert>
      
      <div class="mb-4 d-flex justify-content-between align-items-center">
        <h2 class="h4 mb-0">Vos adresses</h2>
        <b-button variant="primary" @click="showAddAddressModal">
          <i class="bi bi-plus"></i> Ajouter une adresse
        </b-button>
      </div>
      
      <b-row>
        <b-col md="6" v-for="(address, index) in addresses" :key="index" class="mb-4">
          <b-card>
            <div class="d-flex justify-content-between mb-2">
              <h3 class="h5 mb-0">{{ address.label }}</h3>
              <div>
                <b-badge 
                  v-if="address.isDefault" 
                  variant="success" 
                  class="me-2"
                >
                  Par défaut
                </b-badge>
                <b-badge v-if="address.type === 'billing'">Facturation</b-badge>
                <b-badge v-if="address.type === 'shipping'">Livraison</b-badge>
                <b-badge v-if="address.type === 'both'">Facturation & Livraison</b-badge>
              </div>
            </div>
            
            <address class="mb-3">
              <strong>{{ address.name }}</strong><br>
              {{ address.street }}<br>
              {{ address.zipCode }} {{ address.city }}<br>
              {{ address.country }}
            </address>
            
            <div class="d-flex">
              <b-button 
                variant="outline-primary" 
                size="sm" 
                class="me-2"
                @click="editAddress(address)"
              >
                Modifier
              </b-button>
              <b-button 
                v-if="!address.isDefault"
                variant="outline-success" 
                size="sm" 
                class="me-2"
                @click="setDefaultAddress(address.id)"
              >
                Définir par défaut
              </b-button>
              <b-button 
                variant="outline-danger" 
                size="sm"
                @click="deleteAddress(address.id)"
              >
                Supprimer
              </b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
      
      <div v-if="addresses.length === 0" class="text-center py-5">
        <p class="text-muted">Aucune adresse enregistrée.</p>
        <b-button variant="primary" @click="showAddAddressModal">
          Ajouter une adresse
        </b-button>
      </div>
      
      <!-- Modal pour ajouter/modifier une adresse -->
      <b-modal 
        v-model="showAddressModal" 
        :title="isEditing ? 'Modifier l\'adresse' : 'Ajouter une adresse'"
        @ok="saveAddress"
      >
        <b-form>
          <b-form-group label="Intitulé" label-for="address-label">
            <b-form-input
              id="address-label"
              v-model="currentAddress.label"
              placeholder="Domicile, Bureau, etc."
              required
            ></b-form-input>
          </b-form-group>
          
          <b-form-group label="Nom complet" label-for="address-name">
            <b-form-input
              id="address-name"
              v-model="currentAddress.name"
              placeholder="Nom complet"
              required
            ></b-form-input>
          </b-form-group>
          
          <b-form-group label="Adresse" label-for="address-street">
            <b-form-input
              id="address-street"
              v-model="currentAddress.street"
              placeholder="Numéro et nom de rue"
              required
            ></b-form-input>
          </b-form-group>
          
          <b-row>
            <b-col md="4">
              <b-form-group label="Code postal" label-for="address-zipcode">
                <b-form-input
                  id="address-zipcode"
                  v-model="currentAddress.zipCode"
                  placeholder="Code postal"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="8">
              <b-form-group label="Ville" label-for="address-city">
                <b-form-input
                  id="address-city"
                  v-model="currentAddress.city"
                  placeholder="Ville"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          
          <b-form-group label="Pays" label-for="address-country">
            <b-form-input
              id="address-country"
              v-model="currentAddress.country"
              placeholder="Pays"
              required
            ></b-form-input>
          </b-form-group>
          
          <b-form-group label="Type d'adresse" label-for="address-type">
            <b-form-select
              id="address-type"
              v-model="currentAddress.type"
              :options="addressTypeOptions"
              required
            ></b-form-select>
          </b-form-group>
          
          <b-form-group>
            <b-form-checkbox v-model="currentAddress.isDefault">
              Définir comme adresse par défaut
            </b-form-checkbox>
          </b-form-group>
        </b-form>
      </b-modal>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { addressservice } from '../../functions/addressservice';
  
  interface Address {
    id?: number;
    label: string;
    name: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
    type: string;
    isDefault: boolean;
  }
  
  export default defineComponent({
    name: 'Addresses',
    data() {
      return {
        showSuccessMessage: false,
        successMessage: '',
        addresses: [
          {
            id: 1,
            label: 'Domicile',
            name: 'Jean Dupont',
            street: '123 Rue de la Paix',
            zipCode: '75001',
            city: 'Paris',
            country: 'France',
            type: 'both',
            isDefault: true
          },
          {
            id: 2,
            label: 'Bureau',
            name: 'Jean Dupont',
            street: '45 Avenue des Champs-Élysées',
            zipCode: '75008',
            city: 'Paris',
            country: 'France',
            type: 'billing',
            isDefault: false
          }
        ],
        showAddressModal: false,
        isEditing: false,
        currentAddress: {
          id: 0,
          label: '',
          name: '',
          street: '',
          zipCode: '',
          city: '',
          country: '',
          type: 'both',
          isDefault: false
        } as Address,
        addressTypeOptions: [
          { value: 'billing', text: 'Facturation' },
          { value: 'shipping', text: 'Livraison' },
          { value: 'both', text: 'Facturation & Livraison' }
        ]
      };
    },
    methods: {
      async showAddAddressModal() {
        this.isEditing = false;
        this.currentAddress = {
          id: 0,
          label: '',
          name: '',
          street: '',
          zipCode: '',
          city: '',
          country: '',
          type: 'both',
          isDefault: false
        };
        this.showAddressModal = true;
      },
      
      async editAddress(address: Address) {
        this.isEditing = true;
        this.currentAddress = { ...address };
        this.showAddressModal = true;
      },
      
      async saveAddress() {
        try {
          if (this.isEditing) {
            // Mise à jour d'une adresse existante
            if (this.currentAddress.id) {
              await addressservice.update(this.currentAddress);
              this.successMessage = 'Adresse mise à jour avec succès !';
            }
          } else {
            // Ajout d'une nouvelle adresse
            await addressservice.create(this.currentAddress);
            this.successMessage = 'Adresse ajoutée avec succès !';
          }
          
          this.showSuccessMessage = true;
          setTimeout(() => { this.showSuccessMessage = false }, 5000);
          await this.fetchAddresses();
        } catch (error) {
          console.error('Erreur lors de la sauvegarde de l\'adresse:', error);
        }
      },
      
      async setDefaultAddress(id: number) {
        try {
          await addressservice.setDefault(id);
          this.successMessage = 'Adresse par défaut mise à jour !';
          this.showSuccessMessage = true;
          setTimeout(() => { this.showSuccessMessage = false }, 5000);
          await this.fetchAddresses();
        } catch (error) {
          console.error('Erreur lors de la définition de l\'adresse par défaut:', error);
        }
      },
      
      async deleteAddress(id: number) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette adresse ?')) {
          try {
            await addressservice.delete(id);
            this.successMessage = 'Adresse supprimée avec succès !';
            this.showSuccessMessage = true;
            setTimeout(() => { this.showSuccessMessage = false }, 5000);
            await this.fetchAddresses();
          } catch (error) {
            console.error('Erreur lors de la suppression de l\'adresse:', error);
          }
        }
      },
      
      async fetchAddresses() {
        try {
          const data = await addressservice.getAll();
          this.addresses = data;
        } catch (error) {
          console.error('Erreur lors de la récupération des adresses:', error);
        }
      }
    },
    async mounted() {
      await this.fetchAddresses();
    }
  });
  </script>