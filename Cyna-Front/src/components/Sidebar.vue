<template>
  <div class="sidebar bg-light p-4">
    <h2 class="mb-4">Mon Compte</h2>
    <div class="nav flex-column">
      <router-link 
        v-for="(item, index) in menuItems" 
        :key="index" 
        :to="item.path" 
        class="nav-link py-2"
        active-class="active"
      >
        <i :class="item.icon" class="me-2"></i>
        {{ item.title }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SidebarComponent',
  data() {
    return {
      menuItems: [
        { 
          title: 'Informations personnelles', 
          path: '/account/personal-info',
          icon: 'bi bi-person'
        },
        { 
          title: 'Abonnements', 
          path: '/account/subscriptions',
          icon: 'bi bi-calendar-check'
        },
        { 
          title: 'Adresses', 
          path: '/account/addresses',
          icon: 'bi bi-geo-alt'
        },
        { 
          title: 'Paiement', 
          path: '/account/payment-methods',
          icon: 'bi bi-credit-card'
        },
        { 
          title: 'Sécurité', 
          path: '/account/security',
          icon: 'bi bi-shield-lock'
        }
      ]
    };
  }
});
</script>

<style scoped>
.sidebar {
  height: 100%;
  min-height: 100vh;
  border-right: 1px solid #dee2e6;
}

.nav-link {
  color: #495057;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: #e9ecef;
}

.nav-link.active {
  color: #0d6efd;
  background-color: rgba(13, 110, 253, 0.1);
  font-weight: 600;
}
</style>