import { handleError } from './errorhandler';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// Helper pour les headers communs et gestion du token
const getHeaders = () => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  
  const token = localStorage.getItem('token');
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  
  return headers;
};

export interface Subscription {
  id: number;
  name: string;
  status: string;
  plan: string;
  price: string;
  billingCycle: string;
  nextBillingDate: string;
}

export const subscriptionservice = {
  /**
   * Récupère tous les abonnements de l'utilisateur
   */
  async getAll(): Promise<Subscription[]> {
    const response = await fetch(`${API_URL}/subscriptions`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la récupération des abonnements');
    }
    
    return await response.json();
  },

  /**
   * Récupère un abonnement spécifique par son ID
   */
  async getById(id: number): Promise<Subscription> {
    const response = await fetch(`${API_URL}/subscriptions/${id}`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la récupération de l\'abonnement');
    }
    
    return await response.json();
  },

  /**
   * Met à niveau un abonnement
   */
  async upgrade(id: number, planId?: number): Promise<void> {
    const response = await fetch(`${API_URL}/subscriptions/${id}/upgrade`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ planId })
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la mise à niveau de l\'abonnement');
    }
  },

  /**
   * Renouvelle un abonnement
   */
  async renew(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/subscriptions/${id}/renew`, {
      method: 'POST',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors du renouvellement de l\'abonnement');
    }
  },

  /**
   * Annule un abonnement
   */
  async cancel(id: number, reason?: string): Promise<void> {
    const response = await fetch(`${API_URL}/subscriptions/${id}/cancel`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ reason })
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de l\'annulation de l\'abonnement');
    }
  }
};