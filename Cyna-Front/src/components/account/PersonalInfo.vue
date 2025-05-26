<template>
    <div class="personal-info">
      <h1 class="mb-4">Informations personnelles</h1>
      <p class="text-muted mb-4">Gérez vos informations personnelles et modifiez votre profil.</p>
      
      <b-card class="mb-4">
        <h3 class="h5 mb-3">Profil</h3>
        <b-alert 
          v-model="showSuccessMessage" 
          variant="success" 
          dismissible
        >
          Vos informations ont été mises à jour avec succès !
        </b-alert>
        
        <b-form @submit.prevent="updateProfile">
          <b-form-group label="Nom complet" label-for="fullName">
            <b-form-input
              id="fullName"
              v-model="profile.fullName"
              placeholder="Votre nom complet"
              required
            ></b-form-input>
          </b-form-group>
          
          <b-row>
            <b-col md="6">
              <b-form-group label="Prénom" label-for="firstName">
                <b-form-input
                  id="firstName"
                  v-model="profile.firstName"
                  placeholder="Votre prénom"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Nom" label-for="lastName">
                <b-form-input
                  id="lastName"
                  v-model="profile.lastName"
                  placeholder="Votre nom"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          
          <b-button type="submit" variant="primary">Enregistrer les modifications</b-button>
        </b-form>
      </b-card>
      
      <b-card class="mb-4">
        <h3 class="h5 mb-3">Informations de contact</h3>
        <b-form @submit.prevent="updateContact">
          <b-form-group 
            label="Adresse e-mail" 
            label-for="email"
            description="Nous vous enverrons un e-mail de confirmation pour valider cette modification."
          >
            <b-form-input
              id="email"
              v-model="contact.email"
              type="email"
              placeholder="votre@email.com"
              required
            ></b-form-input>
          </b-form-group>
          
          <b-form-group label="Numéro de téléphone" label-for="phone">
            <b-form-input
              id="phone"
              v-model="contact.phone"
              placeholder="+33 6 12 34 56 78"
            ></b-form-input>
          </b-form-group>
          
          <b-button type="submit" variant="primary">Mettre à jour</b-button>
        </b-form>
      </b-card>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { userService } from '../../functions/userService';  
  export default defineComponent({
    name: 'PersonalInfo',
    data() {
      return {
        showSuccessMessage: false,
        profile: {
          fullName: 'Jean Dupont',
          firstName: 'Jean',
          lastName: 'Dupont'
        },
        contact: {
          email: 'jean.dupont@example.com',
          phone: '+33 6 12 34 56 78'
        }
      };
    },
    methods: {
      updateProfile() {
       
        setTimeout(() => {
          this.showSuccessMessage = true;
          setTimeout(() => { this.showSuccessMessage = false }, 5000);
        }, 600);
      },
      updateContact() {
        
        setTimeout(() => {
          this.showSuccessMessage = true;
          setTimeout(() => { this.showSuccessMessage = false }, 5000);
        }, 600);
      }
    }
  });
  </script>