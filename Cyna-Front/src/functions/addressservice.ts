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

export interface Address {
  id?: number;
  label: string;
  name: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
  type: string; // 'billing', 'shipping', 'both'
  isDefault: boolean;
}

export const addressservice = {
  /**
   * Récupère toutes les adresses de l'utilisateur
   */
  async getAll(): Promise<Address[]> {
    const response = await fetch(`${API_URL}/addresses`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la récupération des adresses');
    }
    
    return await response.json();
  },

  /**
   * Récupère une adresse spécifique par son ID
   */
  async getById(id: number): Promise<Address> {
    const response = await fetch(`${API_URL}/addresses/${id}`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la récupération de l\'adresse');
    }
    
    return await response.json();
  },

  /**
   * Crée une nouvelle adresse
   */
  async create(address: Address): Promise<Address> {
    const response = await fetch(`${API_URL}/addresses`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(address)
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la création de l\'adresse');
    }
    
    return await response.json();
  },

  /**
   * Met à jour une adresse existante
   */
  async update(address: Address): Promise<Address> {
    const response = await fetch(`${API_URL}/addresses/${address.id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(address)
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la mise à jour de l\'adresse');
    }
    
    return await response.json();
  },

  /**
   * Supprime une adresse
   */
  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/addresses/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la suppression de l\'adresse');
    }
  },

  /**
   * Définit une adresse comme adresse par défaut
   */
  async setDefault(id: number, type?: string): Promise<void> {
    const response = await fetch(`${API_URL}/addresses/${id}/default`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ type })
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la définition de l\'adresse par défaut');
    }
  }
};