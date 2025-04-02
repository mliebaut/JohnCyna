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
    .post('/subscription/create', async (ctx, next) => {
        console.log("/subscription/create");
        try {
            const received_subscription = ctx.request.body;
            if (!received_subscription) {
                console.log("No Data Received - Error #97521954")
                return;
            }
            console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
            const new_subscription: any = await prisma.subscription.create({
                    data: {
                        type: received_subscription.type,
                        price: received_subscription.price,
                        duration: received_subscription.duration
                    }
                }
            )
            console.log(new_subscription)
            ctx.body = new_subscription;
        } catch (e) {
            console.log(e)
        }
    })

    .post('/subscription/update', async (ctx, next) => {
        console.log("/subscription/update");
        try {
            const received_subscription = ctx.request.body;
            if (!received_subscription) {
                console.log("No Data Received - Error #97521974")
                return;
            }
            console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
            const new_subscription: any = await prisma.subscription.update({
                    where: {
                        id: received_subscription.subscriptionId,
                    },
                    data: {
                        type: received_subscription.type,
                        price: received_subscription.price,
                        duration: received_subscription.duration
                    }
                }
            )
            console.log(new_subscription)
            ctx.body = new_subscription;
        } catch (e) {
            console.log(e)
        }
    })

    .post('/subscription/delete', async (ctx, next) => {
        console.log("/subscription/delete");
        try {
            const received_subscription = ctx.request.body;
            if (!received_subscription) {
                console.log("No Data Received - Error #97121954")
                return;
            }
            console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
            const new_subscription: any = await prisma.subscription.delete({
                    where: {
                        id: received_subscription.subscriptionId,
                    }
                }
            )
            console.log(new_subscription)
            ctx.body = new_subscription;
        } catch (e) {
            console.log(e)
        }
    })

export default subscriptionRouter