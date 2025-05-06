<template>
  <section class="confirm">
    <p class="confirm-link text-body-secondary" style="display: none;">{{ userStore.urlConfirmEmail }}</p>
  </section>
</template>


@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');


<script >
import { useUserStore } from "../stores/user.js";

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