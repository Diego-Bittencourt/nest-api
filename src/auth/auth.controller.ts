import { Controller, Get, Post, Body, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

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
    signup(@Body() dto: AuthDto) {
        //installing the class validator
        //npm install class-validator class-transformer
        return this.authService.signup()
    }
}