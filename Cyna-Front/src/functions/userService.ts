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

export interface Profile {
  fullName?: string;
  firstName?: string;
  lastName?: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
}

export const userService = {
  /**
   * Récupère les informations du profil utilisateur
   */
  async getProfile(): Promise<Profile> {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la récupération du profil');
    }
    
    return await response.json();
  },

  /**
   * Met à jour les informations du profil utilisateur
   */
  async updateProfile(profile: Profile): Promise<void> {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(profile)
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la mise à jour du profil');
    }
  },

  /**
   * Récupère les informations de contact de l'utilisateur
   */
  async getContactInfo(): Promise<ContactInfo> {
    const response = await fetch(`${API_URL}/users/contact`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la récupération des informations de contact');
    }
    
    return await response.json();
  },

  /**
   * Met à jour les informations de contact de l'utilisateur
   */
  async updateContact(contactInfo: ContactInfo): Promise<void> {
    const response = await fetch(`${API_URL}/users/contact`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(contactInfo)
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la mise à jour des informations de contact');
    }
  }
};