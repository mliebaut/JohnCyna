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
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'VerifyEmail',
  
  setup() {
    const route = useRoute();
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
        const response = await fetch('/api/users/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ token })
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage.value = errorData.message;
          }
          throw new Error(`Erreur lors de la vérification de l'email: ${response.status}`);
        }
        
        verified.value = true;
      } catch (error) {
        // L'erreur est déjà gérée dans le bloc ci-dessus
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