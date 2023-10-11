import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtGuard } from '../auth/guard/index'
import { Request } from "express";
import { UserService } from "./user.service";
import { GetUser } from "src/auth/decorator/get-user.decorator";
import { User } from "@prisma/client";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @UseGuards(JwtGuard) //this line tell this endpoint is protected byt 'jwt' strategy
    @Get('me')
    getMe(@GetUser() user: User) {
        //note that the Request type must be from express, so the req.user doesn't give error
        console.log(user) 
        //the console.log(req.user) consoles the same as the payload in the validate function
        return user
    }
}