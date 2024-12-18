
import Router from 'koa-router';
const CynaRouter = new Router();


CynaRouter
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

export default CynaRouter