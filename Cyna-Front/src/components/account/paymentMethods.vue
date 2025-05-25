<template>
  <div class="payment-methods">
    <h1 class="mb-4">Méthodes de paiement</h1>
    <p class="text-muted mb-4">Gérez vos moyens de paiement pour vos abonnements et services.</p>
    
    <b-alert 
      v-model="showSuccessMessage" 
      variant="success" 
      dismissible
    >
      {{ successMessage }}
    </b-alert>
    
    <div class="mb-4 d-flex justify-content-between align-items-center">
      <h2 class="h4 mb-0">Vos moyens de paiement</h2>
      <b-button variant="primary" @click="showAddPaymentModal">
        <i class="bi bi-plus"></i> Ajouter un moyen de paiement
      </b-button>
    </div>
    
    <b-row>
      <b-col md="6" v-for="(payment, index) in paymentMethods" :key="index" class="mb-4">
        <b-card>
          <div class="d-flex align-items-start justify-content-between mb-3">
            <div class="d-flex align-items-center">
              <div class="payment-icon me-3">
                <i 
                  :class="getCardIcon(payment.type)" 
                  class="fs-2"
                ></i>
              </div>
              <div>
                <h3 class="h5 mb-0">{{ payment.type === 'card' ? 'Carte bancaire' : 'PayPal' }}</h3>
                <p class="text-muted mb-0">
                  {{ payment.type === 'card' ? '••••••••••••' + payment.lastDigits : payment.email }}
                </p>
                <p class="small mb-0">
                  {{ payment.type === 'card' ? 'Expire ' + payment.expiryMonth + '/' + payment.expiryYear : '' }}
                </p>
              </div>
            </div>
            <b-badge 
              v-if="payment.isDefault" 
              variant="success"
            >
              Par défaut
            </b-badge>
          </div>
          
          <div class="d-flex">
            <b-button 
              v-if="!payment.isDefault"
              variant="outline-success" 
              size="sm" 
              class="me-2"
              @click="setDefaultPayment(payment.id)"
            >
              Définir par défaut
            </b-button>
            <b-button 
              variant="outline-danger" 
              size="sm"
              @click="deletePayment(payment.id)"
            >
              Supprimer
            </b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
    
    <div v-if="paymentMethods.length === 0" class="text-center py-5">
      <p class="text-muted">Aucun moyen de paiement enregistré.</p>
      <b-button variant="primary" @click="showAddPaymentModal">
        Ajouter un moyen de paiement
      </b-button>
    </div>
    
    <!-- Modal pour ajouter un moyen de paiement -->
    <b-modal 
      v-model="showPaymentModal" 
      title="Ajouter un moyen de paiement"
      @ok="savePayment"
    >
      <b-form>
        <b-form-group label="Type de paiement" label-for="payment-type">
          <b-form-select
            id="payment-type"
            v-model="currentPayment.type"
            :options="paymentTypeOptions"
            required
          ></b-form-select>
        </b-form-group>
        
        <template v-if="currentPayment.type === 'card'">
          <b-form-group label="Numéro de carte" label-for="card-number">
            <b-form-input
              id="card-number"
              v-model="currentPayment.cardNumber"
              placeholder="1234 5678 9012 3456"
              required
            ></b-form-input>
          </b-form-group>
          
          <b-row>
            <b-col md="6">
              <b-form-group label="Date d'expiration" label-for="card-expiry">
                <b-input-group>
                  <b-form-select
                    id="card-expiry-month"
                    v-model="currentPayment.expiryMonth"
                    :options="months"
                    required
                  ></b-form-select>
                  <b-form-select
                    id="card-expiry-year"
                    v-model="currentPayment.expiryYear"
                    :options="years"
                    required
                  ></b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Code de sécurité (CVV)" label-for="card-cvv">
                <b-form-input
                  id="card-cvv"
                  v-model="currentPayment.cvv"
                  placeholder="123"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </template>
        
        <template v-if="currentPayment.type === 'paypal'">
          <b-form-group label="Adresse e-mail PayPal" label-for="paypal-email">
            <b-form-input
              id="paypal-email"
              v-model="currentPayment.email"
              type="email"
              placeholder="email@example.com"
              required
            ></b-form-input>
          </b-form-group>
        </template>
        
        <b-form-group>
          <b-form-checkbox v-model="currentPayment.isDefault">
            Définir comme moyen de paiement par défaut
          </b-form-checkbox>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { paymentservice } from '../../functions/paymentservice';

