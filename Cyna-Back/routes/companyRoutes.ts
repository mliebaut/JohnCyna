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
    .post('/company/searchById', async (ctx, next) => {
        console.log("/company/searchById")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received #5595959")
                return;
            }
            let result = await prisma.company.findMany({
                where:{
                    id: receivedData.companyId,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
export default companyRouter