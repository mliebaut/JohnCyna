import Router from 'koa-router';
// import * as fakertest from './faker';
import {PrismaClient} from '@prisma/client'
import productRouter from "./productRoutes";

const prisma = new PrismaClient()

const imageRouter = new Router();

imageRouter
    .post('/image', async (ctx, next) => {
        console.log("/image");
        try {
            ctx.body = await prisma.image.findMany()
        } catch (e) {
            console.log(e)
        }
    })
    .post('/image/create', async (ctx, next) => {
        console.log("/image/create");
        try {
            const received_image = ctx.request.body;
            if(!received_image){
                console.log("No Data Received #4471297")
                return;
            }
            console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
            const hashed_password = await PassFunc.hashMyPassword(received_image.password)
            const new_image: any = await prisma.image.create({
                    data: {
                        altText: received_image.altText,
                        url: received_image.url
                    }
                }
            )
            console.log(new_image)
            ctx.body = new_image;
        } catch (e) {
            console.log(e)
        }
    })


export default imageRouter