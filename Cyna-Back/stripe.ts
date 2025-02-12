import Router from 'koa-router';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const router = new Router();

// Route pour créer une session de paiement Stripe
router.post('/create-checkout-session', async (ctx) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
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

        ctx.status = 200;
        ctx.body = { url: session.url };
    } catch (error) {
        console.error('Erreur Stripe :', error);
        ctx.status = 500;
        ctx.body = { error: 'Erreur lors de la création de la session de paiement' };
    }
});

export default router;
