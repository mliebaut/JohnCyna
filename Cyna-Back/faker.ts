import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function generate_fake_data() {
    for (let i = 0; i < 10; i++) {
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
                name: faker.company.name()
            }
        })
        await prisma.adress.create({
            data: {
                streetName: faker.location.street(),
                streetNumber: faker.number.int(150),
                postalCode: parseInt(faker.location.zipCode()),
                cityName: faker.location.city(),
                country: faker.location.country()
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



// - TODO: Faire un loop qui regarde ping la BDD, qui trouve une liste d'Users, d'Orders, de Products, qui prends une liste valide de ID's, et qui les utilisent pour ces jointures.

    const userNumber = await prisma.user.count()
    const orderNumber = await prisma.order.count()
    const productNumber = await prisma.product.count()
    // let userList = await prisma.user.findMany({take: 10})
    for (let i = 0; i < 10; i++) {
        await prisma.user.update({
            where: {id: faker.number.int({min: 1, max: userNumber})},
            data: {
                orders: {
                    connect: {id: 1}
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

    }

}

