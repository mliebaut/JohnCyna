import Router from 'koa-router';
import {PrismaClient} from '@prisma/client'
import * as PassFunc from '../functions/password'
import {UserPermission} from "@prisma/client";

const prisma = new PrismaClient()

const userRouter = new Router();

userRouter
    .post('/user/create', async (ctx, next) => {
        console.log("/user/create");
        console.log(ctx.request.body);
        try {
            const receivedData = ctx.request.body.createdUser;
            if(!receivedData){
                console.log("No Data Received - Error #11-1")
                return;
            }
            const hashed_password = await PassFunc.hashMyPassword(receivedData.password.toString())
            const new_user: any = await prisma.user.create({
                    data: {
                        email: receivedData.email.toLowerCase(),
                        lastName: receivedData.lastName,
                        firstName: receivedData.firstName,
                        password: hashed_password.toString()
                    }
                }
            )
            ctx.body = new_user;
        } catch (e) {
            console.log(e)
        }
    })
    .post('/user/getAllRoles', async (ctx, next) => {
        console.log("/user/getAllRoles");
        try {
            ctx.body = UserPermission;
        } catch (e) {
            console.log(e)
        }
    })
    .post('/user/searchAll', async (ctx, next) => {
        console.log("/user/searchAll");
        try {
            ctx.body = await prisma.user.findMany()
        } catch (e) {
            console.log(e)
        }
    })
    // - TODO: Mettre en place une mise à jour selective. Genre, tu envoie seulement le nom et prénom, ca change que ça.
    .post('/user/searchById', async (ctx, next) => {
        console.log("/user/searchById")
        try {
            const receivedData = ctx.request.body;
            console.log(receivedData);
            if(Object.keys(receivedData).length == 0){
                console.log("No Data Received - Error #11-2")
                ctx.body = "No Data Received - Error #11-2";
                ctx.status = 404;
                return;
            }
            if(!receivedData.userId){
                console.log("No user ID in the data - Error #11-3")
                ctx.body = "No user ID in the data - Error #11-3"
                ctx.status = 404;
                return;
            }
            let result = await prisma.user.findFirstOrThrow({
                where:{
                    id: receivedData.userId
                },
            })
            console.log(result)
            ctx.body = result;
        } catch (e) {
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/user/searchByEmail', async (ctx, next) => {
        console.log("/user/searchByEmail")
        try {
            const receivedData = ctx.request.body;
            if(Object.keys(receivedData).length == 0){
                console.log("No Data Received - Error #11-4")
                ctx.body = "No Data Received - Error #11-4";
                ctx.status = 404;
                return;
            }
            if(!receivedData.email){
                console.log("No user email the data - Error #11-5")
                ctx.body = "No user email in the data - Error #11-5"
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
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/user/update', async (ctx, next) => {
        console.log("/user/update");
        console.log(ctx.request.body);
        try {
            if(!ctx.request.body){
                console.log("No Data Received - Error #11-17")
                ctx.body = "No Data Received - Error #11-17";
                ctx.status = 404;
                return
            }
            const receivedData = ctx.request.body.updatedUser;
            if(Object.keys(receivedData).length == 0){
                console.log("No Data Received - Error #11-14")
                ctx.body = "No Data Received - Error #11-14";
                ctx.status = 404;
                return;
            }
            if(!receivedData.email){
                console.log("No user email the data - Error #11-9")
                ctx.body = "No user email in the data - Error #11-9"
                ctx.status = 404;
                return;
            }
            console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
            console.log(receivedData);
            const userToUpdate: any = await prisma.user.update({
                where: {
                    id: receivedData.id
                },
                data: {
                    email: receivedData.email.toLowerCase(),
                    lastName: receivedData.lastName,
                    firstName: receivedData.firstName,
                    role: receivedData.role
                }
            })
            ctx.body = userToUpdate;
        } catch (e) {
            console.log(e)
            ctx.body = e;
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
    .post('/user/login', async (ctx, next) => {
        console.log("/user/login");
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #11-7")
                return;
            }

            const existingUser = await prisma.user.findUnique({
                select: {
                    lastName: true,
                    firstName: true,
                    email: true,
                    password: true,
                },
                where:{
                    email: receivedData.email
                }
            })

            if(!existingUser){
                console.log("User not found")
                ctx.body = "User not found";
            }

            const passwordResult = await PassFunc.checkMyPassword(receivedData.password, existingUser.password);
            console.log(passwordResult)
            if (passwordResult){
                console.log("Passwords Match")
                //Envoie d'un token ICI
                ctx.body = "Passwords Match!";
            } else {
                console.log("Wrong Password")
                ctx.status = 404;
                ctx.body = 'Wrong Password'
            }

        } catch (e) {
            console.log(e)
        }
    })
;

export default userRouter