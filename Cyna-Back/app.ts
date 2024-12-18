


// app.use(koaBody());

import Koa from 'koa';
import CynaRouter from './router';

// import bodyParser from 'koa-bodyparser';
// import koaBody from 'koa-body';

const app = new Koa();
// app.use(bodyParser());

app.use(CynaRouter.routes())
app.use(CynaRouter.allowedMethods());
export default app