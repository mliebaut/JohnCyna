import Router from 'koa-router';
import * as fakertest from './faker';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const CynaRouter = new Router();

CynaRouter
    .get('/', (ctx, next) => {
        ctx.body = 'Hello World!';
    })
    .post('/', async (ctx, next) => {
        console.log("Test");
        try {
            ctx.body = 'Hello World!';
        } catch (e) {
            console.log(e)
        }
    })
    .post('/faker', async (ctx, next) => {
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
    .all('/users/:id', (ctx, next) => {
        try {
        } catch (e) {
            console.log(e)
        }
    });

export default CynaRouter
