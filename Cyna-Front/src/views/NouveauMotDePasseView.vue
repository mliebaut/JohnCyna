<template>
  <section class="connexion">
    <form @submit.prevent="newPassword">
      <h1>Mot de passe oublié</h1>
      <div class="inputs">
        <input v-model="password" placeholder="Nouveau mot de passe" type="password">
        <input v-model="confirmPassword" placeholder="Confirmer le mot de passe" type="password" @input="validateForm">
        <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
        <button class="btn btn-primary fs-4 px-4 mt-2" type="submit">Envoyer</button>
      </div>
    </form>
    
  </section>
</template>


<script>
import { useUserStore } from "../stores/user.js";

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      password: "",
      confirmPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    validateForm() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Les mots de passe doivent être les mêmes ';
        return false;
      }
      this.errorMessage = '';
      return true;
    },
    async newPassword() {
      if (this.password == this.confirmPassword){
        await this.userStore.newPassword(this.password);
      }
    },
  },
};

</script>