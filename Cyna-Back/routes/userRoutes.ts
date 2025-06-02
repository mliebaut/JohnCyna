import Router from 'koa-router';
import {PrismaClient, UserPermission} from '@prisma/client'
import * as PassFunc from '../functions/password'
import jwt from 'jsonwebtoken';
import passport from 'koa-passport';
import session from 'koa-session';
import app from '../app';
import selectCorrectUserPermission from "../functions/BackFunctions";

const prisma = new PrismaClient()

const userRouter = new Router();
const ensureAuthenticated = require('../middlewares/authPassport');
userRouter
    .post('/user/create', async (ctx, next) => {
        console.log("/user/create");
        console.log(ctx.request.body);
        try {
            const receivedData = ctx.request.body.createdUser;
            if(!receivedData){
                console.log("No Data Received - Error #11-1")
                ctx.status = 400;
                ctx.body = "No Data Received - Error #11-1"
            }
            const hashed_password = await PassFunc.hashMyPassword(receivedData.password.toString())
            const new_user: any = await prisma.user.create({
                    data: {
                        email: receivedData.email.toLowerCase(),
                        lastName: receivedData.lastName,
                        firstName: receivedData.firstName,
                        password: hashed_password,
                        role: await selectCorrectUserPermission(receivedData.role)
                    }})
            if(!new_user){
                console.log("Create User failed")
                return;
            }
            const token = jwt.sign(new_user, "secret",{expiresIn: '15m'});
            console.log(token)
            await prisma.user.update({
                where: {
                    email: receivedData.email.toLowerCase()
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
    .post('/user/getAllRoles', async (ctx, next) => {
        console.log("/user/getAllRoles");
        try {
            ctx.body = UserPermission;
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
                    role: true
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
        /*
        return passport.authenticate('local', async (err, user, info) => {
            console.log("passport auth");
        if (err) {
            console.log("failed1");
        ctx.status = 500;
        ctx.body = { error: err.message };
        return;
        }
        if (!user) {
            console.log("failed2");
        ctx.status = 401;
        ctx.body = { error: info ? info.message : "Authentication failed" };
        return;
        }
        console.log(user);
        await ctx.login(user);
        ctx.body = user;
    })(ctx, next);*/
    }
)
    // .post('/user/searchAll',ensureAuthenticated, async (ctx, next) => {
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
    .post('/user/update', async (ctx, next) => {
        console.log("/user/update");
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
                    role: await selectCorrectUserPermission(receivedData.role)
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
            const userToDelete: any = await prisma.user.delete({
                where: {
                    id: receivedData.id
                }
            })
            console.log(userToDelete)
            ctx.body = userToDelete
        } catch (e) {
            console.log(e)
        }
    })

// Route permettant de récupérer les informations de l'utilisateur connecté
.post('/user/me', async (ctx, next) => {
    console.log("/user/me");
    try {
        const receivedData = ctx.request.body;
        if(!receivedData || !receivedData.userId){
            console.log("No User ID Received - Error #4478899")
            ctx.status = 400;
            ctx.body = "No User ID Received";
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: receivedData.userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        });

        if (!user) {
            ctx.status = 404;
            ctx.body = { message: "Utilisateur non trouvé" };
            return;
        }

        ctx.body = user;
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { message: "Une erreur est survenue lors de la récupération des informations" };
    }
})

// Route pour mettre à jour les informations personnelles
.post('/user/me/update', async (ctx, next) => {
    console.log("/user/me/update");
    try {
        const receivedData = ctx.request.body;
        if(!receivedData || !receivedData.userId){
            console.log("No User ID Received - Error #4478900")
            ctx.status = 400;
            ctx.body = "No User ID Received";
            return;
        }

        const { userId, firstName, lastName, email } = receivedData;

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            ctx.status = 404;
            ctx.body = { message: "Utilisateur non trouvé" };
            return;
        }

        let updateData: any = {};

        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;

        // Si l'email est modifié, nous devons déclencher un processus de vérification
        if (email && email !== user.email) {
            // Générer un token de vérification (à implémenter dans functions/password.ts)
            const token = await PassFunc.generateToken({ userId, email });

            updateData.pendingEmail = email;
            updateData.emailVerificationToken = token;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                pendingEmail: true
            }
        });

        ctx.body = {
            user: updatedUser,
            message: email !== user.email
                ? "Vos informations ont été mises à jour. Veuillez vérifier votre nouvelle adresse email."
                : "Vos informations ont été mises à jour avec succès."
        };
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { message: "Une erreur est survenue lors de la mise à jour des informations" };
    }
})

// Route pour mettre à jour le mot de passe
.post('/user/me/password', async (ctx, next) => {
    console.log("/user/me/password");
    try {
        const receivedData = ctx.request.body;
        if(!receivedData || !receivedData.userId){
            console.log("No User ID Received - Error #4478901")
            ctx.status = 400;
            ctx.body = "No User ID Received";
            return;
        }

        const { userId, currentPassword, newPassword } = receivedData;

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            ctx.status = 404;
            ctx.body = { message: "Utilisateur non trouvé" };
            return;
        }

        // Vérifier que le mot de passe actuel est correct
        const isPasswordValid = await PassFunc.checkMyPassword(currentPassword, user.password);

        if (!isPasswordValid) {
            ctx.status = 400;
            ctx.body = { message: "Le mot de passe actuel est incorrect" };
            return;
        }

        // Validation du nouveau mot de passe
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            ctx.status = 400;
            ctx.body = { message: "Le nouveau mot de passe ne respecte pas les critères de sécurité" };
            return;
        }

        // Hasher et mettre à jour le nouveau mot de passe
        const hashedPassword = await PassFunc.hashMyPassword(newPassword);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        ctx.body = { message: "Votre mot de passe a été mis à jour avec succès" };
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { message: "Une erreur est survenue lors de la mise à jour du mot de passe" };
    }
})

