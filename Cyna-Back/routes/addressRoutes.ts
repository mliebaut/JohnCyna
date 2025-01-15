import Router from 'koa-router';
// import * as fakertest from './faker';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const addressRouter = new Router();

addressRouter
    .post('/address', async (ctx, next) => {
        console.log("/address");
        try {
            ctx.body = await prisma.address.findMany();
        } catch (e) {
            console.log(e);
        }
    })

    .post('/address/create', async (ctx, next) => {
        console.log("/address/create")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received #5595959")
                return;
            }
            console.log(`Request Body: ${JSON.stringify(receivedData)}`)
            const new_address = await prisma.address.create({
                data: {
                    streetName: receivedData.streetName,
                    streetNumber: receivedData.streetNumber,
                    postalCode: receivedData.postalCode,
                    cityName: receivedData.cityName,
                    country: receivedData.country,
                }
            })
            console.log(new_address)
            ctx.body = new_address;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })

export default addressRouter