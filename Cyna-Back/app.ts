import Koa from 'koa';
import koaBody from 'koa-body';
import cors from '@koa/cors';

// Import des routes existantes
import CynaRouter from './router';
import addressRouter from "./routes/addressRoutes";
import categoryRouter from "./routes/categoryRoutes";
import companyRouter from "./routes/companyRoutes";
import imageRouter from "./routes/imageRoutes";
import orderRouter from "./routes/orderRoutes";
import productRouter from "./routes/productRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import userRouter from "./routes/userRoutes";

//  Import du router Stripe
//import stripeRouter from "./routes/stripe";
//import successRouter from "./routes/success";

const app = new Koa();

//  Middleware CORS pour autoriser le frontend (Vue.js)
app.use(
    cors({
        origin: 'http://localhost:5173', // Autorise uniquement le frontend Vue.js
        credentials: true, // Permet d’envoyer les cookies et headers sécurisés
        allowMethods: ['GET', 'POST', 'OPTIONS'], // Autorise GET, POST et OPTIONS
        allowHeaders: ['Content-Type', 'Authorization'], // Headers autorisés
    })
);

//  Middleware pour parser les requêtes JSON
app.use(koaBody());

// //  Route de test pour vérifier que le serveur fonctionne
// app.use(async (ctx, next) => {
//     if (ctx.path === "/") {
//         ctx.body = "Hello Koa";
//         return;
//     }
//     await next();
// });

//  Intégration des routes existantes
app.use(CynaRouter.routes()).use(CynaRouter.allowedMethods());
app.use(addressRouter.routes()).use(addressRouter.allowedMethods());
app.use(categoryRouter.routes()).use(categoryRouter.allowedMethods());
app.use(companyRouter.routes()).use(companyRouter.allowedMethods());
app.use(imageRouter.routes()).use(imageRouter.allowedMethods());
app.use(orderRouter.routes()).use(orderRouter.allowedMethods());
app.use(productRouter.routes()).use(productRouter.allowedMethods());
app.use(subscriptionRoutes.routes()).use(subscriptionRoutes.allowedMethods());
app.use(userRouter.routes()).use(userRouter.allowedMethods());

//  Intégration des routes Stripe
//app.use(stripeRouter.routes()).use(stripeRouter.allowedMethods());
//app.use(successRouter.routes()).use(successRouter.allowedMethods());

export default app;
