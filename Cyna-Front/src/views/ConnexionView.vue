<template>
  <section class="connexion">
    <form @submit.prevent="submit">
      <h1>Se connecter</h1>
      <div class="inputs">
        <input v-model="data.email" placeholder="Email" type="email"/>
        <input v-model="data.password" placeholder="Mot de passe" type="password">
      </div>
      <router-link to="/inscription">Je n'ai pas de compte</router-link>
      <div>
        <button class="btn btn-primary fs-4 px-4 mt-2" type="submit">Connexion</button>
      </div>
    </form>

  </section>
</template>

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

<style>
.connexion {
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

form .inputs input[type='email'], input[type='password'] {
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

.btn-primary{
      --bs-btn-color: #fff;
      --bs-btn-bg: #7200ff;
      --bs-btn-border-color: #7200ff;
      --bs-btn-hover-color: #fff;
      --bs-btn-hover-bg: #7200ff;
      --bs-btn-hover-border-color: #4d00aa;
      --bs-btn-focus-shadow-rgb: 49, 132, 253;
      --bs-btn-active-color: #fff;
      --bs-btn-active-bg: #4d00aa;
      --bs-btn-active-border-color: #4d00aa;
      --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      --bs-btn-disabled-color: #fff;
      --bs-btn-disabled-bg: #7c10ff;
      --bs-btn-disabled-border-color: #7708ff;
    }
</style>

<script lang="ts" >
import {reactive} from 'vue';
import {useRouter} from "vue-router";
import Serv_Url from "../main.ts";

export default {
  name: "Connexion",
  setup() {
    const data = reactive({
      email: '',
      password: ''
    });

    const submit = async () => {
      await fetch(Serv_Url + '/user/login', {
        method: 'POST',
        body: JSON.stringify(data),
        mode: "no-cors"
      });
    }

    return {
      data,
      submit
    }
  }
}
</script>

