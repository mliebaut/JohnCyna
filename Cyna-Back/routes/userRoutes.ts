import Router from 'koa-router';
import {PrismaClient} from '@prisma/client'
import * as PassFunc from '../functions/password'

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
    .post('/user/create', async (ctx, next) => {
        console.log("/user/create");
        try {
            const receivedData = ctx.request.body;
            console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
            const hashed_password = await PassFunc.hashMyPassword(receivedData.password)
            const new_user: any = await prisma.user.create({
                    data: {
                        email: receivedData.email,
                        lastName: receivedData.lastName,
                        firstName: receivedData.firstName,
                        password: hashed_password.toString()
                    }
                }
            )
            console.log(new_user)
            ctx.body = new_user
        } catch (e) {
            console.log(e)
        }
    })
    .post('/user/login', async (ctx, next) => {
        console.log("/user/login");
        try {

        } catch (e) {
            console.log(e)
        }
    })
    // - TODO: Mettre en place une mise à jour selective. Genre, tu envoie seulement le nom et prenom, ca change que ça.
    .post('user/update', async (ctx, next) => {
        console.log("/user/update");
        try {
            const receivedData = ctx.request.body;
            console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
            console.log(receivedData);
            const userToUpdate: any = await prisma.user.update({
                where: {
                    id: receivedData.userId
                },
                data: {
                    //     METTRE LES ARGUMENTS ICI
                }
            })
        } catch (e) {
            console.log(e)
        }
    })
    .del('/user/delete', async (ctx, next) => {
        console.log("/user/delete");
        try {
            const receivedData = ctx.request.body;
            console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
            console.log(receivedData);
            const userToDelete: any = await prisma.user.delete({
                where: {
                    id: receivedData.userId
                }
            })
            console.log(userToDelete)
            ctx.body = userToDelete
        } catch (e) {
            console.log(e)
        }
    })
;

export default userRouter