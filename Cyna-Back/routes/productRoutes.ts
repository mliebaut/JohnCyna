import Router from 'koa-router';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const productRouter = new Router();

productRouter
    // -
    .post('/product', async (ctx, next) => {
        console.log("/product");
        try {
            ctx.body = await prisma.product.findMany()
        } catch (e) {
            console.log(e)
        }
    })
    .post('/product_search', async (ctx, next) => {
        console.log("/product_search");
        try {
            const receivedData = ctx.request.body;
            if(!receivedData || receivedData.length < 1){
                console.log("No Data Received - Error #8888871")
                ctx.status = 400;
                ctx.body = "No Data Received - Error #8888871"
                return;
            }
            console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
            console.log(receivedData);
// - TODO: Recherche de produits. Une version qui s'adapte à une liste d'inputs.
            const search_result = await prisma.product.findMany({
                where: {
                    OR: [
                        {}
                    ]
                }
            })
        } catch (e) {
            console.log(e)
            ctx.body = e;
        }
    })
    .post('/product/create', async (ctx, next) => {
        console.log("/product/create");
        try {
            const receivedData = ctx.request.body;
            console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
            console.log(receivedData);
            if(!receivedData || receivedData.length < 1){
                console.log("No Data Received - Error #8888871")
                ctx.status = 400;
                ctx.body = "No Data Received - Error #8888871"
            }
            const new_product: any = await prisma.product.create({
                    data: {
                        name: receivedData.name,
                        description: receivedData.description,
                        inStock: receivedData.inStock,
                        categories: {
                            connect: { id: receivedData.categoryID }
                        }
                    }
                }
            )
            console.log(new_product)
            ctx.body = new_product
        } catch (e) {
            console.log(e)
        }
    })
    .post('/product/searchById', async (ctx, next) => {
        console.log("/product/searchById")
        try {
            const receivedData = ctx.request.body;
            if (!receivedData) {
                console.log("No Data Received - Error #13595959")
                return;
            }
            let result = await prisma.product.findMany({
                where: {
                    id: receivedData.productId,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/product/update', async (ctx, next) => {
        console.log("/product/update")
        try {
            const receivedData = ctx.request.body;
            if (!receivedData) {
                console.log("No Data Received - Error #135954")
                return;
            }
            let result = await prisma.product.update({
                where: {
                    id: receivedData.productId,
                },
                data: {
                    ean: receivedData.productEan,
                    GUID: receivedData.productGuid,
                    name: receivedData.productName,
                    description: receivedData.productDescription,
                    inStock: receivedData.productInStock,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/product/delete', async (ctx, next) => {
        console.log("/product/delete")
        try {
            const receivedData = ctx.request.body;
            if (!receivedData) {
                console.log("No Data Received - Error #135952")
                return;
            }
            let result = await prisma.product.delete({
                where: {
                    id: receivedData.productId,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })

export default productRouter