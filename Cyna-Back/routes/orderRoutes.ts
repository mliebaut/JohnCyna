import Router from 'koa-router';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const orderRouter = new Router();

orderRouter
    .post('/order', async (ctx, next) => {
        console.log("/order");
        try {
            ctx.body = await prisma.order.findMany()
        } catch (e) {
            console.log(e)
        }
    })
export default orderRouter