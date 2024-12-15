// import Koa from 'koa';
// import koaBody from 'koa-body';
// import router from 'koa-router'
// const app = new Koa();
//
// app.use(koaBody());
//
// export default app;


import Koa from 'koa';
// import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();
// app.use(bodyParser());

router
    .get('/', (ctx, next) => {
        ctx.body = 'Hello World!';
    })
    .post('/',(ctx, next) => {
      console.log("Test");
      ctx.body = 'Hello World!';

    })
    .post('/users', (ctx, next) => {
        // handle your post request here
        // ctx.body = ctx.request.body;
        console.log("Hi")
    })
    .put('/users/:id', (ctx, next) => {
        // ...
    })
    .del('/users/:id', (ctx, next) => {
        // ...
    })
    .all('/users/:id', (ctx, next) => {
        // ...
    });

app.use(router.routes())
app.use(router.allowedMethods());
export default app