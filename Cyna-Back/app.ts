


// app.use(koaBody());

import Koa from 'koa';
import CynaRouter from './router';
import userRouter from "./routes/userRoutes";
import koaBody from 'koa-body';
import productRouter from "./routes/productRoutes";

// import bodyParser from 'koa-bodyparser';

const app = new Koa();
app.use(koaBody())
// app.use(bodyParser());

app.use(CynaRouter.routes())
app.use(CynaRouter.allowedMethods());
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(productRouter.routes())
app.use(productRouter.allowedMethods())
export default app