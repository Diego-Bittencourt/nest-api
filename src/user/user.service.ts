import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtStrategy } from "src/auth/strategy";


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