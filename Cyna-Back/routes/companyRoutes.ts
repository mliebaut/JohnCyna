import Router from 'koa-router';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const companyRouter = new Router();

companyRouter
    .post('/company', async (ctx, next) => {
        console.log("/company");
        try {
            ctx.body = await prisma.company.findMany()
        } catch (e) {
            console.log(e)
        }
    })
    .post('/company/create', async (ctx, next) => {
        console.log("/company/create");
        try {
            ctx.body = await prisma.company.create({
                data: {

                }
            })
        } catch (e) {
            console.log(e)
        }
    })
export default companyRouter