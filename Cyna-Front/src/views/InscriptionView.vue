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
  </section>
</template>


@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

<style>
.inscription {
  margin: 0;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
}

form {
  margin-top: 20px;
  background-color: #fff;
  padding: 40px 60px;
  border-radius: 10px;
  min-width: 300px;
  width: 500px;
}

form h1 {
  color: #302082;
  text-align: center;
}

form .social-media {
  margin-top: -10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

form .social-media p {
  padding: 5px;
  width: 20px;
  margin-left: 10px;
  border-radius: 100%;
  border: 1px solid #545454;
  text-align: center;
  cursor: pointer;
  color: #545454;
}

form p.choose-email {
  text-align: center;
}

form .inputs {
  display: flex;
  flex-direction: column;
}

form .inputs input[type='text'], [type='email'], input[type='password'] {
  padding: 15px;
  border: none;
  border-radius: 5px;
  background-color: #f2f2f2;
  outline: none;
  margin-bottom: 15px;
}

form p.inscription {
  font-size: 14px;
  margin-bottom: 20px;
  color: #878787;
}

form p.inscription span {
  color: #302082;
}

form button {
  padding: 15px 25px;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  color: #fff;
  background-color: #302082;
  outline: none;
  cursor: pointer;
}
</style>

<script lang="ts" >
import { useUserStore } from "../store/user.ts";

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