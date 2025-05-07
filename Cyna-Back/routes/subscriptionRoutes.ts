import Router from 'koa-router';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const subscriptionRouter = new Router();

subscriptionRouter
    .post('/subscription/create', async (ctx, next) => {
        console.log("/subscription/create");
        try {
            const received_subscription = ctx.request.body;
            if (!received_subscription) {
                console.log("No Data Received - Error #9-1")
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
    .post('/subscription/SearchAll', async (ctx, next) => {
        console.log("/subscription/SearchAll");
        try {
            ctx.body = await prisma.subscription.findMany({});
        } catch (e) {
            console.log(e)
        }
    })
    .post('/subscription/SearchByID', async (ctx, next) => {
        console.log("/subscription/SearchByID");
        try {
            const receivedData = ctx.request.body;
            if (!receivedData) {
                console.log("No Data Received - Error #9-2")
                return;
            }
            ctx.body = await prisma.subscription.findMany({
                where: {
                    id: receivedData.subscriptionId,
                }
            });
        } catch (e) {
            console.log(e)
        }
    })
    .post('/subscription/update', async (ctx, next) => {
        console.log("/subscription/update");
        try {
            const received_subscription = ctx.request.body;
            if (!received_subscription) {
                console.log("No Data Received - Error #9-3")
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
                console.log("No Data Received - Error #9-4")
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