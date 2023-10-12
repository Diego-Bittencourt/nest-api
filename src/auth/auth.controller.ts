import { Controller, Get, Post, Body, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

//its ia good practice to add a route in the @Controller argument like below
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    //in the constructor, we inject the service files creating an instance of it inside the controller

    // @HttpCode(999) //the @HttpCode decorator sets the response code to a number or a enum from HttpStatus object
    @HttpCode(HttpStatus.OK) //returns a status code of 200 which mean ok
    @Post('login')
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto)
    }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log(dto)
        return this.authService.signup(dto)
    }
}