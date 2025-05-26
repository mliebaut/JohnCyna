import jwt from 'jsonwebtoken';

const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function hashMyPassword(password: string) {
    const hashed_password:string = await bcrypt.hash(password, saltRounds)
    return hashed_password
}

export async function checkMyPassword(password: string, hashedPassword: string) {
    const match = await bcrypt.compare(password, hashedPassword);
    console.log(match ? 'Passwords match' : 'Passwords do not match');
    return match;
}
// À ajouter à functions/password.ts
// Clé secrète pour signer les tokens JWT (à mettre dans un fichier .env en production)
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Génère un token JWT pour la vérification d'email
export const generateToken = (payload: any): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
};

// Vérifie et décode un token JWT
export const verifyToken = (token: string): any | null => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
        return null;
    }
};

// hashMyPassword(myPlaintextPassword).then(hashedPassword => {
//     checkMyPassword(myPlaintextPassword, hashedPassword);
// });
