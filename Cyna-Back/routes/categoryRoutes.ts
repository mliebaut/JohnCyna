import Router from 'koa-router';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const categoryRouter = new Router();

categoryRouter
    .post('/category/create', async (ctx, next) => {
        console.log("/category/create")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #459751")
                return;
            }
            let result = await prisma.category.create({
                data:{
                    name: receivedData.categoryName,
                    description: receivedData.categoryDescription,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/category/searchAll', async (ctx, next) => {
        console.log("/category/searchAll")
        try {
            const receivedData = ctx.request.body;
            let result;
            switch (receivedData.relatedRecords) {
                case 1:
                    result = await prisma.category.findMany({include: {products: true}})
                    break;
                case 0:
                    result = await prisma.category.findMany()
                    break;
                default:
                    result = await prisma.category.findMany()
                    break;
            }
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/category/searchById', async (ctx, next) => {
        console.log("/category/searchById")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #495951")
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
    .post('/category/update', async (ctx, next) => {
        console.log("/category/update")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #759751")
                return;
            }
            let result = await prisma.category.update({
                where:{
                  id: receivedData.categoryId,
                },
                data:{
                    name: receivedData.categoryName,
                    description: receivedData.categoryDescription,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/category/delete', async (ctx, next) => {
        console.log("/category/delete")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #45951")
                return;
            }
            let result = await prisma.category.delete({
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