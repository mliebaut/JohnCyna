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
        console.log("/ - Empty Post request");
        ctx.body = 'Hello World!';
    })
    .post('/faker', async (ctx, next) => {
        console.log("/faker")
        try {
            const result = await fakertest.generate_fake_data();
            console.log(result)
            if(result){
                ctx.body = result;
            } else {
                ctx.body = result
            }
        } catch (e) {
            console.log(e)
            ctx.body = e
        }
    })
    // .all('/users/:id', (ctx, next) => {
    //     try {
    //     } catch (e) {
    //         console.log(e)
    //     }
    // })
    .all('/ping', async (ctx, next) => {
        console.log("/ping")
        try {
            ctx.body = 'Selapin';
            ctx.response.body = 'Server up and running...';
            ctx.status = 200;
        } catch (e) {
            console.log(e)
        }
    });

export default CynaRouter
