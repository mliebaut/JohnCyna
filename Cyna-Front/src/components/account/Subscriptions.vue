<template>
    <div class="subscriptions">
      <h1 class="mb-4">Abonnements</h1>
      <p class="text-muted mb-4">Gérez vos abonnements aux services SaaS.</p>
      
      <b-alert 
        v-model="showSuccessMessage" 
        variant="success" 
        dismissible
      >
        {{ successMessage }}
      </b-alert>
  
      <b-card 
        v-for="(subscription, index) in subscriptions" 
        :key="index"
        class="mb-4"
      >
        <div class="d-flex justify-content-between align-items-start mb-3">
          <h3 class="h5 mb-0">{{ subscription.name }}</h3>
          <b-badge 
            :variant="subscription.status === 'active' ? 'success' : 'warning'"
          >
            {{ subscription.status === 'active' ? 'Actif' : 'En attente' }}
          </b-badge>
        </div>
        
        <div class="mb-3">
          <small class="text-muted">Plan</small>
          <p class="mb-1">{{ subscription.plan }}</p>
        </div>
        
        <div class="mb-3">
          <small class="text-muted">Prix</small>
          <p class="mb-1">{{ subscription.price }} € / {{ subscription.billingCycle }}</p>
        </div>
        
        <div class="mb-3">
          <small class="text-muted">Prochain renouvellement</small>
          <p class="mb-1">{{ subscription.nextBillingDate }}</p>
        </div>
        
        <div class="d-flex mt-4">
          <b-button 
            variant="outline-primary" 
            size="sm" 
            class="me-2"
            @click="upgradeSubscription(subscription.id)"
          >
            Mettre à niveau
          </b-button>
          <b-button 
            variant="outline-secondary" 
            size="sm" 
            class="me-2"
            @click="renewSubscription(subscription.id)"
          >
            Renouveler
          </b-button>
          <b-button 
            variant="outline-danger" 
            size="sm"
            @click="cancelSubscription(subscription.id)"
          >
            Résilier
          </b-button>
        </div>
      </b-card>
      
      <div v-if="subscriptions.length === 0" class="text-center py-5">
        <p class="text-muted">Vous n'avez aucun abonnement actif pour le moment.</p>
        <b-button variant="primary">Découvrir nos services</b-button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import {subscriptionservice } from '../../functions/subscriptionservice';
  export default defineComponent({
    name: 'Subscriptions',
    data() {
      return {
        showSuccessMessage: false,
        successMessage: 'Votre abonnement a été mis à jour avec succès !',
        subscriptions: [
          {
            id: 1,
            name: 'Plan Business Pro',
            status: 'active',
            plan: 'Business Pro - 5 utilisateurs',
            price: '89,99',
            billingCycle: 'mois',
            nextBillingDate: '15 juin 2025'
          },
          {
            id: 2,
            name: 'Service Analytics',
            status: 'active',
            plan: 'Entreprise - Données illimitées',
            price: '129,99',
            billingCycle: 'mois',
            nextBillingDate: '22 juin 2025'
          }
        ]
      };
    },
    methods: {
      async upgradeSubscription(id: number) {
        try {
          await subscriptionservice.upgrade(id);
          this.successMessage = 'Votre abonnement a été mis à niveau avec succès !';
          this.showSuccessMessage = true;
          setTimeout(() => { this.showSuccessMessage = false }, 5000);
        } catch (error) {
          console.error("Erreur lors de la mise à niveau:", error);
        }
        
        
      },
      
      async renewSubscription(id: number) {
        try {
          await subscriptionservice.renew(id);
          this.successMessage = 'Votre abonnement a été renouvelé avec succès !';
          this.showSuccessMessage = true;
          setTimeout(() => { this.showSuccessMessage = false }, 5000);
        } catch (error) {
          console.error("Erreur lors du renouvellement:", error);
        }
        
       
      },
      
      async cancelSubscription(id: number) {
        if (confirm('Êtes-vous sûr de vouloir résilier cet abonnement ?')) {
          try {
            await subscriptionservice.cancel(id);
            this.successMessage = 'Votre abonnement a été résilié avec succès !';
            this.showSuccessMessage = true;
            setTimeout(() => { this.showSuccessMessage = false }, 5000);
            await this.fetchSubscriptions();
          } catch (error) {
            console.error("Erreur lors de l'annulation:", error);
          }
          
          
        }
      },
      
      async fetchSubscriptions() {
        try {
          const data = await subscriptionservice.getAll();
          this.subscriptions = data;
        } catch (error) {
          console.error("Erreur lors de la récupération des abonnements:", error);
        }
      }
    },
    async mounted() {
      await this.fetchSubscriptions();
    }
  });
  </script>