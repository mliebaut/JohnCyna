import Router from 'koa-router';
import { verifyToken } from "../middlewares/authMiddleware";

const router = new Router();

// Route sécurisée avec JWT
router.get('/success', verifyToken, async (ctx) => {
    console.log("Route /success atteinte après vérification du token !");
    ctx.body = { message: "Paiement réussi 🎉", user: ctx.state.user };
});

export default router;
