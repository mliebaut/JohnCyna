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

export default categoryRouter