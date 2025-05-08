import {UserPermission} from "@prisma/client";

export default async function selectCorrectUserPermission(roleName: string) {
    switch (roleName) {
        case 'USER':
            return UserPermission.USER
        case 'PRODUCTMANAGER':
            return UserPermission.ADMIN
        case 'ADMIN':
            return UserPermission.DEVDEBUG
        case 'DEVDEBUG':
            return UserPermission.PRODUCTMANAGER
        default:
            return UserPermission.USER
    }
}