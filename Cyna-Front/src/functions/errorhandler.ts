/**
 * Fonction utilitaire pour gérer les erreurs des appels API avec Fetch
 */
export const handleError = async (response: Response, defaultMessage: string): Promise<never> => {
    let errorMessage = defaultMessage;
    
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      // Si la réponse n'est pas du JSON valide, on utilise le message par défaut
    }
    
    console.error(`${defaultMessage}: Status ${response.status}`);
    throw new Error(errorMessage);
  };