interface PaymentMethod {
  id?: number;
  type: string;
  cardNumber?: string;
  lastDigits?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  email?: string;
  isDefault: boolean;
}

export default defineComponent({
  name: 'PaymentMethods',
  data() {
    return {
      showSuccessMessage: false,
      successMessage: '',
      paymentMethods: [
        {
          id: 1,
          type: 'card',
          lastDigits: '4242',
          expiryMonth: '09',
          expiryYear: '2026',
          isDefault: true
        },
        {
          id: 2,
          type: 'paypal',
          email: 'jean.dupont@example.com',
          isDefault: false
        }
      ],
      showPaymentModal: false,
      currentPayment: {
        id: 0,
        type: 'card',
        cardNumber: '',
        lastDigits: '',
        expiryMonth: '01',
        expiryYear: '2026',
        cvv: '',
        email: '',
        isDefault: false
      } as PaymentMethod,
      paymentTypeOptions: [
        { value: 'card', text: 'Carte bancaire' },
        { value: 'paypal', text: 'PayPal' }
      ],
      months: [
        { value: '01', text: '01' },
        { value: '02', text: '02' },
        { value: '03', text: '03' },
        { value: '04', text: '04' },
        { value: '05', text: '05' },
        { value: '06', text: '06' },
        { value: '07', text: '07' },
        { value: '08', text: '08' },
        { value: '09', text: '09' },
        { value: '10', text: '10' },
        { value: '11', text: '11' },
        { value: '12', text: '12' }
      ],
      years: Array.from({ length: 10 }, (_, i) => {
        const year = new Date().getFullYear() + i;
        return { value: year.toString(), text: year.toString() };
      })
    };
  },
  methods: {
    getCardIcon(type: string) {
      return type === 'card' ? 'bi bi-credit-card-2-front' : 'bi bi-paypal';
    },
    
    async showAddPaymentModal() {
      this.currentPayment = {
        id: 0,
        type: 'card',
        cardNumber: '',
        lastDigits: '',
        expiryMonth: '01',
        expiryYear: (new Date().getFullYear() + 1).toString(),
        cvv: '',
        email: '',
        isDefault: false
      };
      this.showPaymentModal = true;
    },
    
    async savePayment() {
      try {
        // Logique pour traiter les informations de paiement
        if (this.currentPayment.type === 'card' && this.currentPayment.cardNumber) {
          // Extraire les 4 derniers chiffres
          this.currentPayment.lastDigits = this.currentPayment.cardNumber.slice(-4);
        }
        
        // Créer la nouvelle méthode de paiement via le service
        await paymentservice.create(this.currentPayment);
        
        this.successMessage = 'Moyen de paiement ajouté avec succès !';
        this.showSuccessMessage = true;
        setTimeout(() => { this.showSuccessMessage = false }, 5000);
        
        // Recharger les méthodes de paiement
        await this.fetchPaymentMethods();
      } catch (error) {
        console.error('Erreur lors de l\'ajout du moyen de paiement:', error);
      }
    },
    
    async setDefaultPayment(id: number) {
      try {
        await paymentservice.setDefault(id);
        
        this.successMessage = 'Moyen de paiement par défaut mis à jour !';
        this.showSuccessMessage = true;
        setTimeout(() => { this.showSuccessMessage = false }, 5000);
        
        // Recharger les méthodes de paiement
        await this.fetchPaymentMethods();
      } catch (error) {
        console.error('Erreur lors de la définition du moyen de paiement par défaut:', error);
      }
    },
    
    async deletePayment(id: number) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce moyen de paiement ?')) {
        try {
          await paymentservice.delete(id);
          
          this.successMessage = 'Moyen de paiement supprimé avec succès !';
          this.showSuccessMessage = true;
          setTimeout(() => { this.showSuccessMessage = false }, 5000);
          
          // Recharger les méthodes de paiement
          await this.fetchPaymentMethods();
        } catch (error) {
          console.error('Erreur lors de la suppression du moyen de paiement:', error);
        }
      }
    },
    
    async fetchPaymentMethods() {
      try {
        const data = await paymentservice.getAll();
        this.paymentMethods = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des méthodes de paiement:', error);
      }
    }
  },
  async mounted() {
    await this.fetchPaymentMethods();
  }
});
</script>

<style scoped>
.payment-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #495057;
}
</style>