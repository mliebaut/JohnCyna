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

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string; // Utilisé uniquement côté client
}

export interface TwoFactorStatus {
  enabled: boolean;
  setupRequired?: boolean;
}

export interface Session {
  id: number;
  deviceName: string;
  deviceType: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface LoginHistoryEntry {
  date: string;
  ip: string;
  location: string;
  device: string;
  status: string;
}

export const securityservice = {
  /**
   * Change le mot de passe de l'utilisateur
   */
  async changePassword(passwordData: PasswordChangeRequest): Promise<void> {
    const response = await fetch(`${API_URL}/security/change-password`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors du changement de mot de passe');
    }
  },

  /**
   * Récupère le statut de l'authentification à deux facteurs
   */
  async getTwoFactorStatus(): Promise<TwoFactorStatus> {
    const response = await fetch(`${API_URL}/security/two-factor-status`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la récupération du statut de l\'authentification à deux facteurs');
    }
    
    return await response.json();
  },

  /**
   * Génère un QR code pour configurer l'authentification à deux facteurs
   */
  async getTwoFactorQrCode(): Promise<string> {
    const response = await fetch(`${API_URL}/security/two-factor-qr-code`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la génération du QR code');
    }
    
    const data = await response.json();
    return data.qrCodeUrl;
  },

  /**
   * Vérifie le code de l'authentification à deux facteurs pour l'activer
   */
  async verifyTwoFactorCode(code: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/security/verify-two-factor`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ code })
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la vérification du code');
    }
    
    const data = await response.json();
    return data.success;
  },

  /**
   * Désactive l'authentification à deux facteurs
   */
  async disableTwoFactor(): Promise<void> {
    const response = await fetch(`${API_URL}/security/disable-two-factor`, {
      method: 'POST',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la désactivation de l\'authentification à deux facteurs');
    }
  },

  /**
   * Récupère toutes les sessions actives
   */
  async getActiveSessions(): Promise<Session[]> {
    const response = await fetch(`${API_URL}/security/sessions`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la récupération des sessions actives');
    }
    
    return await response.json();
  },

  /**
   * Termine une session spécifique
   */
  async terminateSession(sessionId: number): Promise<void> {
    const response = await fetch(`${API_URL}/security/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la déconnexion de la session');
    }
  },

  /**
   * Termine toutes les sessions sauf la session courante
   */
  async terminateAllSessions(): Promise<void> {
    const response = await fetch(`${API_URL}/security/sessions`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la déconnexion de toutes les sessions');
    }
  },

  /**
   * Récupère l'historique des connexions
   */
  async getLoginHistory(): Promise<LoginHistoryEntry[]> {
    const response = await fetch(`${API_URL}/security/login-history`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      return handleError(response, 'Erreur lors de la récupération de l\'historique des connexions');
    }
    
    return await response.json();
  }
};