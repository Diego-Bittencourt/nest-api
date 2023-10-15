import { Controller, Get, UseGuards, Req, Body, Patch } from "@nestjs/common";
import { JwtGuard } from '../auth/guard/index'
import { UserService } from "./user.service";
import { GetUser } from "../auth/decorator/get-user.decorator";
import { User } from "@prisma/client";
import { AuthDto } from "../auth/dto";
import { EditUserDto } from "./dto";

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

    @Patch('')
    editUser(@GetUser() user: User ,@Body() userBody: EditUserDto) {
        return this.userService.editUser(user.id, userBody)
    }
}