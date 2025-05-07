
export interface User {
    id: string;
    fullName: string;
    email: string;
  }
  
  interface PasswordUpdateData {
    currentPassword: string;
    newPassword: string;
  }
  
  interface PersonalInfoUpdateData {
    fullName: string;
    email: string;
  }
  
  export class UserService {
    private static API_URL = '/api/users'; 
  
    static async getCurrentUser(): Promise<User> {
      const response = await fetch(`${this.API_URL}/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
         
        },
        credentials: 'include', // Pour envoyer les cookies d'authentification
      });
  
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des données utilisateur: ${response.status}`);
      }
  
      return await response.json();
    }
  
    static async updatePersonalInfo(data: PersonalInfoUpdateData): Promise<void> {
      const response = await fetch(`${this.API_URL}/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour des informations personnelles: ${response.status}`);
      }
    }
  
    static async updatePassword(data: PasswordUpdateData): Promise<void> {
      const response = await fetch(`${this.API_URL}/me/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour du mot de passe: ${response.status}`);
      }
    }
  }