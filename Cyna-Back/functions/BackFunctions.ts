import {UserPermission} from "@prisma/client";

export default async function selectCorrectUserPermission(roleName: string) {
    console.log(roleName);
    switch (roleName) {
        case 'USER':
            return UserPermission.USER
        case 'PRODUCTMANAGER':
            return UserPermission.PRODUCTMANAGER
        case 'ADMIN':
            return UserPermission.ADMIN
        case 'DEVDEBUG':
            return UserPermission.DEVDEBUG
        default:
            return UserPermission.USER
    }
}