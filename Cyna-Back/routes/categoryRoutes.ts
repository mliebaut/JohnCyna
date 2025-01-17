import Router from 'koa-router';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const categoryRouter = new Router();

categoryRouter
    .post('/category', async (ctx, next) => {
        console.log("/category");
        try {
            ctx.body = await prisma.category.findMany()
        } catch (e) {
            console.log(e)
        }
    })
    .post('/category/searchById', async (ctx, next) => {
        console.log("/category/searchById")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received #495951")
                return;
            }
            let result = await prisma.category.findMany({
                where:{
                    id: receivedData.categoryId,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })

export default categoryRouter