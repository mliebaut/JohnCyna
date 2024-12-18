import Router from 'koa-router';
import * as fakertest from './faker';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
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
        console.log("Hi");
    })
    .post('/faker', async (ctx, next) => {
        // handle your post request here
        // ctx.body = ctx.request.body;
        console.log("/faker")
        try {
            const result = await fakertest.generate_fake_data();
            console.log(result)
            ctx.body = result
        } catch (e) {
            console.log(e)
        }
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
