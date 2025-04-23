import Router from 'koa-router';
// import * as fakertest from './faker';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const addressRouter = new Router();

addressRouter
    .post('/address/create', async (ctx, next) => {
        console.log("/address/create")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #5595959")
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
    .post('/address/searchAll', async (ctx, next) => {
        console.log("/address/searchAll");
        try {
            ctx.body = await prisma.address.findMany();
        } catch (e) {
            console.log(e);
        }
    })
    .post('/address/searchById', async (ctx, next) => {
        console.log("/address/searchById")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #5117059")
                return;
            }
            let result = await prisma.address.findMany({
                where:{
                        id: receivedData.addressId,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/address/searchByPostalCode', async (ctx, next) => {
        console.log("/address/searchByPostalCode")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #55135959")
                return;
            }
            let result = await prisma.address.findMany({
                where:{
                    postalCode: receivedData.postalCode,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/address/update', async (ctx, next) => {
        console.log("/address/update")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #17959")
                return;
            }
            let result = await prisma.address.update({
                where:{
                    id: receivedData.adressId,
                },
                data:{
                    streetName: receivedData.streetName,
                    streetNumber: receivedData.streetNumber,
                    postalCode: receivedData.postalCode,
                    cityName: receivedData.cityName,
                    country: receivedData.country,
                    extraInformation: receivedData.extraInformation
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/address/delete', async (ctx, next) => {
        console.log("/address/delete")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #557771")
                return;
            }
            let result = await prisma.address.delete({
                where:{
                    id: receivedData.addressId,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })

export default addressRouter