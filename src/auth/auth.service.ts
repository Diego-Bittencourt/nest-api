import { Injectable } from '@nestjs/common';

//the Injectable decorator (for service) and the class declaration
@Injectable({})
export class AuthService {

   login() {
    return 'logged in'

   }

   signup() {
    return 'signed up'
   }
}