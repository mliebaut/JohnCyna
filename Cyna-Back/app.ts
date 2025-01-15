


// app.use(koaBody());

import Koa from 'koa';
import koaBody from 'koa-body';
// import bodyParser from 'koa-bodyparser';

import CynaRouter from './router';
import addressRouter from "./routes/addressRoutes";
import categoryRouter from "./routes/categoryRoutes";
import companyRouter from "./routes/companyRoutes";
import imageRouter from "./routes/imageRoutes";
import orderRouter from "./routes/orderRoutes";
import productRouter from "./routes/productRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import userRouter from "./routes/userRoutes";

const app = new Koa();
app.use(koaBody())
// app.use(bodyParser());

app.use(CynaRouter.routes())
app.use(CynaRouter.allowedMethods());
app.use(addressRouter.routes())
app.use(addressRouter.allowedMethods())
app.use(categoryRouter.routes())
app.use(categoryRouter.allowedMethods())
app.use(companyRouter.routes())
app.use(companyRouter.allowedMethods())
app.use(imageRouter.routes())
app.use(imageRouter.allowedMethods())
app.use(orderRouter.routes())
app.use(orderRouter.allowedMethods())
app.use(productRouter.routes())
app.use(productRouter.allowedMethods())
app.use(subscriptionRoutes.routes())
app.use(subscriptionRoutes.allowedMethods())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

export default app