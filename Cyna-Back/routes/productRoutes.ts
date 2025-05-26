import Router from 'koa-router';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const productRouter = new Router();

productRouter
    .post('/product/create', async (ctx, next) => {
        console.log("/product/create");
        try {
            const receivedData = ctx.request.body;
            console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
            console.log(receivedData);
            if (!receivedData || receivedData.length < 1) {
                console.log("No Data Received - Error #7-1")
                ctx.status = 400;
                ctx.body = "No Data Received - Error #7-1"
            }
            const new_product: any = await prisma.product.create({
                    data: {
                        name: receivedData.name,
                        description: receivedData.description,
                        ean: receivedData.ean,
                        GUID: receivedData.GUID,
                        inStock: receivedData.inStock
                    }
                }
            )
            console.log(new_product)
            //TODO - Fonction dediée pour la connexion des categories
            if (receivedData.categories) {
                const created_product = await prisma.product.findUniqueOrThrow({
                        where: {
                            id: receivedData.id,
                        }
                    }
                )
                if (!created_product) {
                    console.log("Error while connecting product to categories")
                    return;
                }
                await prisma.product.update({
                    where: {
                        id: receivedData.id
                    },
                    data: {
                        categories: {
                            connect: receivedData.categoriesArray
                        }
                    }
                })
            }
            ctx.body = new_product
        } catch (e) {
            console.log(e)
            ctx.status = 400;
            ctx.body = e;
        }
    })
    .post('/product/searchAll', async (ctx, next) => {
        console.log("/product/searchAll")
        try {
            let includeRelatedRecords = 0;
            includeRelatedRecords = ctx.request.body.relatedRecords;
            console.log(' ' + includeRelatedRecords)
            switch (includeRelatedRecords) {
                case 1:
                    ctx.body = await prisma.product.findMany({
                        include: {
                            categories: true
                        }
                    });
                    break;
                case 0:
                    ctx.body = await prisma.product.findMany({})
                    break;
                default:
                    ctx.body = await prisma.product.findMany({})
                    break;
            }
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/product/searchById', async (ctx, next) => {
        console.log("/product/searchById")
        try {
            const receivedData = ctx.request.body;
            if (!receivedData || typeof receivedData.relatedRecords == 'undefined') {
                console.log("No Data Received - Error #7-2")
                ctx.body = "No Data Received - Error #7-2"
                return;
            }
            let result;
            console.log(receivedData);
            switch (receivedData.relatedRecords) {
                case 1:
                    result = await prisma.product.findFirstOrThrow({
                        where: {id: receivedData.productId}, include: {categories: true}
                    })
                    break;
                case 0:
                    result = await prisma.product.findFirstOrThrow({where: {id: receivedData.productId}})
                    break;
                default:
                    result = await prisma.product.findFirstOrThrow({where: {id: receivedData.productId}})
                    break;
            }
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
            const receivedData = ctx.request.body.updatedProduct;
            if (!receivedData) {
                console.log("No Data Received - Error #7-3")
                ctx.status = 400;
                ctx.body = "No Data Received - Error #7-3"
                return;
            }
            let categoriesIds : any[] = []
            if (receivedData.categories) {
                for (let category of receivedData.categories) {
                    categoriesIds.push({id: category.id})
                }
            }
            let result = await prisma.product.update({
                where: {
                    id: receivedData.id,
                },
                data: {
                    ean: receivedData.ean,
                    GUID: receivedData.GUID,
                    name: receivedData.name,
                    description: receivedData.description,
                    inStock: receivedData.inStock,
                    categories: {
                        connect: categoriesIds
                    }
                }
            })
            // console.log(result)
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
                console.log("No Data Received - Error #7-4")
                return;
            }
            let result = await prisma.product.delete({
                where: {
                    id: receivedData.id,
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