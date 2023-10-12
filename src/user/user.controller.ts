import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { JwtGuard } from '../auth/guard/index'
import { UserService } from "./user.service";
import { GetUser } from "../auth/decorator/get-user.decorator";
import { User } from "@prisma/client";

@UseGuards(JwtGuard) //Using the guards at top level, affecting all endpoints in here
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Get('me')
    getMe(@GetUser() user: User) {
        //note that the Request type must be from express, so the req.user doesn't give error
        return user
    }
}