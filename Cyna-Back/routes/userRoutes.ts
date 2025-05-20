import Router from 'koa-router';
import {PrismaClient} from '@prisma/client'
import * as PassFunc from '../functions/password'

const prisma = new PrismaClient()

const userRouter = new Router();

const jwt = require('jsonwebtoken');

userRouter
    .post('/user/create', async (ctx, next) => {
        console.log("/user/create");
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #11-1")
                return;
            }
            const content = JSON.parse(receivedData);
            console.log(content);
            const nom = Object.values(content)[0] as string;
            const prenom = Object.values(content)[1] as string;
            const email = Object.values(content)[2] as string;
            const password = Object.values(content)[3] as string;

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
            if(!new_user){
                console.log("Create User failed")
                return;
            }
            const token = jwt.sign(new_user, "secret",{expiresIn: '15m'});
            console.log(token)
            await prisma.user.update({
                where: {
                    email: Object.values(content)[2] as string,
                },
                data: {
                    confirmEmailToken: token,
                }
            })
            ctx.body = JSON.stringify({ token });
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
            let content = JSON.parse(receivedData);
            let email = Object.values(content)[0] as string;
            let password = Object.values(content)[1] as string;

            const existingUser = await prisma.user.findUnique({
                select: {
                    lastName: true,  
                    firstName: true,
                    email: true,
                    password: true,
                    emailConfirmed: true,
                },
                where:{
                    email: Object.values(content)[0] as string,
                }
            })

            if(!existingUser){
                console.log("User not found")
                ctx.body = "user not found";
                return;
            }
            let passwordDB = Object.values(existingUser)[3] as string;

            if (await PassFunc.checkMyPassword(password, passwordDB)){
                if(Object.values(existingUser)[4] as boolean == false)
                    {
                        console.log("User has not confirm his email")
                        ctx.body = "mail not verified";
                        return;
                    }
                ctx.body = existingUser;
            }else{
                ctx.body = "authentification failed";
            }
            
        }
        catch (e) {
            console.log(e)
        }
    }
)
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
            console.log("Error : ")
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/user/searchByEmail', async (ctx, next) => {
        console.log("/user/searchByEmail")
        try {
            const receivedData = ctx.request.body;
            let content = JSON.parse(receivedData);
            let email = Object.values(content)[0] as string;
            if(Object.keys(receivedData).length == 0){
                console.log("No Data Received - Error #11-4")
                ctx.body = "No Data Received - Error #11-4";
                ctx.status = 404;
                return;
            }
            let result = await prisma.user.findFirst({
                where:{
                    email: email,
                }
            })
            if(!result){
                console.log("No user email the data - Error #7D954235")
                ctx.body = "No user email in the data - Error #7D954235"
                ctx.status = 404;
                return;
            }
            console.log(result)
            ctx.body = result;
        }
        catch (e) {
            console.log("Error : ")
            console.log(e);
            ctx.body = e;
        }
    })
    .post('/reset-password', async (ctx, next) => {
        console.log("/reset-password")
        try {
            const receivedData = ctx.request.body;
            if(Object.keys(receivedData).length == 0){
                console.log("No Data Received - Error #444959")
                ctx.body = "No Data Received - Error #444959";
                ctx.status = 404;
                return;
            }
            if(!receivedData){
                console.log("No user email the data - Error #7D954235")
                ctx.body = "No user email in the data - Error #7D954235"
                ctx.status = 404;
                return;
            }
            const content = JSON.parse(receivedData);

            const existingUser = await prisma.user.findUnique({
                select: {
                    id: true,
                    lastName: true,  
                    firstName: true,
                    email: true,
                },
                where:{
                    email: Object.values(content)[0] as string,
                }
            })
            if(!existingUser){
                console.log("User not found")
                return;
            }
            const token = jwt.sign(existingUser, "secret",{expiresIn: '15m'});
            const userToUpdate: any = await prisma.user.update({
                where: {
                    email: Object.values(content)[0] as string,
                },
                data: {
                    resetPasswordToken: token,
                }
            })
            ctx.body = JSON.stringify({ token });
        }
        catch (e) {
            console.log("Error : " + e)
            ctx.body = e;
        }
    })
    .post('/update-password', async (ctx, next) => {
        console.log("/update-password");
        try {
            const receivedData = ctx.request.body;
            if (receivedData) {
                const content = JSON.parse(receivedData);
                const token: string = Object.values(content)[0] as string;
                const password: string = Object.values(content)[1] as string;
                await jwt.verify(token, "secret", async function(error: any){
                    if (error) {
                        console.log("Incorrect token or it is expired")
                        return;
                    }else {
                        const existingUser: any = await prisma.user.findFirst({
                            select: {
                                id: true,
                                lastName: true,  
                                firstName: true,
                                email: true,
                                password: true,
                            },
                            where: {
                                resetPasswordToken: token,
                            }
                        })
                        if(!existingUser){
                            console.log("User with this token does not exist")
                            return;
                        }else {
                            const hashed_password = await PassFunc.hashMyPassword(password.toString())
                            const userToUpdate: any = await prisma.user.update({
                                where: {
                                    id: Object.values(existingUser)[0] as number
                                },
                                data: {
                                    resetPasswordToken: null,
                                    password: hashed_password,
                                }
                            })
                            ctx.body = userToUpdate;
                            if(!userToUpdate){
                                console.log("User with this token does not exist")
                                return;
                            }
                        }
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    })
    .post('/confirm-email', async (ctx, next) => {
        console.log("/confirm-email");
        try {
            const receivedData = ctx.request.body;
            if (receivedData) {
                const content = JSON.parse(receivedData);
                const token: string = Object.values(content)[0] as string;
                await jwt.verify(token, "secret", async function(error: any){
                    if (error) {
                        console.log("Incorrect token or it is expired")
                        return;
                    }else {
                        const existingUser: any = await prisma.user.findFirst({
                            select: {
                                id: true,
                                email: true,
                            },
                            where: {
                                confirmEmailToken: token,
                            }
                        })
                        if(!existingUser){
                            console.log("User with this token does not exist")
                            return;
                        }
                        else {
                            const userToUpdate: any = await prisma.user.update({
                                where: {
                                    id: Object.values(existingUser)[0] as number
                                },
                                data: {
                                    emailConfirmed: true,
                                }
                            })
                            ctx.body = userToUpdate;
                            if(!userToUpdate){
                                console.log("User with this token does not exist")
                                return;
                            }
                        }
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    })
    .post('/new-confirm-email', async (ctx, next) => {
        console.log("/new-confirm-email");
        try {
            const receivedData = ctx.request.body;
            if(Object.keys(receivedData).length == 0){
                console.log("No Data Received - Error #444959")
                ctx.body = "No Data Received - Error #444959";
                ctx.status = 404;
                return;
            }
            if(!receivedData){
                console.log("No user email the data - Error #7D954235")
                ctx.body = "No user email in the data - Error #7D954235"
                ctx.status = 404;
                return;
            }
            const content = JSON.parse(receivedData);

            const thisUser: any = await prisma.user.findFirst({
                select: {
                    id: true,
                    email: true,
                },
                where: {
                    id: content.user.id,
                }
            }
        )
            if(!thisUser){
                console.log("Create User failed")
                return;
            }
            const token = jwt.sign(thisUser, "secret",{expiresIn: '15m'});
            console.log(token)
            await prisma.user.update({
                where: {
                    id: content.user.id,
                },
                data: {
                    confirmEmailToken: token,
                }
            })
            ctx.body = JSON.stringify({ token });
        } catch (e) {
            console.log(e)
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
    .post('/user/login', async (ctx, next) => {
        console.log("/user/login");
        try {
            const receivedData = ctx.request.body;
            if(!receivedData){
                console.log("No Data Received - Error #11-7")
                return;
            }
            const content = JSON.parse(receivedData);
            const email = Object.values(content)[0] as string;
            const password = Object.values(content)[1] as string;

            const existingUser = await prisma.user.findUnique({
                select: {
                    lastName: true,
                    firstName: true,
                    email: true,
                    password: true,
                },
                where:{
                    email: email,
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
;

export default userRouter