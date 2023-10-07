import { Controller, Get, Post, Body } from '@nestjs/common';
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
    //to hold the interface for the dto, is good to have a folder called dto and stuff
    signup(@Body() dto: AuthDto) {
        //the advantage to use the decorators is Nestjs will pick the right type of body
        //regardless what framework you are using.
        console.log({
            dto
        })
        return this.authService.signup()
    }
}