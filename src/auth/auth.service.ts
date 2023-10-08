import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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

      try {
      const user = await this.prisma.user.create({
         //the using the create to create a row in the user table using prisma
         data: {
            //the data to be saved
            email: dto.email,
            hash: hash
         },
        
      })

      delete user.hash //this is a temporary solution to remove the hash, 
      //because the select approach is verbose
      //return the saved user
      return user;
   } catch(err) {
      if (err instanceof PrismaClientKnownRequestError) {
         if (err.code === 'P2002') {
            //the err.code = P2002 is the specific code for duplicate error in prisma
            throw new ForbiddenException('Credentials taken')
         }
         throw err
      }
   }
   
   //the user object doesn't have the hash password because it was not included in the select statement
   return 'signed up'
   }
}