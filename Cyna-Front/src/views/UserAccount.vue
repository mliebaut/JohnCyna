<template>
    <div class="container mt-5">
      <h2 class="mb-4">Mon compte</h2>
      
      <b-alert v-model="showSuccessAlert" variant="success" dismissible>
        Vos informations ont été mises à jour avec succès!
      </b-alert>
      
      <b-alert v-model="showErrorAlert" variant="danger" dismissible>
        {{ errorMessage }}
      </b-alert>
      
      <b-card no-body>
        <b-tabs card>
          
          <b-tab title="Informations personnelles" active>
            <b-card-body>
              <b-form @submit.prevent="updatePersonalInfo">
                <b-form-group
                  label="Nom complet"
                  label-for="fullname"
                  description="Utilisé pour personnaliser les e-mails qui vous sont envoyés."
                >
                  <b-form-input
                    id="fullname"
                    v-model="user.fullName"
                    placeholder="Votre nom complet"
                    required
                  ></b-form-input>
                </b-form-group>
                
                <b-form-group
                  label="Adresse e-mail"
                  label-for="email"
                  description="Un e-mail de confirmation sera envoyé à la nouvelle adresse."
                >
                  <b-form-input
                    id="email"
                    v-model="user.email"
                    type="email"
                    placeholder="Votre adresse e-mail"
                    required
                  ></b-form-input>
                </b-form-group>
                
                <b-button type="submit" variant="primary" :disabled="isSubmitting">
                  <b-spinner small v-if="isSubmitting"></b-spinner>
                  Mettre à jour mes informations
                </b-button>
              </b-form>
            </b-card-body>
          </b-tab>
          
          <!--pour changer le mot de passe-->
          <b-tab title="Changer le mot de passe">
            <b-card-body>
              <b-form @submit.prevent="updatePassword">
                <b-form-group
                  label="Mot de passe actuel"
                  label-for="current-password"
                >
                  <b-form-input
                    id="current-password"
                    v-model="passwordForm.currentPassword"
                    type="password"
                    placeholder="Votre mot de passe actuel"
                    required
                  ></b-form-input>
                </b-form-group>
                
                <b-form-group
                  label="Nouveau mot de passe"
                  label-for="new-password"
                  description="Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
                >
                  <b-form-input
                    id="new-password"
                    v-model="passwordForm.newPassword"
                    type="password"
                    placeholder="Votre nouveau mot de passe"
                    required
                    :state="isPasswordValid"
                  ></b-form-input>
                  <b-form-invalid-feedback :state="isPasswordValid">
                    Le mot de passe doit respecter les critères de sécurité.
                  </b-form-invalid-feedback>
                </b-form-group>
                
                <b-form-group
                  label="Confirmer le nouveau mot de passe"
                  label-for="confirm-password"
                >
                  <b-form-input
                    id="confirm-password"
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    placeholder="Confirmez votre nouveau mot de passe"
                    required
                    :state="doPasswordsMatch"
                  ></b-form-input>
                  <b-form-invalid-feedback :state="doPasswordsMatch">
                    Les mots de passe ne correspondent pas.
                  </b-form-invalid-feedback>
                </b-form-group>
                
                <b-button type="submit" variant="primary" :disabled="isSubmitting || !isPasswordValid || !doPasswordsMatch">
                  <b-spinner small v-if="isSubmitting"></b-spinner>
                  Changer mon mot de passe
                </b-button>
              </b-form>
            </b-card-body>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { UserService } from '../functions/user.service';
  
  export default defineComponent({
    name: 'UserAccount',
    
    setup() {
      // User data
      const user = ref({
        id: '',
        fullName: '',
        email: '',
      });
      
      // Password form
      const passwordForm = ref({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      // UI states
      const isSubmitting = ref(false);
      const showSuccessAlert = ref(false);
      const showErrorAlert = ref(false);
      const errorMessage = ref('');
      
      // Password validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const isPasswordValid = computed(() => {
        if (!passwordForm.value.newPassword) return null;
        return passwordRegex.test(passwordForm.value.newPassword);
      });
      
      const doPasswordsMatch = computed(() => {
        if (!passwordForm.value.confirmPassword) return null;
        return passwordForm.value.newPassword === passwordForm.value.confirmPassword;
      });
      
      // Load user data on component mount
      const loadUserData = async () => {
        try {
          const userData = await UserService.getCurrentUser();
          user.value = userData;
        } catch (error) {
          showError("Impossible de charger les informations de l'utilisateur.");
        }
      };
      
      // Update personal information
      const updatePersonalInfo = async () => {
        isSubmitting.value = true;
        
        try {
          await UserService.updatePersonalInfo({
            fullName: user.value.fullName,
            email: user.value.email
          });
          
          showSuccess();
        } catch (error) {
          showError("Une erreur s'est produite lors de la mise à jour de vos informations.");
        } finally {
          isSubmitting.value = false;
        }
      };
      
      // Update password
      const updatePassword = async () => {
        isSubmitting.value = true;
        
        try {
          await UserService.updatePassword({
            currentPassword: passwordForm.value.currentPassword,
            newPassword: passwordForm.value.newPassword
          });
          
          // Reset password form
          passwordForm.value = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          };
          
          showSuccess();
        } catch (error) {
          showError("Une erreur s'est produite lors du changement de mot de passe.");
        } finally {
          isSubmitting.value = false;
        }
      };
      
      // Show success alert
      const showSuccess = () => {
        showSuccessAlert.value = true;
        setTimeout(() => {
          showSuccessAlert.value = false;
        }, 5000);
      };
      
      // Show error alert
      const showError = (message: string) => {
        errorMessage.value = message;
        showErrorAlert.value = true;
        setTimeout(() => {
          showErrorAlert.value = false;
        }, 5000);
      };
      
      // Load user data on component creation
      loadUserData();
      
      return {
        user,
        passwordForm,
        isSubmitting,
        showSuccessAlert,
        showErrorAlert,
        errorMessage,
        isPasswordValid,
        doPasswordsMatch,
        updatePersonalInfo,
        updatePassword
      };
    }
  });
  </script>