import Router from 'koa-router';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const subscriptionRouter = new Router();

subscriptionRouter
    .post('/subscription', async (ctx, next) => {
        console.log("/subscription");
        try {
            ctx.body = await prisma.subscription.findMany()
        } catch (e) {
            console.log(e)
        }
    })
export default subscriptionRouter