// Route pour vérifier l'email (lorsqu'un utilisateur clique sur le lien dans l'email)
.post('/user/verify-email', async (ctx, next) => {
    console.log("/user/verify-email");
    try {
        const { token } = ctx.request.body;

        if (!token) {
            ctx.status = 400;
            ctx.body = { message: "Token manquant" };
            return;
        }

        // Vérifier le token (à implémenter dans functions/password.ts)
        const payload = await PassFunc.verifyToken(token);
        if (!payload) {
            ctx.status = 400;
            ctx.body = { message: "Le lien de vérification est invalide ou a expiré" };
            return;
        }

        const user = await prisma.user.findFirst({
            where: {
                id: payload.userId,
                emailVerificationToken: token
            }
        });

        if (!user || !user.pendingEmail) {
            ctx.status = 400;
            ctx.body = { message: "Le lien de vérification est invalide ou a expiré" };
            return;
        }

        // Mettre à jour l'email de l'utilisateur
        await prisma.user.update({
            where: { id: user.id },
            data: {
                email: user.pendingEmail,
                pendingEmail: null,
                emailVerificationToken: null
            }
        });

        ctx.body = { message: "Votre adresse email a été confirmée avec succès" };
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { message: "Une erreur est survenue lors de la vérification de votre email" };
    }
})

// Routes pour la gestion des adresses
.post('/user/me/addresses', async (ctx, next) => {
    console.log("/user/me/addresses");
    try {
        const receivedData = ctx.request.body;
        if(!receivedData || !receivedData.userId){
            console.log("No User ID Received - Error #4478902")
            ctx.status = 400;
            ctx.body = "No User ID Received";
            return;
        }

        const addresses = await prisma.address.findMany({
            where: {
                User: {
                    some: {
                        id: receivedData.userId
                    }
                }
            }
        });

        ctx.body = addresses;
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { message: "Une erreur est survenue lors de la récupération des adresses" };
    }
})

