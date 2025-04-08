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
                console.log("No Data Received - Error #4478897")
                return;
            }
            const content = JSON.parse(receivedData);
            console.log(content);
            const nom = Object.values(content)[0];
            const prenom = Object.values(content)[1];
            const email = Object.values(content)[2];
            const password = Object.values(content)[3];

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
            ctx.body = new_user;
        } catch (e) {
            console.log(e)
        }
    })
    .post('/user/login', async (ctx, next) => {
        console.log("/user/login");
        try {            
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #4477797")
                return;
            }
            const content = JSON.parse(receivedData);
            const email = Object.values(content)[0];
            const password = Object.values(content)[1];

            const existingUser = await prisma.user.findUnique({
                select: {
                    lastName: true,  
                    firstName: true,
                    email: true,
                    password: true,
                },
                where:{
                    email: Object.values(content)[0],
                }
            })

            if(!existingUser){
                console.log("User not found")
                return;
            }
            const passwordDB = Object.values(existingUser)[3];

            if (await PassFunc.checkMyPassword(password, passwordDB)){
                ctx.body = existingUser;
            }

        } catch (e) {
            console.log(e)
        }
    })
    .post('/user/searchAll', async (ctx, next) => {
        console.log("/user/searchAll");
        try {
            let result = await prisma.user.findMany()
            console.log(result)
            ctx.body = result
        } catch (e) {
            console.log(e)
        }
    })
    // - TODO: Mettre en place une mise à jour selective. Genre, tu envoie seulement le nom et prénom, ca change que ça.
    .post('/user/searchById', async (ctx, next) => {
        console.log("/user/searchById")
        try {
            const receivedData = ctx.request.body;
            if(Object.keys(receivedData).length == 0){
                console.log("No Data Received - Error #55954959")
                ctx.body = "No Data Received - Error #55954959";
                ctx.status = 404;
                return;
            }
            if(!receivedData.userId){
                console.log("No user ID in the data - Error #7D954959")
                ctx.body = "No user ID in the data - Error #7D954959"
                ctx.status = 404;
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
            console.log("Error : ")
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/user/searchByEmail', async (ctx, next) => {
        console.log("/user/searchByEmail")
        try {
            const receivedData = ctx.request.body;
            if(Object.keys(receivedData).length == 0){
                console.log("No Data Received - Error #444959")
                ctx.body = "No Data Received - Error #444959";
                ctx.status = 404;
                return;
            }
            if(!receivedData.email){
                console.log("No user email the data - Error #7D954235")
                ctx.body = "No user email in the data - Error #7D954235"
                ctx.status = 404;
                return;
            }
            let result = await prisma.user.findMany({
                where:{
                    id: receivedData.email,
                }
            })
            console.log(result)
            ctx.body = result;
        }
        catch (e) {
            console.log("Error : ")
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
    .post('/user/delete', async (ctx, next) => {
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