import axios from 'axios';

interface User {
  id: string;
  fullName: string;
  email: string;
}

interface PersonalInfoUpdate {
  fullName: string;
  email: string;
}

interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
}

export class UserService {
  private static API_URL = '/api/users';

  /**
   * Récupère les informations de l'utilisateur connecté
   */
  static async getCurrentUser(): Promise<User> {
    try {
      const response = await axios.get(`${this.API_URL}/me`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      throw error;
    }
  }

  /**
   * Met à jour les informations personnelles de l'utilisateur
   */
  static async updatePersonalInfo(data: PersonalInfoUpdate): Promise<User> {
    try {
      const response = await axios.put(`${this.API_URL}/me/personal-info`, data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations personnelles:', error);
      throw error;
    }
  }

  
    //Met à jour le mot de passe de l'utilisateur
   
  static async updatePassword(data: PasswordUpdate): Promise<void> {
    try {
      await axios.put(`${this.API_URL}/me/password`, data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe:', error);
      throw error;
    }
  }
}