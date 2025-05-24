import {faker} from '@faker-js/faker';
import {PrismaClient} from '@prisma/client'
import * as PassFunc from "./functions/password";

const prisma = new PrismaClient()


async function generate_unique_users() {
    const password_1234 = await PassFunc.hashMyPassword("1234")
    const unique_check = await prisma.user.findFirst({
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
    if (unique_check != null) {
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

async function create_categories() {
    await prisma.category.createMany({
        data: [
            {name: "Anticipation", description: "Monitor, analyze and predict threat trends to adjust your defenses."},
            {name: "Reponse", description: "React quickly and effectively in the event of a cybersecurity incident."},
            {
                name: "Protection",
                description: "Secure your systems and data from cyberattacks with advanced solutions."
            },
            {
                name: "Prevention",
                description: "Implement measures and best practices to avoid cyberattacks. This includes training, risk assessment, and appropriate security policies."
            },
        ]

        //     data: [
        //         {name: "Application Control", description: faker.food.description()},
        //         {name: "Application Security Testing", description: faker.food.description()},
        //         {
        //             name: "Authentication (User Authentication, Biometric Authentication and PKI)",
        //             description: faker.food.description()
        //         },
        //         {name: "Automotive Cyber Security", description: faker.food.description()},
        //         {name: "Behavior Analytics (User and Entity)", description: faker.food.description()},
        //         {name: "Big Data Security", description: faker.food.description()},
        //         {
        //             name: "Browser Security (Secure Virtual Browser and Remote Browser)",
        //             description: faker.food.description()
        //         },
        //         {name: "Cloud Access Security Broker", description: faker.food.description()},
        //         {name: "Cloud Security", description: faker.food.description()},
        //         {name: "Compliance Management", description: faker.food.description()},
        //         {name: "Container Security", description: faker.food.description()},
        //         {name: "Cyber Maneuver (Network Masking)", description: faker.food.description()},
        //         {name: "Cyber Threat Hunting", description: faker.food.description()},
        //         {name: "Data Discovery", description: faker.food.description()},
        //         {name: "Data Loss (Leakage) Prevention (DLP)", description: faker.food.description()},
        //         {name: "Data Masking", description: faker.food.description()},
        //         {name: "Data Security", description: faker.food.description()},
        //         {name: "Data-at-Rest Encryption", description: faker.food.description()},
        //         {name: "Data-in-Motion/Transit (Network) Encryption and VPN", description: faker.food.description()},
        //         {name: "Database Security", description: faker.food.description()},
        //         {name: "DDoS Protection", description: faker.food.description()},
        //         {name: "Deception-Based Security", description: faker.food.description()},
        //         {name: "Digital Forensic Investigation and Computer Forensics", description: faker.food.description()},
        //         {name: "Digital Rights Management", description: faker.food.description()},
        //         {name: "Digital Risk Monitoring", description: faker.food.description()},
        //         {name: "Embedded Security", description: faker.food.description()},
        //         {name: "Endpoint Protection and Anti-virus", description: faker.food.description()},
        //         {name: "Endpoint Threat Detection and Response", description: faker.food.description()},
        //         {name: "File Content Security", description: faker.food.description()},
        //         {name: "Firewall Configuration and Management", description: faker.food.description()},
        //         {name: "Fraud Prevention", description: faker.food.description()},
        //         {name: "Governance/Compliance Management", description: faker.food.description()},
        //         {name: "Hypervisor Security", description: faker.food.description()},
        //         {name: "Identity and Access Management", description: faker.food.description()},
        //         {name: "Identity Theft Detection", description: faker.food.description()},
        //         {name: "Industrial Security (ICS/SCADA Security)", description: faker.food.description()},
        //         {name: "Internet of Things (IoT) Security", description: faker.food.description()},
        //         {
        //             name: "Intrusion Prevention Systems (and Intrusion Detection Systems)",
        //             description: faker.food.description()
        //         },
        //         {name: "Malware Detection and Analysis", description: faker.food.description()},
        //         {name: "Managed Security Service Providers", description: faker.food.description()},
        //         {name: "Messaging Security", description: faker.food.description()},
        //         {name: "Mobile Data Protection", description: faker.food.description()},
        //         {name: "Mobile Device Management", description: faker.food.description()},
        //         {name: "Network Access Control", description: faker.food.description()},
        //         {name: "Network Behavior Analysis and Anomaly Detection", description: faker.food.description()},
        //         {name: "Network Firewall (includes Next Generation Firewalls)", description: faker.food.description()},
        //         {name: "Network Monitoring and Forensics", description: faker.food.description()},
        //         {name: "Password Manager", description: faker.food.description()},
        //         {name: "Patch Configuration and Management", description: faker.food.description()},
        //         {name: "Penetration Testing", description: faker.food.description()},
        //         {name: "Pervasive Trust Services", description: faker.food.description()},
        //         {name: "Risk and Compliance Management", description: faker.food.description()},
        //         {name: "Risk and Vulnerability Assessment", description: faker.food.description()},
        //         {name: "Secure File Transfer", description: faker.food.description()},
        //         {name: "Secure Web Gateway", description: faker.food.description()},
        //         {name: "Security Configuration Management", description: faker.food.description()},
        //         {name: "Security Incident Management and Response", description: faker.food.description()},
        //         {
        //             name: "Security Information and Event Management (and Log Management)",
        //             description: faker.food.description()
        //         },
        //         {name: "Security Operations Automation and Orchestration", description: faker.food.description()},
        //         {name: "Security Ratings", description: faker.food.description()},
        //         {name: "Security Training Software", description: faker.food.description()},
        //         {name: "Specialized Threat Analysis and Protection", description: faker.food.description()},
        //         {name: "SSL and Digital Certificate Authority and Management", description: faker.food.description()},
        //         {name: "Threat Intelligence and Signature Feeds", description: faker.food.description()},
        //         {name: "Transport Access Control", description: faker.food.description()},
        //         {
        //             name: "Trusted Computing, Cross Domain Security and Multi Level Security",
        //             description: faker.food.description()
        //         },
        //         {name: "Unified Threat Management", description: faker.food.description()},
        //         {name: "Vulnerability Assessment", description: faker.food.description()},
        //         {name: "Web Application Firewall", description: faker.food.description()},
        //         {name: "Wireless Intrusion Detection System", description: faker.food.description()},
        //     ]
    })
}

async function connect_entities() {
    const userNumber = await prisma.user.count()
    const orderNumber = await prisma.order.count()
    const productNumber = await prisma.product.count()
    const companyNumber = await prisma.company.count()
    const addressNumber = await prisma.address.count()
    const categoriesNumber = await prisma.category.count()
    const imagesNumber = await prisma.image.count()
    for (let i = 0; i < Math.round(userNumber * 0.8); i++) {
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
            data: {
                Addresses: {
                    connect: {id: faker.number.int({min: 1, max: addressNumber})}
                },
            }
        })
        await prisma.company.update({
            where: {id: faker.number.int({min: 1, max: companyNumber})},
            data: {
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
    for (let i = 0; i < Math.round(userNumber * 0.1); i++) {
        await prisma.user.update({
            where: {id: faker.number.int({min: 1, max: userNumber})},
            data: {
                role: "ADMIN"
            }
        })
    }
    for (let i = 0; i < Math.round(userNumber * 0.2); i++) {
        await prisma.user.update({
            where: {id: faker.number.int({min: 1, max: userNumber})},
            data: {
                role: "PRODUCTMANAGER"
            }
        })
    }
    for (let i = 0; i < Math.round(userNumber * 0.1); i++) {
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
    await create_categories()
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
                email: faker.internet.email().toLowerCase(),
                lastName: faker.person.lastName(),
                firstName: faker.person.firstName(),
                password: await PassFunc.hashMyPassword(faker.food.adjective())
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
                GUID: faker.string.uuid(),
                ean: faker.number.int(900000000),
                name: faker.internet.domainWord(),
                description: faker.hacker.phrase(),
                inStock: faker.datatype.boolean(0.75),
                prix: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 })
            }
        })
        // await prisma.category.create({
        //     data: {
        //         name: faker.commerce.product(),
        //         description: faker.commerce.productDescription()
        //     }
        // })
        await prisma.order.create({
            data: {
                referenceNumber: faker.number.int(2000),
            }
        })
    }
    await connect_entities()
}