.post('/user/me/addresses/add', async (ctx, next) => {
    console.log("/user/me/addresses/add");
    try {
        const receivedData = ctx.request.body;
        if(!receivedData || !receivedData.userId){
            console.log("No User ID Received - Error #4478903")
            ctx.status = 400;
            ctx.body = "No User ID Received";
            return;
        }

        const { userId, streetName, streetNumber, postalCode, cityName, country, extraInformation, type, isDefault } = receivedData;

        // Si cette adresse est définie par défaut, mettre à jour les autres adresses du même type
        if (isDefault) {
            await prisma.$transaction(async (prisma) => {
                // Trouver les adresses du même type qui sont actuellement par défaut
                const defaultAddresses = await prisma.address.findMany({
                    where: {
                        User: {
                            some: {
                                id: userId
                            }
                        },
                        type,
                        isDefault: true
                    }
                });

                // Mettre à jour ces adresses pour qu'elles ne soient plus par défaut
                for (const address of defaultAddresses) {
                    await prisma.address.update({
                        where: { id: address.id },
                        data: { isDefault: false }
                    });
                }
            });
        }

        // Créer la nouvelle adresse
        const newAddress = await prisma.address.create({
            data: {
                streetName,
                streetNumber: parseInt(streetNumber),
                postalCode: parseInt(postalCode),
                cityName,
                country,
                extraInformation,
                type,
                isDefault: isDefault || false,
                User: {
                    connect: {
                        id: userId
                    }
                }
            }
        });

        ctx.body = newAddress;
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { message: "Une erreur est survenue lors de l'ajout de l'adresse" };
    }
})

.post('/user/me/addresses/update', async (ctx, next) => {
    console.log("/user/me/addresses/update");
    try {
        const receivedData = ctx.request.body;
        if(!receivedData || !receivedData.userId || !receivedData.addressId){
            console.log("No User ID or Address ID Received - Error #4478904")
            ctx.status = 400;
            ctx.body = "No User ID or Address ID Received";
            return;
        }

        const { userId, addressId, streetName, streetNumber, postalCode, cityName, country, extraInformation, type, isDefault } = receivedData;

        // Vérifier que l'adresse existe et appartient à l'utilisateur
        const address = await prisma.address.findFirst({
            where: {
                id: addressId,
                User: {
                    some: {
                        id: userId
                    }
                }
            }
        });

        if (!address) {
            ctx.status = 404;
            ctx.body = { message: "Adresse non trouvée" };
            return;
        }

        // Si cette adresse est définie par défaut, mettre à jour les autres adresses du même type
        if (isDefault && !address.isDefault) {
            await prisma.$transaction(async (prisma) => {
                // Trouver les adresses du même type qui sont actuellement par défaut
                const defaultAddresses = await prisma.address.findMany({
                    where: {
                        User: {
                            some: {
                                id: userId
                            }
                        },
                        type: type || address.type,
                        isDefault: true
                    }
                });

                // Mettre à jour ces adresses pour qu'elles ne soient plus par défaut
                for (const addr of defaultAddresses) {
                    await prisma.address.update({
                        where: { id: addr.id },
                        data: { isDefault: false }
                    });
                }
            });
        }

        // Préparation des données à mettre à jour
        let updateData: any = {};
        if (streetName !== undefined) updateData.streetName = streetName;
        if (streetNumber !== undefined) updateData.streetNumber = parseInt(streetNumber);
        if (postalCode !== undefined) updateData.postalCode = parseInt(postalCode);
        if (cityName !== undefined) updateData.cityName = cityName;
        if (country !== undefined) updateData.country = country;
        if (extraInformation !== undefined) updateData.extraInformation = extraInformation;
        if (type !== undefined) updateData.type = type;
        if (isDefault !== undefined) updateData.isDefault = isDefault;

        // Mise à jour de l'adresse
        const updatedAddress = await prisma.address.update({
            where: { id: addressId },
            data: updateData
        });

        ctx.body = updatedAddress;
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { message: "Une erreur est survenue lors de la mise à jour de l'adresse" };
    }
})

