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
    .post('/order/searchById', async (ctx, next) => {
        console.log("/order/searchById")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #8888888")
                return;
            }
            let result = await prisma.order.findMany({
                where:{
                    id: receivedData.orderId,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/order/update', async (ctx, next) => {
        console.log("/order/update")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #8888871")
                return;
            }
            let result = await prisma.order.update({
                where:{
                    id: receivedData.orderId,
                },
                data:{
                    referenceNumber: receivedData.referenceNumber,
                    price: receivedData.price,
                    paid: receivedData.paid,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/order/delete', async (ctx, next) => {
        console.log("/order/delete")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #8888881")
                return;
            }
            let result = await prisma.order.delete({
                where:{
                    id: receivedData.orderId,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })


export default orderRouter