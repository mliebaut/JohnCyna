import Koa from 'koa';
import koaBody from 'koa-body';
// import router from 'koa-router'
const app = new Koa();

app.use(koaBody());

export default app;
