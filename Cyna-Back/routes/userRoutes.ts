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
            var content = JSON.parse(receivedData);
            var email = Object.values(content)[0];
            var password = Object.values(content)[1];

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
            var passwordDB = Object.values(existingUser)[3];

            if (await PassFunc.checkMyPassword(password, passwordDB)){
                ctx.body = existingUser;
            }

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
                    //    Pour  Mettre les arguments
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
;

export default userRouter