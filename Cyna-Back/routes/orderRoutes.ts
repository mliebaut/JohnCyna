import Router from 'koa-router';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const orderRouter = new Router();

orderRouter
    .post('/order/create', async (ctx, next) => {
        console.log("/order/create")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData || receivedData.length < 1){
                console.log("No Data Received - Error #6-1")
                ctx.status = 400;
                ctx.body = "No Data Received - Error #6-1"
            }
            ctx.body = await prisma.order.create({
                data: {
                    referenceNumber: receivedData.referenceNumber,
                    price: receivedData.price
                },
            });
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/order/searchAll', async (ctx, next) => {
        console.log("/order/searchAll")
        try {
            ctx.body = await prisma.order.findMany({});
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/order/searchById', async (ctx, next) => {
        console.log("/order/searchById")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #6-2")
                ctx.status = 400;
                ctx.body = "No Data Received - Error #6-2"
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
                console.log("No Data Received - Error #6-3")
                ctx.status = 400;
                ctx.body = "No Data Received - Error #6-3"
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
                console.log("No Data Received - Error #6-4")
                ctx.status = 400;
                ctx.body = "No Data Received - Error #6-4"
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