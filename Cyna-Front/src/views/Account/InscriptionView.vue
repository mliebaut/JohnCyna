<template>
  <section class="inscription">
    <form @submit.prevent="register">
      <h1>Créer un compte</h1>
      <div class="inputs">
        <input v-model="nom" v-on:input="check" placeholder="Nom" type="text"/>
        <input v-model="prenom" v-on:input="check" placeholder="Prénom" type="text"/>
        <input v-model="email" v-on:input="check" placeholder="Email" type="email"/>
        <input v-model="password" v-on:input="check" placeholder="Mot de passe" type="password">
      </div>
      <router-link to="/connexion">J'ai déja un compte</router-link>
      <div>
        <button class="btn btn-primary fs-4 px-4 mt-2" type="submit">Créer mon compte</button>
      </div>
    </form>
    <p class="confirm-link text-body-secondary" style="display: none;">{{ userStore.urlConfirmEmail }}</p>
  </section>
</template>


@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');


<script >
import { useUserStore } from "../../stores/user.js";

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      nom: "",
      prenom: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      await this.userStore.signUp(this.nom, this.prenom, this.email, this.password);
    },
  },
};

</script>