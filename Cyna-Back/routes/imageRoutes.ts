import Router from 'koa-router';
import {PrismaClient} from '@prisma/client'

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
            const new_image: any = await prisma.image.create({
                    data: {
                        // altText: received_image.alText,
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
    .post('/image/searchById', async (ctx, next) => {
        console.log("/image/searchById")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received #7595959")
                return;
            }
            let result = await prisma.image.findMany({
                where:{
                    id: receivedData.imageId,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })


export default imageRouter