.post('/user/me/addresses/delete', async (ctx, next) => {
    console.log("/user/me/addresses/delete");
    try {
        const receivedData = ctx.request.body;
        if(!receivedData || !receivedData.userId || !receivedData.addressId){
            console.log("No User ID or Address ID Received - Error #4478905")
            ctx.status = 400;
            ctx.body = "No User ID or Address ID Received";
            return;
        }

        const { userId, addressId } = receivedData;

        // Vérifier que l'adresse existe et appartient à l'utilisateur
        const address = await prisma.address.findFirst({
            where: {
                id: addressId,
                User: {
                    some: {
                        id: userId
                    }
                }
            }
        });

        if (!address) {
            ctx.status = 404;
            ctx.body = { message: "Adresse non trouvée" };
            return;
        }

        // Supprimer l'association avec l'utilisateur
        await prisma.address.update({
            where: { id: addressId },
            data: {
                User: {
                    disconnect: {
                        id: userId
                    }
                }
            }
        });

        // Si l'adresse n'est plus associée à aucun utilisateur, la supprimer
        const updatedAddress = await prisma.address.findUnique({
            where: { id: addressId },
            include: {
                User: true
            }
        });

        if (updatedAddress && updatedAddress.User.length === 0) {
            await prisma.address.delete({
                where: { id: addressId }
            });
        }

        ctx.body = { message: "Adresse supprimée avec succès" };
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { message: "Une erreur est survenue lors de la suppression de l'adresse" };
    }
})

.post('/user/me/addresses/set-default', async (ctx, next) => {
    console.log("/user/me/addresses/set-default");
    try {
        const receivedData = ctx.request.body;
        if(!receivedData || !receivedData.userId || !receivedData.addressId || !receivedData.type){
            console.log("Missing required data - Error #4478906")
            ctx.status = 400;
            ctx.body = "Missing required data (userId, addressId, type)";
            return;
        }

        const { userId, addressId, type } = receivedData;

        // Vérifier que l'adresse existe et appartient à l'utilisateur
        const address = await prisma.address.findFirst({
            where: {
                id: addressId,
                User: {
                    some: {
                        id: userId
                    }
                }
            }
        });

        if (!address) {
            ctx.status = 404;
            ctx.body = { message: "Adresse non trouvée" };
            return;
        }

        await prisma.$transaction(async (prisma) => {
            // Réinitialiser toutes les adresses du même type
            const addressesToReset = await prisma.address.findMany({
                where: {
                    User: {
                        some: {
                            id: userId
                        }
                    },
                    type,
                    isDefault: true
                }
            });

            for (const addr of addressesToReset) {
                await prisma.address.update({
                    where: { id: addr.id },
                    data: { isDefault: false }
                });
            }

            // Définir l'adresse sélectionnée comme adresse par défaut
            await prisma.address.update({
                where: { id: addressId },
                data: {
                    isDefault: true,
                    type // Assurer que le type est correct
                }
            });
        });

        ctx.body = { message: `Adresse définie comme adresse ${type === 'billing' ? 'de facturation' : 'de livraison'} par défaut` };
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { message: "Une erreur est survenue lors de la définition de l'adresse par défaut" };
    }
})
    // .post('/user/login', async (ctx, next) => {
    //     console.log("/user/login");
    //     try {
    //         const receivedData = ctx.request.body;
    //         if(!receivedData){
    //             console.log("No Data Received - Error #11-7")
    //             return;
    //         }
    //         //TODO: Version plus propre.
    //         const content = JSON.parse(receivedData);
    //         const email = Object.values(content)[0] as string;
    //         const password = Object.values(content)[1] as string;
    //
    //         const existingUser = await prisma.user.findUnique({
    //             // select: {
    //             //     lastName: true,
    //             //     firstName: true,
    //             //     email: true,
    //             //     password: true,
    //             // },
    //             where:{
    //                 email: email,
    //             }
    //         })
    //         console.log(existingUser)
    //
    //         if(!existingUser){
    //             console.log("User not found")
    //             ctx.body = "User not found";
    //         }
    //
    //         const passwordResult = await PassFunc.checkMyPassword(receivedData.password, existingUser.password);
    //         console.log(passwordResult)
    //         if (passwordResult){
    //             console.log("Passwords Match")
    //             //TODO: Envoie d'un token JWT ICI
    //             ctx.body = "Passwords Match!";
    //         } else {
    //             console.log("Wrong Password")
    //             ctx.status = 404;
    //             ctx.body = 'Wrong Password'
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // })
;

export default userRouter