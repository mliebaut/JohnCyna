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


export default imageRouter