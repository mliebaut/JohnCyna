import Router from 'koa-router';
// import * as fakertest from './faker';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const productRouter = new Router();

productRouter
    .post('/product', async (ctx, next) => {
    console.log("/product");
    try {
        ctx.body = await prisma.product.findMany()
    } catch (e) {
        console.log(e)
    }
    })
    .post('/product_create', async (ctx, next) => {
        console.log("/product_create");
        try {
            const receivedData = ctx.request.body;
            console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
            console.log(receivedData);
            const new_product: any = await prisma.product.create({
                data: {
                    name: receivedData.name,
                    description: receivedData.description,
                    inStock: receivedData.inStock,
                    categories: {
                        connect: {
                            id: receivedData.categoryID
                        }
                    }
                }}
            )
            ctx.body = new_product
        } catch (e) {
            console.log(e)
        }
    });

export default productRouter