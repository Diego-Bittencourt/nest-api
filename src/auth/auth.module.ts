import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}

//inside the module file, it will import the controllers and the services inside the object it 
//receives as argument
//the controllers are responsible for receive the incoming requests and return the responses
//the service is responsible for the business logic