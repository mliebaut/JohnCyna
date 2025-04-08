<script setup lang="ts">
<<<<<<< HEAD
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
=======
// import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ChatBot from './components/ChatBot.vue'
>>>>>>> origin/dev
</script>

<template>
  <Navbar />
  <div class="mt-5 pt-2">
    <RouterView />
    <ChatBot />
  </div>
  <Footer />
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>