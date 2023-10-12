import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";


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

}