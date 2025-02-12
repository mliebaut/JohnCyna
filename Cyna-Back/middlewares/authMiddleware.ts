import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import dotenv from 'dotenv';

dotenv.config();

console.log("🔑 JWT_SECRET chargé :", process.env.JWT_SECRET);

export async function verifyToken(ctx: Context, next: Next) {
    try {
        // 1️⃣ Récupérer le token depuis l’URL
        const token = ctx.query.token as string;

        if (!token) {
            console.log("Aucun token fourni !");
            ctx.status = 401;
            ctx.body = { error: "Accès refusé : Aucun token fourni" };
            return;
        }

        console.log("🔍 Token reçu :", token);

        // 2️⃣ Vérifier la validité du token
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("✅ Token valide ! Décodé :", decoded);

        // 3️⃣ Stocker l'info de l’utilisateur dans `ctx.state`
        ctx.state.user = decoded;

        // 4️⃣ Continuer vers la route suivante
        await next();
    } catch (error) {
        console.log("Échec de la vérification du token :", error.message);
        ctx.status = 403;
        ctx.body = { error: "Accès refusé : Token invalide ou expiré" };
    }
}
