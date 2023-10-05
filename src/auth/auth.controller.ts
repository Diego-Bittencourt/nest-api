import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

//decorator @Controller and the class declaration
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}
    //in the constructor, we inject the service files creating an instance of it inside the controller

    @Get('/')
    getTest() {
        return this.authService.login()
    }

    @Post('/')
    getSignUp() {
        return this.authService.signup()
    }
}