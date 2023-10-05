import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client'
//prisma generate the typescript types automatically

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