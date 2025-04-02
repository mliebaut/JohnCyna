<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <b-card class="text-center">
            <div v-if="loading">
              <b-spinner variant="primary" label="Chargement..."></b-spinner>
              <p class="mt-3">Vérification de votre adresse email en cours...</p>
            </div>
            
            <div v-else-if="verified">
              <div class="text-success mb-3">
                <i class="bi bi-check-circle" style="font-size: 4rem;"></i>
              </div>
              <h3>Adresse email confirmée !</h3>
              <p>Votre nouvelle adresse email a été confirmée avec succès.</p>
              <b-button variant="primary" to="/account">
                Retourner à mon compte
              </b-button>
            </div>
            
            <div v-else>
              <div class="text-danger mb-3">
                <i class="bi bi-x-circle" style="font-size: 4rem;"></i>
              </div>
              <h3>Échec de la vérification</h3>
              <p>{{ errorMessage }}</p>
              <b-button variant="primary" to="/account">
                Retourner à mon compte
              </b-button>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'VerifyEmail',
    
    setup() {
      const route = useRoute();
      const router = useRouter();
      
      const loading = ref(true);
      const verified = ref(false);
      const errorMessage = ref('Le lien de vérification est invalide ou a expiré.');
      
      const verifyEmail = async () => {
        const token = route.query.token as string;
        
        if (!token) {
          loading.value = false;
          return;
        }
        
        try {
          await axios.post('/api/users/verify-email', { token });
          verified.value = true;
        } catch (error: any) {
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message;
          }
        } finally {
          loading.value = false;
        }
      };
      
      onMounted(verifyEmail);
      
      return {
        loading,
        verified,
        errorMessage
      };
    }
  });
  </script>