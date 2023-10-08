import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
//prisma generate the typescript types automatically

//the Injectable decorator (for service) and the class declaration
@Injectable()
export class AuthService {
   constructor(private prisma: PrismaService) {}

   login() {
    return 'logged in'

   }

   async signup(dto: AuthDto) {
      //generate the password hash

      const hash = await argon.hash(dto.password) //using the installed package to generate a hash of the password
      //saving the new user in the db

      const user = await this.prisma.user.create({
         //the using the create to create a row in the user table using prisma
         data: {
            //the data to be saved
            email: dto.email,
            hash: hash
         },
         select: {
            //select what columns I want
            id: true,
            email: true,
            createdAt: true
         }
      })
      //return the saved user
   return user;
   //the user object doesn't have the hash password because it was not included in the select statement
   return 'signed up'
   }
}