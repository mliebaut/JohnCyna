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
            if(!receivedData){
                console.log("No Data Received #4478897")
                return;
            }
            var content = JSON.parse(receivedData);
            console.log(content);
            var nom = Object.values(content)[0];
            var prenom = Object.values(content)[1];
            var email = Object.values(content)[2];
            var password = Object.values(content)[3];

            const hashed_password = await PassFunc.hashMyPassword(password.toString())
            const new_user: any = await prisma.user.create({
                    data: {
                        email: email,
                        lastName: nom,
                        firstName: prenom,
                        password: hashed_password.toString()
                    }
                }
            )
            console.log(new_user)
        } catch (e) {
            console.log(e)
        }
    })
    .post('/user/login', async (ctx, next) => {
        console.log("/user/login");
        try {            
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received #4477797")
                return;
            }
            var content = JSON.parse(receivedData);
            var email = Object.values(content)[0];
            var password = Object.values(content)[1];

            const existingUserPassword = await prisma.user.findUnique({
                select: {
                  password: true,
                },
                where:{
                    email: Object.values(content)[0],
                }
            })

            var passwordDB = Object.values(existingUserPassword)[0];

            if (await PassFunc.checkMyPassword(password, passwordDB)){
                console.log("OUI")
            }else{
                console.log("NON")
            }


        } catch (e) {
            console.log(e)
        }
    })
    // - TODO: Mettre en place une mise à jour selective. Genre, tu envoie seulement le nom et prenom, ca change que ça.
    .post('/user/searchById', async (ctx, next) => {
        console.log("/user/searchById")
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received #55954959")
                return;
            }
            let result = await prisma.user.findMany({
                where:{
                    id: receivedData.userId,
                }
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
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