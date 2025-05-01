<template>
  <section class="connexion">
    <form @submit.prevent="login">
      <h1>Se connecter</h1>
      <div class="inputs">
        <input v-model="email" placeholder="Email" type="email"/>
        <input v-model="password" placeholder="Mot de passe" type="password">
      </div>
      <div class="form-check text-start">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
          Se souvenir de moi
        </label>
      </div>
      <div class="d-flex flex-column">
        <router-link to="/inscription">Je n'ai pas de compte</router-link>
        <div class="msg-alert mt-2" style="display: none;">
          <p>
            Nous n'avons pas pu vérifier votre compte. Veuillez réessayer ou cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe.
          </p>
        </div>
        <router-link to="/reset-password">Mot de passe oublié</router-link>
      </div>
      <div>
        <button class="btn btn-primary fs-4 px-4 mt-2" type="submit">Connexion</button>
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
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      await this.userStore.signIn(this.email, this.password);
    },
  },
};

</script>