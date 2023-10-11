import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";

@Module({
    imports: [
        PrismaModule, 
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}

//inside the module file, it will import the controllers and the services inside the object it 
//receives as argument
//the controllers are responsible for receive the incoming requests and return the responses
//the service is responsible for the business logic