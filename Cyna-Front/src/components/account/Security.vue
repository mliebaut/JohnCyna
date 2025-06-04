<template>
    <div class="security">
      <h1 class="mb-4">Sécurité</h1>
      <p class="text-muted mb-4">Gérez les paramètres de sécurité de votre compte.</p>
      
      <b-alert 
        v-model="showSuccessMessage" 
        variant="success" 
        dismissible
      >
        {{ successMessage }}
      </b-alert>
      
      <!-- Changement de mot de passe -->
      <b-card class="mb-4">
        <h3 class="h5 mb-3">Changer votre mot de passe</h3>
        <b-form @submit.prevent="changePassword">
          <b-form-group 
            label="Mot de passe actuel" 
            label-for="current-password"
          >
            <b-form-input
              id="current-password"
              v-model="passwordForm.currentPassword"
              type="password"
              placeholder="Votre mot de passe actuel"
              required
            ></b-form-input>
          </b-form-group>
          
          <b-form-group 
            label="Nouveau mot de passe" 
            label-for="new-password"
            description="Le mot de passe doit contenir au moins 8 caractères, incluant des lettres majuscules, minuscules, et des chiffres."
          >
            <b-form-input
              id="new-password"
              v-model="passwordForm.newPassword"
              type="password"
              placeholder="Nouveau mot de passe"
              required
            ></b-form-input>
          </b-form-group>
          
          <b-form-group 
            label="Confirmer le nouveau mot de passe" 
            label-for="confirm-password"
          >
            <b-form-input
              id="confirm-password"
              v-model="passwordForm.confirmPassword"
              type="password"
              placeholder="Confirmez votre nouveau mot de passe"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="passwordsMatch">
              Les mots de passe ne correspondent pas.
            </b-form-invalid-feedback>
          </b-form-group>
          
          <b-button 
            type="submit" 
            variant="primary"
            :disabled="!passwordsMatch || !isPasswordStrong"
          >
            Changer mon mot de passe
          </b-button>
        </b-form>
      </b-card>
      
      <!-- Authentification à deux facteurs -->
      <b-card class="mb-4">
        <h3 class="h5 mb-3">Authentification à deux facteurs (2FA)</h3>
        <p class="text-muted mb-3">
          L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte en exigeant une vérification via votre téléphone en plus de votre mot de passe.
        </p>
        
        <div v-if="twoFactorEnabled" class="mb-3">
          <b-alert variant="success" show>
            <div class="d-flex align-items-center">
              <i class="bi bi-shield-check me-2 fs-4"></i>
              <div>
                <strong>Activée</strong>
                <p class="mb-0">L'authentification à deux facteurs est actuellement activée sur votre compte.</p>
              </div>
            </div>
          </b-alert>
          
          <b-button 
            variant="danger" 
            @click="disableTwoFactor"
            class="mt-2"
          >
            Désactiver l'authentification à deux facteurs
          </b-button>
        </div>
        
        <div v-else>
          <b-alert variant="warning" show>
            <div class="d-flex align-items-center">
              <i class="bi bi-shield-exclamation me-2 fs-4"></i>
              <div>
                <strong>Non activée</strong>
                <p class="mb-0">L'authentification à deux facteurs n'est pas activée sur votre compte.</p>
              </div>
            </div>
          </b-alert>
          
          <b-button 
            variant="success" 
            @click="enableTwoFactor"
            class="mt-2"
          >
            Activer l'authentification à deux facteurs
          </b-button>
        </div>
      </b-card>
      
      <!-- Sessions actives -->
      <b-card class="mb-4">
        <h3 class="h5 mb-3">Sessions actives</h3>
        <p class="text-muted mb-3">
          Voici la liste des appareils actuellement connectés à votre compte. Vous pouvez déconnecter les sessions que vous ne reconnaissez pas.
        </p>
        
        <b-list-group class="mb-3">
          <b-list-group-item v-for="(session, index) in activeSessions" :key="index" class="d-flex justify-content-between align-items-center">
            <div>
              <div class="d-flex align-items-center">
                <i :class="getDeviceIcon(session.deviceType)" class="me-2 fs-4"></i>
                <div>
                  <strong>{{ session.deviceName }}</strong>
                  <div class="small text-muted">{{ session.location }}</div>
                  <div class="small text-muted">Dernière activité: {{ session.lastActive }}</div>
                </div>
              </div>
            </div>
            <div>
              <b-badge v-if="session.isCurrent" variant="success" class="me-2">Session courante</b-badge>
              <b-button 
                size="sm" 
                variant="outline-danger"
                @click="terminateSession(session.id)"
                :disabled="session.isCurrent"
              >
                Déconnecter
              </b-button>
            </div>
          </b-list-group-item>
        </b-list-group>
        
        <b-button 
          variant="danger" 
          @click="terminateAllSessions"
        >
          Déconnecter toutes les autres sessions
        </b-button>
      </b-card>
      
      <!-- Historique de connexion -->
      <b-card>
        <h3 class="h5 mb-3">Historique de connexion</h3>
        <p class="text-muted mb-3">
          Voici l'historique des dernières connexions à votre compte.
        </p>
        
        <b-table
          striped
          hover
          :items="loginHistory"
          :fields="loginHistoryFields"
        >
          <template #cell(status)="data">
            <b-badge :variant="data.item.status === 'success' ? 'success' : 'danger'">
              {{ data.item.status === 'success' ? 'Réussie' : 'Échouée' }}
            </b-badge>
          </template>
        </b-table>
      </b-card>

      <b-card>
        <h3 class="h5 mb-3">Suppression des données</h3>
        <p class="text-muted mb-3">
          Vous pouvez faire une demande de suppression de données.
          <p>
            Nous supprimerons toutes les données personnelles vous concernant, et nous anonymiserions les données non-personnelles.
          </p>
        </p>

        <b-button
            variant="danger"
            @click="terminateAllSessions"
        >
          Demander l'effacement de vos données.
        </b-button>
      </b-card>
      
      <!-- Modal pour l'activation de l'authentification à deux facteurs -->
      <b-modal 
        v-model="showTwoFactorModal" 
        title="Activer l'authentification à deux facteurs"
        :ok-disabled="!twoFactorCode"
        @ok="confirmTwoFactor"
      >
        <div class="text-center mb-4">
          <img src="https://via.placeholder.com/180" alt="QR Code" class="img-fluid mb-3" />
          <p>Scannez ce QR code avec votre application d'authentification (Google Authenticator, Authy, etc.)</p>
        </div>
        
        <b-form-group 
          label="Code de vérification" 
          label-for="verification-code"
          description="Entrez le code à 6 chiffres généré par votre application d'authentification"
        >
          <b-form-input
            id="verification-code"
            v-model="twoFactorCode"
            placeholder="123456"
            required
          ></b-form-input>
        </b-form-group>
      </b-modal>
    </div>
  </template>
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { securityservice } from "../../functions/securityservice";
  export default defineComponent({
    name: 'Security',
    data() {
      return {
        showSuccessMessage: false,
        successMessage: '',
        passwordForm: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        twoFactorEnabled: false,
        showTwoFactorModal: false,
        twoFactorCode: '',
        qrCodeUrl: '',
        activeSessions: [
          {
            id: 1,
            deviceName: 'Chrome sur Windows',
            deviceType: 'desktop',
            location: 'Paris, France',
            lastActive: 'Aujourd\'hui, 10:42',
            isCurrent: true
          },
          {
            id: 2,
            deviceName: 'Firefox sur Windows',
            deviceType: 'desktop',
            location: 'Paris, France',
            lastActive: 'Hier, 15:30',
            isCurrent: false
          },
          {
            id: 3,
            deviceName: 'Application mobile sur iPhone',
            deviceType: 'mobile',
            location: 'Paris, France',
            lastActive: '3 mai 2025, 09:15',
            isCurrent: false
          }
        ],
        loginHistory: [
          {
            date: '6 mai 2025, 10:42',
            ip: '192.168.1.1',
            location: 'Paris, France',
            device: 'Chrome sur Windows',
            status: 'success'
          },
          {
            date: '5 mai 2025, 15:30',
            ip: '192.168.1.1',
            location: 'Paris, France',
            device: 'Firefox sur Windows',
            status: 'success'
          },
          {
            date: '3 mai 2025, 09:15',
            ip: '192.168.1.1',
            location: 'Paris, France',
            device: 'Application mobile sur iPhone',
            status: 'success'
          },
          {
            date: '2 mai 2025, 22:10',
            ip: '198.51.100.0',
            location: 'New York, États-Unis',
            device: 'Chrome sur Windows',
            status: 'failed'
          }
        ],
        loginHistoryFields: [
          { key: 'date', label: 'Date' },
          { key: 'ip', label: 'Adresse IP' },
          { key: 'location', label: 'Localisation' },
          { key: 'device', label: 'Appareil' },
          { key: 'status', label: 'Statut' }
        ]
      };
    },
    computed: {
      passwordsMatch() {
        return this.passwordForm.newPassword === this.passwordForm.confirmPassword 
          || this.passwordForm.confirmPassword === '';
      },
      isPasswordStrong() {
        const password = this.passwordForm.newPassword;
        if (!password) return false;
        
        // Au moins 8 caractères, contenant majuscules, minuscules et chiffres
        const minLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        
        return minLength && hasUppercase && hasLowercase && hasNumbers;
      }
    },
    methods: {
      getDeviceIcon(deviceType: string) {
        return deviceType === 'desktop' ? 'bi bi-laptop' : 'bi bi-phone';
      },
      
      async changePassword() {
        if (!this.passwordsMatch || !this.isPasswordStrong) {
          return;
        }
        
        try {
          await securityservice.changePassword(this.passwordForm);
          
          this.successMessage = 'Votre mot de passe a été changé avec succès !';
          this.showSuccessMessage = true;
          setTimeout(() => { this.showSuccessMessage = false }, 5000);
          
          this.passwordForm = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          };
        } catch (error) {
          console.error('Erreur lors du changement de mot de passe:', error);
        }
      },
      
      async enableTwoFactor() {
        try {
          this.qrCodeUrl = await securityservice.getTwoFactorQrCode();
          this.showTwoFactorModal = true;
        } catch (error) {
          console.error('Erreur lors de la génération du QR code:', error);
        }
      },
      
      async confirmTwoFactor() {
        try {
          const success = await securityservice.verifyTwoFactorCode(this.twoFactorCode);
          
          if (success) {
            this.twoFactorEnabled = true;
            this.successMessage = 'L\'authentification à deux facteurs a été activée avec succès !';
            this.showSuccessMessage = true;
            setTimeout(() => { this.showSuccessMessage = false }, 5000);
          } else {
            alert('Le code est incorrect. Veuillez réessayer.');
          }
        } catch (error) {
          console.error('Erreur lors de la vérification du code:', error);
        }
      },
      
      async disableTwoFactor() {
        if (confirm('Êtes-vous sûr de vouloir désactiver l\'authentification à deux facteurs ?')) {
          try {
            await securityservice.disableTwoFactor();
            
            this.twoFactorEnabled = false;
            this.successMessage = 'L\'authentification à deux facteurs a été désactivée.';
            this.showSuccessMessage = true;
            setTimeout(() => { this.showSuccessMessage = false }, 5000);
          } catch (error) {
            console.error('Erreur lors de la désactivation de l\'authentification à deux facteurs:', error);
          }
        }
      },
      
      async terminateSession(sessionId: number) {
        try {
          await securityservice.terminateSession(sessionId);
          
          this.activeSessions = this.activeSessions.filter(session => session.id !== sessionId);
          this.successMessage = 'La session a été déconnectée avec succès.';
          this.showSuccessMessage = true;
          setTimeout(() => { this.showSuccessMessage = false }, 5000);
        } catch (error) {
          console.error('Erreur lors de la déconnexion de la session:', error);
        }
      },
      
      async terminateAllSessions() {
        if (confirm('Êtes-vous sûr de vouloir déconnecter toutes les autres sessions ?')) {
          try {
            await securityservice.terminateAllSessions();
            
            this.activeSessions = this.activeSessions.filter(session => session.isCurrent);
            this.successMessage = 'Toutes les autres sessions ont été déconnectées avec succès.';
            this.showSuccessMessage = true;
            setTimeout(() => { this.showSuccessMessage = false }, 5000);
          } catch (error) {
            console.error('Erreur lors de la déconnexion de toutes les sessions:', error);
          }
        }
      },
      
      async fetchSecurityData() {
        try {
          // Pour Récupérer le statut de l'authentification à deux facteurs
          const twoFactorStatus = await securityservice.getTwoFactorStatus();
          this.twoFactorEnabled = twoFactorStatus.enabled;
          
          // Pour Récupérer les sessions actives
          const sessions = await securityservice.getActiveSessions();
          this.activeSessions = sessions;
          
          // Pour Récupérer l'historique des connexions
          const history = await securityservice.getLoginHistory();
          this.loginHistory = history;
        } catch (error) {
          console.error('Erreur lors de la récupération des données de sécurité:', error);
        }
      }
    },
    async mounted() {
      await this.fetchSecurityData();
    }
  });
  </script>