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
        ctx.body = 'Hello My Koa!';
    })
    .post('/ping', async (ctx, next) => {
        console.log("/ping");
        const appHostname = process.env.APP_HOSTNAME || "127.0.0.1";
        const appPort = Number(process.env.APP_API_PORT) || 3001;
        ctx.status = 201;
        ctx.body = 'Hello Koa!';
        // ctx.body = `✅ Serveur démarré : http://${appHostname}:${appPort}`;
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

export default CynaRouter
