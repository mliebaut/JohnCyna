// noinspection JSIgnoredPromiseFromCall

import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function search_funct_to_rename(object_we_received: any) {
    //console.log("REceived Object")
    //console.log(object_we_received)
    // Test here
    //  email              String  @unique
    //   lastName           String
    //   firstName          String
    //   password           String
    let new_object = {
        "email": object_we_received.email || undefined,
        "firstName": object_we_received.firstName || undefined,
        //"lastName": object_we_received.lastName || undefined
    }
    const result = await prisma.user.findMany({
        where: {
            email: new_object.email,
            //lastName: new_object.lastName,
            firstName: new_object.firstName
        },
        //relationLoadStrategy: "join"
    })
    console.log(result)
}

const object1 = {
    "email": null,
    "lastName": null,
    "firstName": "Jermaine"
}
const object2 = {
    "email": "Ida.Zboncak85@yahoo.com",
    "lastName": null,
    "firstName": undefined
}

const object3 = {
    "email": "Ida.Zboncak85@yahoo.com",
    "lastName": null,
    "firstName": "Jermaine"
}

search_funct_to_rename(object1)
search_funct_to_rename(object2)
search_funct_to_rename(object3)
