import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client'
import * as PassFunc from "./functions/password";

const prisma = new PrismaClient()


async function generate_unique_users() {
    const password_1234 = await PassFunc.hashMyPassword("1234")
    const unique_check =  await prisma.user.findMany({
        where: {
            OR: [
                {
                    email: "johncyna@mewo.fr",
                },
                {
                    email: "faker@faker.lol",
                }
            ]
        }
    })
    if(unique_check.length > 0){
        return;
    }
    await prisma.user.create({
        data: {
            email: "johncyna@mewo.fr",
            lastName: "Cyna",
            firstName: "John",
            password: password_1234,
            role: "USER",
        }
    })
    await prisma.user.create({
        data: {
            email: "faker@faker.lol",
            lastName: "Sang-hyeok",
            firstName: "Lee",
            password: password_1234,
            role: "ADMIN",
        }
    })
}

async function connect_entities(){
    const userNumber = await prisma.user.count()
    const orderNumber = await prisma.order.count()
    const productNumber = await prisma.product.count()
    const companyNumber = await prisma.company.count()
    const addressNumber = await prisma.address.count()
    const categoriesNumber = await prisma.category.count()
    const imagesNumber = await prisma.image.count()
    for (let i = 0; i < Math.round(userNumber * 0.8) ; i++) {
        await prisma.user.update({
            where: {id: faker.number.int({min: 1, max: userNumber})},
            data: {
                Orders: {
                    connect: {id: faker.number.int({min: 1, max: orderNumber})}
                }
            }
        })

        for (let j = 0; j < 5; j++) {
            await prisma.order.update({
                where: {id: faker.number.int({min: 1, max: orderNumber})},
                data: {
                    products: {
                        connect: {id: faker.number.int({min: 1, max: productNumber})}
                    }
                }
            })
        }
        await prisma.company.update({
            where: {id: faker.number.int({min: 1, max: companyNumber})},
            data:{
                Addresses: {
                    connect: {id: faker.number.int({min: 1, max: addressNumber})}
                },
            }
        })
        await prisma.company.update({
            where: {id: faker.number.int({min: 1, max: companyNumber})},
            data:{
                Contacts: {
                    connect: {id: faker.number.int({min: 1, max: userNumber})}
                }
            }
        })
        await prisma.address.update({
            where: {id: faker.number.int({min: 1, max: addressNumber})},
            data: {
                User: {
                    connect: {id: faker.number.int({min: 1, max: userNumber})}
                }
            }
        })
        await prisma.product.update({
            where: {id: faker.number.int({min: 1, max: productNumber})},
            data: {
                categories: {
                    connect: {id: faker.number.int({min: 1, max: categoriesNumber})}
                }
            }
        })
        await prisma.product.update({
            where: {id: faker.number.int({min: 1, max: productNumber})},
            data: {
                images: {
                    connect: {id: faker.number.int({min: 1, max: imagesNumber})}
                }
            }
        })
    }
    for (let i = 0; i < Math.round(userNumber * 0.1) ; i++) {
        await prisma.user.update({
            where: {id: faker.number.int({min: 1, max: userNumber})},
            data: {
                role: "ADMIN"
            }
        })
    }
    for (let i = 0; i < Math.round(userNumber * 0.2) ; i++) {
        await prisma.user.update({
            where: {id: faker.number.int({min: 1, max: userNumber})},
            data: {
                role: "PRODUCTMANAGER"
            }
        })
    }
    for (let i = 0; i < Math.round(userNumber * 0.1) ; i++) {
        await prisma.user.update({
            where: {id: faker.number.int({min: 1, max: userNumber})},
            data: {
                role: "DEVDEBUG"
            }
        })
    }
}

export async function generate_fake_data() {
    await generate_unique_users()
    const password_1234 = await PassFunc.hashMyPassword("1234")
    for (let i = 0; i < 10; i++) {
        await prisma.image.create({
            data: {
                altText: faker.commerce.productDescription(),
                url: faker.image.url()
            }
        })
        await prisma.address.create({
            data: {
                streetName: faker.location.street(),
                streetNumber: faker.number.int(150),
                postalCode: parseInt(faker.location.zipCode()),
                cityName: faker.location.city(),
                country: faker.location.country()
            }
        })
        await prisma.user.create({
            data: {
                email: faker.internet.email(),
                lastName: faker.person.lastName(),
                firstName: faker.person.firstName(),
                password: faker.food.adjective()
            }
        })
        await prisma.company.create({
            data: {
                name: faker.company.name(),
                website: faker.internet.domainName(),
            }
        })
        await prisma.product.create({
            data: {
                name: faker.internet.domainWord(),
                description: faker.hacker.phrase()
            }
        })
        await prisma.category.create({
            data: {
                name: faker.commerce.product(),
                description: faker.commerce.productDescription()
            }
        })
        await prisma.order.create({
            data: {
                referenceNumber: faker.number.int(2000),
            }
        })
    }
    await connect_entities()
}

