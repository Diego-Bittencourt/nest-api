import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

//its ia good practice to add a route in the @Controller argument like below
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    //in the constructor, we inject the service files creating an instance of it inside the controller

    @Post('login')
    login() {
        return this.authService.login()
    }

    @Post('signup')
    signup() {
        return this.authService.signup()
    }
}