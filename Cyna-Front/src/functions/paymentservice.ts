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

export interface PaymentMethod {
  id?: number;
  type: string; // 'card', 'paypal'
  cardNumber?: string;
  lastDigits?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  email?: string;
  isDefault: boolean;
}

export const paymentservice = {
  /**
   * Récupère toutes les méthodes de paiement de l'utilisateur
   */
  async getAll(): Promise<PaymentMethod[]> {
    const response = await fetch(`${API_URL}/payment-methods`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la récupération des méthodes de paiement');
    }
    
    return await response.json();
  },

  /**
   * Crée une nouvelle méthode de paiement
   */
  async create(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
    const response = await fetch(`${API_URL}/payment-methods`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(paymentMethod)
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la création de la méthode de paiement');
    }
    
    return await response.json();
  },

  /**
   * Supprime une méthode de paiement
   */
  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/payment-methods/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la suppression de la méthode de paiement');
    }
  },

  /**
   * Définit une méthode de paiement comme méthode par défaut
   */
  async setDefault(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/payment-methods/${id}/default`, {
      method: 'PUT',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la définition de la méthode de paiement par défaut');
    }
  }
};