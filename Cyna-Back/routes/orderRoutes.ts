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
                console.log("No Data Received #4784559")
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
export default orderRouter