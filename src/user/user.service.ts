import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "../auth/dto";
import * as argon from 'argon2';
import { EditUserDto } from "./dto";


@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) {}

    // async getMe(userToken: any) {

    //     const user = await this.prisma.user.findUnique({
    //         where: {
    //             email: userToken.email
    //         }
    //     })
    //     delete user.hash
    //     return user
    // }

    async editUser(userId: number, userData: EditUserDto) {
        const currentTime = new Date()
        const newUserData: {
            email?: string,
            hash?: string,
            firstName?: string,
            lastName?: string
        } = {}
        console.log('o array aqui', Object.getOwnPropertyNames(userData))
        if(Object.getOwnPropertyNames(userData).length === 0) {
            throw new BadRequestException('User data is empty')
        }

        if (userData.email) {
            newUserData.email = userData.email
        }

        if (userData.password) {

            newUserData.hash = await argon.hash(userData.password)
        }

        if (userData.firstName) {
            newUserData.firstName = userData.firstName
        }

        if (userData.lastName) {
            newUserData.lastName = userData.lastName
        }



        const updateUser = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: newUserData
        })
        delete updateUser.hash
        return updateUser
    }

}