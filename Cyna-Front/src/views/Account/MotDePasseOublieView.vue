<template>
  <section class="connexion">
    <form @submit.prevent="resetPassword">
      <h1>Mot de passe oublié</h1>
      <div class="inputs">
        <p>
            Entrer votre email pour recevoir un lien dans votre boîte mail pour réinitialiser votre mot de passe
        </p>
        <input v-model="email" placeholder="Email" type="email"/>
        <button class="btn btn-primary fs-4 px-4 mt-2" type="submit">Envoyer</button>
      </div>
      <p class="reset-link text-body-secondary" style="display: none;">{{ userStore.urlResetPassword }}</p>
    </form>
    
  </section>
</template>


<script>
import { useUserStore } from "@/stores/user.js";


export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      email: "",
      url: ""
    };
  },
  methods: {
    async resetPassword() {
      await this.userStore.resetPassword(this.email)
    },
  },
};

</script>