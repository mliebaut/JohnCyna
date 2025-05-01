<template>
    <section >
        <div>      
        <p>
        Bonjour
      </p>
    </div>

    </section>
</template>

<script>
import { useUserStore } from "../stores/user.js";

const userStore = useUserStore();

if(userStore.user ==  null){
    userStore.setReturnUrl("/private");
    window.location.href = "/connexion";
}
</script>