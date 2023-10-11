import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @UseGuards(AuthGuard('jwt')) //this line tell this endpoint is protected byt 'jwt' strategy
    @Get('me')
    getMe(@Req() req: Request ) {
        //note that the Request type must be from express, so the req.user doesn't give error
        console.log(req.user) 
        //the console.log(req.user) consoles the same as the payload in the validate function
        return req.user
    }
}