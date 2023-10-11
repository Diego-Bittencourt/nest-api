import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt' //using the strategy like this, it assigns the 'jwt' automatically here
          //but you can use any name you want here
          //to link, justr pass 'jwt' string inside the AuthGuard() method through the app
    ) {
    constructor(
        config: ConfigService, //the configService is not private because I only use it here
        private prisma: PrismaService
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload: any) {
        // console.log(payload)
        //console { sub: 1, email: 'diego@email.com', iat: 1697033096, exp: 1697033996 }
        //where the sub is the userId, the email, and other information inside the token

        //the validate function extracts information from the token and
        //append the info inside req.user in the request

        const user = await this.prisma.user.findUnique({
            where:{
                id: payload.sub
            }
        })

        delete user.hash
        return user
        //if the user is null, in case the user doesn't exist in the db, 
        //there would be thrown an authentication error anyways. 
    }

}