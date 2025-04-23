import Router from 'koa-router';
import * as fakertest from './faker';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const CynaRouter = new Router();

CynaRouter
    .get('/', (ctx, next) => {
        ctx.body = 'Hello Koa!!';
    })
    .post('/', async (ctx, next) => {
        console.log("/ - Empty Post request");
        try {
            ctx.body = 'Hello My Koa!';
        } catch (e) {
            console.log(e)
        }
    })
    .post('/faker', async (ctx, next) => {
        console.log("/faker")
        try {
            const result = await fakertest.generate_fake_data();
            ctx.body = "Generated Basic Fixtures."
        } catch (e) {
            console.log(e)
            ctx.body = e
        }
    })
    .all('/users/:id', (ctx, next) => {
        try {
        } catch (e) {
            console.log(e)
        }
    });

export default CynaRouter
