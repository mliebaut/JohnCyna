<template>
  <nav class="navbar bg-body-tertiary fixed-top">
    <div class="container">
      <router-link :to="{ name: 'Home'}">
        <img src="/site-logo.png" width="160" alt="Cyna">
      </router-link>
      <div class="d-flex align-items-center">
        <router-link class="ms-2" aria-current="page" to="/panier">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" viewBox="0 0 576 512">
            <path fill="#7200ff"
                  d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
          </svg>
        </router-link>
        <a class="ms-2" aria-current="page" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" viewBox="0 0 512 512">
            <path fill="#7200ff"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
          </svg>
        </a>
        <!-- Sélecteur de langue -->
        <select class="form-select form-select-sm ms-2" v-model="currentLang" @change="changeLang"
                style="width: auto; max-width: 70px;">
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>

        <button class="navbar-toggler ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <router-link :to="{ name: 'Home'}">
            <img src="/site-logo.png" width="140" alt="Cyna">
          </router-link>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav flex-grow-1 pe-3 fs-5">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Home'}">Accueil</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                 aria-expanded="false">
                Catégories
              </a>
              <ul class="dropdown-menu">
                <div v-for="category in categories" :key="category.title">
                  <li>
                    <router-link class="dropdown-item text-center" :to="{ path: `/category/${category.title}`}">
                      {{ category.title }}
                    </router-link>
                  </li>
                </div>
              </ul>
            </li>
            <li>
              <router-link v-if="userStore.user && userStore.user.role !== USER" class="btn btn-info m-2 w-75 fs-5" to="/backoffice">Backoffice</router-link>
            </li>
            <li>
              <router-link v-if="userStore.user" class="btn btn-warning m-2 w-75 fs-5" to="/account">Mon Compte</router-link>
            </li>
            <li v-if="userStore.user" class="nav-item mt-5">
              <p class="text-body-secondary">Bonjour, {{ userStore.user.lastName }}</p>
              <a @click="userStore.logout()" class="nav-link" href="#">Se déconnecter</a>
            </li>
            <div v-else>
              <li class="nav-item">
                <router-link class="btn btn-primary m-2 w-75 fs-5" to="/connexion">Se connecter</router-link>
              </li>
              <li class="nav-item">
                <router-link class="btn btn-primary m-2 w-75 fs-5" to="/inscription">Créer un compte
                </router-link>
              </li>
            </div>
          </ul>


          <div class="navbar-nav">

            <div
                class="navbar-nav d-flex align-items-center justify-content-center link-body-emphasis text-decoration-none">
              <ul class="nav-item list-unstyled d-flex">
                <li class="ms-2"><a class="text-body-secondary"
                                    href="https://www.facebook.com/pages/Cyna-IT/224495037408975/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                       class="bi bi-facebook" viewBox="0 0 16 16">
                    <path
                        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                  </svg>
                </a></li>
                <li class="ms-2"><a class="text-body-secondary"
                                    href="https://x.com/cyna_it?s=21&t=BtB8tJsTAlKgZAySdIazVA">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                       class="bi bi-twitter-x" viewBox="0 0 16 16">
                    <path
                        d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                  </svg>
                </a></li>
                <li class="ms-2"><a class="text-body-secondary" href="/debug">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                       class="bi bi-instagram" viewBox="0 0 16 16">
                    <path
                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                  </svg>
                </a></li>
              </ul>
            </div>

            <ul class="navbar-nav justify-content-end">
              <li class="nav-item">
                <router-link class="nav-link text-body-secondary" to="/mentions-legales">Mentions légales</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-body-secondary" to="/cgu">CGU</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-body-secondary" to="/contact">Contact</router-link>
              </li>
              <li class="nav-item"><p class="text-body-secondary mt-2">&copy; 2025 Company, Inc</p></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import categorie from '../json/categorie.json';
import {useUserStore} from "../stores/user.js";
import {ref} from "vue";
import {useI18n} from "vue-i18n";

export default {
  data() {
    return {
      categories: categorie,
    };
  },
  setup() {
    const userStore = useUserStore();
    const {locale} = useI18n();

    const currentLang = ref(locale.value);

    const changeLang = () => {
      locale.value = currentLang.value;
      localStorage.setItem("lang", currentLang.value);
    };

    return {userStore, currentLang, changeLang};
  },
};
</script>

<style>
.offcanvas-body {
  display: contents;
}

.dropdown-menu {
  --bs-dropdown-color: none !important;
  --bs-dropdown-bg: none !important;
  --bs-dropdown-border-color: none !important;
  --bs-dropdown-link-color: none !important;
  --bs-dropdown-link-hover-color: none !important;
  --bs-dropdown-link-hover-bg: none !important;
  --bs-dropdown-link-active-color: #000 !important;
  --bs-dropdown-link-active-bg: none !important;
  color: none !important;
  background-color: none !important;
}

.btn-primary {
  --bs-btn-color: #fff !important;
  --bs-btn-bg: #7200ff !important;
  --bs-btn-border-color: #7200ff !important;
  --bs-btn-hov7200ffer-color: #fff !important;
  --bs-btn-hover-bg: #7200ff !important;
  --bs-btn-hover-border-color: #4d00aa !important;
  --bs-btn-focus-shadow-rgb: 49, 132, 253 !important;
  --bs-btn-active-color: #fff !important;
  --bs-btn-active-bg: #4d00aa !important;
  --bs-btn-active-border-color: #4d00aa !important;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125) !important;
  --bs-btn-disabled-color: #fff !important;
  --bs-btn-disabled-bg: #7c10ff !important;
  --bs-btn-disabled-border-color: #7708ff !important;
}

.nav-button {
  text-decoration: none;
  color: white;
}
</style>
  