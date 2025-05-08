<template>
  <section class="confirm">
    <div style="display: none;" class="confirm-email">
      <p>Votre email a été confirmé, vous pouvez désormais vous connecter</p>
      <router-link to="/connexion">Se connecter</router-link>
    </div>
  </section>
</template>


@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');


<script>
import { useUserStore } from "../../stores/user.js";
import { useRoute } from 'vue-router';

const route = useRoute();
const userStore = useUserStore();

userStore.confirmEmail()

</script>