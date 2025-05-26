import Router from 'koa-router';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { verifyToken } from "../middlewares/authMiddleware";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const router = new Router();

// on charge la clé secrète depuis le .env
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

// Route pour créer une session de paiement Stripe
router.post('/create-checkout-session', async (ctx) => {
    try {

        const userId = "123";
        const token = jwt.sign({ userId }, JWT_SECRET);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `http://localhost:5173/success?token=${token}`,
            cancel_url: 'http://localhost:5173/cancel',
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: { name: 'Produit Test' },
                        unit_amount: 2000, // 20.00 €
                    },
                    quantity: 1,
                },
            ],
        });

        console.log("✅ Session Stripe créée :", session.id);

        ctx.status = 200;
        ctx.body = { url: session.url };
    } catch (error) {
        console.error("❌ Erreur lors de la création de la session Stripe :", error);
        ctx.status = 500;
        ctx.body = { error: "Erreur lors de la création de la session Stripe" };
    }
});

// Route sécurisée avec JWT
router.get('/success', verifyToken, async (ctx) => {
    console.log("Route /success atteinte après vérification du token !");
    ctx.body = { message: "Paiement réussi", user: ctx.state.user };
});

export default router;
