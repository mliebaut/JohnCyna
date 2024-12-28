import Router from 'koa-router';
// import * as fakertest from './faker';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const userRouter = new Router();

userRouter
    .post('/user', async (ctx, next) => {
    console.log("/user");
    try {
        ctx.body = await prisma.user.findMany()
    } catch (e) {
        console.log(e)
    }
    })
    .post('/user_create', async (ctx, next) => {
        console.log("/user_create");
        try {
            const receivedData = ctx.request.body;
            console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
            console.log(receivedData);
            const new_user: any = await prisma.user.create({
                data: {
                    email: receivedData.email,
                    lastName: receivedData.lastName,
                    firstName: receivedData.firstName,
                    password: receivedData.password
                }}
            )
            ctx.body = new_user
        } catch (e) {
            console.log(e)
        }
    });

export default userRouter