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
    //to hold the interface for the dto, is good to have a folder called dto and stuff
    signup(
        @Body('username') username: string,
        //you can cast a data into another datatype using inline pipelines, like the line below 
        @Body('password', ParseIntPipe) password: number
        //the pipeline above is to cast a data into a number
        //applying these pipelines are verbose if to be applied in every point of code.
        //so they can be used in the dto's
        ) {
        //the advantage to use the decorators is Nestjs will pick the right type of body
        //regardless what framework you are using.
        console.log({
            username,
            typeOfUserName: typeof username,
            password,
            typeOfPassword: typeof password
        })
        return this.authService.signup()
    }
}