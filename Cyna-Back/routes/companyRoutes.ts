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
                    name: ctx.request.body.name,
                    phone: ctx.request.body.phone,
                    website: ctx.request.body.website,
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
                console.log("No Data Received - Error #5595959")
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
    .post('/company/update', async (ctx, next) => {
        console.log("/company/update")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #5595959")
                return;
            }
            let result = await prisma.company.update({
                where:{
                    id: receivedData.companyId,
                },
                data: {
                    name: receivedData.name,
                    phone: receivedData.phone,
                    website: receivedData.website,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/company/update_adresses', async (ctx, next) => {
        console.log("/company/update_adresses")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #5595959")
                return;
            }
            let result = await prisma.company.update({
                where:{
                    id: receivedData.companyId,
                },
                data: {
                    Addresses: {
                        connect: {id: receivedData.adressId}
                    },
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/company/update_contacts', async (ctx, next) => {
        console.log("/company/update_contacts")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #77159")
                return;
            }
            let result = await prisma.company.update({
                where:{
                    id: receivedData.companyId,
                },
                data: {
                    Contacts: {
                        connect: {id: receivedData.contactId}
                    },
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/company/delete', async (ctx, next) => {
        console.log("/company/delete")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #5595959")
                return;
            }
            let result = await prisma.company.delete({
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